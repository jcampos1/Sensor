//PESAJES POR LINEA

'use strict';
angular.module("MAE1015APP", [ 'ui.bootstrap', 'ngTouch', 'ui.grid',
		'ui.grid.selection', 'ui.grid.pagination', 'ui.bootstrap.contextMenu',
		'ui.grid.exporter', 'messages', 'constants', 'notify',
		'angular-ui-grid-translate', 'GRIDMAE1015' ]);

var globalScope;

/* ******** CONTROLADORES - MODALES *************** */

(function ( ) {
	"use strict";
	angular.module("MAE1015APP").controller('modalDetailMAE1015Ctrl',
			modalDetailMAE1015Ctrl);

	modalDetailMAE1015Ctrl.$inject = [ '$scope', '$uibModalInstance',
			'parentScope' ];
	function modalDetailMAE1015Ctrl ( $scope, $uibModalInstance, parentScope ) {

		$scope.mae1015 = angular.copy(parentScope.rowDetail);
		
		$scope.separator = separator;
		
		$scope.cancel = function ( ) {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function ( ) {
	"use strict";
	angular.module("MAE1015APP").controller("modal_confirmation_deleteMAE1015",
			modal_confirmation_deleteMAE1015);

	modal_confirmation_deleteMAE1015.$inject = [ 'comunication', '$scope', '$uibModalInstance',
			'gridMae1015Service', 'mae1015ConfigurationGrid', 'alrts',
			'$rootScope' ];
	function modal_confirmation_deleteMAE1015 ( comunication, $scope, $uibModalInstance,
			gridMae1015Service, mae1015ConfigurationGrid, alrts, $rootScope ) {
		$scope.ok = function ( ) {
			$scope.cancel();
			$rootScope.selectUTI1006("PESO");

			// Procedimiento a seguir una vez seleccionado el motivo de
			// anulación
			$rootScope.deleMAE1015 = function ( moti ) {
				gridMae1015Service.inactivateWithMotivo($rootScope.pk, moti)
						.then(
								function successCallback ( response ) {
									$uibModalInstance.close(true);
									alrts.successMsg("GENE.RGTR_SUPR");
									$rootScope.getPageMAE105( comunication.getLine_desg() );
									$rootScope.reloadMAE1014( );
								}, function errorCallback ( response ) {
								});
			}
		};

		$scope.cancel = function ( ) {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function ( ) {
	"use strict";
	angular.module("MAE1015APP").controller('mae1015Controller',
			mae1015Controller);
	mae1015Controller.$inject = [ '$scope', '$uibModal', '$log',
			'gridMae1015Service', 'uiGridConstants',
			'mae1015ConfigurationGrid', 'i18nService', '$translate', '$window',
			'$rootScope', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND',
			'mae1015Service', '$state', 'FLTRNUMB' ];

	function mae1015Controller ( $scope, $uibModal, $log, gridMae1015Service,
			uiGridConstants, mae1015ConfigurationGrid, i18nService, $translate,
			$window, $rootScope, translations, OK, NOT_CONTENT, NOT_FOUND,
			mae1015Service, $state, FLTRNUMB ) {

		/** * ****INICIALIZACION DE VARIABLES Y ESTRUCTURAS * **** */
		$scope.countRowSelect = 0;
		$scope.controllerDetail = "modalDetailMAE1015Ctrl";
		$scope.controllerDelete = "modal_confirmation_deleteMAE1015";
		$scope.modalDelete = "myModalContent.html";

		var toTrans = new Array();
		toTrans = translations.transMstr();
		toTrans.push('GENE.SECU');
		toTrans.push('GENE.CONTEN');
		toTrans.push('GENE.PES_TA');
		toTrans.push('GENE.PES_NE');
		toTrans.push('GENE.PES_BR');
		toTrans.push('GENE.FECHPE');
		toTrans.push('GENE.FECONF');
		toTrans.push('GENE.SHOW_WEIG');
		
		$translate(toTrans)
				.then(
						function ( translation ) {
							$scope.translation = translation;
							$scope.columns = [];
							language_grid();
							$scope.size = "md";

							/** ******************************************************************************** */

							/*
							 * ********************** CONFIGURACION DE UI-GRID
							 * **************
							 */
							mae1015ConfigurationGrid.initMenuOptions($scope);
							mae1015ConfigurationGrid
									.initializeGridOptions($scope);
							mae1015ConfigurationGrid
									.registerPaginationChanged($scope);

							/** **************************************************************** */

							function language_grid ( ) {
								$scope.columns = [
										{
											name : 'pk.secu',
											displayName : $scope.translation['GENE.SECU'],
											width : '10%'
										},
										{
											field : 'pestar',
											cellFilter: "awnum:'general'",
											displayName : $scope.translation['GENE.PES_TA'],
											width : '15%'
										},
										{
											field : 'pesbru',
											cellFilter: "awnum:'general'",
											displayName : $scope.translation['GENE.PES_BR'],
											width : '15%'
										},
										{
											field : 'pesnet',
											cellFilter: "awnum:'general'",
											displayName : $scope.translation['GENE.PES_NE'],
											width : '15%'
										},
										{
											field : 'fechpe',
											displayName : $scope.translation['GENE.FECHPE'],
											width : '21%'
										},
										{
											field : 'feconf',
											displayName : $scope.translation['GENE.FECONF'],
											width : '21%'
										}];
							}

							function trans ( lang ) {
								$translate.use(lang);
								$scope.lang = lang;
								$translate(toTrans)
										.then(
												function ( translation ) {
													$scope.translation = translation;
													language_grid();
													$scope.gridOptions.columnDefs = $scope.columns;
													mae1015ConfigurationGrid
															.initMenuOptions($scope);
												});
							}

							translations
									.getLanguage()
									.then(
											function ( response ) {
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
																function (
																		response ) {
																});
											});

							globalScope = $scope;
						});
	}
})();