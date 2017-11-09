/*PERMITE SELECCIONAR UNA COMPAÑIA */

"use strict";
angular.module('selectMAE1016', [ 'ui.bootstrap', 'messages', 'ui.grid',
                          		'ui.grid.selection', 'ui.grid.pagination', 'ngTouch', 'GRIDMAE1016', 'constants', 'angular-ui-grid-translate' ]);
(function() {
	"use strict";
	angular.module("selectMAE1016").controller('modalSelectMAE1016Ctrl',
			modalSelectMAE1016Ctrl);

	modalSelectMAE1016Ctrl.$inject = [ '$scope', '$rootScope',
			'$uibModalInstance', '$http', 'MAE1016ConfigurationGrid', 'uiGridConstants', 'i18nService', '$translate', '$window', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND' ];
	function modalSelectMAE1016Ctrl($scope, $rootScope, $uibModalInstance, $http, MAE1016ConfigurationGrid, uiGridConstants, i18nService, $translate, $window, translations, OK, NOT_CONTENT, NOT_FOUND) {
		
		var toTrans = new Array();
		toTrans.push('GENE.DSCA');
		toTrans.push('GENE.COMPANY');
		
		// Texto de busqueda
		$scope.text = "";
		// Campos de busquedas
		$scope.search_fields = new Array();
		$scope.search_fields.push("dsca");
		$scope.search_fields.push("number");
		
		$translate(toTrans).then(function(translation) {
			$scope.translation = translation;
			$scope.columns = [];
			language_grid();
			
			/** ******************************************************************************** */

			/* ********************** CONFIGURACION DE UI-GRID ************** */
			MAE1016ConfigurationGrid.initializeGridOptions($scope, $uibModalInstance);
			MAE1016ConfigurationGrid.registerPaginationChanged($scope);

			/** **************************************************************** */
			
			/** *********************** EVENTOS ******************************** */
			MAE1016ConfigurationGrid.eventSearch($scope);
			/** ******************************************************************************** */

			MAE1016ConfigurationGrid.getPage($scope);

			function language_grid() {
				$scope.columns = [ {
					name : 'id',
					visible : false,
					width : '8%'
				}, {
					name : 'dsca',
					displayName : $scope.translation['GENE.DSCA'],
					width : '59%'
				}, {
					name : 'number',
					displayName : $scope.translation['GENE.COMPANY'],
					width : '30%'
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
	angular.module('selectMAE1016').controller('selectMAE1016Controller',
			selectMAE1016Controller);
	selectMAE1016Controller.$inject = [ 'comunication', '$uibModal', '$rootScope', '$scope',
			'$http', '$interval', 'MAE1016ConfigurationGrid', 'uiGridConstants', 'i18nService', '$translate', '$window', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND' ];
	function selectMAE1016Controller(comunication, $uibModal, $rootScope, $scope, $http,
			$interval, MAE1016ConfigurationGrid, uiGridConstants, i18nService, $translate, $window, translations, OK, NOT_CONTENT, NOT_FOUND) {
		var vm = this;
		
		vm.selectMAE1016 = function() {
			 $scope.modalInstance = $uibModal.open({
			 animation : true,
			 templateUrl : 'modalSelectMAE1016Ctrl.html',
			 controller : 'modalSelectMAE1016Ctrl',
			 size : "md",
			 backdrop: false,
			 });
			 $scope.modalInstance.result.then(function(data) {
				 comunication.setCompany(data);
			}, function() {
			});
		 }
	}
})();

angular
		.module('selectMAE1016')
		.component(
				'selectMae1016Component',
				{
					templateUrl : "/WeighBridgeStandAlone/resources/js/angular/js/components/MAE1016/select-mae1016.jsp",
					controller : 'selectMAE1016Controller'
				});