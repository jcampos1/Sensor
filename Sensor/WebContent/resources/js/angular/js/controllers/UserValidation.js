/* ************** DECLARACION DE MODULOS ****************** */
'use strict';
angular.module("registerApp", [ 'messages' ]);

(function() {
	"use strict";
	angular.module("registerApp").controller('loginController', loginController);
	loginController.$inject = [ '$scope', '$translate' ];

	function loginController($scope, $translate) {

		/** * ****INICIALIZACION DE VARIABLES Y ESTRUCTURAS * **** */
		$scope.user = new Object();
	}
})();

var match = function() {
	return {
		require : 'ngModel',
		link : function(scope, elem, attrs, ctrl) {
			var firstPassword = '#' + attrs.match;
			$(elem).add(firstPassword).on('keyup', function() {
				scope.$apply(function() {
					var v = elem.val() === $(firstPassword).val();
					ctrl.$setValidity('match', v);
				});
			});
		}
	}
};

angular.module("registerApp").directive("match", match);