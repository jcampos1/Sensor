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
*/

(function() {
	"use strict";
	angular.module("processApp").controller('MAE1001Ctrl', MAE1001Ctrl);
	MAE1001Ctrl.$inject = [ '$scope', '$uibModal', '$log', 'uiGridConstants','MAE1001ConfigurationGrid',
			'i18nService', '$translate', '$window', '$rootScope', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND', 'mae1001Service', 'comunication' ];

	function MAE1001Ctrl($scope, $uibModal, $log, uiGridConstants, MAE1001ConfigurationGrid,
			i18nService, $translate, $window, $rootScope, translations, OK, NOT_CONTENT, NOT_FOUND, mae1001Service, comunication) {
		
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
		
		// Actualizacion de Usuario
		$scope.update = function ( ) {
			if(comunication.getData15()!=null){
				var modalInstance = $uibModal.open({
					animation : true,
					templateUrl : "updateMAE1001.html",
					controller : "UpdateMAE1001Ctrl",
					size : "md"
				});
			}else{
				showAlerts("GENE.ERROR01");
			}
		}
		
		//Eliminacion de usuario
		$scope.remove = function ( ) {
			if(comunication.getData15()!=null){
				var modalInstance = $uibModal.open({
					animation : true,
					templateUrl : "confirm.html",
					controller : "DeleteMAE1001Ctrl",
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
		
		//Escuchador para detalle de usuario
		$scope.$watch(function ( ) { return comunication.getEvnt20() }, function ( ) {
			if (comunication.isValid(comunication.getEvnt20())) {
				comunication.setEvnt20(null)
				$scope.detail();
			}
		});
		
		//Escuchador para edicion de usuario por doble click en fila
		$scope.$watch(function ( ) { return comunication.getEvnt17() }, function ( ) {
			if (comunication.isValid(comunication.getEvnt17())) {
				comunication.setEvnt17(null);
				$scope.update();
			}
		});
		
		//Escuchador para recargar lista de usuario
		$scope.$watch(function ( ) { return comunication.getEvnt18() }, function ( ) {
			if (comunication.isValid(comunication.getEvnt18())) {
				comunication.setEvnt18(null)
				//Se obtienen usuarios
				MAE1001ConfigurationGrid.getPage($scope);
			}
		});
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

/***CONTROLADORES COMPONENTE CREACION DE USUARIOS****/
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

	CreateMAE1001Ctrl.$inject = [ '$scope', '$log', '$uibModalInstance', 'mae1001Service', 'RoleService', 'comunication'];
	function CreateMAE1001Ctrl($scope, $log, $uibModalInstance, mae1001Service, RoleService, comunication) {
		
		$scope.user = new Object();
		findRoles();
		
		$scope.save = function(form) {
			if( form.$valid ) {
				mae1001Service.update($scope.user, $uibModalInstance, 0, $scope);
			}
		}
		
		//Se encuentran los roles activos
		function findRoles( ){
			RoleService.find( ).then(function(roles){
				$scope.roles = roles.data;
			})
			.catch(function(error) {
				$log.error(error);
			});
		}
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();
/**************************************************/

(function() {
	"use strict";
	angular.module("processApp")
			.controller('UpdateMAE1001Ctrl', UpdateMAE1001Ctrl);

	UpdateMAE1001Ctrl.$inject = [ '$scope', '$log', '$uibModalInstance', 'mae1001Service', 'RoleService', 'comunication'];
	function UpdateMAE1001Ctrl($scope, $log, $uibModalInstance, mae1001Service, RoleService, comunication) {
		
		//Usuario a editar
		$scope.user = comunication.getData15();
		$scope.user.conf_mail = comunication.getData15().user_mail;
		findRoles();
		
		$scope.update = function(form) {
			if( form.$valid ) {
				mae1001Service.update($scope.user, $uibModalInstance, 1, $scope);
			}
		}
		
		//Se encuentran los roles activos
		function findRoles( ){
			RoleService.find( ).then(function(roles){
				$scope.roles = roles.data;
			})
			.catch(function(error) {
				$log.error(error);
			});
		}
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

//Eliminacion de entidad
(function ( ) {
	"use strict";
	angular.module("processApp").controller("DeleteMAE1001Ctrl",
			DeleteMAE1001Ctrl);

	DeleteMAE1001Ctrl.$inject = [ '$scope', '$log', '$rootScope',
			'$uibModalInstance', 'alrts', 'comunication', 'mae1001Service' ];
	function DeleteMAE1001Ctrl ( $scope, $log, $rootScope,
			$uibModalInstance, alrts, comunication, mae1001Service ) {
		
		$scope.ok = function ( ) {
			$scope.cancel();
			// Se elige motivo de eliminacion
			comunication.setData04("ELIM");
			comunication.setEvnt07("emit");
		};
		
		// Procedimiento a seguir una vez seleccionado el motivo de eliminacion
		$rootScope.$watch(function ( ) { return comunication.getData05() }, function ( ) {
			if (comunication.isValid(comunication.getData05())) {
				mae1001Service.inactivate(comunication.getData15(), comunication.getData05())
				.then(function successCallback ( response ) {
						alrts.successMsg("GENE.RGTR_SUPR");
						//Recargar lista
			        	comunication.setEvnt18("emit");
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

/***CONTROLADORES COMPONENTE APROBACION DE USUARIOS****/
//Controlador principal de componente de creacion
(function() {
	"use strict";
	angular.module("processApp")
			.controller('Mae1001AprobationComponentCtrl', Mae1001AprobationComponentCtrl);

	Mae1001AprobationComponentCtrl.$inject = [ '$scope', '$log', 'mae1001Service', '$translate', 'SweetAlert', 'alrts', 'comunication'];
	function Mae1001AprobationComponentCtrl($scope, $log, mae1001Service, $translate, SweetAlert, alrts, comunication) {
		
		//Lista de usuarios por aprobar
		$scope.loadUserPendings = function( ) {
			mae1001Service.forAprobation()
			.then(function(users){
				$scope.users = users.data;
				$scope.lastMembers = users.data.length;
			})
			.catch(function(error){
				$log.error(error);
			});
		}
		
		//Detalle de usuario
		$scope.detail = function( user ) {
			comunication.setData15(user);
			comunication.setEvnt20("emit");
		}
		
		$scope.activate = function( user ) {
			confirm("ALRT.ALRT04", user);
		}
		
		//Confirmacion de activacion
		function confirm(toTraslate, user) {
			var toTrans = new Array();
			toTrans.push(toTraslate);
			$translate(toTrans).then(function(tr) {
				SweetAlert.swal({
					  title: "Info!",
					  text: tr[toTraslate],
					  type: "info",
					  showCancelButton: true,
					  closeOnConfirm: true,
					  confirmButtonText: "Ok"
					},
					function(isConfirm){
						if ( isConfirm ) {
							$log.info("Se activa");
							$log.info(user);
							user.active = true;
							mae1001Service.activate(user)
							.then(function(data) {
								alrts.successMsg("GENE.RGTR_UPDT");
								$scope.loadUserPendings( );
								comunication.setEvnt18("emit");
							})
							.catch(function(error){
								$log.error(error);
							});
						}
					}
				);
			});
		}
		
		$scope.loadUserPendings();
		
		//Escuchador para recargar lista de usuarios pendiente por aprobacion
		$scope.$watch(function ( ) { return comunication.getEvnt19() }, function ( ) {
			if (comunication.isValid(comunication.getEvnt19())) {
				comunication.setEvnt19(null)
				//Se obtienen usuarios
				$scope.loadUserPendings();
			}
		});
	}
})();
/*****************************************************/

/****************CONTROLADORES AUTENTICACIÓN**********/
(function() {
	"use strict";
	angular.module("processApp").controller('LoginComponentCtrl', LoginComponentCtrl);
	LoginComponentCtrl.$inject = [ 'mae1001Service', '$scope', 'i18nService', '$log', 'alrts', '$translate' ];

	function LoginComponentCtrl(mae1001Service, $scope, i18nService, $log, alrts, $translate) {

		/** * ****INICIALIZACION DE VARIABLES Y ESTRUCTURAS * **** */
		$scope.login = function() {
			$log.info("usuario: "+$scope.username+", clave: "+$scope.password);
			mae1001Service.login($scope.username, $scope.password)
			.then(function(data){
				$log.info("RESPUESTA DEL SERVIDOR: ");$log.info(data);
			})
			.catch(function(error){
				$log.error(error);
			});
		};
	}
})();
/*************************************************************/

//Componente login de usuario
angular.module('processApp').component('loginComponent',{
	templateUrl : 'resources/views/forms/MAE1001/login.jsp',
	controller : 'LoginComponentCtrl'
});

//Componente creacion de usuario
angular.module('processApp').component('createMae1001Component',{
	templateUrl : 'resources/views/forms/MAE1001/create.jsp',
	controller : 'Mae1001ComponentCtrl'
});

//Componente usuarios por aprobar
angular.module('processApp').component('aprobationMae1001Component',{
	templateUrl : 'resources/views/forms/MAE1001/aprobation.jsp',
	controller : 'Mae1001AprobationComponentCtrl'
});