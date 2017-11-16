"use strict";
angular.module('processApp').service('MAE1001ConfigurationGrid',
		MAE1001ConfigurationGrid);
MAE1001ConfigurationGrid.$inject = [ '$log', '$uibModal',
		'uiGridConstants', '$translate', 'auxServiceMAE1001', 'comunication', '$interval'];
function MAE1001ConfigurationGrid($log, $uibModal,
		uiGridConstants, $translate, auxServiceMAE1001, comunication, $interval) {
	/** ********************** VARIABLES PRIVADAS ******************* */
	var paginationOptions = {
		pageNumber : 1,
		pageSize : 10,
		sort : null
	};
	/** ************************************************************* */

	/** ********************** INTERFAZ DEL SERVICIO **************** */
	return {
		initializeGridOptions : function($scope) {
			$scope.gridOptions = {
				enableGridMenu : true,
				paginationPageSizes : [ 10, 20, 50 ],
				paginationPageSize : paginationOptions.pageSize,
				useExternalPagination : true,

				rowHeight : 30,
				showGridFooter : true,
				columnDefs : $scope.columns,

				selectionRowHeaderWidth : '5%',

				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
				enableColumnMenus : false,
				minRowsToShow : 11,

				multiSelect : false,
				enableRowSelection : true,
				enableSelectAll : false,
				enableFullRowSelection : true,
				rowTemplate : '<div ng-click="grid.appScope.selected(row)" ng-dblclick="grid.appScope.roleSelected(row)" style="cursor: pointer" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ui-grid-cell> </div>'
			};
			
			//Devuelve el usuario a editar/eliminar/ver en detalle
			$scope.selected = function(row) {
				//Guarda el usuario seleccionado
				$scope.userselected = row.entity;
				//Guarda el usuario seleccionado
				comunication.setData15(row.entity);
			};
			
			//Acciona la edicion del usuario
			$scope.userSelected = function(row) {
				//Guarda el usuario seleccionado
				comunication.setData15(row.entity);
				//Se dispara evento para edicion de usuario
				comunication.setEvnt17("emit");
			};

			return null;
		},

		getPage : function($scope) {
			getPage($scope);
		},

		registerPaginationChanged : function($scope) {
			$scope.gridOptions.onRegisterApi = function(gridApi) {
				$scope.gridApi = gridApi;
				windowsGridResize( $scope );
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
	
	//Obtiene lista de sensores
	function getPage($scope) {
		var obj = new Object();
		obj.grid = new Object();
		obj.grid.page = paginationOptions.pageNumber;
		obj.grid.pageSize = paginationOptions.pageSize;
		
		auxServiceMAE1001.getSubset(obj).then(function(response) {
			initGrid(response, $scope);
		}).catch(function(error) {
			initGrid(null, $scope);
			$log.error("Se produjo un error en la obtencion de usuarios");
        });
	}

	//Carga grilla con roles
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
	
	function windowsGridResize ( $scope ) {
		$interval( function() {
			$scope.gridApi.core.handleWindowResize();
		}, 12, 502);
	}
	/** ************************************************************* */
}

//Servicio para la obtencion de roles
"use strict";
angular.module('processApp').service('auxServiceMAE1001', auxServiceMAE1001);
auxServiceMAE1001.$inject = [ '$http', '$q', 'alrts', '$translate' ];
function auxServiceMAE1001($http, $q, alrts, $translate) {
	return {
		getSubset : function(obj) { 
			return getSubset(obj);
		},
	}

	function getSubset(obj) {
		var defered = $q.defer();
		var promise = defered.promise;
		
		$http({
			url : "/Sensor/user/externalPagination",
			method : "POST",
			params : {
				uti1001 : obj
			},
		})
		.success(function(data){
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});

		return promise;
	}
}