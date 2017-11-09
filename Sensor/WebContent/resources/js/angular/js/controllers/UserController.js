'use strict';
angular.module("myApp", [ 'ui.bootstrap', 'ngTouch', 'ui.grid',
		'ui.grid.selection', 'ui.grid.pagination', 'adminModule',
		'ui.bootstrap.contextMenu', 'ui.grid.exporter', 'newUser', 'messages',
		'constants', 'userValidator', 'abstractService', 'notify', 'userForAprob', 'MAE1001Service' ]);

var globalScope;

/* ******** CONTROLADORES - MODALES *************** */

(function() {
	"use strict";
	angular.module("myApp")
			.controller('modalDetailUserCtrl', modalDetailUserCtrl);

	modalDetailUserCtrl.$inject = [ '$scope', '$uibModalInstance', 'parentScope'];
	function modalDetailUserCtrl($scope, $uibModalInstance, parentScope) {
		
		$scope.user = angular.copy(parentScope.rowDetail);
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module("myApp").controller('modal_confirmation_delete',
			modal_confirmation_delete);

	modal_confirmation_delete.$inject = [ '$scope', '$uibModalInstance',
			'adminService', 'parentScope', 'basicConfigurationGrid', 'alrts', 'comunication02', '$log'];
	function modal_confirmation_delete($scope, $uibModalInstance, adminService,
			parentScope, basicConfigurationGrid, alrts, comunication02, $log) {
		$scope.ok = function() {
			$log.info("SE EJECUTOOO");
			adminService
					.inactivate(globalScope)
					.then(
							function successCallback(response) {
								alrts.successMsg("ALRT.USER_DELE");
								comunication02.setEvnt01("reloadWidgets");
								basicConfigurationGrid.getPage(globalScope, 0);
							},
							function errorCallback(response) {
							});
			$uibModalInstance.close(true);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module("myApp")
			.controller('modalEditUserCtrl', modal_edit_entity);

	modal_edit_entity.$inject = [ '$scope', '$uibModalInstance',
			'adminService', '$http', 'basicConfig', 'parentScope',
			'basicConfigurationGrid', 'userService', 'functions' ];
	function modal_edit_entity($scope, $uibModalInstance, adminService, $http,
			basicConfig, parentScope, basicConfigurationGrid, userService, functions) {
		
		$scope.user = angular.copy(parentScope.rowEdit);
		$scope.user.conf_mail = $scope.user.user_mail;
		
		$scope.submitForm = function(user) {
			userService.update(user, $uibModalInstance, 1, $scope, basicConfigurationGrid, globalScope);
		};
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module("myApp").controller('userController', userController);
	userController.$inject = [ '$scope', '$uibModal', '$log', 'adminService',
			'uiGridConstants', '$http', 'basicConfigurationGrid',
			'basicConfig', 'i18nService', '$translate', '$window', '$rootScope', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND', 'mae1001Service' ];

	function userController($scope, $uibModal, $log, adminService,
			uiGridConstants, $http, basicConfigurationGrid, basicConfig,
			i18nService, $translate, $window, $rootScope, translations, OK, NOT_CONTENT, NOT_FOUND, mae1001Service) {
		
		/** * ****INICIALIZACION DE VARIABLES Y ESTRUCTURAS * **** */
		
		// Texto de busqueda
		$scope.text = "";
		// Campos de busquedas
		$scope.search_fields = new Array();
		$scope.search_fields.push("id");
		$scope.search_fields.push("frst_name");
		$scope.search_fields.push("last_name");
		$scope.search_fields.push("user_mail");

		mae1001Service.getRolesList( ).then(function(response){
			$rootScope.rolesList = response.data;
		})
		.catch(function(error) {
			$log.warn(error);
		});
		
		var toTrans = new Array();
		toTrans = translations.transMstr();
		toTrans.push('USER.NAME');
		toTrans.push('USER.LAST_NAME');
		toTrans.push('USER.MAIL');
		toTrans.push('USER.STAT');
		toTrans.push('USER.BLOQ');
		
		$translate(toTrans).then(function(translation) {
			$scope.translation = translation;
			$scope.columns = [];
			language_grid();
			adminService.setEntity("user");
			$scope.mstr = 0;
			$scope.controllerDetail = "modalDetailUserCtrl";
			$scope.controllerEdition = "modalEditUserCtrl";
			$scope.controllerDelete ="modal_confirmation_delete";
			
			/** ******************************************************************************** */

			/* ********************** CONFIGURACION DE UI-GRID ************** */
			basicConfigurationGrid.initMenuOptions($scope);
			$scope.editable = true;
			basicConfigurationGrid.initializeGridOptions($scope, true);
			basicConfigurationGrid.registerPaginationChanged($scope);

			/** **************************************************************** */

			/** *********************** EVENTOS ******************************** */
			basicConfigurationGrid.eventSearch($scope);
			basicConfigurationGrid.eventSortingExternal($scope);
			
			/** ******************************************************************************** */

			basicConfigurationGrid.getPage($scope, $scope.mstr);
			
			$scope.$on('new_user', function(event, data) 
			{
				$scope.$broadcast('reload_user', 1);
		    });

			function language_grid() {
				$scope.columns = [ {
					name : 'id',
					visible : false
				}, {
					name : 'frst_name',
					displayName : $scope.translation['USER.NAME'],
					width : '22%'
				}, {
					field : 'last_name',
					displayName : $scope.translation['USER.LAST_NAME'],
					width : '22%'
				}, {
					field : 'user_mail',
					displayName : $scope.translation['USER.MAIL'],
					width : '25%',
					enableSorting : false
				}, {
					field : 'active',
					displayName : $scope.translation['USER.STAT'],
					width : '14%',
					enableSorting : false,
					type: 'boolean',
					cellTemplate: '<input readOnly="true" disabled="true" type="checkbox" ng-model="row.entity.active">'
				}, {
					field : 'user_bloq',
					displayName : $scope.translation['USER.BLOQ'],
					width : '14%',
					enableSorting : false,
					type: 'boolean',
					cellTemplate: '<input readOnly="true" disabled="true" type="checkbox" ng-model="row.entity.user_bloq">'
				} ];
			}
			
			function trans(lang) {
				$translate.use(lang);
				$scope.lang = lang;
				$translate(toTrans).then(function(translation) {
					$translate(toTrans).then(function(translation) {
						$scope.translation = translation;
						language_grid();
						$scope.gridOptions.columnDefs = $scope.columns;
						basicConfigurationGrid.initMenuOptions($scope);
						
					});
					
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
				console.log(error);
	        });
			
			globalScope = $scope;
		});
	}
})();