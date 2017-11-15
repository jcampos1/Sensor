// Controlador principal de entidad
(function ( ) {
	"use strict";
	angular.module("processApp").controller('RoleCtrl',
			RoleCtrl);
	RoleCtrl.$inject = [ '$scope', '$uibModal', '$log', 'i18nService',
			'$translate', '$window', '$rootScope', 'translations', 'OK',
			'NOT_CONTENT', 'NOT_FOUND', 'RoleService', 'RoleConfigurationGrid', 'comunication', 'SweetAlert' ];

	function RoleCtrl ( $scope, $uibModal, $log, i18nService,
			$translate, $window, $rootScope, translations, OK, NOT_CONTENT,
			NOT_FOUND, RoleService, RoleConfigurationGrid, comunication, SweetAlert ) {
		/** * ****INICIALIZACION DE VARIABLES Y ESTRUCTURAS * **** */

		var toTrans = new Array();
		toTrans.push('GENE.NAME');
		
		// Detalle de rol
		$scope.detail = function ( ) {
			if(comunication.getData13()!=null){
				var modalInstance = $uibModal.open({
					animation : true,
					templateUrl : "detailRole.html",
					controller : "DetailRoleCtrl",
					size : "md"
				});
			}else{
				showAlerts("GENE.ERROR01");
			}
		}
		
		// Actualizacion de rol
		$scope.update = function ( ) {
			if(comunication.getData13()!=null){
				var modalInstance = $uibModal.open({
					animation : true,
					templateUrl : "updateRole.html",
					controller : "UpdateRoleCtrl",
					size : "md"
				});
			}else{
				showAlerts("GENE.ERROR01");
			}
		}
		
		//Creacion de rol
		$scope.create = function() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'createRoleComponent.html',
				controller : 'CreateRoleCtrl',
				size : "md",
				backdrop: false
			});
		};
		
		$scope.remove = function ( ) {
			if(comunication.getData09()!=null){
				var modalInstance = $uibModal.open({
					animation : true,
					templateUrl : "confirm.html",
					controller : "DeleteRoleCtrl",
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
			RoleConfigurationGrid.initializeGridOptions($scope);
			RoleConfigurationGrid.registerPaginationChanged($scope);
			/** **************************************************************** */
			
			function language_grid() {
				$scope.columns = [ {
					name : 'name',
					displayName : $scope.translation['GENE.NAME'],
					width : '100%'
				}];
			}
			
			//Se obtienen roles
			function reload(){
				RoleConfigurationGrid.getPage($scope);
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

		// Escuchador para recargar roles
		$scope.$watch(function ( ) { return comunication.getEvnt15() }, function ( ) {
			if (comunication.isValid(comunication.getEvnt15())) {
				comunication.setEvnt15(null);
				RoleConfigurationGrid.getPage($scope);
			}
		});
		
		// Escuchador para edicion de rol por doble click en fila
		$scope.$watch(function ( ) { return comunication.getEvnt16() }, function ( ) {
			if (comunication.isValid(comunication.getEvnt16())) {
				comunication.setEvnt16(null);
				//Se obtienen motivos
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
	angular.module("processApp").controller('DetailRoleCtrl',
			DetailRoleCtrl);

	DetailRoleCtrl.$inject = [ '$scope', '$uibModalInstance',
			'comunication' ];
	function DetailRoleCtrl ( $scope, $uibModalInstance,
			comunication ) {
		
		//Sensor seleccionqeo
		$scope.role = comunication.getData13();
		
		$scope.cancel = function ( ) {
			$uibModalInstance.dismiss(false);
		};
	}
})();

// Eliminacion de entidad
(function ( ) {
	"use strict";
	angular.module("processApp").controller("DeleteRoleCtrl",
			DeleteRoleCtrl);

	DeleteRoleCtrl.$inject = [ '$scope', '$log', '$rootScope',
			'$uibModalInstance', 'alrts', 'comunication', 'RoleService' ];
	function DeleteRoleCtrl ( $scope, $log, $rootScope,
			$uibModalInstance, alrts, comunication, RoleService ) {
		
		$scope.ok = function ( ) {
			$scope.cancel();
			// Se elige motivo de eliminacion
			comunication.setData04("ELIM");
			comunication.setEvnt07("emit");
		};
		
		// Procedimiento a seguir una vez seleccionado el motivo de eliminacion
		$rootScope.$watch(function ( ) { return comunication.getData05() }, function ( ) {
			if (comunication.isValid(comunication.getData05())) {
				RoleService.inactivate(comunication.getData13(), comunication.getData05())
				.then(function successCallback ( response ) {
						alrts.successMsg("GENE.RGTR_SUPR");
						//Recargar lista
			        	comunication.setEvnt15("emit");
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
	angular.module("processApp").controller('UpdateRoleCtrl',
			UpdateRoleCtrl);

	UpdateRoleCtrl.$inject = [ '$scope', '$uibModalInstance',
			'RoleService', 'comunication' ];
	function UpdateRoleCtrl ( $scope, $uibModalInstance,
			RoleService, comunication ) {
		$scope.role = angular.copy(comunication.getData13());
		
		//Se asigna al sensor la estación una vez seleccionada
		$scope.$watch(function ( ) { return comunication.getData10() }, function ( ) {
			if (comunication.isValid(comunication.getData10())) {
				$scope.sensor.station = comunication.getData10();
				comunication.setData10(null);
			}
		});
		
		//Se asigna al sensor el tipo de sensor una vez seleccionado
		$scope.$watch(function ( ) { return comunication.getData12() }, function ( ) {
			if (comunication.isValid(comunication.getData12())) {
				$scope.sensor.typesensor = comunication.getData12();
				comunication.setData12(null);
			}
		});
		
		$scope.update = function ( form ) {
			if (form.$valid) {
				RoleService.update($scope.role, $uibModalInstance, 1, $scope);
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
	angular.module("processApp").controller('CreateRoleCtrl',
			CreateRoleCtrl);

	CreateRoleCtrl.$inject = [ '$scope', '$rootScope', 'comunication', '$uibModalInstance','RoleService', '$log' ];
	function CreateRoleCtrl($scope, $rootScope, comunication, $uibModalInstance, RoleService, $log) {
		$scope.role = new Object();
		
		//Se asigna al sensor la estación una vez seleccionada
		$scope.$watch(function ( ) { return comunication.getData10() }, function ( ) {
			if (comunication.isValid(comunication.getData10())) {
				$scope.sensor.station = comunication.getData10();
				comunication.setData10(null);
			}
		});
		
		//Se asigna al sensor el tipo de sensor una vez seleccionado
		$scope.$watch(function ( ) { return comunication.getData12() }, function ( ) {
			if (comunication.isValid(comunication.getData12())) {
				$scope.sensor.typesensor = comunication.getData12();
				comunication.setData12(null);
			}
		});
		
		$scope.save = function(form) {
			if( form.$valid ) {
				RoleService.update($scope.role, $uibModalInstance, 0, $scope);
			}
		}

		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

//Componente de creacion de rol
angular.module('processApp').component('createRoleComponent',
{
	templateUrl : 'resources/views/forms/role/create.jsp',
	controller : 'RoleCtrl'
});