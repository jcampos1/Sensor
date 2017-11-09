/*PERMITE SELECCIONAR UN ARTICULO CONTENEDOR*/

"use strict";
angular.module('selectMAE1010', [ 'ui.bootstrap', 'messages', 'ui.grid',
                          		'ui.grid.selection', 'ui.grid.pagination', 'ngTouch', 'GRIDMAE1010', 'constants', 'angular-ui-grid-translate' ]);
(function() {
	"use strict";
	angular.module("selectMAE1010").controller('selectMAE1010Controller',
			selectMAE1010Controller);

	selectMAE1010Controller.$inject = [ 'comunication', '$interval', '$scope', '$rootScope', '$http', 'MAE1010ConfigurationGrid',
	     'uiGridConstants', 'i18nService', '$translate', '$window', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND', 'FLTRNUMB' ];
	function selectMAE1010Controller(comunication, $interval, $scope, $rootScope, $http, MAE1010ConfigurationGrid, uiGridConstants, i18nService, $translate, $window, translations, OK, NOT_CONTENT, NOT_FOUND, FLTRNUMB) {
		
		var vm = this;
		
		$scope.TypeContentEnum = vm.type;
		$scope.name = vm.name;
		
		var toTrans = new Array();
		toTrans.push('GENE.DSCA');
		toTrans.push('GENE.PESO');
		toTrans.push('GENE.QUANT');
		
		$translate(toTrans).then(function(translation) {
			$scope.translation = translation;
			$scope.columns = [];
			language_grid();
			
			/** ******************************************************************************** */

			/* ********************** CONFIGURACION DE UI-GRID ************** */
			MAE1010ConfigurationGrid.initializeGridOptions($scope);

			/** **************************************************************** */

			$scope.$on('reload_containers', function(event, data) {
				MAE1010ConfigurationGrid.getData($scope);
			});
			
			MAE1010ConfigurationGrid.getData($scope);

			function language_grid() {
				$scope.columns = [{
					name : 'item',
					displayName : $scope.translation['GENE.DSCA'],
					width : '60%',
					enableCellEdit: false
				}, {
					field : 'pest',
					cellFilter: "awnum:'general'",
					displayName : $scope.translation['GENE.PESO'],
					width : '20%',
					enableCellEdit: false
				}, {
					field : 'cant',
					cellFilter: "awnum:'general'",
					displayName : $scope.translation['GENE.QUANT'],
					width : '20%',
					enableCellEdit: false,
					type: 'number',
					editableCellTemplate: '<input type="number" style="height: 100%; text-align:center;" ng-mouseover="this.select()" onClick="this.select()" class="form-control" value="0" min="0" ui-grid-editor  ng-model="MODEL_COL_FIELD">'
				}
				];
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
		
		/* ******* ESCUCHADORES ********** */
		$scope.$watch(function() { return comunication.getEvnt04() }, function() {
			if( comunication.isValid(comunication.getEvnt04()) ) {
				MAE1010ConfigurationGrid.function01( comunication.getEvnt04(), $scope );
			}
          }
        );
		/* ******************************* */
		
		/* *******FUNCIONES PRIVADAS ********/
		function windowsGridResize ( ) {
			$interval( function() {
				$scope.gridApi.core.handleWindowResize();
			}, 12, 502);
		}
		/* ******************************** */
		
		/* *******INICIALIZACIONES ********/
		windowsGridResize( );
		/* ****************************** */
	}
})();

angular
		.module('selectMAE1010')
	.component(
			'selectMae1010Component',
			{
				templateUrl : "/WeighBridgeStandAlone/resources/js/angular/js/components/MAE1010/select-mae1010.jsp",
				controller : 'selectMAE1010Controller',
				controllerAs: 'vm',
				bindings: {
					type: "<",
					name: "@",
				}
			});