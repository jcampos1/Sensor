/* ************** DECLARACION DE MODULOS ****************** */
'use strict';
angular.module("registerApp", [ 'userValidator', 'newUser', 'messages',
		'constants', 'notify', 'ngMask' ]);

(function() {
	"use strict";
	angular.module("registerApp").controller('userController', userController);
	userController.$inject = [ 'userService', '$scope', '$http', 'i18nService',
			'changeLang', 'alrts', '$translate' ];

	function userController(userService, $scope, $http, i18nService,
			changeLang, alrts, $translate) {

		/** * ****INICIALIZACION DE VARIABLES Y ESTRUCTURAS * **** */
		$scope.user = new Object();
		changeLang.set();

		$scope.user.lang = changeLang.getEnumLang();
		$scope.submitForm = function(user) {
			userService.update(user, null, 0, $scope);
		};
	}
})();

(function() {
	"use strict";
	angular.module("registerApp").controller('loginController', loginController);
	loginController.$inject = [ 'userService', '$scope', '$http', 'i18nService',
			'changeLang', 'alrts', '$translate' ];

	function loginController(userService, $scope, $http, i18nService,
			changeLang, alrts, $translate) {

		/** * ****INICIALIZACION DE VARIABLES Y ESTRUCTURAS * **** */
		$scope.user = new Object();
		changeLang.set();

		$scope.user.lang = changeLang.getEnumLang();
		$scope.submitForm = function(user) {
			userService.update(user, 0);
		};
		
		$scope.submitFormEditAdmin = function(user) {
			userService.update(user, 1);
		};
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

angular.module("registerApp").directive("pwCheck", pwCheck);