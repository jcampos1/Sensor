"use strict";
angular.module('processApp').service('RoleConfigurationGrid',
		RoleConfigurationGrid);
RoleConfigurationGrid.$inject = [ '$log', '$uibModal',
		'uiGridConstants', '$translate', 'auxServiceSensor', 'comunication'];
function RoleConfigurationGrid($log, $uibModal,
		uiGridConstants, $translate, auxServiceSensor, comunication) {
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

				selectionRowHeaderWidth : '2%',

				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
				enableColumnMenus : false,
				minRowsToShow : 11,

				multiSelect : false,
				enableRowSelection : true,
				enableSelectAll : false,
				enableFullRowSelection : true,
				rowTemplate : '<div ng-click="grid.appScope.selected(row)" ng-dblclick="grid.appScope.roleSelected(row)" style="cursor: pointer" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ui-grid-cell> </div>'
			};
			
			//Devuelve el rol a editar/eliminar/ver en detalle
			$scope.selected = function(row) {
				//Guarda el rol seleccionado
				$scope.rolselected = row.entity;
				//Guarda el rol seleccionado
				comunication.setData13(row.entity);
			};
			
			//Acciona la edicion del rol
			$scope.roleSelected = function(row) {
				//Guarda el rol seleccionado
				comunication.setData13(row.entity);
				//Se dispara evento para edicion de roles
				comunication.setEvnt16("emit");
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
	
	//Obtiene lista de sensores
	function getPage($scope) {
		var obj = new Object();
		obj.grid = new Object();
		obj.grid.page = paginationOptions.pageNumber;
		obj.grid.pageSize = paginationOptions.pageSize;
		
		auxServiceRole.getSubset(obj).then(function(response) {
			initGrid(response, $scope);
		}).catch(function(error) {
			initGrid(null, $scope);
			$log.error("Se produjo un error en la obtencion de roles");
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
	/** ************************************************************* */
}

//Servicio para la obtencion de roles
"use strict";
angular.module('processApp').service('auxServiceRole', auxServiceRole);
auxServiceRole.$inject = [ '$http', '$q', 'alrts', '$translate' ];
function auxServiceRole($http, $q, alrts, $translate) {
	return {
		getSubset : function(obj) { 
			return getSubset(obj);
		},
	}

	function getSubset(obj) {
		var defered = $q.defer();
		var promise = defered.promise;
		
		$http({
			url : "/Sensor/Role/externalPagination",
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