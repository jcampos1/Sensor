/* ************** DECLARACION DE MODULOS ****************** */
angular.module("GRIDMAE1011", [ 'ui.bootstrap', 'ngTouch', 'ui.grid',
		'ui.grid.pagination', 'ui.grid.selection', 'messages' ]);

/* *********************** SERVICIOS ********************** */

"use strict";
angular.module('GRIDMAE1011').service('MAE1011ConfigurationGrid',
		MAE1011ConfigurationGrid);
MAE1011ConfigurationGrid.$inject = [ '$http', '$log', '$uibModal',
		'uiGridConstants', '$translate' ];
function MAE1011ConfigurationGrid($http, $log, $uibModal,
		uiGridConstants, $translate) {
	/** ********************** VARIABLES PRIVADAS ******************* */
	var paginationOptions = {
		pageNumber : 1,
		pageSize : 10,
		sort : null
	};
	var gridOptions;
	var scp; // Como alternativa a scope

	/** ************************************************************* */

	/** ********************** INTERFAZ DEL SERVICIO **************** */
	return {
		initializeGridOptions : function($scope, $uibModalInstance) {
			$scope.gridOptions = {
				enableGridMenu : true,
				paginationPageSizes : [ 1, 2, 10, 75 ],
				paginationPageSize : paginationOptions.pageSize,
				useExternalPagination : true,

				rowHeight : 30,
				showGridFooter : true,
				columnDefs : $scope.columns,

				selectionRowHeaderWidth : '2%',

				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
				enableColumnMenus : false,
				minRowsToShow : 11,

				multiSelect : false,
				enableRowSelection : true,
				enableSelectAll : false,
				enableFullRowSelection : true,
				rowTemplate : '<div ng-dblclick="grid.appScope.select(row)" style="cursor: pointer" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ui-grid-cell> </div>'
			};
			
			$scope.select = function(row) {
				console.log(row);
				$scope.gridmae1011_sel = new Object();
				$scope.gridmae1011_sel = row.entity;
				
				$uibModalInstance.close($scope.gridmae1011_sel);
			};

			return null;
		},

		getPage : function($scope) {
			getPage($scope);
		},

		registerPaginationChanged : function($scope) {
			$scope.gridOptions.onRegisterApi = function(gridApi) {
				$scope.gridApi = gridApi;
				gridApi.pagination.on.paginationChanged($scope, function(
						newPage, pageSize) {
					paginationOptions.pageNumber = newPage;
					paginationOptions.pageSize = pageSize;
					getPage($scope);
				});
			};
			return null;
		},
		
		eventSearch : function($scope) {
			$scope.search = function() {
				getPage($scope);
			};
		}
	}
	/** ************************************************************* */

	/** ********************** FUNCIONES PRIVADAS ******************* */
	function getPage($scope) {
		var obj = new Object();
		obj.grid = new Object();
		obj.grid.page = paginationOptions.pageNumber;
		obj.grid.pageSize = paginationOptions.pageSize;
		obj.grid.text_find = $scope.text;
		obj.grid.search_fields = $scope.search_fields;
		
		$http.post("/WeighBridgeStandAlone/MAE1011/externPagSimple", obj).then(function(response) {
			initGrid(response, $scope);
		})
        .catch(function(error) {
        	initGrid(null, $scope);
        });
	}

	function initGrid(json, $scope) {
		if (json.data.listData) {
			$scope.gridOptions.data = json.data.listData;
			$scope.gridOptions.totalItems = json.data.totalActive;
			$scope.gridApi.selection.clearSelectedRows();
		} else {
			$scope.gridOptions.data = [];
			$scope.gridOptions.totalItems = 0;
			$scope.gridApi.selection.clearSelectedRows();
		}
	}
	/** ************************************************************* */
}