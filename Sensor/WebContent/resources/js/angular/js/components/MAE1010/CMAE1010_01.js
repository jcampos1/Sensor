/*DETALLE DE LOS ARTICULOS RETORNABLES DE UNA ORDEN*/

"use strict";
angular.module('CMAE1010_01', [ 'ui.bootstrap', 'messages', 'ui.grid',
                          		'ui.grid.selection', 'ui.grid.pagination', 'ngTouch', 'GMAE1010_01', 'constants', 'angular-ui-grid-translate' ]);
(function() {
	"use strict";
	angular.module("CMAE1010_01").controller('CMAE1010_01Ctrl01',
			CMAE1010_01Ctrl01);

	CMAE1010_01Ctrl01.$inject = [ 'comunication', '$scope', 'GMAE1010_01Serv01',
	     'uiGridConstants', 'i18nService', '$translate', '$window', 'translations', 'NOT_CONTENT', 'FLTRNUMB' ];
	function CMAE1010_01Ctrl01(comunication, $scope, GMAE1010_01Serv01, uiGridConstants, i18nService, $translate, $window, translations, NOT_CONTENT, FLTRNUMB) {
		
		var toTrans = new Array();
		toTrans.push('GENE.CODE');
		toTrans.push('GENE.DSCA');
		toTrans.push('GENE.RETURN');
		toTrans.push('GENE.QUANT');
		toTrans.push('GENE.PES_TA_KG');
		toTrans.push('GENE.TOTAL');
		
		$translate(toTrans).then(function(translation) {
			$scope.translation = translation;
			$scope.columns = [];
			language_grid();
			
			/** ******************************************************************************** */

			/* ********************** CONFIGURACION DE UI-GRID ************** */
			GMAE1010_01Serv01.initializeGridOptions($scope);
			/** **************************************************************** */

			GMAE1010_01Serv01.getData(comunication.getOrder().orno);

			function language_grid() {
				$scope.columns = [{
					name : 'conten.codear',
					displayName : $scope.translation['GENE.CODE'],
					width : '15%',
				}, {
					field : 'conten.item',
					displayName : $scope.translation['GENE.DSCA'],
					width : '37%',
				}, {
					field : 'conten.reto',
					displayName : $scope.translation['GENE.RETURN'],
					width : '13%',
					type: 'boolean',
					cellTemplate: '<input readOnly="true" disabled="true" type="checkbox" ng-model="row.entity.conten.reto">'
				}, {
					field : 'cant',
					cellFilter: FLTRNUMB,
					displayName : $scope.translation['GENE.QUANT'],
					width : '10%',
				}, {
					field : 'conten.pest',
					cellFilter: FLTRNUMB,
					displayName : $scope.translation['GENE.PES_TA_KG'],
					width : '10%',
				}, {
					field : 'pestar',
					cellFilter: FLTRNUMB,
					displayName : $scope.translation['GENE.TOTAL'],
					width : '15%',
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
	}
})();

angular
		.module('CMAE1010_01')
		.component(
				'mae101001Component',
				{
					templateUrl : "/WeighBridgeStandAlone/resources/js/angular/js/components/MAE1010/CMAE1010_01.jsp",
					controller : 'CMAE1010_01Ctrl01',
				});