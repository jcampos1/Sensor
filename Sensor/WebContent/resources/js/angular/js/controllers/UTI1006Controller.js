//APP MOTIVOS

'use strict';
angular.module("UTI1006APP", [ 'ui.bootstrap', 'ngTouch', 'ui.grid',
		'ui.grid.selection', 'ui.grid.pagination', 'adminModule',
		'ui.bootstrap.contextMenu', 'ui.grid.exporter','newUTI1006', 'messages',
		'constants', 'UTI1006Service', 'abstractService', 'notify', 'angular-ui-grid-translate' ]);

var globalScope;

/* ******** CONTROLADORES - MODALES *************** */

(function() {
	"use strict";
	angular.module("UTI1006APP")
			.controller('modalDetailUTI1006Ctrl', modalDetailUTI1006Ctrl);

	modalDetailUTI1006Ctrl.$inject = [ '$scope', '$uibModalInstance', 'parentScope'];
	function modalDetailUTI1006Ctrl($scope, $uibModalInstance, parentScope) {
		
		$scope.uti1006 = angular.copy(parentScope.rowDetail);
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

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
	angular.module("UTI1006APP")
			.controller('modalEditUTI1006Ctrl', modal_edit_entity);

	modal_edit_entity.$inject = [ '$scope', '$uibModalInstance',
			'parentScope', 'basicConfigurationGrid', 'uti1006Service'];
	function modal_edit_entity($scope, $uibModalInstance,
			parentScope, basicConfigurationGrid, uti1006Service) {
		
		$scope.uti1006 = angular.copy(parentScope.rowEdit);
		
		$scope.submitForm = function(uti1006, form) {
			if( form.$valid ) {
				uti1006Service.update(uti1006, $uibModalInstance, 1, $scope, basicConfigurationGrid, parentScope);
			}
		};
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module("UTI1006APP").controller('uti1006Controller', uti1006Controller);
	uti1006Controller.$inject = [ '$scope', '$uibModal', '$log', 'adminService',
			'uiGridConstants', 'basicConfigurationGrid',
			'i18nService', '$translate', '$window', '$rootScope', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND', 'uti1006Service' ];

	function uti1006Controller($scope, $uibModal, $log, adminService,
			uiGridConstants, basicConfigurationGrid,
			i18nService, $translate, $window, $rootScope, translations, OK, NOT_CONTENT, NOT_FOUND, uti1006Service) {
		
		/** * ****INICIALIZACION DE VARIABLES Y ESTRUCTURAS * **** */
		$rootScope.scUTI1006 = $scope;
		$scope.controllerDetail = "modalDetailUTI1006Ctrl";
		$scope.controllerEdition = "modalEditUTI1006Ctrl";
		$scope.controllerDelete = "modal_confirmation_deleteUTI1006";
		
		uti1006Service.listReasonType().then(function(lst) {
			$rootScope.lstType = lst.data;
		});
		
		// Texto de busqueda
		$scope.text = "";
		// Campos de busquedas
		$scope.search_fields = new Array();
		$scope.search_fields.push("id");
		$scope.search_fields.push("code_m");
		$scope.search_fields.push("dsca_m");
		
		$scope.lstOrder = new Array();

		var toTrans = new Array();
		toTrans = translations.transMstr();
		toTrans.push('UTI1006.TYPE_M');
		toTrans.push('GENE.DSCA');
		toTrans.push('GENE.CODE');
		
		$scope.controllerDetail = "modalDetailUTI1006Ctrl";
		
		$translate(toTrans).then(function(translation) {
			$scope.translation = translation;
			$scope.columns = [];
			language_grid();
			adminService.setEntity("UTI1006");
			$scope.mstr = 5;
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
					name : 'code_m',
					displayName : $scope.translation['GENE.CODE'],
					width : '20%'
				}, {
					field : 'dsca_m',
					displayName : $scope.translation['GENE.DSCA'],
					width : '45%'
				} , {
					field : 'type_m.dsca',
					displayName : $scope.translation['UTI1006.TYPE_M'],
					width : '24%'
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