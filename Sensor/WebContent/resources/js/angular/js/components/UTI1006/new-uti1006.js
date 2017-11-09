/*MOTIVOS*/

"use strict";
angular.module('newUTI1006', [ 'ui.bootstrap', 'adminModule', 'messages', 'ngMask', 'UTI1006Service' ]);

(function() {
	"use strict";
	angular.module("newUTI1006").controller('modalNewUTI1006Ctrl',
			modal_new_entity);

	modal_new_entity.$inject = [ '$scope', '$uibModalInstance',
			'$http', 'basicConfigurationGrid','uti1006Service' ];
	function modal_new_entity($scope, $uibModalInstance, $http,
			basicConfigurationGrid, uti1006Service) {
		$scope.uti1006 = new Object();

		$scope.submitForm = function(uti1006, form) {
			if( form.$valid ) {
				uti1006Service.update(uti1006, $uibModalInstance, 0, $scope,
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
	angular.module('newUTI1006').controller('newUTI1006Controller',
			newUTI1006Controller);
	newUTI1006Controller.$inject = [ '$uibModal' ];
	function newUTI1006Controller($uibModal) {
		var vm = this;
		vm.newUTI1006 = function() {
			modalNewUTI1006Ctrl();
		};

		function modalNewUTI1006Ctrl() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'modalNewUTI1006Ctrl.html',
				controller : 'modalNewUTI1006Ctrl',
				size : "md"
			});
			modalInstance.result.then(function() {
			}, function() {
			});
		}
	}
})();

angular
		.module('newUTI1006')
		.component(
				'newUti1006Component',
				{
					template : '<button class="btn btn-primary" type="button" ng-click="$ctrl.newUTI1006()"><i class="fa fa-plus"></i> {{ \'GENE.NEW\' | translate }}</button>',
					controller : 'newUTI1006Controller'
				});