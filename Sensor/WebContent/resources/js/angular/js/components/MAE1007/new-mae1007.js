/*UNIDAD DE DISPLAY*/

"use strict";
angular.module('newMAE1007', [ 'ui.bootstrap', 'adminModule', 'messages',
		'userValidator', 'ngMask', 'MAE1007Service', 'SimulatorService' ]);

(function() {
	"use strict";
	angular.module("newMAE1007").controller('modalNewMAE1007Ctrl',
			modalNewMAE1007Ctrl);

	modalNewMAE1007Ctrl.$inject = [ '$scope', '$rootScope', '$uibModalInstance',
			'$http', 'basicConfigurationGrid','mae1007Service', 'SweetAlert', 'wbl4bService' ];
	function modalNewMAE1007Ctrl($scope, $rootScope, $uibModalInstance, $http,
			basicConfigurationGrid, mae1007Service, SweetAlert, wbl4bService) {
		$scope.mae1007 = new Object();
		$scope.mae1007.srvrpo = 10500;
		$scope.mae1007.isused = false;
		$scope.mae1007.defaul = false;
		$scope.mae1007.traced = false;
		$scope.isRunApp = false;
		
		$rootScope.rowSelected = null;
		$scope.submitForm = function(mae1007, form) {
			if( form.$valid ) {
				mae1007.port = $rootScope.rowSelected;
				mae1007Service.update(mae1007, $uibModalInstance, 0, $scope,
						basicConfigurationGrid, globalScope);
			}
		}
		
		$scope.tryConnection = function(mae1007, form) {
			if( form.$valid ) {
				$scope.isRunApp = true;
				mae1007.port = $rootScope.rowSelected;
				wbl4bService.runSimulator(mae1007);
			}
		}
		
		$scope.captureWeigh = function(srvrpo, operation, form) {
			if( form.$valid ) {
				wbl4bService.captureWeigh(srvrpo, operation).then(function(response) {
					$scope.weight = response.numstr;
					wbl4bService.showMessageAlert(response);
				})
		        .catch(function(error) {
		        	console.log(error);
		        });
			}
		}

		$scope.cancel = function(srvrpo) {
			wbl4bService.closeApp(srvrpo);
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module('newMAE1007').controller('newMAE1007Controller',
			newMAE1007Controller);
	newMAE1007Controller.$inject = [ '$uibModal', '$scope' ];
	function newMAE1007Controller($uibModal, $scope) {
		var vm = this;
		vm.newMAE1007 = function() {
			modalNewMAE1007Ctrl();
		};

		function modalNewMAE1007Ctrl() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'modalNewMAE1007Ctrl.html',
				controller : 'modalNewMAE1007Ctrl',
				size : "md",
				backdrop: false
			});
			modalInstance.result.then(function() {
				$scope.$emit('new_mae1007', 1);
			}, function() {
			});
		}
	}
})();

angular
		.module('newMAE1007')
		.component(
				'newMae1007Component',
				{
					template : '<button class="btn btn-primary" type="button" ng-click="$ctrl.newMAE1007()"><i class="fa fa-plus"></i> {{ \'GENE.NEW\' | translate }}</button>',
					controller : 'newMAE1007Controller'
				});