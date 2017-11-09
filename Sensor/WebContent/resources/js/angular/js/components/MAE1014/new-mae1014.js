/*ITEMS DE ORDEN*/

"use strict";
angular.module('newMAE1014', [ 'ui.bootstrap', 'GRIDMAE1014', 'messages',
		'ngMask', 'MAE1014Service' ]);

(function() {
	"use strict";
	angular.module("newMAE1014").controller('modalNewMAE1014Ctrl',
			modal_new_entity);

	modal_new_entity.$inject = [ 'comunication', '$scope', '$uibModalInstance', '$http',
			'mae1014ConfigurationGrid', 'mae1014Service' ];
	function modal_new_entity(comunication, $scope, $uibModalInstance, $http,
			mae1014ConfigurationGrid, mae1014Service) {
		$scope.mae1014 = new Object();
		$scope.separator = separator;
		
		comunication.setItem(null);
		$scope.submitForm = function(mae1014, form) {
			if( form.$valid ) {
				mae1014Service.update(mae1014, $uibModalInstance, 0, $scope,
						mae1014ConfigurationGrid, globalScope);
			} 
		}

		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
		
		$scope.$watch(function() { return comunication.getItem() }, function() {
			if( comunication.isValid(comunication.getItem()) ) {
				$scope.mae1014.item = comunication.getItem();
			}
          }
        );
	}
})();

(function() {
	"use strict";
	angular.module('newMAE1014').controller('newMAE1014Controller',
			newMAE1014Controller);
	newMAE1014Controller.$inject = [ 'comunication', '$uibModal', '$scope', '$rootScope' ];
	function newMAE1014Controller( comunication, $uibModal, $scope, $rootScope ) {
		var vm = this;
		vm.stat = comunication.getOrder().stat.id;
		vm.confpe = comunication.getOrder().confpe;
		vm.user = currentUser;
		vm.hideOptions = disabledOptions( );
		
		vm.newMAE1014 = function() {
			if( !vm.confpe && !disabledOptions( )) {
				modalNewMAE1014Ctrl();
			}
		};

		function modalNewMAE1014Ctrl() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'modalNewMAE1014Ctrl.html',
				controller : 'modalNewMAE1014Ctrl',
				size : "md"
			});
			modalInstance.result.then(function() {
			}, function() {
			});
		}
		
		/* *****************ESCUCHADORES**************** */
		$scope.$watch(function() { return comunication.getEvnt02() }, function() {
			if( comunication.isValid(comunication.getEvnt02()) ) {
				vm.confpe = comunication.getEvnt02();
				vm.hideOptions = disabledOptions( );
				comunication.getEvnt02(null);
			}
          }
        );
		/* ********************************************* */
		
		/* *****************FUNCIONES PRIVADAS**************** */
		function disabledOptions( ) {
			var hide = true;
			if( comunication.getOrder().stat.id == 0 || comunication.getOrder().stat.id == 1 ) {
				if( comunication.getOrder().confpe ) {
					hide = true;
				}else{
					if( vm.user.ornd ) {
						hide = false;
					}
				}
			}
			return hide;
		}
		/* *************************************************** */
	}
})();

angular
		.module('newMAE1014')
		.component(
				'newMae1014Component',
				{
					templateUrl :"/WeighBridgeStandAlone/resources/js/angular/js/components/MAE1014/new-mae1014.jsp",
					controller : 'newMAE1014Controller',
				});