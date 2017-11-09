/* ************** DECLARACION DE MODULOS ****************** */
angular.module("GRIDMAE1010DESGLOSE", [ 'ui.bootstrap', 'ngTouch', 'ui.grid',
		'ui.grid.pagination', 'ui.grid.selection', 'ui.grid.cellNav', 'messages' ]);

/* *********************** SERVICIOS ********************** */

"use strict";
angular.module('GRIDMAE1010DESGLOSE').service('MAE1010DESLOGSEGrid',
		MAE1010DESLOGSEGrid);
MAE1010DESLOGSEGrid.$inject = [ '$http',
		'uiGridConstants', '$translate', '$interval' ];
function MAE1010DESLOGSEGrid($http,
		uiGridConstants, $translate, $interval) {
	/** ********************** VARIABLES PRIVADAS ******************* */
	var paginationOptions = {
		pageNumber : 1,
		pageSize : 10,
	};
	var gridOptions;
	var scp; // Como alternativa a scope

	/** ************************************************************* */

	/** ********************** INTERFAZ DEL SERVICIO **************** */
	return {
		initializeGridOptions : function($scope) {
			scp = $scope;
			$scope.gridOptions = {
				enableGridMenu : true,
				paginationPageSizes : [ 1, 2, 10, 75 ],
				paginationPageSize : paginationOptions.pageSize,
				useExternalPagination : false,
				enablePaginationControls: false,
				noUnselect : true,

				rowHeight : 30,
				showGridFooter : false,
				columnDefs : $scope.columns,

				selectionRowHeaderWidth : '2%',

				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
				enableColumnMenus : false,
				minRowsToShow : 11,

				multiSelect : false,
				enableRowSelection : true,
				enableSelectAll : false,
				enableFullRowSelection : true,
				rowTemplate : '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ui-grid-cell> </div>'
			};
			
			$scope.gridOptions.onRegisterApi = function(gridApi) {
				$scope.gridApi = gridApi;
				windowsGridResize( );
			}
			return null;
		},

		getData : function(desg) {
			getData(desg);
		},
	}
	/** ************************************************************* */

	/** ********************** FUNCIONES PRIVADAS ******************* */
	function getData(desg) {
		$http({
			url: "/WeighBridgeStandAlone/MAE1015/findConten", 
			method: "POST",
			params: { desg:desg },
		}).then(function(response) {
			initGrid(response, scp);
		})
        .catch(function(error) {
        	initGrid(null, scp);
        });
	}

	function initGrid(json, $scope) {
		console.log(json);
		if (json.data.lstcon) {
			$scope.gridOptions.data = json.data.lstcon;
		} else {
			$scope.gridOptions.data = [];
		}
	}
	
	function windowsGridResize ( ) {
		$interval( function() {
			scp.gridApi.core.handleWindowResize();
		}, 12, 502);
	}
	/** ************************************************************* */
}