//APP ITEMS POR ORDEN

'use strict';
angular.module("MAE1014APP", [ 'ui.bootstrap', 'ngTouch', 'ui.grid',
		'ui.grid.selection', 'ui.grid.pagination', 'GRIDMAE1014',
		'ui.bootstrap.contextMenu', 'ui.grid.exporter', 'newMAE1014',
		'constants', 'MAE1014Service', 'MAE1013Service',, 'abstractService',
		'angular-ui-grid-translate', 'selectMAE1009', 'selectMAE1010', 
		'selectUTI1006', 'PAR1001Service', 'INPUTMAE1009' ]);

angular.module("MAE1014APP").directive('shortcuts',
		[ '$document', '$rootScope', function($document, $rootScope) {
			$rootScope.shortcuts = [];

			$document.on("keydown  keyup", function(e) {
				// Skip if it focused in input tag.
				if (event.target.tagName !== "INPUT") {
					$rootScope.shortcuts.forEach(function(eventHandler) {
						// Skip if it focused in input tag.
						if (event.target.tagName !== "INPUT" && eventHandler)
							eventHandler(e.originalEvent, e)
					});
				}
			})

			return {
				restrict : 'A',
				scope : {
					'shortcuts' : '&'
				},
				link : function(scope, element, attrs) {
					$rootScope.shortcuts.push(scope.shortcuts());
				}
			};
		} ]);

var globalScope;

/* ******** CONTROLADORES - MODALES *************** */

(function() {
	"use strict";
	angular.module("MAE1014APP").controller('modalDetailMAE1014Ctrl',
			modalDetailMAE1014Ctrl);

	modalDetailMAE1014Ctrl.$inject = [ '$scope', '$uibModalInstance',
			'parentScope' ];
	function modalDetailMAE1014Ctrl($scope, $uibModalInstance, parentScope) {

		$scope.mae1014 = angular.copy(parentScope.rowDetail);

		$scope.separator = separator;
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module("MAE1014APP").controller("modal_confirmation_deleteMAE1014",
			modal_confirmation_deleteMAE1014);

	modal_confirmation_deleteMAE1014.$inject = [ 'comunication', '$scope', '$uibModalInstance',
			'gridMae1014Service', 'mae1014ConfigurationGrid', 'alrts',
			'$rootScope' ];
	function modal_confirmation_deleteMAE1014(comunication, $scope, $uibModalInstance,
			gridMae1014Service, mae1014ConfigurationGrid, alrts, $rootScope) {
		$scope.ok = function() {
			$scope.cancel();
			$rootScope.selectUTI1006("PEDI");

			// Procedimiento a seguir una vez seleccionado el motivo de
			// anulación
			$rootScope.deleMAE1014 = function(moti) {
				gridMae1014Service.inactivateWithMotivo(comunication.getLine_dele().pk, moti)
						.then(
								function successCallback(response) {
									$uibModalInstance.close(true);
									alrts.successMsg("GENE.RGTR_SUPR");
									mae1014ConfigurationGrid.getPage2(
											comunication.getOrder().orno);
								}, function errorCallback(response) {
								});
			}
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module("MAE1014APP").controller('modalEditMAE1014Ctrl',
			modal_edit_entity);

	modal_edit_entity.$inject = [ 'comunication', '$scope', '$uibModalInstance', 'parentScope',
			'mae1014ConfigurationGrid', 'mae1014Service'];
	function modal_edit_entity(comunication, $scope, $uibModalInstance, parentScope,
			mae1014ConfigurationGrid, mae1014Service) {

		$scope.mae1014 = angular.copy(parentScope.rowEdit);
		$scope.separator = separator;
		
		$scope.submitForm = function(mae1014, form) {
			if( form.$valid ) {
				mae1014Service.update(mae1014, $uibModalInstance, 1, $scope,
						mae1014ConfigurationGrid, parentScope);
			}
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module("MAE1014APP").controller('mae1014Controller',
			mae1014Controller);
	mae1014Controller.$inject = [ 'comunication', '$scope', '$uibModal', '$log',
			'gridMae1014Service', 'uiGridConstants',
			'mae1014ConfigurationGrid', 'i18nService', '$translate', '$window',
			'$rootScope', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND',
			'mae1014Service', 'mae1013Service', '$state', 'par1001Service', 'SweetAlert', 'alrts', '$cookies', 'FLTRNUMB' ];

	function mae1014Controller(comunication, $scope, $uibModal, $log, gridMae1014Service,
			uiGridConstants, mae1014ConfigurationGrid, i18nService, $translate,
			$window, $rootScope, translations, OK, NOT_CONTENT, NOT_FOUND,
			mae1014Service, mae1013Service, $state, par1001Service, SweetAlert, alrts, $cookies, FLTRNUMB) {

		/** * ****INICIALIZACION DE VARIABLES Y ESTRUCTURAS * **** */
		$rootScope.scMAE1014 = $scope;
		$scope.currentUser = currentUser;
		$scope.countRowSelect = 0;
		
		$scope.controllerDetail = "modalDetailMAE1014Ctrl";
		$scope.controllerEdition = "modalEditMAE1014Ctrl";
		$scope.controllerDelete = "modal_confirmation_deleteMAE1014";

		$rootScope.pale = new Object();
		$rootScope.pale.id = 0;
		$rootScope.pale.dsca = "PALE";

		$rootScope.cest = new Object();
		$rootScope.cest.id = 1;
		$rootScope.cest.dsca = "CEST";

		$rootScope.caja = new Object();
		$rootScope.caja.id = 2;
		$rootScope.caja.dsca = "CAJA";

		$rootScope.carr = new Object();
		$rootScope.carr.id = 3;
		$rootScope.carr.dsca = "CARR";
		
		$rootScope.keyUp = function(key) {
			// 116 is for F5
			if (key.keyCode == 116)
				$state.go("header");
		};
		
		var toTrans = new Array();
		toTrans = translations.transMstr();
		toTrans.push('MAE1014.ITEM');
		toTrans.push('MAE1014.CANT_P');
		toTrans.push('MAE1014.CANT_D');
		toTrans.push('MAE1014.CANT_R');
		toTrans.push('GENE.CODE');
		toTrans.push('GENE.SECU');
		toTrans.push('MAE1014.NODESP');
		toTrans.push('MAE1014.DESG_P');
		toTrans.push('GENE.BTN_EDIT');
		toTrans.push('MAE1014.DESP');
		toTrans.push('MAE1014.CUNI');
		toTrans.push('GENE.START_WE');
		toTrans.push('GENE.DIFERE');
		toTrans.push('GENE.PERCEN');
		toTrans.push('MAE1014.SEDESP');
		toTrans.push('ALRT.ALRT');
		toTrans.push('ALRT.ALRT03');
		toTrans.push('GENE.true');
		toTrans.push('GENE.false');
		
		$scope.controllerDetail = "modalDetailMAE1014Ctrl";
		
		par1001Service.getCurrentParameter().then(function(response) {
			$scope.par1001 = response;
		});
		
		$rootScope.mae1013 = $cookies.getObject("order");//comunication.getOrder();//$rootScope.row_selected;
		$scope.confpe = $cookies.getObject("order").confpe; //comunication.getOrder().confpe; //Indica confirmación del pedido
		comunication.setOrder($cookies.getObject("order"));
		
		comunication.setLine_desg(null);
		
		$translate(toTrans)
				.then(
						function(translation) {
							$scope.translation = translation;
							$scope.columns = [];
							language_grid();
							$scope.size = "md";

							/** ******************************************************************************** */

							/*
							 * ********************** CONFIGURACION DE UI-GRID
							 * **************
							 */
							mae1014ConfigurationGrid.initMenuOptions($scope);
							mae1014ConfigurationGrid
									.initializeGridOptions($scope);
							mae1014ConfigurationGrid
									.registerPaginationChanged($scope);

							/** **************************************************************** */

							mae1014ConfigurationGrid.getPage($scope,
									comunication.getOrder().orno);

							function language_grid() {
								$scope.columns = [
										{
											name : 'pk.pono',
											displayName : $scope.translation['GENE.SECU'],
											width : '10%'
										},
										{
											field : 'item.item',
											displayName : $scope.translation['GENE.CODE'],
											width : '10%'
										},
										{
											field : 'item.dsca',
											displayName : $scope.translation['MAE1014.ITEM'],
											width : '20%'
										},
										{
											field : 'item.stuw',
											displayName : $scope.translation['MAE1014.CUNI'],
											width : '5%'
										},
										{
											field : 'cant_p',
											type: 'number',
											cellFilter: "awnum:'general'",
											displayName : $scope.translation['MAE1014.CANT_P'],
											width : '10%'
										},
										{
											field : 'cant_d',
											type: 'number',
											cellFilter: "awnum:'general'",
											displayName : $scope.translation['MAE1014.CANT_D'],
											width : '10%'
										},
										{
											field : 'difere',
											cellFilter: "awnum:'general'",
											displayName : $scope.translation['GENE.DIFERE'],
											width : '10%'
										},
										
										{
											field : 'percen',
											cellFilter: "awnum:'general'",	
											displayName : $scope.translation['GENE.PERCEN'],
											width : '15%'
										},
										{
											field : 'despac',
											displayName : $scope.translation['MAE1014.SEDESP'],
											width : '7%',
											type: 'boolean',
											cellTemplate: '<input readOnly="true" disabled="true" type="checkbox" ng-model="row.entity.despac">'
										} ];
							}

							function trans(lang) {
								$translate.use(lang);
								$scope.lang = lang;
								$translate(toTrans)
										.then(
												function(translation) {
													$scope.translation = translation;
													language_grid();
													$scope.gridOptions.columnDefs = $scope.columns;
													mae1014ConfigurationGrid
															.initMenuOptions($scope);
												});
							}

							translations
									.getLanguage()
									.then(
											function(response) {
												if (response.status == NOT_CONTENT) {
													var lang = ($window.navigator.language || $window.navigator.userLanguage)
															.indexOf("es") == 0 ? "es"
															: "en";
												} else {
													var lang = response.data;
												}
												trans(lang);
												translations
														.setLocale(lang)
														.then(
																function(
																		response) {
																});
											});
							
							$scope.confirmPe = function( ) {
								if( !comunication.getOrder().confpe ) {
									swal({
									  title: $scope.translation['ALRT.ALRT'],
									  text: $scope.translation['ALRT.ALRT03'],
									  type: "warning",
									  showCancelButton: true,
									  confirmButtonClass: "btn-danger",
									  confirmButtonText: $scope.translation['GENE.true'],
									  cancelButtonText: $scope.translation['GENE.false'],
									  closeOnConfirm: true,
									  closeOnCancel: true
									},
									function(isConfirm) {
									  if (isConfirm) {
										  mae1013Service.hasLines(comunication.getOrder().orno).then( function (response) {
												if ( response.data ) {
													mae1013Service.confirmPe( comunication.getOrder().orno ).then( function (response) {
														comunication.setEvnt02(true);
														comunication.setOrder(response.data);
														alrts.successMsg("ALRT.ALRT01");
														$cookies.putObject("order", response.data);
														viewForRole( );
													}).catch(function(error){
														$log.error(error);
													});
												}else{
													showAlerts("WBL4B.ERROR013");
												}
											}).catch(function(error){
												$log.error(error);
											});
									  }
									});
								}
							}
							
							$scope.asignPrec = function ( ) {
								comunication.setData01(comunication.getOrder());
							}
							
							function viewForRole( ) {
								if( $scope.currentUser.pesaje ) {
									$state.go('lines');
								}else{
									$state.go('lines_readonly');
								}
							}

							globalScope = $scope;
							
							//FINALIZA EL MENSAJE DE CARGA PARA TRANSICION MAE1013->MAE1014
						});
		
		/* ************FUNCIONES PRIVADAS**************** */
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
		/* ********************************************** */
		
		$scope.$watch(function() { return comunication.getEvnt05() }, function() {
			if( comunication.isValid(comunication.getEvnt05()) ) {
				mae1013Service.getByOrno(comunication.getOrder().orno).then(function(response){
					comunication.setOrder(response.data);
					$rootScope.mae1013 = response.data;
				})
				.catch(function(error){
					$log.warn(error);
				});
				comunication.setEvnt05(null);
			}
          }
        );
		
		/* ************INICIALIZACIONES**************** */
//		enabOrdisabOptions( );
		/* ******************************************** */
	}
})();