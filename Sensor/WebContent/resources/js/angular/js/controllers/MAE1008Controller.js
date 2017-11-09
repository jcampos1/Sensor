//APP PUERTO DE COMUNICACION

'use strict';
angular.module("MAE1008APP", [ 'ui.bootstrap', 'ngTouch', 'ui.grid',
		'ui.grid.selection', 'ui.grid.pagination', 'adminModule',
		'ui.bootstrap.contextMenu', 'ui.grid.exporter','newMAE1008', 'messages',
		'constants', 'MAE1008Service', 'abstractService', 'notify', 'angular-ui-grid-translate' ]);

var globalScope;

/* ******** CONTROLADORES - MODALES *************** */

(function() {
	"use strict";
	angular.module("PAR1001APP")
			.controller('modalDetailMAE1008Ctrl', modalDetailMAE1008Ctrl);

	modalDetailMAE1008Ctrl.$inject = [ '$scope', '$uibModalInstance', 'parentScope'];
	function modalDetailMAE1008Ctrl($scope, $uibModalInstance, parentScope) {
		
		$scope.port = angular.copy(parentScope.rowDetail);
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module("MAE1008APP").controller("modal_confirmation_deleteMAE1008",
			modal_confirmation_deleteMAE1008);

	modal_confirmation_deleteMAE1008.$inject = [ '$scope', '$uibModalInstance',
			'adminService', 'basicConfigurationGrid', 'alrts'];
	function modal_confirmation_deleteMAE1008($scope, $uibModalInstance, adminService,
			basicConfigurationGrid, alrts) {
		$scope.ok = function() {
			adminService
					.remove(globalScope)
					.then(
							function successCallback(response) {
								$uibModalInstance.close(true);
								alrts.successMsg("GENE.RGTR_SUPR");
								basicConfigurationGrid.getPage(globalScope, 3);
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
	angular.module("MAE1008APP")
			.controller('modalEditMAE1008Ctrl', modal_edit_entity);

	modal_edit_entity.$inject = [ '$scope', '$uibModalInstance',
			'parentScope', 'basicConfigurationGrid', 'portService', '$log'];
	function modal_edit_entity($scope, $uibModalInstance,
			parentScope, basicConfigurationGrid, portService, $log) {
		
		$scope.port = angular.copy(parentScope.rowEdit);
		
		$scope.submitForm = function(port, form) {
			if( form.$valid ) {
				portService.update(port, $uibModalInstance, 1, $scope, basicConfigurationGrid, parentScope);
			}
		};
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module("MAE1008APP").controller('portController', portController);
	portController.$inject = [ '$scope', '$uibModal', '$log', 'adminService',
			'uiGridConstants', 'basicConfigurationGrid',
			'i18nService', '$translate', '$window', '$rootScope', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND', 'portService' ];

	function portController($scope, $uibModal, $log, adminService,
			uiGridConstants, basicConfigurationGrid,
			i18nService, $translate, $window, $rootScope, translations, OK, NOT_CONTENT, NOT_FOUND, portService) {
		
		/** * ****INICIALIZACION DE VARIABLES Y ESTRUCTURAS * **** */
		$rootScope.scMAE1008 = $scope;
		$scope.controllerDetail = "modalDetailMAE1008Ctrl";
		$scope.controllerEdition = "modalEditMAE1008Ctrl";
		$scope.controllerDelete = "modal_confirmation_deleteMAE1008";
		
		portService.getLstPrty( ).then(function(response){
			$rootScope.lstPrty = response.data;
		})
		.catch(function(error) {
			$log.warn(error);
		});
		
		portService.getLstBaud( ).then(function(response){
			$rootScope.lstBaud = response.data;
		})
		.catch(function(error) {
			$log.warn(error);
		});
		
		portService.getLstBits_char( ).then(function(response){
			$rootScope.lstBits_char = response.data;
		})
		.catch(function(error) {
			$log.warn(error);
		});
		
		portService.getLstBits_stop( ).then(function(response){
			$rootScope.lstBits_stop = response.data;
		})
		.catch(function(error) {
			$log.warn(error);
		});
		
//		$rootScope.lstBaud = lstBaud;
//		$rootScope.lstPrty = lstPrty;
//		$rootScope.lstBits_char = lstBits_char;
//		$rootScope.lstBits_stop = lstBits_stop;
		
		// Texto de busqueda
		$scope.text = "";
		// Campos de busquedas
		$scope.search_fields = new Array();
		$scope.search_fields.push("id");
		$scope.search_fields.push("port_name");
		$scope.search_fields.push("port_dsca");
		
		$scope.lstOrder = new Array();

		var toTrans = new Array();
		toTrans = translations.transMstr();
		toTrans.push('MAE1008.NAME');
		toTrans.push('MAE1008.DSCA');
		
		$scope.controllerDetail = "modalDetailMAE1008Ctrl";
		
		$translate(toTrans).then(function(translation) {
			$scope.translation = translation;
			$scope.columns = [];
			language_grid();
			adminService.setEntity("MAE1008");
			$scope.mstr = 1;
			$scope.size = "md";
			
			/** ******************************************************************************** */

			/* ********************** CONFIGURACION DE UI-GRID ************** */
			basicConfigurationGrid.initMenuOptions($scope);
			basicConfigurationGrid.initializeGridOptions($scope, true);
			basicConfigurationGrid.registerPaginationChanged($scope);

			/** **************************************************************** */

			/** *********************** EVENTOS ******************************** */
			basicConfigurationGrid.eventSearch($scope);
			basicConfigurationGrid.eventSortingExternal($scope);
			/** ******************************************************************************** */

			basicConfigurationGrid.getPage($scope, $scope.mstr);

			function language_grid() {
				$scope.columns = [ {
					name : 'id',
					visible : true,
					width : '8%'
				}, {
					name : 'port_name',
					displayName : $scope.translation['MAE1008.NAME'],
					width : '30%'
				}, {
					field : 'port_dsca',
					displayName : $scope.translation['MAE1008.DSCA'],
					width : '59%'
				}];
			}
			
			function trans(lang) {
				$translate.use(lang);
				$scope.lang = lang;
				$translate(toTrans).then(function(translation) {
					$scope.translation = translation;
					language_grid();
					$scope.gridOptions.columnDefs = $scope.columns;
					basicConfigurationGrid.initMenuOptions($scope);
				});
			}
			
			translations.getLanguage().then(function(response) {
				if(response.status == NOT_CONTENT) {
					var lang = ($window.navigator.language || $window.navigator.userLanguage).indexOf("es") == 0 ? "es" : "en"; 
				}else {
					var lang = response.data;
				}
				trans(lang);
				translations.setLocale(lang).then(function(response) {
				})
		        .catch(function(error) {
		        });
	        })
	        .catch(function(error) {
	        });
			
			globalScope = $scope;
		});
	}
})();