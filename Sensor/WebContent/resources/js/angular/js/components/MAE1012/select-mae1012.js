/*PERMITE SELECCIONAR UN MEDIO DE TRANSPORTE*/

"use strict";
angular.module('selectMAE1012', [ 'ui.bootstrap', 'messages', 'ui.grid',
                          		'ui.grid.selection', 'ui.grid.pagination', 'ngTouch', 'GRIDMAE1012', 'constants', 'angular-ui-grid-translate' ]);
(function() {
	"use strict";
	angular.module("selectMAE1012").controller('modalSelectMAE1012Ctrl',
			modalSelectMAE1012Ctrl);

	modalSelectMAE1012Ctrl.$inject = [ '$scope', '$rootScope',
			'$uibModalInstance', '$http', 'MAE1012ConfigurationGrid', 'uiGridConstants', 'i18nService', '$translate', '$window', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND' ];
	function modalSelectMAE1012Ctrl($scope, $rootScope, $uibModalInstance, $http, MAE1012ConfigurationGrid, uiGridConstants, i18nService, $translate, $window, translations, OK, NOT_CONTENT, NOT_FOUND) {
		
		$scope.mae1013 = new Object();
		
		var toTrans = new Array();
		toTrans.push('GENE.DSCA');
		toTrans.push('MAE1013.MOTR');
		toTrans.push('GENE.PLAC');
		
		// Texto de busqueda
		$scope.text = "";
		// Campos de busquedas
		$scope.search_fields = new Array();
		$scope.search_fields.push("motr");
		$scope.search_fields.push("dsca");
		$scope.search_fields.push("plac");
		
		$translate(toTrans).then(function(translation) {
			$scope.translation = translation;
			$scope.columns = [];
			language_grid();
			
			/** ******************************************************************************** */

			/* ********************** CONFIGURACION DE UI-GRID ************** */
			MAE1012ConfigurationGrid.initializeGridOptions($scope, $uibModalInstance);
			MAE1012ConfigurationGrid.registerPaginationChanged($scope);

			/** **************************************************************** */
			
			/** *********************** EVENTOS ******************************** */
			MAE1012ConfigurationGrid.eventSearch($scope);
			/** ******************************************************************************** */

			MAE1012ConfigurationGrid.getPage($scope);

			function language_grid() {
				$scope.columns = [ {
					name : 'id',
					visible : false,
					width : '8%'
				}, {
					name : 'dsca',
					displayName : $scope.translation['GENE.DSCA'],
					width : '30%'
				}, {
					name : 'plac',
					displayName : $scope.translation['GENE.PLAC'],
					width : '15%'
				}, {
					name : 'motr',
					displayName : $scope.translation['MAE1013.MOTR'],
					width : '34%'
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
	angular.module('selectMAE1012').controller('selectMAE1012Controller',
			selectMAE1012Controller);
	selectMAE1012Controller.$inject = [ 'comunication', '$uibModal', '$rootScope', '$scope',
			'$http', '$interval', 'MAE1012ConfigurationGrid', 'uiGridConstants', 'i18nService', '$translate', '$window', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND' ];
	function selectMAE1012Controller(comunication, $uibModal, $rootScope, $scope, $http,
			$interval, MAE1012ConfigurationGrid, uiGridConstants, i18nService, $translate, $window, translations, OK, NOT_CONTENT, NOT_FOUND) {
		var vm = this;
		
		vm.selectMAE1012 = function() {
			 $scope.modalInstance = $uibModal.open({
			 animation : true,
			 templateUrl : 'modalSelectMAE1012Ctrl.html',
			 controller : 'modalSelectMAE1012Ctrl',
			 size : "md",
			 backdrop: false,
			 });
			 $scope.modalInstance.result.then(function(data) {
				 comunication.setMotr(data);
			}, function() {
			});
		 }
	}
})();

angular
		.module('selectMAE1012')
		.component(
				'selectMae1012Component',
				{
					templateUrl : "/WeighBridgeStandAlone/resources/js/angular/js/components/MAE1012/select-mae1012.jsp",
					controller : 'selectMAE1012Controller'
				});