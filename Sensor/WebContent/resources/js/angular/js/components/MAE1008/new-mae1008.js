/*PUERTO DE COMUNICACION*/

"use strict";
angular.module('newMAE1008', [ 'ui.bootstrap', 'adminModule', 'messages', 'ngMask', 'MAE1008Service' ]);

(function() {
	"use strict";
	angular.module("newMAE1008").controller('modalNewMAE1008Ctrl',
			modal_new_entity);

	modal_new_entity.$inject = [ '$scope', '$uibModalInstance',
			'$http', 'basicConfigurationGrid','portService' ];
	function modal_new_entity($scope, $uibModalInstance, $http,
			basicConfigurationGrid, portService) {
		$scope.port = new Object();

		$scope.submitForm = function(port, form) {
			if( form.$valid ) {
				portService.update(port, $uibModalInstance, 0, $scope,
						basicConfigurationGrid, globalScope);
			}
		}

		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module('newMAE1008').controller('newMAE1008Controller',
			newMAE1008Controller);
	newMAE1008Controller.$inject = [ '$uibModal' ];
	function newMAE1008Controller($uibModal) {
		var vm = this;
		vm.newMAE1008 = function() {
			modalNewMAE1008Ctrl();
		};

		function modalNewMAE1008Ctrl() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'modalNewMAE1008Ctrl.html',
				controller : 'modalNewMAE1008Ctrl',
				size : "md"
			});
			modalInstance.result.then(function() { // Se confirma la
			}, function() {
			});
		}
	}
})();

angular
		.module('newMAE1008')
		.component(
				'newMae1008Component',
				{
					template : '<button class="btn btn-primary" type="button" ng-click="$ctrl.newMAE1008()"><i class="fa fa-plus"></i> {{ \'GENE.NEW\' | translate }}</button>',
					controller : 'newMAE1008Controller'
				});