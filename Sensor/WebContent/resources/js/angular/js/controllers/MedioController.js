//CONTROLADOR PADRE PARA LA COMUNICACION DE LOS DIFERENTES COMPONENTES DE LA APLICACION processAPP

'use strict';
angular.module("MEDIOAPP", [ ]);

var globalScope;

/* ******** CONTROLADORES - MODALES *************** */

(function() {
	"use strict";
	angular.module("MEDIOAPP")
			.controller('listenersCtrl', listenersCtrl);

	listenersCtrl.$inject = [ 'comunication', '$scope', '$state', '$window'];
	function listenersCtrl(comunication, $scope, $state, $window) {
		
		//Regresar a cabecera
		$scope.back = function( ) {
			$state.go("header");
		}
		
		$scope.$on('to_mae1010', function(event, data) 
		{
			$scope.$broadcast('reload_containers', 1);
		});
		
		$scope.$on('to_gridmae1014', function(event, data) 
		{
			$scope.$broadcast('reload_gridmae1014', 1);
		});
	}
})();
