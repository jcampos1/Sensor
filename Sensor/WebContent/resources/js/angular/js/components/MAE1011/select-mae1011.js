-/*PERMITE SELECCIONAR UN CONDUCTOR*/

"use strict";
angular.module('selectMAE1011', [ 'ui.bootstrap', 'messages', 'ui.grid',
                          		'ui.grid.selection', 'ui.grid.pagination', 'ngTouch', 'GRIDMAE1011', 'constants', 'angular-ui-grid-translate' ]);
(function() {
	"use strict";
	angular.module("selectMAE1011").controller('modalSelectMAE1011Ctrl',
			modalSelectMAE1011Ctrl);

	modalSelectMAE1011Ctrl.$inject = [ '$scope', '$rootScope',
			'$uibModalInstance', '$http', 'MAE1011ConfigurationGrid', 'uiGridConstants', 'i18nService', '$translate', '$window', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND' ];
	function modalSelectMAE1011Ctrl($scope, $rootScope, $uibModalInstance, $http, MAE1011ConfigurationGrid, uiGridConstants, i18nService, $translate, $window, translations, OK, NOT_CONTENT, NOT_FOUND) {
		
		var toTrans = new Array();
		toTrans.push('GENE.CODE');
		toTrans.push('USER.NAME');
		toTrans.push('USER.LAST_NAME');
		
		// Texto de busqueda
		$scope.text = "";
		// Campos de busquedas
		$scope.search_fields = new Array();
		$scope.search_fields.push("cedu");
		$scope.search_fields.push("nomb");
		$scope.search_fields.push("apel");
		
		$translate(toTrans).then(function(translation) {
			$scope.translation = translation;
			$scope.columns = [];
			language_grid();
			
			/** ******************************************************************************** */

			/* ********************** CONFIGURACION DE UI-GRID ************** */
			MAE1011ConfigurationGrid.initializeGridOptions($scope, $uibModalInstance);
			MAE1011ConfigurationGrid.registerPaginationChanged($scope);

			/** **************************************************************** */
			
			/** *********************** EVENTOS ******************************** */
			MAE1011ConfigurationGrid.eventSearch($scope);
			/** ******************************************************************************** */

			MAE1011ConfigurationGrid.getPage($scope);

			function language_grid() {
				$scope.columns = [ {
					name : 'cedu',
					displayName : $scope.translation['GENE.CODE'],
					width : '27%'
				}, {
					name : 'nomb',
					displayName : $scope.translation['USER.NAME'],
					width : '35%'
				}, {
					field : 'apel',
					displayName : $scope.translation['USER.LAST_NAME'],
					width : '35%'
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
	angular.module('selectMAE1011').controller('selectMAE1011Controller',
			selectMAE1011Controller);
	selectMAE1011Controller.$inject = [ 'comunication', '$uibModal', '$rootScope', '$scope',
			'$http', '$interval', 'MAE1011ConfigurationGrid', 'uiGridConstants', 'i18nService', '$translate', '$window', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND' ];
	function selectMAE1011Controller(comunication, $uibModal, $rootScope, $scope, $http,
			$interval, MAE1011ConfigurationGrid, uiGridConstants, i18nService, $translate, $window, translations, OK, NOT_CONTENT, NOT_FOUND) {
		var vm = this;
		
		vm.selectMAE1011 = function() {
			 $scope.modalInstance = $uibModal.open({
			 animation : true,
			 templateUrl : 'modalSelectMAE1011Ctrl.html',
			 controller : 'modalSelectMAE1011Ctrl',
			 size : "md",
			 backdrop: false,
			 });
			 $scope.modalInstance.result.then(function(data) {
				 comunication.setCond(data);
//				$scope.$emit('select-mae1011', data);
			}, function() {
			});
		 }
	}
})();

angular
		.module('selectMAE1011')
		.component(
				'selectMae1011Component',
				{
					templateUrl : "/WeighBridgeStandAlone/resources/views/forms/MAE1011/select-mae1011.jsp",
					controller : 'selectMAE1011Controller'
				});