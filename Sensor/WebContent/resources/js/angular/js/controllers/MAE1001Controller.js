//Controlador detalle de entidad

/*
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
})();*/

(function() {
	"use strict";
	angular.module("processApp").controller('MAE1001Ctrl', MAE1001Ctrl);
	MAE1001Ctrl.$inject = [ '$scope', '$uibModal', '$log', 'uiGridConstants','MAE1001ConfigurationGrid',
			'i18nService', '$translate', '$window', '$rootScope', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND', 'mae1001Service', 'comunication' ];

	function MAE1001Ctrl($scope, $uibModal, $log, uiGridConstants, MAE1001ConfigurationGrid,
			i18nService, $translate, $window, $rootScope, translations, OK, NOT_CONTENT, NOT_FOUND, mae1001Service, comunication) {
		
		/*mae1001Service.getRolesList( ).then(function(response){
			$rootScope.rolesList = response.data;
		})
		.catch(function(error) {
			$log.warn(error);
		});*/
		
		var toTrans = new Array();
		toTrans = translations.transMstr();
		toTrans.push('USER.NAME');
		toTrans.push('USER.LAST_NAME');
		toTrans.push('USER.MAIL');
		toTrans.push('USER.STAT');
		toTrans.push('USER.BLOQ');
		
		// Detalle de Usuario
		$scope.detail = function ( ) {
			if(comunication.getData15()!=null){
				var modalInstance = $uibModal.open({
					animation : true,
					templateUrl : "detailMAE1001.html",
					controller : "DetailMAE1001Ctrl",
					size : "md"
				});
			}else{
				showAlerts("GENE.ERROR01");
			}
		}
		
		$translate(toTrans).then(function(translation) {
			$scope.translation = translation;
			$scope.columns = [];
			language_grid();
			
			/* ********************** CONFIGURACION DE UI-GRID ************** */
			MAE1001ConfigurationGrid.initializeGridOptions($scope);
			MAE1001ConfigurationGrid.registerPaginationChanged($scope);
			/** **************************************************************** */

			function language_grid() {
				$scope.columns = [ {
					name : 'frst_name',
					displayName : $scope.translation['USER.NAME'],
					width : '30%'
				}, {
					field : 'last_name',
					displayName : $scope.translation['USER.LAST_NAME'],
					width : '30%'
				}, {
					field : 'user_mail',
					displayName : $scope.translation['USER.MAIL'],
					width : '40%',
					enableSorting : false
				}];
			}
			
			//Se obtienen usuarios
			MAE1001ConfigurationGrid.getPage($scope);
			
			function trans(lang) {
				$translate.use(lang);
				$scope.lang = lang;
				$translate(toTrans).then(function(translation) {
					$translate(toTrans).then(function(translation) {
						$scope.translation = translation;
						language_grid();
						$scope.gridOptions.columnDefs = $scope.columns;
					});
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
		});
		
		//Alertas
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

//Controlador detalle de entidad
(function() {
	"use strict";
	angular.module("processApp")
			.controller('DetailMAE1001Ctrl', DetailMAE1001Ctrl);

	DetailMAE1001Ctrl.$inject = [ '$scope', '$log', '$uibModalInstance', 'comunication'];
	function DetailMAE1001Ctrl($scope, $log, $uibModalInstance, comunication) {
		
		$scope.user = comunication.getData15();
		$log.info($scope.user);
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

//Controlador principal de componente de creacion
(function() {
	"use strict";
	angular.module("processApp")
			.controller('Mae1001ComponentCtrl', CreateMae1001ComponentCtrl);

	CreateMae1001ComponentCtrl.$inject = [ '$scope', '$log', '$uibModal', 'comunication'];
	function CreateMae1001ComponentCtrl($scope, $log, $uibModal, comunication) {
		
		//Creacion de usuario
		$scope.create = function() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'createMAE1001Component.html',
				controller : 'CreateMAE1001Ctrl',
				size : "md",
				backdrop: false
			});
		};
	}
})();

//Controlador creacion de entidad
(function() {
	"use strict";
	angular.module("processApp")
			.controller('CreateMAE1001Ctrl', CreateMAE1001Ctrl);

	CreateMAE1001Ctrl.$inject = [ '$scope', '$log', '$uibModalInstance', 'mae1001Service', 'comunication'];
	function CreateMAE1001Ctrl($scope, $log, $uibModalInstance, mae1001Service, comunication) {
		
		$scope.user = new Object();
		
		$scope.save = function(form) {
			if( form.$valid ) {
				$log.info("USUARIO A ENVIAR: ");
				$log.info($scope.user);
//				mae1001Service.update($scope.user, $uibModalInstance, 0, $scope);
			}
		}
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

angular.module('processApp').component('createMae1001Component',{
	templateUrl : 'resources/views/forms/MAE1001/create.jsp',
	controller : 'Mae1001ComponentCtrl'
});