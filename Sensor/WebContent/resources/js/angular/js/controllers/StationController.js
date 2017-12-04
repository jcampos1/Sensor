// Controlador principal de entidad
(function ( ) {
	"use strict";
	angular.module("processApp").controller('StationCtrl',
			StationCtrl);
	StationCtrl.$inject = [ '$scope', '$uibModal', '$log', 'i18nService',
			'$translate', '$window', '$rootScope', 'translations', 'OK',
			'NOT_CONTENT', 'NOT_FOUND', 'stationService', 'comunication', 'SweetAlert' ];

	function StationCtrl ( $scope, $uibModal, $log, i18nService,
			$translate, $window, $rootScope, translations, OK, NOT_CONTENT,
			NOT_FOUND, stationService, comunication, SweetAlert ) {
		/** * ****INICIALIZACION DE VARIABLES Y ESTRUCTURAS * **** */

		// Se cargan inicialmente todas las estaciones
		find();
		
		// Estacion seleccionada
		$scope.selected = function ( station ) {
			comunication.setData08(station);
			$scope.stselected = station;
			$log.info("estacion seleccionada");
			$log.info($scope.stselected);
			$scope.id = station.namest;
		}
		
		// Detalle de estacion
		$scope.detail = function ( ) {
			if(comunication.getData08()!=null){
				var modalInstance = $uibModal.open({
					animation : true,
					templateUrl : "detailStation.html",
					controller : "DetailStationCtrl",
					size : "sm"
				});
			}else{
				showAlerts("GENE.ERROR01");
			}
		}
		
		// Actualizacion de etsacion
		$scope.update = function ( ) {
			if(comunication.getData08()!=null){
				var modalInstance = $uibModal.open({
					animation : true,
					templateUrl : "updateStation.html",
					controller : "UpdateStationCtrl",
					size : "sm"
				});
			}else{
				showAlerts("GENE.ERROR01");
			}
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
		
		//Seleccion de estacion
		$scope.gridStation = function() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'selectStationComponent.html',
				controller : 'SelectStationCtrl',
				size : "md",
				backdrop: false
			});
		};
		
		//Seleccion de multiples estaciones
		$scope.gridStationMultiple = function() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'selectStationMultipleComponent.html',
				controller : 'SelectStationMultipleCtrl',
				size : "md",
				backdrop: false
			});
		};
		
		$scope.remove = function ( ) {
			if(comunication.getData08()!=null){
				var modalInstance = $uibModal.open({
					animation : true,
					templateUrl : "confirm.html",
					controller : "DeleteStationCtrl",
					size : "sm"
				});
			}else{
				showAlerts("GENE.ERROR01");
			}
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

		// Escuchador para recargar estaciones
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
	angular.module("processApp").controller('DetailStationCtrl',
			DetailStationCtrl);

	DetailStationCtrl.$inject = [ '$scope', '$uibModalInstance',
			'comunication' ];
	function DetailStationCtrl ( $scope, $uibModalInstance,
			comunication ) {
		
			$scope.station = comunication.getData08();
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

	DeleteStationCtrl.$inject = [ '$scope', '$log', '$rootScope',
			'$uibModalInstance', 'alrts', 'comunication', 'stationService' ];
	function DeleteStationCtrl ( $scope, $log, $rootScope,
			$uibModalInstance, alrts, comunication, stationService ) {
		
		$scope.ok = function ( ) {
			$scope.cancel();
			// Se elige motivo de eliminacion
			comunication.setData04("ELIM");
			comunication.setEvnt07("emit");
		};
		
		// Procedimiento a seguir una vez seleccionado el motivo de eliminacion
		$rootScope.$watch(function ( ) { return comunication.getData05() }, function ( ) {
			if (comunication.isValid(comunication.getData05())) {
				stationService.inactivate(comunication.getData08().namest, comunication.getData05())
				.then(function successCallback ( response ) {
						alrts.successMsg("GENE.RGTR_SUPR");
						//Recargar lista
			        	comunication.setEvnt06("emit");
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
	angular.module("processApp").controller('UpdateStationCtrl',
			UpdateStationCtrl);

	UpdateStationCtrl.$inject = [ '$scope', '$uibModalInstance',
			'stationService', 'comunication' ];
	function UpdateStationCtrl ( $scope, $uibModalInstance,
			stationService, comunication ) {
		$scope.station = angular.copy(comunication.getData08());
		$scope.update = function ( form ) {
			if (form.$valid) {
				stationService.update($scope.station, $uibModalInstance, 1, $scope);
			}
		};
		$scope.cancel = function ( ) {
			$uibModalInstance.dismiss(false);
		};
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

//Controlador configuracion de grilla para seleccion de estacion
(function() {
	"use strict";
	angular.module("processApp").controller('SelectStationCtrl',
			SelectStationCtrl);

	SelectStationCtrl.$inject = [ '$scope', '$rootScope',
			'$uibModalInstance', 'GridSelectStation', 'comunication', 'uiGridConstants', 'i18nService', '$translate', '$window', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND' ];
	function SelectStationCtrl($scope, $rootScope, $uibModalInstance, GridSelectStation, comunication, uiGridConstants, i18nService, $translate, $window, translations, OK, NOT_CONTENT, NOT_FOUND) {
		
		var toTrans = new Array();
		toTrans.push('GENE.NAME');
		toTrans.push('GENE.PHONE');
		
		$translate(toTrans).then(function(translation) {
			$scope.translation = translation;
			$scope.columns = [];
			language_grid();
			
			/** ******************************************************************************** */

			/* ********************** CONFIGURACION DE UI-GRID ************** */
			GridSelectStation.initializeGridOptions($scope, $uibModalInstance);
			GridSelectStation.registerPaginationChanged($scope);

			/** **************************************************************** */

			GridSelectStation.getPage($scope, comunication.getData04());

			function language_grid() {
				$scope.columns = [ {
					name : 'namest',
					displayName : $scope.translation['GENE.NAME'],
					width : '50%'
				}, {
					field : 'phonst',
					displayName : $scope.translation['GENE.PHONE'],
					width : '50%'
				}];
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
			
			translations.getLanguage().then(function(response) {
				if(response.status == NOT_CONTENT) {
					var lang = ($window.navigator.language || $window.navigator.userLanguage).indexOf("es") == 0 ? "es" : "en"; 
				}else {
					var lang = response.data;
				}
				//Se establece el lenguaje del lado del cliente
				trans(lang);
				//Se establece el lenguaje del lado del servidor
				translations.setLocale(lang).then(function(response) {
				})
		        .catch(function(error) {
		        	$log.error(error);
		        });
	        })
	        .catch(function(error) {
	        	$log.error(error);
	        });
		});
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

//Controlador configuracion de grilla para seleccion de multiples estaciones
(function() {
	"use strict";
	angular.module("processApp").controller('SelectStationMultipleCtrl',
			SelectStationMultipleCtrl);

	SelectStationMultipleCtrl.$inject = [ '$scope', '$rootScope',
			'$uibModalInstance', 'GridSelectStation', 'comunication', 'uiGridConstants', 'i18nService', '$translate', '$window', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND' ];
	function SelectStationMultipleCtrl($scope, $rootScope, $uibModalInstance, GridSelectStation, comunication, uiGridConstants, i18nService, $translate, $window, translations, OK, NOT_CONTENT, NOT_FOUND) {
		
		var toTrans = new Array();
		toTrans.push('GENE.NAME');
		toTrans.push('GENE.PHONE');
		
		$translate(toTrans).then(function(translation) {
			$scope.translation = translation;
			$scope.columns = [];
			language_grid();
			
			/** ******************************************************************************** */

			/* ********************** CONFIGURACION DE UI-GRID ************** */
			GridSelectStation.initializeGridOptionsMultiple($scope, $uibModalInstance);
			GridSelectStation.registerPaginationChanged($scope);
			
			/** **************************************************************** */

			GridSelectStation.getPage($scope, comunication.getData04());

			function language_grid() {
				$scope.columns = [ {
					name : 'namest',
					displayName : $scope.translation['GENE.NAME'],
					width : '50%'
				}, {
					field : 'phonst',
					displayName : $scope.translation['GENE.PHONE'],
					width : '50%'
				}];
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
			
			translations.getLanguage().then(function(response) {
				if(response.status == NOT_CONTENT) {
					var lang = ($window.navigator.language || $window.navigator.userLanguage).indexOf("es") == 0 ? "es" : "en"; 
				}else {
					var lang = response.data;
				}
				//Se establece el lenguaje del lado del cliente
				trans(lang);
				//Se establece el lenguaje del lado del servidor
				translations.setLocale(lang).then(function(response) {
				})
		        .catch(function(error) {
		        	$log.error(error);
		        });
	        })
	        .catch(function(error) {
	        	$log.error(error);
	        });
		});
		
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

//Componente de selección de estacion
angular.module('processApp').component('selectStationComponent',
{
	templateUrl : 'resources/views/forms/station/select.jsp',
	controller : 'StationCtrl'
});

//Componente de selección d múltiples estaciones
angular.module('processApp').component('selectStationMultipleComponent',
{
	templateUrl : 'resources/views/forms/station/selectMultiple.jsp',
	controller : 'StationCtrl'
});
