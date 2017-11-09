"use strict";
angular.module('editUser', [ 'ui.bootstrap', 'adminModule', 'messages',
		'userValidator', 'ngMask', 'isteven-multi-select' ]);

(function() {
	"use strict";
	angular.module("editUser")
			.controller('modalEditEntityCtrl', modal_edit_entity);

	modal_edit_entity.$inject = [ '$scope', '$uibModalInstance', 'adminService',
			'$http', 'basicConfig', 'basicConfigurationGrid', 'userService',
			'changeLang' ];
	function modal_edit_entity($scope, $uibModalInstance, adminService, $http,
			basicConfig, basicConfigurationGrid, userService, changeLang) {
		$scope.user = new Object();
		$("#roles_req").hide();

		$scope.submitForm = function(user) {
			user.lang = changeLang.getEnumLang();
			
			var lst = new Array();
			var isNull = true;
			angular.forEach( $scope.roles, function( value, key ) { 
				delete value.dsca;
				delete value.ticked;
				isNull = false;
			});
			
			if(isNull) {
				$("#roles_req").show();
			}else{
				$("#roles_req").hide();
				user.roles = $scope.roles;
				userService.update(user, $uibModalInstance, 1);
			}
		}
		
		userService.getRoles().then(function(response) {
			console.log(response);
			userService.rolesTranslate($scope, response);
		 })
       .catch(function(response) {
       		console.log(response.data);
       });

		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module('editUser')
			.controller('editUserController', editUserController);
	editUserController.$inject = [ '$uibModal' ];
	function editUserController($uibModal) {
		var vm = this;
		vm.editUser = function() {
			modalEditEntity();
		};

		function modalEditEntity() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'modalEditEntity.html',
				controller : 'modalEditEntityCtrl',
				size : "lg"

			});
			modalInstance.result.then(function() { // Se confirma la
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

angular.module("editUser").directive("pwCheck", pwCheck);

angular.module("editUser").directive('inputMask', function($http) {
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

			});
		}
	}
});

angular
		.module('editUser')
		.component(
				'editUserComponent',
				{
					template : '<button class="btn btn-default" type="button" ng-click="$ctrl.editUser()">{{ \'USER.NEW\' | translate }}</button>',
					controller : 'editUserController'
				});