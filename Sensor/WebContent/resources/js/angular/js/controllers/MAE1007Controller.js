//APP UNIDAD DE DISPLAY

'use strict';
angular.module("MAE1007APP", [ 'ui.bootstrap', 'ngTouch', 'ui.grid',
		'ui.grid.selection', 'ui.grid.pagination', 'adminModule',
		'ui.bootstrap.contextMenu', 'ui.grid.exporter', 'newMAE1007',
		'messages', 'constants', 'MAE1007Service', , 'notify', 'selectMAE1008', 'currentSimulator',
		'angular-ui-grid-translate', 'localytics.directives', 'pascalprecht.translate', 'SimulatorService' ]);

var globalScope;

/* ******** CONTROLADORES - MODALES *************** */

(function() {
	"use strict";
	angular.module("PAR1001APP")
			.controller('modalDetailMAE1007Ctrl', modalDetailMAE1007Ctrl);

	modalDetailMAE1007Ctrl.$inject = [ '$scope', '$uibModalInstance', 'parentScope'];
	function modalDetailMAE1007Ctrl($scope, $uibModalInstance, parentScope) {
		
		$scope.mae1007 = angular.copy(parentScope.rowDetail);
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module("MAE1007APP").controller("modal_confirmation_deleteMAE1007",
			modal_confirmation_deleteMAE1007);

	modal_confirmation_deleteMAE1007.$inject = [ '$scope', '$uibModalInstance',
			'adminService', 'parentScope', 'basicConfigurationGrid', 'alrts'];
	function modal_confirmation_deleteMAE1007($scope, $uibModalInstance, adminService,
			parentScope, basicConfigurationGrid, alrts) {
		$scope.ok = function() {
			adminService
					.remove(globalScope)
					.then(
							function successCallback(response) {
								$uibModalInstance.close(true);
								alrts.successMsg("GENE.RGTR_SUPR");
								basicConfigurationGrid.getPage(globalScope, 4);
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
	angular.module("MAE1007APP")
			.controller('modalEditMAE1007Ctrl', modalEditMAE1007Ctrl);

	modalEditMAE1007Ctrl.$inject = [ '$scope', '$rootScope', '$uibModalInstance',
			'parentScope', 'basicConfigurationGrid', 'mae1007Service', 'wbl4bService' ];
	function modalEditMAE1007Ctrl($scope, $rootScope, $uibModalInstance,
			parentScope, basicConfigurationGrid, mae1007Service, wbl4bService) {
		
		$scope.mae1007 = angular.copy(parentScope.rowEdit);
		$scope.mae1007.nmax_slep = $scope.mae1007.nmax_slep/1000;
		$rootScope.rowSelected = $scope.mae1007.port;
		$scope.isRunApp = false;
		
		
		$scope.submitForm = function(mae1007, form) {
			if( form.$valid ) {
				mae1007.port = $rootScope.rowSelected;
				mae1007Service.update(mae1007, $uibModalInstance, 1, $scope, basicConfigurationGrid, parentScope);
			}
		};
		
		$scope.tryConnection = function(mae1007, form) {
			if( form.$valid ) {
				$scope.isRunApp = true;
				mae1007.port = $rootScope.rowSelected;
				wbl4bService.runSimulator(mae1007);
			}
		}
		
		$scope.captureWeigh = function(srvrpo, operation, form) {
			if( form.$valid ) {
				wbl4bService.captureWeigh(srvrpo, operation).then(function(response) {
					$scope.weight = response.numstr;
					wbl4bService.showMessageAlert(response);
				})
		        .catch(function(error) {
		        	console.log(error);
		        });
			}
		}
		
		$scope.cancel = function(srvrpo) {
			wbl4bService.closeApp(srvrpo);
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module("MAE1007APP").controller('mae1007Controller', mae1007Controller);
	mae1007Controller.$inject = [ '$scope', '$uibModal', '$log', 'adminService',
			'uiGridConstants', 'basicConfigurationGrid',
			'i18nService', '$translate', '$window', '$rootScope', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND', 'mae1007Service' ];

	function mae1007Controller($scope, $uibModal, $log, adminService,
			uiGridConstants, basicConfigurationGrid,
			i18nService, $translate, $window, $rootScope, translations, OK, NOT_CONTENT, NOT_FOUND, mae1007Service) {
		
		/** * ****INICIALIZACION DE VARIABLES Y ESTRUCTURAS * **** */
		$rootScope.scMAE1007 = $scope;
		$scope.controllerDetail = "modalDetailMAE1007Ctrl";
		$scope.controllerEdition = "modalEditMAE1007Ctrl";
		$scope.controllerDelete = "modal_confirmation_deleteMAE1007";
		
		// Texto de busqueda
		$scope.text = "";
		// Campos de busquedas
		$scope.search_fields = new Array();
		$scope.search_fields.push("id");
		$scope.search_fields.push("code");
		$scope.search_fields.push("dsca");
		$scope.search_fields.push("char_stab");
		
		$scope.lstOrder = new Array();

		var toTrans = new Array();
		toTrans = translations.transMstr();
		toTrans.push('MAE1007.CODE');
		toTrans.push('MAE1007.DSCA');
		toTrans.push('MAE1007.CHAR_SEPA');
		toTrans.push('MAE1007.CHAR_STAB');
		toTrans.push('MAE1007.POSI_STAB');
		toTrans.push('MAE1007.CHAR_UNIT');
		toTrans.push('MAE1007.NMAX_STAB');
		toTrans.push('MAE1007.NMAX_UNST');
		toTrans.push('MAE1007.POSI_WEIG');
		toTrans.push('MAE1007.VAL_MIN');
		toTrans.push('MAE1007.VAL_MAX');
		
		$translate(toTrans).then(function(translation) {
			$scope.translation = translation;
			$scope.columns = [];
			language_grid();
			adminService.setEntity("MAE1007");
			$scope.mstr = 2;
			$scope.size = "md";
			$scope.isEmit = true;
			$scope.evt_recept= 'reload_mae1007';
			
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
			
			$scope.$on('new_mae1007', function(event, data) 
			{
				$scope.$broadcast('reload_mae1007', 1);
		    });

			function language_grid() {
				$scope.columns = [ {
					name : 'id',
					visible : false
				}, {
					name : 'code',
					displayName : $scope.translation['MAE1007.CODE']
				}, {
					field : 'dsca',
					displayName : $scope.translation['MAE1007.DSCA']
				}, {
					field : 'char_sepa.dsca',
					displayName : $scope.translation['MAE1007.CHAR_SEPA'],
					enableSorting : false
				}, {
					field : 'char_stab',
					displayName : $scope.translation['MAE1007.CHAR_STAB'],
					enableSorting : false
				} , {
					field : 'posi_stab',
					displayName : $scope.translation['MAE1007.POSI_STAB'],
					enableSorting : false
				} , {
					field : 'char_unit',
					displayName : $scope.translation['MAE1007.CHAR_UNIT'],
					enableSorting : false
				} , {
					field : 'posi_weig',
					displayName : $scope.translation['MAE1007.POSI_WEIG'],
					enableSorting : false
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
		
		/* ***********SE CARGAN LAS LISTAS ************** */
		mae1007Service.getLstNmax_stab( ).then(function(response){
			$rootScope.lstNmax_stab = response.data;
		})
		.catch(function(error) {
			$log.warn(error);
		});
		
		mae1007Service.getLstChar_sepa( ).then(function(response){
			$rootScope.lstChar_sepa = response.data;
		})
		.catch(function(error) {
			$log.warn(error);
		});
		
		mae1007Service.getLstNmax_unst( ).then(function(response){
			$rootScope.lstNmax_unst = response.data;
		})
		.catch(function(error) {
			$log.warn(error);
		});
		
		mae1007Service.getLstPosi_weig( ).then(function(response){
			$rootScope.lstPosi_weig = response.data;
		})
		.catch(function(error) {
			$log.warn(error);
		});
		
		mae1007Service.getLstPosi_stab( ).then(function(response){
			$rootScope.lstPosi_stab = response.data;
		})
		.catch(function(error) {
			$log.warn(error);
		});
		
		mae1007Service.getLstNmax_slep( ).then(function(response){
			$rootScope.lstNmax_slep = response.data;
		})
		.catch(function(error) {
			$log.warn(error);
		});
		
		mae1007Service.getLstVal_min( ).then(function(response){
			$rootScope.lstVal_min = response.data;
		})
		.catch(function(error) {
			$log.warn(error);
		});
		
		mae1007Service.getLstVal_max( ).then(function(response){
			$rootScope.lstVal_max = response.data;
		})
		.catch(function(error) {
			$log.warn(error);
		});
		
		mae1007Service.getLstNread_tried( ).then(function(response){
			$rootScope.lstNread_tried = response.data;
		})
		.catch(function(error) {
			$log.warn(error);
		});
		
		/* *************************************************** */
	}
})();