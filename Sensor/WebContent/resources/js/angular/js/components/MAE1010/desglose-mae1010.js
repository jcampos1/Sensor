/*DETALLE DE LOS ARTICULOS CONTENEDORES DE UNA LINEA DE PESAJE*/

"use strict";
angular.module('desgloseMAE1010', [ 'ui.bootstrap', 'messages', 'ui.grid',
                          		'ui.grid.selection', 'ui.grid.pagination', 'ngTouch', 'GRIDMAE1010DESGLOSE', 'constants', 'angular-ui-grid-translate' ]);
(function() {
	"use strict";
	angular.module("desgloseMAE1010").controller('modalDesgloseMAE1010Ctrl',
			modalDesgloseMAE1010Ctrl);

	modalDesgloseMAE1010Ctrl.$inject = [ 'comunication', '$scope', '$uibModalInstance', 'MAE1010DESLOGSEGrid',
	     'uiGridConstants', 'i18nService', '$translate', '$window', 'translations', 'NOT_CONTENT', 'FLTRNUMB' ];
	function modalDesgloseMAE1010Ctrl(comunication, $scope, $uibModalInstance, MAE1010DESLOGSEGrid, uiGridConstants, i18nService, $translate, $window, translations, NOT_CONTENT, FLTRNUMB) {
		
		var toTrans = new Array();
		toTrans.push('GENE.CODE');
		toTrans.push('GENE.DSCA');
		toTrans.push('GENE.RETURN');
		toTrans.push('GENE.QUANT');
		toTrans.push('GENE.PES_TA_KG');
		toTrans.push('GENE.TOTAL');
		
		$scope.separator = separator;
		$scope.mae1015 = comunication.getEvnt01();
		comunication.setEvnt01(null);
		
		$translate(toTrans).then(function(translation) {
			$scope.translation = translation;
			$scope.columns = [];
			language_grid();
			
			/** ******************************************************************************** */

			/* ********************** CONFIGURACION DE UI-GRID ************** */
			MAE1010DESLOGSEGrid.initializeGridOptions($scope);
			/** **************************************************************** */

			MAE1010DESLOGSEGrid.getData($scope.mae1015);

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
					field : 'nconte',
					displayName : $scope.translation['GENE.QUANT'],
					cellFilter: "awnum:'general'",
					width : '10%',
				}, {
					field : 'conten.pest',
					displayName : $scope.translation['GENE.PES_TA_KG'],
					cellFilter: "awnum:'general'",
					width : '10%',
				}, {
					field : 'total',
					displayName : $scope.translation['GENE.TOTAL'],
					cellFilter: "awnum:'general'",
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
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module('desgloseMAE1010').controller('desgloseMAE1010Ctrl',
			desgloseMAE1010Ctrl);
	desgloseMAE1010Ctrl.$inject = [ 'comunication', '$uibModal', '$scope',
			'$interval', 'uiGridConstants', 'i18nService', '$translate', '$window', 'translations' ];
	function desgloseMAE1010Ctrl(comunication, $uibModal, $scope,
			$interval,uiGridConstants, i18nService, $translate, $window, translations) {
		var vm = this;
		
		/*****************ESCUCHADORES*******************/
		$scope.$watch(function() { return comunication.getEvnt01() }, function() {
			if( comunication.isValid(comunication.getEvnt01())) {
				$scope.modalInstance = $uibModal.open({
					 animation : true,
					 templateUrl : 'modalDesgloseMAE1010Ctrl.html',
					 controller : 'modalDesgloseMAE1010Ctrl',
					 size : "lg",
					 backdrop: false,
					 });
					 $scope.modalInstance.result.then(function(data) {
						 comunication.setEvnt01(null);
					}, function() {
				});
			}
          }
        );
		/***************************************************/
	}
})();

angular
		.module('desgloseMAE1010')
		.component(
				'desgloseMae1010Component',
				{
					templateUrl : "/WeighBridgeStandAlone/resources/js/angular/js/components/MAE1010/gridMae1010Desglose.jsp",
					controller : 'desgloseMAE1010Ctrl',
					controllerAs: 'vm',
				});