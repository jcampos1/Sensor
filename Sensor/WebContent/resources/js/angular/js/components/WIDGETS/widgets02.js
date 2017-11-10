'use strict';
angular.module("widgets02", [ 'messages', 'localytics.directives', 'MAE1001Service', 'Comunication02']);

(function() {
	"use strict";
	angular.module('widgets02').controller('widgets02Controller',
			widgets02Controller);
	widgets02Controller.$inject = [ 'comunication02', 'mae1001Service', '$scope',
			'uiGridConstants', 'i18nService', '$translate', 'translations', '$log' ];
	function widgets02Controller(comunication02, mae1001Service, $scope, uiGridConstants, i18nService, $translate, translations, $log) {
		var vm = this;
		
		/* ****************ESCUCHADORES***************** */
		$scope.$watch(function() { return comunication02.getEvnt01() }, function() {
			if( comunication02.isValid(comunication02.getEvnt01()) ){
				reloadWidgets ( );
				comunication02.setEvnt01(null);
			}
          }
        );
		/* ********************************************* */
		
		/* ************ FUNCIONES PRIVADAS ************* */
		//cantidad de usuarios registrados y pendientes por aprobación
		function reloadWidgets( ) {
			mae1001Service.getDataUser().then(function(response) {
				$scope.lstDataUser = response.data;
			})
	        .catch(function(error) {
	        	$log.warn(error);
	        });
		}
		/* ********************************************* */
		
		/* *************INICIALIZACIONES**************** */
		reloadWidgets( );
		/* ********************************************* */
	}
})();

angular
.module('widgets02')
.component(
		'widgets02Component',
		{
			templateUrl : "/Sensor/resources/js/angular/js/components/WIDGETS/widgets02.jsp",
			controller : 'widgets02Controller',
			controllerAs: 'vm'
		});