/* ************** DECLARACION DE MODULOS ****************** */
angular.module("GRIDUTI1006", [ 'ui.bootstrap', 'ngTouch', 'ui.grid',
		'ui.grid.pagination', 'ui.grid.selection', 'messages' ]);

/* *********************** SERVICIOS ********************** */

"use strict";
angular.module('GRIDUTI1006').service('UTI1006ConfigurationGrid',
		UTI1006ConfigurationGrid);
UTI1006ConfigurationGrid.$inject = [ '$http', '$log', '$uibModal',
		'uiGridConstants', '$translate', 'auxService', '$rootScope' ];
function UTI1006ConfigurationGrid($http, $log, $uibModal,
		uiGridConstants, $translate, auxService, $rootScope) {
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
				rowTemplate : '<div ng-dblclick="grid.appScope.entitySelect(row)" style="cursor: pointer" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ui-grid-cell> </div>'
			};
			
			$scope.entitySelect = function(row) {
				$scope.rowSelected = row.entity;
				$uibModalInstance.close($scope.rowSelected);
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
	}
	/** ************************************************************* */

	/** ********************** FUNCIONES PRIVADAS ******************* */
	function getPage($scope) {
		var obj = new Object();
		obj.grid = new Object();
		obj.grid.page = paginationOptions.pageNumber;
		obj.grid.pageSize = paginationOptions.pageSize;
		
		auxService.getSubsetMoti(obj, $rootScope.type_m).then(function(response) {
			initGrid(response, $scope);
		}).catch(function(response) {
			initGrid(null, $scope);
        });
	}

	function initGrid(json, $scope) {
		if (json.listData) {
			$scope.gridOptions.data = json.listData;
			$scope.gridOptions.totalItems = json.totalActive;
			$scope.gridApi.selection.clearSelectedRows();
		} else {
			$scope.gridOptions.data = [];
			$scope.gridOptions.totalItems = 0;
			$scope.gridApi.selection.clearSelectedRows();
		}
	}
	/** ************************************************************* */
}

"use strict";
angular.module('GRIDUTI1006').service('auxService', auxService);
auxService.$inject = [ '$http', '$q', 'alrts', '$translate' ];
function auxService($http, $q, alrts, $translate) {
	return {
		getSubsetMoti : function(obj, type_m) { 
			return getSubsetMoti(obj, type_m);
		},
	}

	function getSubsetMoti(obj, type_m) {
		var defered = $q.defer();
		var promise = defered.promise;
		
		$http({
			url: "/WeighBridgeStandAlone/UTI1006/externalPagination", 
			method: "POST",
			params: {uti1001:obj, type_m:type_m },
		}).success(function(data){
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		
		return promise;
	}
}