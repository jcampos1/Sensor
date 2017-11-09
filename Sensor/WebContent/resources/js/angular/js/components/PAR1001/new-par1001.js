"use strict";
angular.module('newPAR1001', [ 'ui.bootstrap', 'adminModule', 'messages',
		'userValidator', 'ngMask','abstractService']);

(function() {
	"use strict";
	angular.module("newPAR1001")
			.controller('modalNewPAR1001Ctrl', modal_new_entity);

	modal_new_entity.$inject = [ '$scope', '$uibModalInstance', 'adminService',
			'$http', 'basicConfig', 'basicConfigurationGrid', 'userService',
			'changeLang', 'par1001Service', 'functions' ];
	function modal_new_entity($scope, $uibModalInstance, adminService, $http,
			basicConfig, basicConfigurationGrid, userService, changeLang, par1001Service, functions) {
		$scope.par1001 = new Object();
		
		$scope.submitForm = function(par1001) {
			par1001Service.update(par1001, $uibModalInstance, 0, $scope, basicConfigurationGrid, globalScope);
		}

		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module('newPAR1001')
			.controller('newPAR1001Controller', newPAR1001Controller);
	newPAR1001Controller.$inject = [ '$uibModal' ];
	function newPAR1001Controller($uibModal) {
		var vm = this;
		vm.newPAR1001 = function() {
			modalNewPAR1001Ctrl();
		};

		function modalNewPAR1001Ctrl() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'modalNewPAR1001Ctrl.html',
				controller : 'modalNewPAR1001Ctrl',
				size : "lg"
			});
			modalInstance.result.then(function() { // Se confirma la
			}, function() {
			});
		}
	}
})();

angular.module('newPAR1001')
	.component(
			'newPar1001Component',
			{
				template : '<button class="btn btn-default" type="button" ng-click="$ctrl.newPAR1001()"><i class="fa fa-plus"></i> {{ \'GENE.NEW\' | translate }}</button>',
				controller : 'newPAR1001Controller'
			});