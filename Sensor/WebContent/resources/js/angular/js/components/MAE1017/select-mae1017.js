/*PERMITE SELECCIONAR UN PARTNER */

"use strict";
angular.module('selectMAE1017', [ 'ui.bootstrap', 'messages', 'ui.grid',
                          		'ui.grid.selection', 'ui.grid.pagination', 'ngTouch', 'GRIDMAE1017', 'constants', 'angular-ui-grid-translate' ]);
(function() {
	"use strict";
	angular.module("selectMAE1017").controller('modalSelectMAE1017Ctrl',
			modalSelectMAE1017Ctrl);

	modalSelectMAE1017Ctrl.$inject = [ '$scope', '$rootScope',
			'$uibModalInstance', '$http', 'MAE1017ConfigurationGrid', 'uiGridConstants', 'i18nService', '$translate', '$window', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND' ];
	function modalSelectMAE1017Ctrl($scope, $rootScope, $uibModalInstance, $http, MAE1017ConfigurationGrid, uiGridConstants, i18nService, $translate, $window, translations, OK, NOT_CONTENT, NOT_FOUND) {
		
		var toTrans = new Array();
		toTrans.push('GENE.DSCA');
		toTrans.push('GENE.CODE');
		
		// Texto de busqueda
		$scope.text = "";
		// Campos de busquedas
		$scope.search_fields = new Array();
		$scope.search_fields.push("dsca_p");
		$scope.search_fields.push("code_p");
		
		$translate(toTrans).then(function(translation) {
			$scope.translation = translation;
			$scope.columns = [];
			language_grid();
			
			/** ******************************************************************************** */

			/* ********************** CONFIGURACION DE UI-GRID ************** */
			MAE1017ConfigurationGrid.initializeGridOptions($scope, $uibModalInstance);
			MAE1017ConfigurationGrid.registerPaginationChanged($scope);

			/** **************************************************************** */
			
			/** *********************** EVENTOS ******************************** */
			MAE1017ConfigurationGrid.eventSearch($scope);
			/** ******************************************************************************** */

			MAE1017ConfigurationGrid.getPage($scope);

			function language_grid() {
				$scope.columns = [ {
					name : 'id',
					visible : false,
					width : '8%'
				}, {
					name : 'code_p',
					displayName : $scope.translation['GENE.CODE'],
					width : '30%'
				}, {
					name : 'dsca_p',
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
	angular.module('selectMAE1017').controller('selectMAE1017Controller',
			selectMAE1017Controller);
	selectMAE1017Controller.$inject = [ 'comunication', '$uibModal', '$rootScope', '$scope',
			'$http', '$interval', 'MAE1017ConfigurationGrid', 'uiGridConstants', 'i18nService', '$translate', '$window', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND' ];
	function selectMAE1017Controller(comunication, $uibModal, $rootScope, $scope, $http,
			$interval, MAE1017ConfigurationGrid, uiGridConstants, i18nService, $translate, $window, translations, OK, NOT_CONTENT, NOT_FOUND) {
		var vm = this;
		
		vm.selectMAE1017 = function() {
			 $scope.modalInstance = $uibModal.open({
			 animation : true,
			 templateUrl : 'modalSelectMAE1017Ctrl.html',
			 controller : 'modalSelectMAE1017Ctrl',
			 size : "md",
			 backdrop: false,
			 });
			 $scope.modalInstance.result.then(function(data) {
				 if(vm.source=="origin") {
					 comunication.setOrig_a(null);
					 comunication.setOrig_p(data);
				 }else{
					 comunication.setDest_a(null);
					 comunication.setDest_p(data);
				 }
			}, function() {
			}); 
		 }
	}
})();

angular
		.module('selectMAE1017')
		.component(
				'selectMae1017Component',
				{
					templateUrl : "/WeighBridgeStandAlone/resources/js/angular/js/components/MAE1017/select-mae1017.jsp",
					controller : 'selectMAE1017Controller',
					controllerAs: 'vm',
					bindings: {
						source: "@",
					}
				});