/* ************** DECLARACION DE MODULOS ****************** */
angular.module("adminModule", [ 'ui.bootstrap', 'ngTouch', 'ui.grid',
		'ui.grid.pagination', 'ui.grid.selection', 'messages', 'oitozero.ngSweetAlert' ]);

/* *********************** SERVICIOS ********************** */
"use strict";
angular.module('adminModule').service('adminService', crud);
crud.$inject = [ '$http', '$q' ];
function crud($http, $q) { // declaramos la factory
	var path;
	var path_appl_conf = "appl_conf";

	return {
		setEntity : function(master) {
			path = "/WeighBridgeStandAlone/" + master;
			return null;
		},

		getEntity : function() {
			return path;
		},

		setTittle : function($scope, data) {
			$scope.tittle = data;
		},

		all : function() {
			return $http.get(path);
		},

		subset : function(entity) {
			return $http.post(path + "/subset", entity);
		},

		subsetListData : function(entity) {
			return $http.post(path + "/subsetListData", entity);
			;
		},

		saveOrUpdate : function(entity) {
			return $http.post(path + "/create", entity);
		},

		inactivate : function($scope) {
			var ids = new Array();
			ids = idsDelete($scope);
			return $http['delete'](path + "/inactivate", {
				data : ids,
				headers : {
					"Content-Type" : "application/json;charset=utf-8"
				}
			});
		},

		inactivateWithMotivo : function(orno, moti) {
			return $http({
				url : path + "/inactivate",
				method : "DELETE",
				params : {
					orno : orno,
					uti1006 : moti
				},
			});
		},

		remove : function($scope) {
			var ids = new Array();
			ids = idsDelete($scope);

			return $http['delete'](path + "/delete", {
				data : ids,
				headers : {
					"Content-Type" : "application/json;charset=utf-8"
				}
			});
		},

		getMasterConfig : function(mstrEnum) {
			return $http.post("/WeighBridgeStandAlone/master/config", mstrEnum);
		},
	}

	function idsDelete($scope) {
		var entities = $scope.gridApi.selection.getSelectedRows();
		var text = new Array();

		entities.forEach(function(x) {
			var elem = new Object();
			elem.id = x.id;
			text.push(elem);
		});
		return text;
	}

	function getRowSelected($scope) {
		var entities = $scope.gridApi.selection.getSelectedRows();
		var orno = new Object();;

		entities.forEach(function(x) {
			orno = x;
		});
		return orno;
	}
}

"use strict";
angular.module('adminModule').service('basicConfigurationGrid',
		bConfigurationGrid);
bConfigurationGrid.$inject = [ 'comunication', 'adminService', '$http', '$log', '$uibModal',
		'uiGridConstants', '$translate', '$rootScope', 'SweetAlert', '$timeout', '$interval' ];
function bConfigurationGrid(comunication, adminService, $http, $log, $uibModal,
		uiGridConstants, $translate, $rootScope, SweetAlert, $timeout, $interval) {
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
		initMenuOptions : function($scope, opc) {
			scp = $scope;
			switch (opc) {
			case 0:
				$scope.menuOptions = [ [
						'<span class="glyphicon glyphicon-zoom-in"></span>&nbsp;'
								+ $scope.translation['GENE.DETAIL'],
						$scope.detailClickRight ],
						];

				break;

			// MENU PARA CABECERA ORDEN DE PESAJE
			case 1:
				$scope.menuOptions = [
						[
								'<span class="glyphicon glyphicon-zoom-in"></span>&nbsp;'
										+ $scope.translation['GENE.DETAIL'],
								$scope.detailClickRight ],
								
						[
							'<span class="fa fa-link"></span>&nbsp;'
									+ $scope.translation['GENE.START_LINE'],
									$scope.onDblClickRowContextual ],
									
						[
							'<span class="fa fa-check"></span>&nbsp;'
									+ $scope.translation['GENE.CLOSEOR'],
									$scope.closeOrderContextual ]
								
						];
				
				if ($rootScope.currentUser.anul) {
					$scope.menuOptions.push(null);
					$scope.menuOptions.push([
							'<span class="glyphicon glyphicon-remove-circle"></span>&nbsp;'
									+ $scope.translation['GENE.ANUL'],
									$scope.checkStatus ]);
				}

				break;

			default:
				$scope.menuOptions = [
						[
								'<span class="glyphicon glyphicon-zoom-in"></span>&nbsp;'
										+ $scope.translation['GENE.DETAIL'],
								$scope.detailClickRight ],
						null, // Dividier
						[
								'<span class="glyphicon glyphicon-trash"></span>&nbsp;'
										+ $scope.translation['GENE.REMOVE'],
								inactivate ] ];
				break;
			}
		},

		updateScope : function($scope) {
			scp = $scope;
		},

		initializeGridOptions : function($scope, editable, openMaster,
				selectAll) {
			if (editable) {
				if (selectAll) {
					$scope.gridOptions = {
						useExternalSorting : true,

						exporterMenuCsv : true,
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

						multiSelect : true,
						enableRowSelection : true,
						enableSelectAll : true,
						enableFullRowSelection : true,
						rowTemplate : '<div style="cursor: pointer" context-menu="grid.appScope.menuOptions" ng-dblclick="grid.appScope.onDblClickRow(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell grow" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ui-grid-cell> </div>'
					};
				} else {
					$scope.gridOptions = {
						useExternalSorting : true,

						exporterMenuCsv : true,
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
						enableSelectAll : true,
						enableFullRowSelection : true,
						rowTemplate : '<div ng-click="grid.appScope.updateCountRowSel(row)" style="cursor: pointer" context-menu="grid.appScope.menuOptions" ng-dblclick="grid.appScope.onDblClickRow(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell grow" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ui-grid-cell> </div>'
					};
				}
			} else {
				$scope.gridOptions = {
					useExternalSorting : true,
					exporterMenuCsv : true,
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
					rowTemplate : '<div style="cursor: pointer" context-menu="grid.appScope.menuOptions" ng-dblclick="grid.appScope.onDblClickRowDetail(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ui-grid-cell> </div>'
				};
			}

			if (openMaster) {
				// Evento para la edición de la entidad seleccionada
				$scope.onDblClickRow = function(row) {
					comunication.setOrder(row.entity);
//					$rootScope.row_selected = row.entity;
					$rootScope.openMaster();
					$timeout(function() {
					angular.element(document.querySelector('#btn-sidebar-left')).click();
					});
				};
				
				$scope.onDblClickRowContextual = function($itemScope, $event, modelValue,
						text, $li) {
					
//					$rootScope.row_selected = $itemScope.$parent.$parent.row.entity;
					comunication.setOrder($itemScope.$parent.$parent.row.entity);
					$rootScope.openMaster();
					$timeout(function() {
						angular.element(document.querySelector('#btn-sidebar-left')).click();
						});
				};
				
				$scope.onDblClickRowBtn = function() {
					if($scope.gridApi.selection.getSelectedCount() == 1 ) {
						comunication.setOrder(selectRow($scope)[0]);
//						$rootScope.row_selected = selectRow($scope)[0];
						$rootScope.openMaster();
						$timeout(function() {
							angular.element(document.querySelector('#btn-sidebar-left')).click();
							});
					}
				};
				
				$scope.updateCountRowSel = function(row) {
					$scope.countRowSelect = $scope.gridApi.selection.getSelectedCount();
				};
			} else {
				// Evento para la edición de la entidad seleccionada
				$scope.onDblClickRow = function(row) {
					$scope.rowEdit = row.entity;
					modalEditEntity($scope);
				};
			}

			// Evento para ver detalle de la entidad seleccionada
			$scope.onDblClickRowDetail = function(row) {
				$scope.rowDetail = row.entity;
				modalDetailEntity($scope);
			};
			
			$scope.detailClickRight = function($itemScope, $event, modelValue,
					text, $li) {
				$scope.onDblClickRowDetail($itemScope.$parent.$parent.row);
			}
			
			$scope.detailBtn = function() {
				if($scope.gridApi.selection.getSelectedCount() == 1 ) {
					$scope.rowDetail = selectRow($scope)[0];
					modalDetailEntity($scope);
				}
			}
			
			$scope.checkStatus = function($itemScope, $event, modelValue,
					text, $li) {
				var header = $itemScope.$parent.$parent.row.entity;
				$rootScope.orno = header.orno;
				
				var toTrans = new Array();
				toTrans.push("WBL4B.ERROR01");
				toTrans.push("WBL4B.ERROR02");
				$translate(toTrans).then(function(tr) {
					if(header.stat.id == 2) {
						SweetAlert.swal(tr["WBL4B.ERROR01"]);
					}else{
						if(header.stat.id == 4) {
							SweetAlert.swal(tr["WBL4B.ERROR02"]);
						}else{
							modalConfirm(scp);
						}
					}
				});
			}
			
			$scope.checkStatusBtn = function() {
				if($scope.gridApi.selection.getSelectedCount() == 1 && $rootScope.currentUser.anul) {
					var header = selectRow($scope)[0];
					$rootScope.orno = header.orno;
					
					var toTrans = new Array();
					toTrans.push("WBL4B.ERROR01");
					toTrans.push("WBL4B.ERROR02");
					$translate(toTrans).then(function(tr) {
						if(header.stat.id == 2) {
							SweetAlert.swal(tr["WBL4B.ERROR01"]);
						}else{
							if(header.stat.id == 4) {
								SweetAlert.swal(tr["WBL4B.ERROR02"]);
							}else{
								modalConfirm(scp);
							}
						}
					});
				}
			}

			return null;
		},

		changeLangColumns : function($scope) {
			$scope.gridOptions.columnDefs = $scope.columns;
		},

		getPage : function($scope, mstrEnum) {
			serverRequest($scope, mstrEnum);
		},

		registerPaginationChanged : function($scope) {
			$scope.gridOptions.onRegisterApi = function(gridApi) {
				$scope.gridApi = gridApi;
				windowsGridResize( );
				gridApi.pagination.on.paginationChanged($scope, function(
						newPage, pageSize) {
					paginationOptions.pageNumber = newPage;
					paginationOptions.pageSize = pageSize;
					getMasterConfig($scope, $scope.mstr);
				});
				$scope.gridApi.core.on.sortChanged($scope, $scope.sortChanged);
			};
			return null;
		},
		eventSearch : function($scope) {
			$scope.search = function() {
				getMasterConfig($scope, $scope.mstr);
			};
		},
		eventSortingExternal : function($scope) {
			$scope.sortChanged = function(grid, sortColumns) {
				$scope.lstOrder = new Array();
				var ind = 0;
				sortColumns.forEach(function(column) {
					var order = new Object();
					order.id = ind;
					order.name = column.name;
					order.typeSorting = column.sort.direction;
					$scope.lstOrder.push(order);
					ind = ind + 1;
				});
				getMasterConfig($scope, $scope.mstr);
			}
		},
	}
	/** ************************************************************* */

	/** ********************** FUNCIONES PRIVADAS ******************* */
	function getPage($scope) {
		serverRequest($scope);
	}

	function inactivate($scope) {
		modalConfirm(scp);
	}

	function initGrid(json, $scope) {
		if (json.listData) {
			$scope.gridOptions.data = json.listData;
			$scope.gridOptions.totalItems = json.totalActive;
			// $scope.gridApi.selection.clearSelectedRows();
		} else {
			$scope.gridOptions.data = [];
			$scope.gridOptions.totalItems = 0;
			// $scope.gridApi.selection.clearSelectedRows();
		}
	}

	function sendSubset($scope, applConfig) {
		adminService
				.subset(applConfig)
				.then(
						function successCallback(response) {
							$scope.gridOptions.paginationPageSize = applConfig.grid.pageSize;

							var i = 2;
							angular
									.forEach(
											applConfig.grid.orders,
											function(ordr) {
												angular
														.forEach(
																$scope.columns,
																function(col) {
																	if (ordr.name == col.name) {
																		col.sort = new Object();
																		if (ordr.typeSorting == "asc") {
																			col.sort.direction = uiGridConstants.ASC;

																		} else {
																			col.sort.direction = uiGridConstants.DESC;
																		}
																		col.sort.priority = i;
																		i++;
																	}
																});
											});

							$scope.gridOptions.columnDefs = $scope.columns;
							initGrid(response.data, $scope);
						},
						function errorCallback(response) {
							$log
									.info("sendSubset. method serverRequest. Status: "
											+ response.status);
						});
	}

	function getSubsetListData($scope, applConfig) {
		adminService
				.subsetListData(applConfig)
				.then(
						function successCallback(response) {
							$scope.gridOptions.paginationPageSize = applConfig.grid.pageSize;
							var i = 2;
							angular
									.forEach(
											applConfig.grid.orders,
											function(ordr) {
												angular
														.forEach(
																$scope.columns,
																function(col) {
																	if (ordr.name == col.name) {
																		col.sort = new Object();
																		if (ordr.typeSorting == "asc") {
																			col.sort.direction = uiGridConstants.ASC;

																		} else {
																			col.sort.direction = uiGridConstants.DESC;
																		}
																		col.sort.priority = i;
																		i++;
																	}
																});
											});
							$scope.gridOptions.columnDefs = $scope.columns;
							initGrid(response.data, $scope);
						},
						function errorCallback(response) {
							$log
									.info("getSubsetListData. method serverRequest. Status: "
											+ response.status);
						});
	}

	function getMasterConfig($scope, mstrEnum) {
		var applConfig = new Object();
		var GridParameters = new Object();
		GridParameters.page = paginationOptions.pageNumber;
		GridParameters.pageSize = paginationOptions.pageSize;
		GridParameters.text_find = $scope.text;
		GridParameters.orders = $scope.lstOrder;
		GridParameters.search_fields = $scope.search_fields;
		applConfig.mstr = mstrEnum;
		applConfig.grid = GridParameters;

		sendSubset($scope, applConfig);
	}

	function serverRequest($scope, mstrEnum) {
		mstrEnum = scp.mstr;
		adminService.getMasterConfig(mstrEnum).then(
				function successCallback(response) {
					var applConfig = new Object();
					var GridParameters = new Object();
					if (response.status == "204") {
						getMasterConfig($scope, mstrEnum);
					} else {
						GridParameters = response.data;
						GridParameters.search_fields = $scope.search_fields;
						applConfig.mstr = mstrEnum;
						applConfig.grid = GridParameters;
						getSubsetListData($scope, applConfig);
					}
				},
				function errorCallback(response) {
					$log.info("Method serverRequest. Status: "
							+ response.status);
				});
	}

	function modalConfirm($scope) {
		var modalInstance = $uibModal.open({
			animation : true,
			templateUrl : 'myModalContent.html',
			controller : $scope.controllerDelete,
			size : "sm",
			resolve : {
				parentScope : function() {
					return $scope;
				}
			}
		});
		modalInstance.result.then(function(selectedItem) { // Se confirma

		}, function() {
			// $log.info('Modal dismissed at: ' + new Date());
		});
	}
	function modalEditEntity($scope) {
		var size;
		switch ($scope.size) {
		case "sm":
			size = "sm";
			break;
		case "md":
			size = "md";
			break;
		default:
			size = "lg";
			break;
		}

		var modalInstance = $uibModal.open({
			animation : true,
			templateUrl : 'modalEditEntity.html',
			controller : $scope.controllerEdition,
			size : size,
			resolve : {
				parentScope : function() {
					return $scope;
				}
			}
		});
		modalInstance.result.then(function() {
			if ($scope.isEmit) {
				$scope.$broadcast($scope.evt_recept, 1);
			}
		}, function() { // Se cancela la eliminacion
		});
	}

	function modalDetailEntity($scope) {
		var size;
		switch ($scope.size) {
		case "sm":
			size = "sm";
			break;
		case "md":
			size = "md";
			break;
		default:
			size = "lg";
			break;
		}
		var modalInstance = $uibModal.open({
			animation : true,
			templateUrl : 'modalDetailEntity.html',
			controller : $scope.controllerDetail,
			size : size,
			resolve : {
				parentScope : function() {
					return $scope;
				}
			}
		});
		modalInstance.result.then(function() {
		}, function() {
		});
	}
	
	function windowsGridResize ( ) {
		$interval( function() {
			scp.gridApi.core.handleWindowResize();
		}, 12, 502);
	}
	
	function selectRow($scope) {
		return $scope.gridApi.selection.getSelectedRows();
	}
	;
	/** ************************************************************* */
}

"use strict";
angular.module('adminModule').service('basicConfig', basicConfig);
function basicConfig() { // declaramos la factory
	var entity;
	return {
		setEntity : function(ent) {
			entity = ent;
			return null;
		},
		getEntity : function() {
			return entity;
		}
	}
}