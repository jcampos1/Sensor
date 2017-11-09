//APP PARÁMETROS GENERALES

'use strict';
angular.module("PAR1001APP", [ 'ui.bootstrap', 'ngTouch', 'ui.grid',
		'ui.grid.selection', 'ui.grid.pagination', 'adminModule',
		'ui.bootstrap.contextMenu', 'ui.grid.exporter', 'messages',
		'constants', 'PAR1001Service', 'abstractService', 'notify',
		'currentParameter', 'angular-ui-grid-translate' ]);

var globalScope;

(function() {
	"use strict";
	angular.module("PAR1001APP")
			.controller('modalDetailPAR1001Ctrl', modalDetailPAR1001Ctrl);

	modalDetailPAR1001Ctrl.$inject = [ '$scope', '$uibModalInstance',
			'adminService', '$http', 'basicConfig', 'parentScope',
			'basicConfigurationGrid', 'par1001Service', 'functions' ];
	function modalDetailPAR1001Ctrl($scope, $uibModalInstance, adminService, $http,
			basicConfig, parentScope, basicConfigurationGrid, par1001Service, functions) {
		
		$scope.par1001 = angular.copy(parentScope.rowDetail);
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module("PAR1001APP").controller('par1001Controller', par1001Controller);
	par1001Controller.$inject = [ '$scope', '$uibModal', '$log', 'adminService',
			'uiGridConstants', '$http', 'basicConfigurationGrid',
			'basicConfig', 'i18nService', '$translate', '$window', '$rootScope', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND' ];

	function par1001Controller($scope, $uibModal, $log, adminService,
			uiGridConstants, $http, basicConfigurationGrid, basicConfig,
			i18nService, $translate, $window, $rootScope, translations, OK, NOT_CONTENT, NOT_FOUND) {
		
		/** * ****INICIALIZACION DE VARIABLES Y ESTRUCTURAS * **** */
		
		// Texto de busqueda
		$scope.text = "";
		// Campos de busquedas
		$scope.search_fields = new Array();
		$scope.search_fields.push("fech");
		$scope.search_fields.push("seri");
		$scope.search_fields.push("cddp");
		$scope.search_fields.push("dsca");
		
		$scope.lstOrder = new Array();

		var toTrans = new Array();
		toTrans = translations.transMstr();
		toTrans.push('PAR1001.FECH');
		toTrans.push('USER.ROLE_USER');
		toTrans.push('MAE1007.DSCA');
		
		$scope.controllerDetail = "modalDetailPAR1001Ctrl";
		
		$translate(toTrans).then(function(translation) {
			$scope.translation = translation;
			$scope.columns = [];
			language_grid();
			adminService.setEntity("PAR1001");
			$scope.mstr = 3;
			
			/** ******************************************************************************** */

			/* ********************** CONFIGURACION DE UI-GRID ************** */
			basicConfigurationGrid.initMenuOptions($scope, 0);
			basicConfigurationGrid.initializeGridOptions($scope, false);
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
					visible : false
				}, {
					name : 'fech',
					displayName : $scope.translation['PAR1001.FECH'],
					width : '27%'
					
				}, {
					field : 'user.frst_name',
					displayName : $scope.translation['USER.ROLE_USER'],
					width : '30%'
				}, {
					field : 'dsca',
					displayName : $scope.translation['MAE1007.DSCA'],
					width : '40%'
				}];
			}
			
			function trans(lang) {
				$translate.use(lang);
				$scope.lang = lang;
				$translate(toTrans).then(function(translation) {
					$scope.translation = translation;
					language_grid();
					$scope.gridOptions.columnDefs = $scope.columns;
					basicConfigurationGrid.initMenuOptions($scope, 0);
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