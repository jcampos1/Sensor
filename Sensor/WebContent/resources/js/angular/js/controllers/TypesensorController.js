// Controlador principal de entidad
(function ( ) {
	"use strict";
	angular.module("processApp").controller('TypesensorCtrl',
			TypesensorCtrl);
	TypesensorCtrl.$inject = [ '$scope', '$uibModal', '$log', 'i18nService',
			'$translate', '$window', '$rootScope', 'translations', 'OK',
			'NOT_CONTENT', 'NOT_FOUND', 'TypesensorService', 'TypesensorConfigurationGrid', 'comunication', 'SweetAlert' ];

	function TypesensorCtrl ( $scope, $uibModal, $log, i18nService,
			$translate, $window, $rootScope, translations, OK, NOT_CONTENT,
			NOT_FOUND, TypesensorService, TypesensorConfigurationGrid, comunication, SweetAlert ) {
		/** * ****INICIALIZACION DE VARIABLES Y ESTRUCTURAS * **** */

		var toTrans = new Array();
		toTrans.push('GENE.NAME');
		toTrans.push('GENE.DSCA');
		
		// Detalle de tipo de sensor
		$scope.detail = function ( ) {
			if(comunication.getData11()!=null){
				var modalInstance = $uibModal.open({
					animation : true,
					templateUrl : "detailTypesensor.html",
					controller : "DetailTypesensorCtrl",
					size : "md"
				});
			}else{
				showAlerts("GENE.ERROR01");
			}
		}
		
		// Actualizacion de tipo de sensor
		$scope.update = function ( ) {
			if(comunication.getData11()!=null){
				var modalInstance = $uibModal.open({
					animation : true,
					templateUrl : "updateTypesensor.html",
					controller : "UpdateTypesensorCtrl",
					size : "md"
				});
			}else{
				showAlerts("GENE.ERROR01");
			}
		}
		
		//Creacion de tipo de sensor
		$scope.create = function() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'createTypesensorComponent.html',
				controller : 'CreateTypesensorCtrl',
				size : "md",
				backdrop: false
			});
		};
		
		//Seleccion de tipo de sensor
		$scope.gridTypesensor = function() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'selectTypesensorComponent.html',
				controller : 'SelectTypesensorCtrl',
				size : "md",
				backdrop: false
			});
		};
		
		$scope.remove = function ( ) {
			if(comunication.getData11()!=null){
				var modalInstance = $uibModal.open({
					animation : true,
					templateUrl : "confirm.html",
					controller : "DeleteTypesensorCtrl",
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
			TypesensorConfigurationGrid.initializeGridOptions($scope);
			TypesensorConfigurationGrid.registerPaginationChanged($scope);
			/** **************************************************************** */
			
			function language_grid() {
				$scope.columns = [ {
					name : 'namety',
					displayName : $scope.translation['GENE.NAME'],
					width : '30%'
				}, {
					field : 'descty',
					displayName : $scope.translation['GENE.DSCA'],
					width : '70%'
				}];
			}
			
			//Se obtienen tipos de sensores
			function reload(){
				TypesensorConfigurationGrid.getPage($scope);
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

		// Escuchador para recargar tipos de sensores
		$scope.$watch(function ( ) { return comunication.getEvnt13() }, function ( ) {
			if (comunication.isValid(comunication.getEvnt13())) {
				comunication.setEvnt13(null);
				TypesensorConfigurationGrid.getPage($scope);
			}
		});
		
		// Escuchador para edicion de tipo de sensor por doble click en fila
		$scope.$watch(function ( ) { return comunication.getEvnt14() }, function ( ) {
			if (comunication.isValid(comunication.getEvnt14())) {
				comunication.setEvnt14(null);
				//Se obtienen tipos de sensores
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
	angular.module("processApp").controller('DetailTypesensorCtrl',
			DetailTypesensorCtrl);

	DetailTypesensorCtrl.$inject = [ '$scope', '$uibModalInstance',
			'comunication' ];
	function DetailTypesensorCtrl ( $scope, $uibModalInstance,
			comunication ) {
		
		//Tipo de sensor seleccionado
		$scope.typesensor = comunication.getData11();
		
		$scope.cancel = function ( ) {
			$uibModalInstance.dismiss(false);
		};
	}
})();

// Eliminacion de entidad
(function ( ) {
	"use strict";
	angular.module("processApp").controller("DeleteTypesensorCtrl",
			DeleteTypesensorCtrl);

	DeleteTypesensorCtrl.$inject = [ '$scope', '$log', '$rootScope',
			'$uibModalInstance', 'alrts', 'comunication', 'TypesensorService' ];
	function DeleteTypesensorCtrl ( $scope, $log, $rootScope,
			$uibModalInstance, alrts, comunication, TypesensorService ) {
		
		$scope.ok = function ( ) {
			$scope.cancel();
			// Se elige motivo de eliminacion
			comunication.setData04("ELIM");
			comunication.setEvnt07("emit");
		};
		
		// Procedimiento a seguir una vez seleccionado el motivo de eliminacion
		$rootScope.$watch(function ( ) { return comunication.getData05() }, function ( ) {
			if (comunication.isValid(comunication.getData05())) {
				TypesensorService.inactivate(comunication.getData11(), comunication.getData05())
				.then(function successCallback ( response ) {
						alrts.successMsg("GENE.RGTR_SUPR");
						//Recargar lista
			        	comunication.setEvnt13("emit");
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
	angular.module("processApp").controller('UpdateTypesensorCtrl',
			UpdateTypesensorCtrl);

	UpdateTypesensorCtrl.$inject = [ '$scope', '$uibModalInstance',
			'TypesensorService', 'comunication' ];
	function UpdateTypesensorCtrl ( $scope, $uibModalInstance,
			TypesensorService, comunication ) {
		$scope.typesensor = angular.copy(comunication.getData11());
		$scope.update = function ( form ) {
			if (form.$valid) {
				TypesensorService.update($scope.typesensor, $uibModalInstance, 1, $scope);
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
	angular.module("processApp").controller('CreateTypesensorCtrl',
			CreateTypesensorCtrl);

	CreateTypesensorCtrl.$inject = [ '$scope', '$rootScope', 'comunication', '$uibModalInstance','TypesensorService', '$log' ];
	function CreateTypesensorCtrl($scope, $rootScope, comunication, $uibModalInstance, TypesensorService, $log) {
		
		$scope.typesensor = new Object();
		
		$scope.save = function(form) {
			if( form.$valid ) {
				TypesensorService.update($scope.typesensor, $uibModalInstance, 0, $scope);
			}
		}

		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

//Controlador configuracion de grilla para seleccion de tipo de sensor
(function() {
	"use strict";
	angular.module("processApp").controller('SelectTypesensorCtrl',
			SelectTypesensorCtrl);

	SelectTypesensorCtrl.$inject = [ '$scope', '$rootScope',
			'$uibModalInstance', 'GridSelectTypesensor', 'comunication', 'uiGridConstants', 'i18nService', '$translate', '$window', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND' ];
	function SelectTypesensorCtrl($scope, $rootScope, $uibModalInstance, GridSelectTypesensor, comunication, uiGridConstants, i18nService, $translate, $window, translations, OK, NOT_CONTENT, NOT_FOUND) {
		
		var toTrans = new Array();
		toTrans.push('GENE.NAME');
		toTrans.push('GENE.DSCA');
		
		$translate(toTrans).then(function(translation) {
			$scope.translation = translation;
			$scope.columns = [];
			language_grid();
			
			/** ******************************************************************************** */

			/* ********************** CONFIGURACION DE UI-GRID ************** */
			GridSelectTypesensor.initializeGridOptions($scope, $uibModalInstance);
			GridSelectTypesensor.registerPaginationChanged($scope);

			/** **************************************************************** */

			GridSelectTypesensor.getPage($scope);

			function language_grid() {
				$scope.columns = [ {
					name : 'namety',
					displayName : $scope.translation['GENE.NAME'],
					width : '50%'
				}, {
					field : 'descty',
					displayName : $scope.translation['GENE.DSCA'],
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

//Componente de creacion de sensor
angular.module('processApp').component('createTypesensorComponent',
{
	templateUrl : 'resources/views/forms/typesensor/create.jsp',
	controller : 'TypesensorCtrl'
});

//Componente de selección de tipos de sensores
angular.module('processApp').component('selectTypesensorComponent',
{
	templateUrl : 'resources/views/forms/typesensor/select.jsp',
	controller : 'TypesensorCtrl'
});