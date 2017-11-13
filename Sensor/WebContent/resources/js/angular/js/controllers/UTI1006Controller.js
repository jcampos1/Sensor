//APP MOTIVOS

'use strict';
angular.module("UTI1006APP", [ 'ui.bootstrap', 'ngTouch', 'ui.grid',
		'ui.grid.selection', 'ui.grid.pagination', 'adminModule',
		'ui.bootstrap.contextMenu', 'ui.grid.exporter', 'messages',
		'constants', 'UTI1006Service', 'abstractService', 'notify', 'angular-ui-grid-translate' ]);

/* ******** CONTROLADORES - MODALES *************** */

(function() {
	"use strict";
	angular.module("UTI1006APP").controller("modal_confirmation_deleteUTI1006",
			modal_confirmation_deleteUTI1006);

	modal_confirmation_deleteUTI1006.$inject = [ '$scope', '$uibModalInstance',
			'adminService', 'basicConfigurationGrid', 'alrts'];
	function modal_confirmation_deleteUTI1006($scope, $uibModalInstance, adminService,
			basicConfigurationGrid, alrts) {
		$scope.ok = function() {
			
			// Configurar modal para seleccion de motivo de anulacion
			adminService
					.remove(globalScope)
					.then(
							function successCallback(response) {
								$uibModalInstance.close(true);
								alrts.successMsg("GENE.RGTR_SUPR");
								basicConfigurationGrid.getPage(globalScope, 5);
							},
							function errorCallback(response) {
							});
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module("UTI1006APP").controller('uti1006Controller', uti1006Controller);
	uti1006Controller.$inject = [ '$scope', 'UTI1006ConfigurationGrid', 'comunication', '$uibModal', '$log',
			'uiGridConstants',
			'i18nService', '$translate', '$window', '$rootScope', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND', 'uti1006Service' ];

	function uti1006Controller($scope, UTI1006ConfigurationGrid, comunication, $uibModal, $log,
			uiGridConstants,
			i18nService, $translate, $window, $rootScope, translations, OK, NOT_CONTENT, NOT_FOUND, uti1006Service) {
		
		/** * ****INICIALIZACION DE VARIABLES Y ESTRUCTURAS * **** */
		uti1006Service.listReasonType().then(function(lst) {
			$rootScope.lstType = lst.data;
		});
		
		var toTrans = new Array();
		toTrans.push('GENE.CODE');
		toTrans.push('GENE.DSCA');
		
		// Detalle de motivo
		$scope.detail = function ( ) {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : "detailMotive.html",
				controller : "DetailMotiveCtrl",
				size : "md",
				resolve : {
					motive : function ( ) {
						return $scope.motiselected;
					}
				}
			});
		}
		
		// Actualizacion de etsacion
		$scope.update = function ( ) {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : "updateUTI1006.html",
				controller : "UpdateUTI1006Ctrl",
				size : "md",
				resolve : {
					station : function ( ) {
						return $scope.stselected;
					}
				}
			});
		}
		
		//Creacion de motivo
		$scope.create = function() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'NewUTI1006Ctrl.html',
				controller : 'NewUTI1006Ctrl',
				size : "md"
			});
		};
		
		$translate(toTrans).then(function(translation) {
			$scope.translation = translation;
			$scope.columns = [];
			language_grid();
			
			/** ******************************************************************************** */

			/* ********************** CONFIGURACION DE UI-GRID ************** */
			UTI1006ConfigurationGrid.initializeGridOptionsAdmin($scope);
			UTI1006ConfigurationGrid.registerPaginationChanged($scope);
			/** **************************************************************** */
			
			function language_grid() {
				$scope.columns = [ {
					name : 'code_m',
					displayName : $scope.translation['GENE.CODE'],
					width : '30%'
				}, {
					field : 'dsca_m',
					displayName : $scope.translation['GENE.DSCA'],
					width : '67%'
				}];
			}
			
			//Se obtienen motivos
			function reload(){
				UTI1006ConfigurationGrid.getPage($scope);
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
		
		// Escuchador para recargar estaciones
		$scope.$watch(function ( ) { return comunication.getEvnt09() }, function ( ) {
			if (comunication.isValid(comunication.getEvnt09())) {
				comunication.setEvnt09(null);
				//Se obtienen motivos
				reload();
			}
		});
		
		// Escuchador para edicion de motivo por doble click en fila
		$scope.$watch(function ( ) { return comunication.getEvnt08() }, function ( ) {
			if (comunication.isValid(comunication.getEvnt08())) {
				comunication.setEvnt08(null);
				//Se obtienen motivos
				$scope.update();
			}
		});
	}
})();

//Controlador para detalle
(function() {
	"use strict";
	angular.module("UTI1006APP")
			.controller('DetailMotiveCtrl', DetailMotiveCtrl);

	DetailMotiveCtrl.$inject = [ '$scope', '$uibModalInstance', 'motive'];
	function DetailMotiveCtrl($scope, $uibModalInstance, motive) {
		
		//Motivo seleccionado
		$scope.uti1006 = angular.copy(motive);
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

//Controlador para edicion
(function() {
	"use strict";
	angular.module("UTI1006APP")
			.controller('UpdateUTI1006Ctrl', UpdateUTI1006Ctrl);

	UpdateUTI1006Ctrl.$inject = [ '$scope', '$uibModalInstance', 'comunication', 'uti1006Service'];
	function UpdateUTI1006Ctrl($scope, $uibModalInstance, comunication, uti1006Service) {
		
		$scope.uti1006 = angular.copy(comunication.getData05());
		
		$scope.update = function(form) {
			if( form.$valid ) {
				uti1006Service.update($scope.uti1006, $uibModalInstance, 1, $scope);
			}
		};
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

//Controlador para nuevo
(function() {
	"use strict";
	angular.module("UTI1006APP").controller('NewUTI1006Ctrl',
			NewUTI1006Ctrl);

	NewUTI1006Ctrl.$inject = [ '$scope', '$uibModalInstance', 'uti1006Service' ];
	function NewUTI1006Ctrl($scope, $uibModalInstance, uti1006Service) {
		$scope.uti1006 = new Object();

		$scope.create = function(form) {
			if( form.$valid ) {
				uti1006Service.update($scope.uti1006, $uibModalInstance, 0, $scope);
			}
		}

		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

//Componente creacion de usuario
angular
		.module('UTI1006APP')
		.component(
				'createUti1006Component',
				{
					templateUrl : 'resources/views/forms/UTI1006/create.jsp',
					controller : 'uti1006Controller'
				});