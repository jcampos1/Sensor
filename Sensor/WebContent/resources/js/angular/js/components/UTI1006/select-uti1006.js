/*PERMITE SELECCIONAR UN MOTIVO BASANDOSE EN UN TIPO DE MOTIVO */

"use strict";
angular.module('selectUTI1006', [ 'ui.bootstrap', 'messages', 'ui.grid',
                          		'ui.grid.selection', 'ui.grid.pagination', 'ngTouch', 'GRIDUTI1006', 'constants', 'angular-ui-grid-translate' ]);
(function() {
	"use strict";
	angular.module("selectUTI1006").controller('modalSelectUTI1006Ctrl',
			modalSelectUTI1006Ctrl);

	modalSelectUTI1006Ctrl.$inject = [ '$scope', '$rootScope',
			'$uibModalInstance', '$http', 'UTI1006ConfigurationGrid', 'uiGridConstants', 'i18nService', '$translate', '$window', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND' ];
	function modalSelectUTI1006Ctrl($scope, $rootScope, $uibModalInstance, $http, UTI1006ConfigurationGrid, uiGridConstants, i18nService, $translate, $window, translations, OK, NOT_CONTENT, NOT_FOUND) {
		
		var toTrans = new Array();
		toTrans.push('GENE.CODE');
		toTrans.push('GENE.DSCA');
		
		$translate(toTrans).then(function(translation) {
			$scope.translation = translation;
			$scope.columns = [];
			language_grid();
			
			/** ******************************************************************************** */

			/* ********************** CONFIGURACION DE UI-GRID ************** */
			UTI1006ConfigurationGrid.initializeGridOptions($scope, $uibModalInstance);
			UTI1006ConfigurationGrid.registerPaginationChanged($scope);

			/** **************************************************************** */

			UTI1006ConfigurationGrid.getPage($scope);

			function language_grid() {
				$scope.columns = [ {
					name : 'id',
					visible : false,
					width : '8%'
				}, {
					name : 'code_m',
					displayName : $scope.translation['GENE.CODE'],
					width : '30%'
				}, {
					field : 'dsca_m',
					displayName : $scope.translation['GENE.DSCA'],
					width : '59%'
				}];
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
		});
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module('selectUTI1006').controller('selectUTI1006Controller',
			selectUTI1006Controller);
	selectUTI1006Controller.$inject = [ 'comunication', '$uibModal', '$rootScope', '$scope',
			'$http', '$interval', 'UTI1006ConfigurationGrid', 'uiGridConstants', 'i18nService', '$translate', '$window', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND' ];
	function selectUTI1006Controller(comunication, $uibModal, $rootScope, $scope, $http,
			$interval, UTI1006ConfigurationGrid, uiGridConstants, i18nService, $translate, $window, translations, OK, NOT_CONTENT, NOT_FOUND) {
		var vm = this;
		$rootScope.selectUTI1006 = function(type_m) {
			$rootScope.type_m = type_m;
			 $scope.modalInstance = $uibModal.open({
			 animation : true,
			 templateUrl : 'modalSelectUTI1006Ctrl.html',
			 controller : 'modalSelectUTI1006Ctrl',
			 size : "md",
			 backdrop: false,
			 });
			 $scope.modalInstance.result.then(function(data) {
				 switch (type_m) {
					case "PEDI":
						//USADO AL ELIMINAR UNA LINEA DE PRODUCTO
						$rootScope.deleMAE1014(data);
						break;
						
					case "PESO":
						$rootScope.deleMAE1015(data);
						break;
										
					case "CONF":
						comunication.setMot_nodesp(data);
						break;
						
					case "SUSP":
						comunication.setMot_03(data);
						break;
						
					case "ELIM":
						//ELIMINACION DE ESTACION
						comunication.setMot_04(data);
						break;
						
					case "DEVO":
						
						break;
					
					default:
						break;
				}
			}, function() {
			});
		 }
	}
})();

angular
		.module('selectUTI1006')
		.component(
				'selectUti1006Component',
				{
					templateUrl : "/WeighBridgeStandAlone/resources/js/angular/js/components/UTI1006/select-uti1006.jsp",
					controller : 'selectUTI1006Controller'
				});