(function() {
	"use strict";
	angular.module('processApp').controller('widgets02Controller',
			widgets02Controller);
	widgets02Controller.$inject = [ 'comunication02', 'mae1001Service', '$scope',
			'uiGridConstants', 'i18nService', '$translate', 'translations', '$log', 'stationService' ];
	function widgets02Controller(comunication02, mae1001Service, $scope, uiGridConstants, i18nService, $translate, translations, $log, stationService) {
		var vm = this;
		
		stationService.find().then(function successCallback ( stations ) {
			$scope.cantst = stations.data.length;
			$log.info(stations);
			$log.info(stations.data.length);
		}, function errorCallback ( response ) {
			$log.error("Error al obtener estaciones de trabajo");
		});
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
.module('processApp')
.component(
		'widgets02Component',
		{
			templateUrl : "/Sensor/resources/js/angular/js/components/WIDGETS/widgets02.jsp",
			controller : 'widgets02Controller',
			controllerAs: 'vm'
		});