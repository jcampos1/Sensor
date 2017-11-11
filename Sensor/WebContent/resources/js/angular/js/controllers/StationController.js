/*********************************************
 *DEPENDENCIAS:
 *** stationService
 *** comunicacion
 *** alrts 
 *********************************************/

//Detalle de entidad
(function() {
	"use strict";
	angular.module("processApp").controller('DetailStation', DetailStation);

	DetailStation.$inject = [ '$scope', 'parentScope', '$uibModalInstance', 'comunication'];
	function DetailStation($scope, parentScope, $uibModalInstance, comunication) {
		$scope.station = parentScope.entityDetail;
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

//Eliminacion de entidad
(function() {
	"use strict";
	angular.module("processApp").controller("DeleteStation",
			DeleteStation);

	DeleteStation.$inject = [ '$scope', '$rootScope', '$uibModalInstance', 'alrts', 'comunication', 'stationService'];
	function DeleteStation($scope, $rootScope, $uibModalInstance, alrts, comunication, stationService) {
		$scope.ok = function() {
			$scope.cancel();
			//Se elige motivo de eliminacion
			$rootScope.selectUTI1006("ELIM");
			
			stationService.inactivate(namest, moti)
				.then(function successCallback(response) {
					$uibModalInstance.close(true);
					alrts.successMsg("GENE.RGTR_SUPR");
					//Recargar lista
		        	comunication.setEvnt06("emit");
				},
				function errorCallback(response) {
				});
		};
		
		//Procedimiento a seguir una vez seleccionado el motivo de eliminacion
		$scope.$watch(function() { return comunication.getMot_04() }, function() {
			if( comunication.isValid(comunication.getMot_04()) ){
				stationService.inactivate(comunication.getData03().namest, comunication.getMot_04())
				.then(function successCallback(response) {
					$uibModalInstance.close(true);
					alrts.successMsg("GENE.RGTR_SUPR");
					//Recargar lista
		        	comunication.setEvnt06("emit");
				},
				function errorCallback(response) {
				});
				
				/*mae1013Service.inactivateWithMotivo(comunication.getOrdElim().orno, comunication.getMot_04())
				.then(function successCallback(response) {
					alrts.successMsg("GENE.RGTR_SUPR");
					comunication.setGrid1013("grid1013");
					comunication.setRelWdgts("relWdgts");
				},function errorCallback(response) {
				});*/
				comunication.setMot_04(null);
			}
        });

		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

//Edicion de entidad
(function() {
	"use strict";
	angular.module("processApp")
			.controller('EditStation', EditStation);

	EditStation.$inject = [ '$scope', '$uibModalInstance', 'parentScope', 'stationService' ];
	function EditStation($scope, $uibModalInstance, parentScope, stationService) {
		
		$scope.station = angular.copy(parentScope.entityEdit);
		
		$scope.save = function(form) {
			if( form.$valid ) {
				stationService.update(station, $uibModalInstance, 1, $scope);
			}
		};
		
		$scope.cancel = function(srvrpo) {
			$uibModalInstance.dismiss(false);
		};
	}
})();

//Controlador principal de  entidad
(function() {
	"use strict";
	angular.module("processApp").controller('StationController', StationController);
	StationController.$inject = [ '$scope', '$uibModal', '$log', 'adminService',
			'uiGridConstants', 'basicConfigurationGrid',
			'i18nService', '$translate', '$window', '$rootScope', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND', 'stationService' ];

	function StationController($scope, $uibModal, $log, adminService,
			uiGridConstants, basicConfigurationGrid,
			i18nService, $translate, $window, $rootScope, translations, OK, NOT_CONTENT, NOT_FOUND, stationService) {
		
		/** * ****INICIALIZACION DE VARIABLES Y ESTRUCTURAS * **** */

		/*function find( ) {
			stationService.find().
		}*/
		
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