/*PERMITE SELECCIONAR UN ARTICULO */

"use strict";
angular.module('selectMAE1009', [ 'ui.bootstrap', 'messages', 'ui.grid',
                          		'ui.grid.selection', 'ui.grid.pagination', 'ngTouch', 'GRIDMAE1009', 'constants', 'angular-ui-grid-translate' ]);
(function() {
	"use strict";
	angular.module("selectMAE1009").controller('modalSelectMAE1009Ctrl',
			modalSelectMAE1009Ctrl);

	modalSelectMAE1009Ctrl.$inject = [ '$scope', '$rootScope',
			'$uibModalInstance', '$http', 'MAE1009ConfigurationGrid', 'uiGridConstants', 'i18nService', '$translate', '$window', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND' ];
	function modalSelectMAE1009Ctrl($scope, $rootScope, $uibModalInstance, $http, MAE1009ConfigurationGrid, uiGridConstants, i18nService, $translate, $window, translations, OK, NOT_CONTENT, NOT_FOUND) {
		
		$scope.mae1009 = new Object();
		
		var toTrans = new Array();
		toTrans.push('GENE.DSCA');
		toTrans.push('MAE1009.ITEM');
		toTrans.push('MAE1009.CUNI');
		toTrans.push('MAE1009.STUW');
		
		// Texto de busqueda
		$scope.text = "";
		// Campos de busquedas
		$scope.search_fields = new Array();
		$scope.search_fields.push("item");
		$scope.search_fields.push("dsca");
		
		$translate(toTrans).then(function(translation) {
			$scope.translation = translation;
			$scope.columns = [];
			language_grid();
			
			/** ******************************************************************************** */

			/* ********************** CONFIGURACION DE UI-GRID ************** */
			MAE1009ConfigurationGrid.initializeGridOptions($scope, $uibModalInstance);
			MAE1009ConfigurationGrid.registerPaginationChanged($scope);

			/** **************************************************************** */
			
			/** *********************** EVENTOS ******************************** */
			MAE1009ConfigurationGrid.eventSearch($scope);
			/** ******************************************************************************** */

			MAE1009ConfigurationGrid.getPage($scope);

			function language_grid() {
				$scope.columns = [ {
					name : 'id',
					visible : false,
				}, , {
					name : 'item',
					displayName : $scope.translation['MAE1009.ITEM'],
					width : '20%'
				}, {
					name : 'dsca',
					displayName : $scope.translation['GENE.DSCA'],
					width : '47%'
				}, {
					name : 'cuni',
					displayName : $scope.translation['MAE1009.CUNI'],
					width : '15%'
				}, {
					name : 'stuw',
					displayName : $scope.translation['MAE1009.STUW'],
					width : '15%'
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
	angular.module('selectMAE1009').controller('selectMAE1009Controller',
			selectMAE1009Controller);
	selectMAE1009Controller.$inject = [ 'comunication', '$uibModal', '$rootScope', '$scope',
			'$http', '$interval', 'MAE1009ConfigurationGrid', 'uiGridConstants', 'i18nService', '$translate', '$window', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND' ];
	function selectMAE1009Controller(comunication, $uibModal, $rootScope, $scope, $http,
			$interval, MAE1009ConfigurationGrid, uiGridConstants, i18nService, $translate, $window, translations, OK, NOT_CONTENT, NOT_FOUND) {
		var vm = this;
		vm.selectMAE1009 = function() {
			 $scope.modalInstance = $uibModal.open({
			 animation : true,
			 templateUrl : 'modalSelectMAE1009Ctrl.html',
			 controller : 'modalSelectMAE1009Ctrl',
			 size : "lg",
			 backdrop: false,
			 });
			 $scope.modalInstance.result.then(function(data) {
				 comunication.setItem(data);
			}, function() {
			});
		 }
	}
})();

angular
		.module('selectMAE1009')
		.component(
				'selectMae1009Component',
				{
					templateUrl : "/WeighBridgeStandAlone/resources/js/angular/js/components/MAE1009/select-mae1009.jsp",
					controller : 'selectMAE1009Controller'
				});