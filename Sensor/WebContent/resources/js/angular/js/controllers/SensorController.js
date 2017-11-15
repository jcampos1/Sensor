// Controlador principal de entidad
(function ( ) {
	"use strict";
	angular.module("processApp").controller('SensorCtrl',
			SensorCtrl);
	SensorCtrl.$inject = [ '$scope', '$uibModal', '$log', 'i18nService',
			'$translate', '$window', '$rootScope', 'translations', 'OK',
			'NOT_CONTENT', 'NOT_FOUND', 'SensorService', 'SensorConfigurationGrid', 'comunication', 'SweetAlert' ];

	function SensorCtrl ( $scope, $uibModal, $log, i18nService,
			$translate, $window, $rootScope, translations, OK, NOT_CONTENT,
			NOT_FOUND, SensorService, SensorConfigurationGrid, comunication, SweetAlert ) {
		/** * ****INICIALIZACION DE VARIABLES Y ESTRUCTURAS * **** */

		var toTrans = new Array();
		toTrans.push('GENE.NAME');
		toTrans.push('GENE.NOMENC');
		
		// Detalle de sensor
		$scope.detail = function ( ) {
			if(comunication.getData09()!=null){
				var modalInstance = $uibModal.open({
					animation : true,
					templateUrl : "detailSensor.html",
					controller : "DetailSensorCtrl",
					size : "md"
				});
			}else{
				showAlerts("GENE.ERROR01");
			}
		}
		
		// Actualizacion de sensor
		$scope.update = function ( ) {
			if(comunication.getData09()!=null){
				var modalInstance = $uibModal.open({
					animation : true,
					templateUrl : "updateSensor.html",
					controller : "UpdateSensorCtrl",
					size : "md"
				});
			}else{
				showAlerts("GENE.ERROR01");
			}
		}
		
		//Creacion de sensor
		$scope.create = function() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'createSensorComponent.html',
				controller : 'CreateSensorCtrl',
				size : "md",
				backdrop: false
			});
		};
		
		$scope.remove = function ( ) {
			if(comunication.getData09()!=null){
				var modalInstance = $uibModal.open({
					animation : true,
					templateUrl : "confirm.html",
					controller : "DeleteSensorCtrl",
					size : "sm"
				});
			}else{
				showAlerts("GENE.ERROR01");
			}
		}
		
		$translate(toTrans).then(function(translation) {
			$scope.translation = translation;
			$scope.columns = [];
			language_grid();
			
			/** ******************************************************************************** */

			/* ********************** CONFIGURACION DE UI-GRID ************** */
			SensorConfigurationGrid.initializeGridOptions($scope);
			SensorConfigurationGrid.registerPaginationChanged($scope);
			/** **************************************************************** */
			
			function language_grid() {
				$scope.columns = [ {
					name : 'nomenc',
					displayName : $scope.translation['GENE.NOMENC'],
					width : '30%'
				}, {
					field : 'namese',
					displayName : $scope.translation['GENE.NAME'],
					width : '70%'
				}];
			}
			
			//Se obtienen motivos
			function reload(){
				SensorConfigurationGrid.getPage($scope);
			}
			
			function trans(lang) {
				$translate.use(lang);
				$scope.lang = lang;
				$translate(toTrans).then(function(translation) {
					$scope.translation = translation;
					language_grid();
					$scope.gridOptions.columnDefs = $scope.columns;
				});
			}
			
			reload();
			
			// Obtiene el lenguaje del usuario
			translations.getLanguage().then(function ( response ) {
				if (response.status == NOT_CONTENT) {
					var lang = ($window.navigator.language || $window.navigator.userLanguage)
							.indexOf("es") == 0 ? "es" : "en";
				} else {
					var lang = response.data;
				}
				trans(lang);
				// Establece el idioma seleccionado del lado del servidor
				translations.setLocale(lang).then(function ( response ) {
				})
				.catch(function(error) {
			        $log.error(error);
			    });
			})
			.catch(function(error) {
				$log.error(error);
			});
		});

		// Escuchador para recargar sensores
		$scope.$watch(function ( ) { return comunication.getEvnt11() }, function ( ) {
			if (comunication.isValid(comunication.getEvnt11())) {
				comunication.setEvnt11(null);
				SensorConfigurationGrid.getPage($scope);
			}
		});
		
		// Escuchador para edicion de sensor por doble click en fila
		$scope.$watch(function ( ) { return comunication.getEvnt12() }, function ( ) {
			if (comunication.isValid(comunication.getEvnt12())) {
				comunication.setEvnt12(null);
				//Se obtienen motivos
				$scope.update();
			}
		});
		
		function showAlerts(toTraslate) {
			var toTrans = new Array();
			toTrans.push(toTraslate);
			$translate(toTrans).then(function(tr) {
				SweetAlert.swal({
					  title: "Error!",
					  text: tr[toTraslate],
					  type: "error",
					  confirmButtonText: "Ok"
					});
			});
		}
	}
})();

//Detalle de entidad
(function ( ) {
	"use strict";
	angular.module("processApp").controller('DetailSensorCtrl',
			DetailSensorCtrl);

	DetailSensorCtrl.$inject = [ '$scope', '$uibModalInstance',
			'comunication' ];
	function DetailSensorCtrl ( $scope, $uibModalInstance,
			comunication ) {
		
		//Sensor seleccionqeo
		$scope.sensor = comunication.getData09();
		
		$scope.cancel = function ( ) {
			$uibModalInstance.dismiss(false);
		};
	}
})();

// Eliminacion de entidad
(function ( ) {
	"use strict";
	angular.module("processApp").controller("DeleteSensorCtrl",
			DeleteSensorCtrl);

	DeleteSensorCtrl.$inject = [ '$scope', '$log', '$rootScope',
			'$uibModalInstance', 'alrts', 'comunication', 'SensorService' ];
	function DeleteSensorCtrl ( $scope, $log, $rootScope,
			$uibModalInstance, alrts, comunication, SensorService ) {
		
		$scope.ok = function ( ) {
			$scope.cancel();
			// Se elige motivo de eliminacion
			comunication.setData04("ELIM");
			comunication.setEvnt07("emit");
		};
		
		// Procedimiento a seguir una vez seleccionado el motivo de eliminacion
		$rootScope.$watch(function ( ) { return comunication.getData05() }, function ( ) {
			if (comunication.isValid(comunication.getData05())) {
				SensorService.inactivate(comunication.getData09(), comunication.getData05())
				.then(function successCallback ( response ) {
						alrts.successMsg("GENE.RGTR_SUPR");
						//Recargar lista
			        	comunication.setEvnt11("emit");
				}, function errorCallback ( error ) {
					$log.error(response);
				});
				comunication.setData05(null);
			}
		});

		$scope.cancel = function ( ) {
			$uibModalInstance.dismiss(false);
		};
	}
})();

// Edicion de entidad
(function ( ) {
	"use strict";
	angular.module("processApp").controller('UpdateSensorCtrl',
			UpdateSensorCtrl);

	UpdateSensorCtrl.$inject = [ '$scope', '$uibModalInstance',
			'SensorService', 'comunication' ];
	function UpdateSensorCtrl ( $scope, $uibModalInstance,
			SensorService, comunication ) {
		$scope.sensor = angular.copy(comunication.getData09());
		$scope.update = function ( form ) {
			if (form.$valid) {
				SensorService.update($scope.sensor, $uibModalInstance, 1, $scope);
			}
		};
		$scope.cancel = function ( ) {
			$uibModalInstance.dismiss(false);
		};
	}
})();

//Controlador para crear sensor
(function() {
	"use strict";
	angular.module("processApp").controller('CreateSensorCtrl',
			CreateSensorCtrl);

	CreateSensorCtrl.$inject = [ '$scope', '$rootScope', 'comunication', '$uibModalInstance','SensorService', '$log' ];
	function CreateSensorCtrl($scope, $rootScope, comunication, $uibModalInstance, SensorService, $log) {
		$scope.sensor = new Object();
		$scope.sensor.station = new Object();
		//Se asigna al sensor la estación una vez seleccionada
		$scope.$watch(function ( ) { return comunication.getData10() }, function ( ) {
			if (comunication.isValid(comunication.getData10())) {
				$scope.sensor.station = comunication.getData10();
				comunication.setData10(null);
			}
		});
		
		//Se asigna al sensor el tipo de sensor una vez seleccionado
		$scope.$watch(function ( ) { return comunication.getData12() }, function ( ) {
			if (comunication.isValid(comunication.getData12())) {
				$scope.sensor.typesensor = comunication.getData12();
				comunication.setData12(null);
			}
		});
		
		$scope.save = function(form) {
			$log.info($scope.sensor);
			if( form.$valid ) {
				SensorService.update($scope.sensor, $uibModalInstance, 0, $scope);
			}
		}

		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

//Componente de creacion de sensor
angular.module('processApp').component('createSensorComponent',
{
	templateUrl : 'resources/views/forms/sensor/create.jsp',
	controller : 'SensorCtrl'
});