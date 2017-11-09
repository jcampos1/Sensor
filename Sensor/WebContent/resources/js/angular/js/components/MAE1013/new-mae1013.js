/*CABECERA DE ORDEN*/

"use strict";
angular.module('newMAE1013', [ 'ui.bootstrap', 'adminModule', 'ngMask', 'MAE1013Service', 'ngAnimate' ]);

(function() {
	"use strict";
	angular.module("newMAE1013").controller('modalNewMAE1013Ctrl',
			modalNewMAE1013Ctrl);

	modalNewMAE1013Ctrl.$inject = [ '$scope', '$uibModalInstance',
			'mae1013Service', 'comunication', 'parameterFactory', '$log' ];
	function modalNewMAE1013Ctrl($scope, $uibModalInstance,
			mae1013Service, comunication, parameterFactory, $log) {
		
		/*****INICIALIZACIONES*******/
		$scope.mae1013 = new Object();
		$scope.mae1013.cddp = parameterFactory.getParam().cddp;
		comunication.setOrig_p(null);
		comunication.setOrig_a(null);
		comunication.setDest_p(null);
		comunication.setDest_a(null);
		comunication.setCond(null);
		comunication.setMotr(null);
		
		$scope.sources = comunication.getSources();
		$scope.mae1013.origin = comunication.getValsrce();
		$scope.mae1013.destin = comunication.getValsrce();
		/****************************/
		
		$scope.changeTipm = function ( ) {
			//Reintegro o devolución
			if($scope.mae1013.tipm.id == 2 || $scope.mae1013.tipm.id == 3) {
				$log.info("SE PROCEDE A SELECCIONAR EL ALMACÉN O PARTNER POR DEFECTO");
			}
		} 
		
		$scope.selectOrigin = function ( ) {
			comunication.setOrigin($scope.origin);
		} 
		
		$scope.selectDestin = function ( ) {
			comunication.setDestin($scope.mae1013.destin);
		} 
		
		$scope.submitForm = function(mae1013, form) {
			if( form.$valid ) {
				mae1013Service.update(mae1013, $uibModalInstance, 0, $scope);
			}
		}
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module('newMAE1013').controller('newMAE1013Controller',
			newMAE1013Controller);
	newMAE1013Controller.$inject = [ '$uibModal', '$scope', 'parameterFactory', '$rootScope', '$log' ];
	function newMAE1013Controller($uibModal, $scope, parameterFactory, $rootScope, $log) {
		var vm = this;
		vm.newMAE1013 = function() {
			if( vm.currentUser.ornd ) {
				modalNewMAE1013Ctrl();
			}
		};
		
		vm.currentUser = currentUser;
		
		parameterFactory.getParameterCurrent().then(function(response) {
			parameterFactory.setParam(response);
			vm.param = response;
		})
        .catch(function(error) {
        	$log.error(error);
        });

		function modalNewMAE1013Ctrl() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'modalNewMAE1013Ctrl.html',
				controller : 'modalNewMAE1013Ctrl',
				size : "lg"
			});
			modalInstance.result.then(function() { // Se confirma la
			}, function() {
			});
		}
	}
})();

angular
		.module('newMAE1013')
		.component(
				'newMae1013Component',
				{
					template : '<button ng-disabled="!$ctrl.currentUser.ornd" class="btn btn-primary" type="button" ng-click="$ctrl.newMAE1013()"><i class="fa fa-plus"></i> {{ \'GENE.NEW\' | translate }}</button>',
					controller : 'newMAE1013Controller'
				});