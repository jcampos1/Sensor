"use strict";
angular.module('processApp').service('GridSelectTypesensor',
		GridSelectTypesensor);
GridSelectTypesensor.$inject = [ '$log',
		'uiGridConstants', '$translate', 'auxServiceTypesensor', 'comunication'];
function GridSelectTypesensor($log, uiGridConstants, $translate, auxServiceTypesensor, comunication) {
	/** ********************** VARIABLES PRIVADAS ******************* */
	var paginationOptions = {
		pageNumber : 1,
		pageSize : 10,
		sort : null
	};
	/** ************************************************************* */

	/** ********************** INTERFAZ DEL SERVICIO **************** */
	return {
		initializeGridOptions : function($scope, $uibModalInstance) {
			$scope.gridOptions = {
				enableGridMenu : true,
				paginationPageSizes : [ 10, 20, 50 ],
				paginationPageSize : paginationOptions.pageSize,
				useExternalPagination : true,

				rowHeight : 30,
				showGridFooter : true,
				columnDefs : $scope.columns,

				selectionRowHeaderWidth : '4%',

				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
				enableColumnMenus : false,
				minRowsToShow : 11,

				multiSelect : false,
				enableRowSelection : true,
				enableSelectAll : false,
				enableFullRowSelection : true,
				rowTemplate : '<div ng-dblclick="grid.appScope.typesensorSelected(row)" style="cursor: pointer" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ui-grid-cell> </div>'
			};

			
			//Acciona la seleccion de tipo de sensor
			$scope.typesensorSelected = function(row) {
				//Guarda tipo de sensor a asociar a entidad (Por ejemplo a entidad sensor)
				comunication.setData12(row.entity);
				$uibModalInstance.dismiss(false);
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
	
	//Obtiene lista de tipos de sensores
	function getPage($scope) {
		var obj = new Object();
		obj.grid = new Object();
		obj.grid.page = paginationOptions.pageNumber;
		obj.grid.pageSize = paginationOptions.pageSize;
		
		auxServiceTypesensor.getSubset(obj).then(function(response) {
			initGrid(response, $scope);
		}).catch(function(error) {
			initGrid(null, $scope);
			$log.error("Se produjo un error en la obtencion de tipo de sensores");
        });
	}

	//Carga grilla con motivos
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

//Servicio para la obtencion de tipos de sensores
"use strict";
angular.module('processApp').service('auxServiceTypesensor', auxServiceTypesensor);
auxServiceTypesensor.$inject = [ '$http', '$q', 'alrts', '$translate' ];
function auxServiceTypesensor($http, $q, alrts, $translate) {
	return {
		getSubset : function(obj) { 
			return getSubset(obj);
		},
	}

	function getSubset(obj) {
		var defered = $q.defer();
		var promise = defered.promise;
		
		$http({
			url : "/Sensor/Typesensor/externalPagination",
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