/* ************** DECLARACION DE MODULOS ****************** */
angular.module("GMAE1010_01", [ 'ui.bootstrap', 'ngTouch', 'ui.grid',
		'ui.grid.pagination', 'ui.grid.selection', 'ui.grid.cellNav', 'messages' ]);

/* *********************** SERVICIOS ********************** */

"use strict";
angular.module('GMAE1010_01').service('GMAE1010_01Serv01',
		GMAE1010_01Serv01);
GMAE1010_01Serv01.$inject = [ 'comunication', '$http',
		'uiGridConstants', '$translate', '$interval', '$log' ];
function GMAE1010_01Serv01(comunication, $http,
		uiGridConstants, $translate, $interval, $log) {
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
				minRowsToShow : 5,

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
			
			/* ******* ESCUCHADORES ********** */
			$scope.$watch(function() { return comunication.getEvnt03() }, function() {
				if( comunication.isValid(comunication.getEvnt03()) ) {
					getData(comunication.getOrder().orno);
					comunication.setEvnt03(null);
				}
	          }
	        );
			/* ******************************* */
			return null;
		},

		getData : function(nord) {
			getData(nord);
		},
	}
	/** ************************************************************* */

	/** ********************** FUNCIONES PRIVADAS ******************* */
	function getData(nord) {
		$http({
			url: "/WeighBridgeStandAlone/MAE1013/returnable", 
			method: "POST",
			params: { nord:nord },
		}).then(function(response) {
			initGrid(response, scp);
		})
        .catch(function(error) {
        	initGrid(null, scp);
        });
	}

	function initGrid(json, $scope) {
		if (json.data.lstcon) {
			$scope.pestar = json.data.pestar;
			$scope.gridOptions.data = json.data.lstcon;
		} else {
			$scope.gridOptions.data = [];
		}
	}
	
	function windowsGridResize ( ) {
		$interval( function() {
			scp.gridApi.core.handleWindowResize();
		}, 12, 300);
	}
	/** ************************************************************* */
}