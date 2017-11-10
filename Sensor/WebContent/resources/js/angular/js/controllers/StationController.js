//Detalle de entidad
(function ( ) {
	"use strict";
	angular.module("processApp").controller('DetailStationCtrl',
			DetailStationCtrl);

	DetailStationCtrl.$inject = [ '$scope', 'station', '$uibModalInstance',
			'comunication' ];
	function DetailStationCtrl ( $scope, station, $uibModalInstance,
			comunication ) {
		
			$scope.station = station;
			$scope.cancel = function ( ) {
				$uibModalInstance.dismiss(false);
			};
	}
})();

// Eliminacion de entidad
(function ( ) {
	"use strict";
	angular.module("processApp").controller("DeleteStationCtrl",
			DeleteStationCtrl);

	DeleteStationCtrl.$inject = [ '$scope', '$log', '$rootScope', 'station',
			'$uibModalInstance', 'alrts', 'comunication', 'stationService' ];
	function DeleteStationCtrl ( $scope, $log, $rootScope, station,
			$uibModalInstance, alrts, comunication, stationService ) {
		
		$scope.ok = function ( ) {
			$scope.cancel();
			// Se elige motivo de eliminacion
			$rootScope.selectUTI1006("ELIM");
		};
		
		// Procedimiento a seguir una vez seleccionado el motivo de eliminacion
		$scope.$watch(function ( ) { return comunication.getMot_04() }, function ( ) {
			if (comunication.isValid(comunication.getMot_04())) {
				stationService.inactivate(station.namest, comunication.getMot_04())
				.then(function successCallback ( response ) {
						$uibModalInstance.close(true);
						alrts.successMsg("GENE.RGTR_SUPR");
						//Recargar lista
			        	comunication.setEvnt06("emit");
				}, function errorCallback ( error ) {
					$log.error(response);
				});
				/*
				 * mae1013Service.inactivateWithMotivo(comunication.getOrdElim().orno,
				 * comunication.getMot_04()) .then(function
				 * successCallback(response) {
				 * alrts.successMsg("GENE.RGTR_SUPR");
				 * comunication.setGrid1013("grid1013");
				 * comunication.setRelWdgts("relWdgts"); },function
				 * errorCallback(response) { });
				 */
				comunication.setMot_04(null);
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
	angular.module("processApp").controller('UpdateStationCtrl',
			UpdateStationCtrl);

	UpdateStationCtrl.$inject = [ '$scope', '$uibModalInstance', 'station',
			'stationService' ];
	function UpdateStationCtrl ( $scope, $uibModalInstance, station,
			stationService ) {
		$scope.station = angular.copy(station);
		$scope.update = function ( form ) {
			if (form.$valid) {
				stationService.update(station, $uibModalInstance, 1, $scope);
			}
		};
		$scope.cancel = function ( srvrpo ) {
			$uibModalInstance.dismiss(false);
		};
	}
})();

// Controlador principal de entidad
(function ( ) {
	"use strict";
	angular.module("processApp").controller('StationCtrl',
			StationCtrl);
	StationCtrl.$inject = [ '$scope', '$uibModal', '$log', 'i18nService',
			'$translate', '$window', '$rootScope', 'translations', 'OK',
			'NOT_CONTENT', 'NOT_FOUND', 'stationService', 'comunication' ];

	function StationCtrl ( $scope, $uibModal, $log, i18nService,
			$translate, $window, $rootScope, translations, OK, NOT_CONTENT,
			NOT_FOUND, stationService, comunication ) {
		/** * ****INICIALIZACION DE VARIABLES Y ESTRUCTURAS * **** */

		// Se cargan inicialmente todas las estaciones
		find();
		
		// Estacion seleccionada
		$scope.selected = function ( station ) {
			$scope.stselected = station;
			$log.info("estacion seleccionada");
		}
		
		// Detalle de estacion
		$scope.detail = function ( ) {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : "detailStation.html",
				controller : "DetailStationCtrl",
				size : "sm",
				resolve : {
					station : function ( ) {
						return $scope.stselected;
					}
				}
			});
		}
		
		// Actualizacion de etsacion
		$scope.update = function ( ) {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : "updateStation.html",
				controller : "UpdateStationCtrl",
				size : "sm",
				resolve : {
					station : function ( ) {
						return $scope.stselected;
					}
				}
			});
		}
		
		$scope.create = function() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'createStationComponent.html',
				controller : 'CreateStationCtrl',
				size : "md",
				backdrop: false
			});
		};
		
		$scope.remove = function ( ) {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : "myModalContent.html",
				controller : "DeleteStationCtrl",
				size : "sm",
				resolve : {
					station : function ( ) {
						return $scope.stselected;
					}
				}
			});
		}
		
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

		// Escuchador para recargar mesas
		$scope.$watch(function ( ) { return comunication.getEvnt06() }, function ( ) {
			if (comunication.isValid(comunication.getEvnt06())) {
				find();
				comunication.setEvnt06(null);
			}
		});

		// Encontrar estaciones
		function find ( ) {
			stationService.find().then(function successCallback ( stations ) {
				$scope.stations = stations.data;
				$log.info($scope.stations);
				
			}, function errorCallback ( response ) {
				$log.error("Error al obtener estaciones de trabajo");
			});
		}
		// Establece el idioma del lado del cliente
		function trans ( lang ) {
			$translate.use(lang);
		}
	}
})();

//Controlador para crear estacion
(function() {
	"use strict";
	angular.module("processApp").controller('CreateStationCtrl',
			CreateStationCtrl);

	CreateStationCtrl.$inject = [ '$scope', '$uibModalInstance','stationService', '$log' ];
	function CreateStationCtrl($scope, $uibModalInstance, stationService, $log) {
		$scope.station = new Object();
		
		$scope.save = function(form) {
			if( form.$valid ) {
				stationService.update($scope.station, $uibModalInstance, 0, $scope);
			}
		}

		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

//Componente de creacion de estacion
angular.module('processApp').component('createStationComponent',
{
	templateUrl : 'resources/views/forms/station/create.jsp',
	controller : 'StationCtrl'
});