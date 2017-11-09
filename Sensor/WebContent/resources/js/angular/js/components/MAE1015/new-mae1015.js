/*PESAJE POR LINEA*/

"use strict";
angular.module('newMAE1015', [ 'ui.bootstrap', 'GRIDMAE1015', 'messages',
		'ngMask', 'MAE1015Service' ]);

(function() {
	"use strict";
	angular.module("newMAE1015").controller('modalNewMAE1015Ctrl',
			modal_new_entity);

	modal_new_entity.$inject = [ '$scope', '$uibModalInstance', '$http',
			'mae1015ConfigurationGrid', 'mae1015Service' ];
	function modal_new_entity($scope, $uibModalInstance, $http,
			mae1015ConfigurationGrid, mae1015Service) {
		$scope.mae1015 = new Object();
		$scope.rowSelected = new Object();
		
		$scope.submitForm = function(mae1015) {
			mae1015Service.update(mae1015, $uibModalInstance, 0, $scope,
					mae1015ConfigurationGrid, globalScope);
		}

		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module('newMAE1015').controller('newMAE1015Controller',
			newMAE1015Controller);
	newMAE1015Controller.$inject = [ '$uibModal' ];
	function newMAE1015Controller($uibModal) {
		var vm = this;
		vm.newMAE1015 = function() {
			modalNewMAE1015Ctrl();
		};

		function modalNewMAE1015Ctrl() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'modalNewMAE1015Ctrl.html',
				controller : 'modalNewMAE1015Ctrl',
				size : "md"
			});
			modalInstance.result.then(function() {
			}, function() {
			});
		}
	}
})();

angular
		.module('newMAE1015')
		.component(
				'newMae1014Component',
				{
					template : '<button class="btn btn-default" type="button" ng-click="$ctrl.newMAE1015()"><i class="fa fa-plus"></i> {{ \'GENE.NEW\' | translate }}</button>',
					controller : 'newMAE1015Controller'
				});