/* ************** DECLARACION DE MODULOS ****************** */
angular.module("GRIDMAE1010", [ 'ui.bootstrap', 'ngTouch', 'ui.grid',
		'ui.grid.pagination', 'ui.grid.selection', 'ui.grid.edit', 'ui.grid.cellNav', 'messages' ]);

/* *********************** SERVICIOS ********************** */

"use strict";
angular.module('GRIDMAE1010').service('MAE1010ConfigurationGrid',
		MAE1010ConfigurationGrid);
MAE1010ConfigurationGrid.$inject = [ 'comunication', '$http',
		'uiGridConstants', '$translate', '$rootScope', '$interval', '$log', 'SweetAlert', "FLTRNUMB" ];
function MAE1010ConfigurationGrid(comunication, $http,
		uiGridConstants, $translate, $rootScope, $interval, $log, SweetAlert, FLTRNUMB) {
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
		initializeGridOptions : function($scope) {
			scp = $scope;
			function01( false, $scope );
			
			$scope.entitySelect = function(row) {
//				if(angular.equals($scope.TypeContentEnum.dsca, $rootScope.pale.dsca) || angular.equals($scope.TypeContentEnum.dsca,$rootScope.pale.carr) ) {
//					$rootScope.setContai(row.entity);
//				}else{
//					$rootScope.setEmbala(row.entity);
//				}
//				$rootScope.updatePes_ta();
			};
			
			$scope.verify = function( row ) {
				if( comunication.getEvnt04() == null || !comunication.getEvnt04() ) {
					showAlerts("WBL4B.ERROR014");
				}
			}
			
			$scope.gridOptions.onRegisterApi = function(gridApi) {
				$scope.gridApi = gridApi;
				gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
					windowsGridResize( );
		            $rootScope.art_cont = rowEntity;
		            
		            function isFound(element) {
	            		if(element.conten.id == rowEntity.id){
	            			console.log("SE ENCONTRO EL ELEMENTO EN EL ARREGLO");
	            		  return true;
	            		}
	            	}
		            
		            var $index = $rootScope.getArray_mae1010().findIndex(isFound);
		            if( rowEntity.cant != undefined && rowEntity.cant != null ) {
		            	if( $index != undefined && $index != -1){
		            		if ( rowEntity.cant > 0 ) {
	            				console.log("ENTRO1");
		            			updateOrSaveConten ( angular.copy(rowEntity), $index );
		            		} else {
		            			console.log("como la cantidad es 0 se elimina del aray");
		            			$rootScope.getArray_mae1010().splice($index, 1);
		            		}
		            	}else{
		            		if ( rowEntity.cant > 0 ) {
		            			console.log("ENTRO2");
		            			updateOrSaveConten ( rowEntity );
		            		}
		            	}
		            	
		            	console.log("Array Nuevo: ");
	            		console.log($rootScope.getArray_mae1010());
		            } else {
		            	if ( $index != undefined && $index != -1 ) { 
		            		$rootScope.getArray_mae1010().splice($index, 1);
		            	}
		            	console.log("AQUI NO DEBERIA ENTRAR");
		            }
		          });
			};
			
			return null;
		},

		getData : function($scope) {
			getData($scope);
		},
		
		function01 : function(enabEdit, $scope) {
			function01(enabEdit, $scope);
		}
	}
	/** ************************************************************* */

	/** ********************** FUNCIONES PRIVADAS ******************* */
	function getData($scope) {
		$http.post("/WeighBridgeStandAlone/MAE1010/getByType", $scope.TypeContentEnum).then(function(response) {
			initGrid(response, $scope);
		})
        .catch(function(error) {
        	initGrid(null, $scope);
        });
	}

	function initGrid(json, $scope) {
		if (json.data.listData) {
			console.log(json.data.listData);
			$scope.gridOptions.data = json.data.listData;
			$scope.gridOptions.totalItems = json.data.totalActive;
			$scope.gridApi.selection.clearSelectedRows();
		} else {
			$scope.gridOptions.data = [];
			$scope.gridOptions.totalItems = 0;
			$scope.gridApi.selection.clearSelectedRows();
		}
	}
	
	function windowsGridResize ( ) {
		$interval( function() {
			scp.gridApi.core.handleWindowResize();
		}, 12, 502);
	}
	
	function function01( enabEdit, $scope ) {
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
			enableCellEdit: enabEdit,
			type: 'number',
			editableCellTemplate: '<input type="number" style="height: 100%; text-align:center;" ng-mouseover="this.select()" onClick="this.select()" class="form-control" value="0" min="0" ui-grid-editor  ng-model="MODEL_COL_FIELD">'
		}];
		$scope.gridOptions = {
			enableGridMenu : true,
			paginationPageSizes : [ 1, 2, 10, 75 ],
			paginationPageSize : paginationOptions.pageSize,
			useExternalPagination : false,
			enablePaginationControls: false,
			noUnselect : true,
			enableCellEditOnFocus : true,

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
			rowTemplate : '<div ng-dblclick="grid.appScope.verify(row)" style="cursor: pointer; font-size: small" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ui-grid-cell> </div>'
		};
	}
	
	function updateOrSaveConten ( conten, $index ) {
		var obj = new Object();
		obj.conten = conten;
		obj.nconte = conten.cant;
		if( $index != undefined && $index != null ) {
			$rootScope.getArray_mae1010()[$index] = obj;
		}else{
			$rootScope.getArray_mae1010().push(obj);
		}
	}
	
	function showAlerts(toTraslate) {
		var toTrans = new Array();
		toTrans.push(toTraslate);
		$translate(toTrans).then(function(tr) {
			SweetAlert.swal({
				  title: "Error!",
				  text: tr[toTraslate],
				  type: "error",
				  confirmButtonText: "Ok"
				});
		});
	}
	/** ************************************************************* */
}