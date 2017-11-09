/*PERMITE SELECCIONAR UN ALMACÉN */

"use strict";
angular.module('selectMAE1018', [ 'ui.bootstrap', 'messages', 'ui.grid',
                          		'ui.grid.selection', 'ui.grid.pagination', 'ngTouch', 'GRIDMAE1018', 'constants', 'angular-ui-grid-translate' ]);
(function() {
	"use strict";
	angular.module("selectMAE1018").controller('modalSelectMAE1018Ctrl',
			modalSelectMAE1018Ctrl);

	modalSelectMAE1018Ctrl.$inject = [ '$scope', '$rootScope',
			'$uibModalInstance', '$http', 'MAE1018ConfigurationGrid', 'uiGridConstants', 'i18nService', '$translate', '$window', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND' ];
	function modalSelectMAE1018Ctrl($scope, $rootScope, $uibModalInstance, $http, MAE1018ConfigurationGrid, uiGridConstants, i18nService, $translate, $window, translations, OK, NOT_CONTENT, NOT_FOUND) {
		
		var toTrans = new Array();
		toTrans.push('GENE.DSCA');
		toTrans.push('GENE.CODE');
		
		// Texto de busqueda
		$scope.text = "";
		// Campos de busquedas
		$scope.search_fields = new Array();
		$scope.search_fields.push("dsca_a");
		$scope.search_fields.push("code_a");
		
		$translate(toTrans).then(function(translation) {
			$scope.translation = translation;
			$scope.columns = [];
			language_grid();
			
			/** ******************************************************************************** */

			/* ********************** CONFIGURACION DE UI-GRID ************** */
			MAE1018ConfigurationGrid.initializeGridOptions($scope, $uibModalInstance);
			MAE1018ConfigurationGrid.registerPaginationChanged($scope);

			/** **************************************************************** */
			
			/** *********************** EVENTOS ******************************** */
			MAE1018ConfigurationGrid.eventSearch($scope);
			/** ******************************************************************************** */

			MAE1018ConfigurationGrid.getPage($scope);

			function language_grid() {
				$scope.columns = [ {
					name : 'id',
					visible : false,
					width : '8%'
				}, {
					name : 'code_a',
					displayName : $scope.translation['GENE.CODE'],
					width : '30%'
				}, {
					name : 'dsca_a',
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
	angular.module('selectMAE1018').controller('selectMAE1018Controller',
			selectMAE1018Controller);
	selectMAE1018Controller.$inject = [ 'comunication', '$uibModal', '$rootScope', '$scope',
			'$http', '$interval', 'MAE1018ConfigurationGrid', 'uiGridConstants', 'i18nService', '$translate', '$window', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND' ];
	function selectMAE1018Controller(comunication, $uibModal, $rootScope, $scope, $http,
			$interval, MAE1018ConfigurationGrid, uiGridConstants, i18nService, $translate, $window, translations, OK, NOT_CONTENT, NOT_FOUND) {
		var vm = this;
		
		vm.selectMAE1018 = function() {
			 $scope.modalInstance = $uibModal.open({
			 animation : true,
			 templateUrl : 'modalSelectMAE1018Ctrl.html',
			 controller : 'modalSelectMAE1018Ctrl',
			 size : "md",
			 backdrop: false,
			 });
			 $scope.modalInstance.result.then(function(data) {
				 if(vm.source=="origin") {
					 comunication.setOrig_p(null);
					 comunication.setOrig_a(data);
				 }else{
					 comunication.setDest_p(null);
					 comunication.setDest_a(data);
				 }
			}, function() {
			}); 
		 }
	}
})();

angular
		.module('selectMAE1018')
		.component(
				'selectMae1018Component',
				{
					templateUrl : "/WeighBridgeStandAlone/resources/js/angular/js/components/MAE1018/select-mae1018.jsp",
					controller : 'selectMAE1018Controller',
					controllerAs: 'vm',
					bindings: {
						source: "@",
					}
				});