//APP CABECERA ORDEN DE PESAJE

'use strict';
angular.module("MAE1013APP", [ 'ui.bootstrap', 'ngTouch', 'ui.grid',
		'ui.grid.selection', 'ui.grid.pagination', 'GRIDMAE1013',
		'ui.bootstrap.contextMenu', 'ui.grid.exporter','newMAE1013',
		'constants', 'MAE1013Service', 'abstractService', 'notify', 'angular-ui-grid-translate', 'assignSeals', 'CPREC', 'selectMAE1012', 'INPUTMAE1011', 'INPUTMAE1012', 'INPUTMAE1016', 'INPUTMAE1017', 'INPUTMAE1018', 'selectMAE1011', 'selectUTI1006']);

var globalScope;

/* ******** CONTROLADORES - MODALES *************** */

(function() {
	"use strict";
	angular.module("MAE1013APP")
			.controller('modalDetailMAE1013Ctrl', modalDetailMAE1013Ctrl);

	modalDetailMAE1013Ctrl.$inject = [ '$scope', '$uibModalInstance', 'parentScope'];
	function modalDetailMAE1013Ctrl($scope, $uibModalInstance, parentScope) {
		
		$scope.mae1013 = angular.copy(parentScope.rowDetail);
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module("MAE1013APP").controller("modal_confirmation_deleteMAE1013",
			modal_confirmation_deleteMAE1013);

	modal_confirmation_deleteMAE1013.$inject = [ '$scope', '$uibModalInstance', '$rootScope', '$log'];
	function modal_confirmation_deleteMAE1013( $scope, $uibModalInstance, $rootScope, $log) {
		
		$scope.ok = function() {
			$scope.cancel();
			$rootScope.selectUTI1006("ELIM");
		};
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module("MAE1013APP")
			.controller('modalEditMAE1013Ctrl', modalEditMAE1013Ctrl);

	modalEditMAE1013Ctrl.$inject = [ '$scope', 'comunication', '$uibModalInstance', 'mae1013', 'mae1013Service'];
	function modalEditMAE1013Ctrl($scope, comunication, $uibModalInstance, mae1013, mae1013Service) {
		
		/*****INICIALIZACIONES*******/
		$scope.mae1013 = angular.copy(mae1013);
		comunication.setOrig_p(null);
		comunication.setOrig_a(null);
		comunication.setDest_p(null);
		comunication.setDest_a(null);
		comunication.setCond(null);
		comunication.setMotr(null);
		
		$scope.sources = comunication.getSources();
		/****************************/
		
		$scope.selectOrigin = function ( ) {
			comunication.setOrigin($scope.origin);
		} 
		
		$scope.selectDestin = function ( ) {
			comunication.setDestin($scope.mae1013.destin);
		} 
		
		$scope.submitForm = function(mae1013, form) {
			if( form.$valid ) {
				mae1013Service.update(mae1013, $uibModalInstance, 1, $scope);
			}
		};
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module("MAE1013APP").controller('mae1013Controller', mae1013Controller);
	mae1013Controller.$inject = [ 'SweetAlert', '$state', '$scope', '$uibModal', '$log', 'adminService',
			'uiGridConstants', 'mae1013ConfigurationGrid', 'mae1013Service',
			'i18nService', '$translate', '$window', '$rootScope', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND', 'comunication', 'parameterFactory', '$interval'];

	function mae1013Controller(SweetAlert, $state, $scope, $uibModal, $log, adminService,
			uiGridConstants, mae1013ConfigurationGrid, mae1013Service,
			i18nService, $translate, $window, $rootScope, translations, OK, NOT_CONTENT, NOT_FOUND, comunication, parameterFactory, $interval) {
		
		/** * ****INICIALIZACION DE VARIABLES Y ESTRUCTURAS * **** */
		$rootScope.scMAE1013 = $scope;
		$scope.controllerDetail = "modalDetailMAE1013Ctrl";
		$scope.controllerEdition = "modalEditMAE1013Ctrl";
		$scope.controllerDelete = "modal_confirmation_deleteMAE1013";
		$scope.countRowSelect = 0;
		
		$rootScope.currentUser = currentUser;
		
		// Texto de busqueda
		$scope.text = "";
		// Campos de busquedas
		$scope.search_fields = new Array();
		$scope.search_fields.push("orno");
		
		$scope.lstOrder = new Array();
		
		var toTrans = new Array();
		toTrans = translations.transMstr();
		toTrans.push('MAE1013.ORNO');
		toTrans.push('MAE1013.MOTR');
		toTrans.push('MAE1013.TIPM');
		toTrans.push('USER.ROLE_USER');
		toTrans.push('MAE1013.STAT');
		toTrans.push('GENE.COND');
		toTrans.push('GENE.START_LINE');
		toTrans.push('GENE.CLOSEOR');
		toTrans.push('GENE.SUSP');
		toTrans.push('GENE.RETO');
		toTrans.push('GENE.BTN_EDIT');
		toTrans.push('GENE.FCREA');
		toTrans.push('GENE.DISPATCH');
		toTrans.push('GENE.PRINT_ORDR');
		toTrans.push('GENE.AS_PREC');
		toTrans.push('GENE.CONFIRMED');
		
		$scope.controllerDetail = "modalDetailMAE1013Ctrl";
		
//		parameterFactory.getParameterCurrent().then(function(response) {
//			parameterFactory.setParam(response);
//		})
//        .catch(function(error) {
//        	$log.error(error);
//        });
		
		mae1013Service.getLstTipm().then(function(response) {
			$rootScope.lstTipm = response;
		})
        .catch(function(error) {
        	console.log(error);
        });
		
		mae1013Service.getSource().then(function(response) {
			comunication.setSources(response);
			comunication.setValsrce(response[0]);
		})
		.catch(function(error) {
        	console.log(error);
        });
		
		$scope.$on('to-new-mae1013', function(event, data) {
			$scope.$broadcast(data.event, data.entity);
	    });
		
		$rootScope.openMaster = function() {
			comunication.funct01();
		}
		
		$rootScope.closeOrder= function ( nord, updtOrder ) {
			mae1013Service.closeOrder( nord, updtOrder );
		}
		
		$scope.closeOrderBtn = function ( ) {
			if($scope.gridApi.selection.getSelectedCount() == 1 ) {
				mae1013Service.closeOrder($scope.gridApi.selection.getSelectedRows()[0].orno);
			}
		}
		
		$scope.closeOrderContextual = function ( $itemScope, $event, modelValue,
				text, $li ) {
			mae1013Service.closeOrder($itemScope.$parent.$parent.row.entity.orno);
			
		}
		
		$rootScope.reloadMAE1013 = function( st ) {
			mae1013ConfigurationGrid.getPage($scope, st);	
		}
		
		$rootScope.printOrder = function( ord ) {
			if( ord == null || ord == undefined ){
				if($scope.gridApi.selection.getSelectedCount() == 1 ) {
					var ord = $scope.gridApi.selection.getSelectedRows()[0];
					if( ord.stat.id == 4 ||  ord.stat.id == 5) {
						mae1013Service.printOrder(ord.orno);
					}else{
						showAlerts("GENE.ERROR07");
					}
				}
			}else{
				if( ord.stat.id == 4 ||  ord.stat.id == 5) {
					mae1013Service.printOrder(ord.orno);
				}else{
					showAlerts("GENE.ERROR07");
				}
			}
		}
		
		$scope.printOrderContextual = function ( $itemScope, $event, modelValue,
				text, $li ) {
			var ord = $itemScope.$parent.$parent.row.entity;
			if( ord.stat.id == 4 ||  ord.stat.id == 5) {
				mae1013Service.printOrder(ord.orno);
			}else{
				showAlerts("GENE.ERROR07");
			}
		}
		
		$translate(toTrans).then(function(translation) {
				
			$scope.translation = translation;
			$scope.columns = [];
			language_grid();
			adminService.setEntity("MAE1013");
			$scope.mstr = 4;
			$scope.size = "lg";
			
			/** ******************************************************************************** */

			/* ********************** CONFIGURACION DE UI-GRID ************** */
			mae1013ConfigurationGrid.initMenuOptions($scope);
			mae1013ConfigurationGrid.initializeGridOptions($scope);
			mae1013ConfigurationGrid.registerEvents($scope);
			mae1013ConfigurationGrid.registerPaginationChanged($scope);

			/** **************************************************************** */

			/** *********************** EVENTOS ******************************** */
			mae1013ConfigurationGrid.eventSearch($scope);
			/** ******************************************************************************** */
			
			$scope.$watch(function() { return comunication.getStat() }, function() {
				if( comunication.isValid(comunication.getStat()) ){
					$scope.st = comunication.getStat();
					reloadOptions();
					mae1013ConfigurationGrid.getPage($scope);
				}
	          }
	        );
			
			function language_grid() {
				$scope.columns = [ {
					name : 'id',
					visible : false,
				}, {
					name : 'orno',
					displayName : $scope.translation['MAE1013.ORNO'],
					width : '10%'
				}, {
					field : 'cond.cedu',
					displayName : $scope.translation['GENE.COND'],
					width : '12%'
				}, {
					field : 'motr.dsca',
					displayName : $scope.translation['MAE1013.MOTR'],
					width : '20%'
				}, {
					field : 'tipm.dsca',
					displayName : $scope.translation['MAE1013.TIPM'],
					width : '10%'
				}, {
					field : 'user.frst_name',
					displayName : $scope.translation['USER.ROLE_USER'],
					width : '13%'
				}, {
					field : 'fech',
					displayName : $scope.translation['GENE.FCREA'],
					width : '8%'
				}, {
					field : 'fech_desp',
					displayName : $scope.translation['GENE.DISPATCH'],
					width : '8%'
				}, {
					field : 'stat.dsca',
					displayName : $scope.translation['MAE1013.STAT'],
					width : '10%'
				}, {
					field : 'confpe',
					displayName : $scope.translation['GENE.CONFIRMED'],
					type: 'boolean',
					cellTemplate: '<input readOnly="true" disabled="true" type="checkbox" ng-model="row.entity.confpe">',
					width : '9%'
				}];
			}
			
			function trans(lang) {
				$translate.use(lang);
				$scope.lang = lang;
				$translate(toTrans).then(function(translation) {
					$scope.translation = translation;
					language_grid();
					$scope.gridOptions.columnDefs = $scope.columns;
					mae1013ConfigurationGrid.initMenuOptions($scope);
				});
			}
			
			function reloadOptions( ) {
				mae1013ConfigurationGrid.initMenuOptions($scope);
				mae1013ConfigurationGrid.initializeGridOptions($scope);
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
		
		/* ******** FUNCIONES PRIVADAS ***********/
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
		/* **************************************/
	}
})();