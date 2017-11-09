"use strict";
angular.module('newUser', [ 'ui.bootstrap', 'adminModule', 'messages',
		'userValidator', 'ngMask' ]);

(function() {
	"use strict";
	angular.module("newUser")
			.controller('modalNewEntityCtrl', modal_new_entity);

	modal_new_entity.$inject = [ '$scope', '$uibModalInstance', 'adminService',
			'$http', 'basicConfig', 'basicConfigurationGrid', 'userService',
			'changeLang' ];
	function modal_new_entity($scope, $uibModalInstance, adminService, $http,
			basicConfig, basicConfigurationGrid, userService, changeLang) {
		$scope.user = new Object();
		$scope.user.ornd = false;
		$scope.user.pesaje = false;
		$scope.user.ingr = false;
		$scope.user.dele = false;
		$scope.user.apro = false;
		$scope.user.anul = false;
		$scope.user.peso = false;
		$scope.user.geov = false;
		$scope.submitForm = function(user) {
			user.lang = changeLang.getEnumLang();
			userService.update(user, $uibModalInstance, 0, $scope, basicConfigurationGrid, globalScope);
		}

		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module('newUser')
			.controller('newUserController', newUserController);
	newUserController.$inject = [ '$uibModal', '$scope' ];
	function newUserController($uibModal, $scope) {
		var vm = this;
		vm.newUser = function() {
			modalNewEntity();
		};

		function modalNewEntity() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'modalNewEntity.html',
				controller : 'modalNewEntityCtrl',
				size : "lg"

			});
			modalInstance.result.then(function() {
				$scope.$emit('new_user', 1);
			}, function() { // Se cancela la eliminacion
			});
		}
	}
})();

var pwCheck = function() {
	return {
		require : 'ngModel',
		link : function(scope, elem, attrs, ctrl) {
			var firstPassword = '#' + attrs.pwCheck;
			$(elem).add(firstPassword).on('keyup', function() {
				scope.$apply(function() {
					var v = elem.val() === $(firstPassword).val();
					ctrl.$setValidity('pwmatch', v);
				});
			});
		}
	}
};

angular.module("newUser").directive("pwCheck", pwCheck);

angular.module("newUser").directive('inputMask', function($http) {
	return {
		restrict : 'A',
		require : 'ngModel', // requiring ng-model directive on the element
		link : function(scope, element, attrs, ngModelCtrl) {

			var jquery_element = $(element);
			jquery_element.inputmask("(999) 999-9999");

			// listen for events on text element
			jquery_element.on('keyup paste focus blur', function() {
				var val = $(this).val();

				// update the ng-model value
				ngModelCtrl.$setViewValue(val);
				ngModelCtrl.$render();

			})

		}
	}
});

angular
		.module('newUser')
		.component(
				'newUserComponent',
				{
					template : '<button class="btn btn-primary" type="button" ng-click="$ctrl.newUser()"><i class="fa fa-plus"></i> {{ \'USER.NEW\' | translate }}</button>',
					controller : 'newUserController'
				});