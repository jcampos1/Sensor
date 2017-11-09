/* ************** DECLARACION DE MODULOS ****************** */
angular.module("GRIDMAE1013", [ 'ui.bootstrap', 'ngTouch', 'ui.grid',
		'ui.grid.pagination', 'ui.grid.selection', 'messages', 'MAE1013Service', 'selectUTI1006', 'oitozero.ngSweetAlert' ]);

/* *********************** SERVICIOS ********************** */
"use strict";
angular.module('GRIDMAE1013').service('gridMae1013Service', crud);
crud.$inject = [ '$http' ];
function crud($http) { // declaramos la factory
	return {
		subset : function(grid, st) {
			return $http({
				url: "/WeighBridgeStandAlone/MAE1013/findOrdersByStatus", 
				method: "POST",
				params: { obj1:grid, obj2:st },
			});
		},

		inactivateWithMotivo : function(orno, moti) {
			return $http({
				url : "/WeighBridgeStandAlone/MAE1013/inactivate",
				method : "DELETE",
				params : {
					orno : orno,
					uti1006 : moti
				},
			});
		},
	}
}

"use strict";
angular.module('GRIDMAE1013').service('mae1013ConfigurationGrid',
		mae1013ConfigurationGrid);
mae1013ConfigurationGrid.$inject = [ 'comunication', '$timeout', 'gridMae1013Service', '$http', '$log',
		'$uibModal', 'uiGridConstants', '$translate', '$rootScope', 'mae1013Service', '$rootScope', 'SweetAlert', '$anchorScroll', '$interval', '$cookies', 'alrts'];
function mae1013ConfigurationGrid(comunication, $timeout, gridMae1013Service, $http, $log, $uibModal,
		uiGridConstants, $translate, $rootScope, mae1013Service, $rootScope, SweetAlert, $anchorScroll, $interval, $cookies, alrts) {
	/** ********************** VARIABLES PRIVADAS ******************* */
	var paginationOptions = {
		pageNumber : 1,
		pageSize : 10,
		sort : null
	};
	var gridOptions;
	var scp; // Como alternativa a scope
	var cer, print, prec, reto, susp, pes, anu, edit, var1;

	/** ************************************************************* */

	/** ********************** INTERFAZ DEL SERVICIO **************** */
	return {
		initMenuOptions : function($scope) {
			scp = $scope;
			// Opciones: detalle y eliminar
			cer = ['<span class="fa fa-check"></span>&nbsp;' + $scope.translation['GENE.CLOSEOR'], $scope.closeOrderContextual ];
			print = ['<span class="fa fa-print"></span>&nbsp;' + $scope.translation['GENE.PRINT_ORDR'], $scope.printOrderContextual ];
			reto = ['<span class="fa fa-toggle-on"></span>&nbsp;' + $scope.translation['GENE.RETO'], $scope.retuContextual ];
			susp = ['<span class="fa fa-toggle-off"></span>&nbsp;' + $scope.translation['GENE.SUSP'], $scope.suspendContextual ];
			pes = ['<span class="fa fa-link"></span>&nbsp;'+ $scope.translation['GENE.START_LINE'],$scope.onDblClickRowContextual ];
			prec = ['<span class="fa fa-list-ul"></span>&nbsp;'+ $scope.translation['GENE.AS_PREC'], $scope.asignPrec ];
			edit = ['<span class="glyphicon glyphicon-edit"></span>&nbsp;'+ $scope.translation['GENE.BTN_EDIT'],$scope.edit ];
			anu = ['<span class="glyphicon glyphicon-remove-circle"></span>&nbsp;'+ $scope.translation['GENE.ANUL'],$scope.checkStatus ];
			
			$scope.menuOptions = [
				[
						'<span class="glyphicon glyphicon-zoom-in"></span>&nbsp;'
								+ $scope.translation['GENE.DETAIL'],
						$scope.detailClickRight ]
			];
			
			var1 = comunication.getStat();
			if( var1!=null && (var1.id == 4 || var1.id == 5 ) ) {
				$scope.menuOptions.push(print);
			}
			
			if( var1!=null ) {
				$scope.menuOptions.push(pes);
			}
			
			if( var1!=null && var1.id == 2 ) {
				$scope.menuOptions.push(reto);
			}
			
			if( var1!=null && var1.id == 1 ) {
				$scope.menuOptions.push(susp);
			}
			
			if( var1!=null && var1.id == 1 ) {
				$scope.menuOptions.push(cer);
			}
			
			if( var1!=null && (var1.id == 0 || var1.id == 1 )  ) {
				$scope.menuOptions.push(prec);
			}
			
			if( var1 == null || (var1 != null && var1.id == 0)){
				$scope.menuOptions.push(edit);
			}
			
			if ($rootScope.currentUser.anul) {
				if( var1 == null || (var1 != null && var1.id == 0)){
					$scope.menuOptions.push(null);
					$scope.menuOptions.push(anu);
				}
			}
		},
		
		initializeGridOptions : function($scope) {
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
				rowTemplate : '<div ng-click="grid.appScope.updateCountRowSel(row)" style="cursor: pointer" context-menu="grid.appScope.menuOptions" ng-dblclick="grid.appScope.onDblClickRow(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell grow" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ui-grid-cell> </div>'
			};
			
			return null;
		},
		
		registerEvents : function($scope) {
			$scope.onDblClickRow = function(row) {
				comunication.setOrder(row.entity);
				comunication.setLine(null);
				$rootScope.openMaster();
				$timeout(function() {
					angular.element(document.querySelector('#btn-sidebar-left')).click();
				});
				$cookies.putObject("order", comunication.getOrder());
			};
			
			$scope.onDblClickRowContextual = function($itemScope, $event, modelValue,
					text, $li) {
				comunication.setOrder($itemScope.$parent.$parent.row.entity);
				comunication.setLine(null);
				$rootScope.openMaster();
				$timeout(function() {
					angular.element(document.querySelector('#btn-sidebar-left')).click();
					});
				$cookies.putObject("order", comunication.getOrder());
			};
			
			$scope.onDblClickRowBtn = function() {
				if($scope.gridApi.selection.getSelectedCount() == 1 ) {
					comunication.setOrder(selectRow($scope)[0]);
					comunication.setLine(null);
					$rootScope.openMaster();
					$timeout(function() {
						angular.element(document.querySelector('#btn-sidebar-left')).click();
					});
					$cookies.putObject("order", comunication.getOrder());
				}
			};
			
			/*Es utilizada para controlar la activación/desactivación de iconos*/
			$scope.updateCountRowSel = function(row) {
				$scope.countRowSelect = $scope.gridApi.selection.getSelectedCount();
				$scope.selectMae1013 = selectRow($scope)[0];
			};

			$scope.detailClickRight = function($itemScope, $event, modelValue,
					text, $li) {
				$scope.rowDetail = $itemScope.$parent.$parent.row.entity;
				modalDetailEntity($scope);
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
				
				var toTrans = new Array();
				toTrans.push("WBL4B.ERROR11");
				$translate(toTrans).then(function(tr) {
					if(header.stat.id != 0 && header.stat.id != 1) {
						SweetAlert.swal(tr["WBL4B.ERROR11"]);
					}else{
						mae1013Service.hasLines(header.orno).then( function (response) {
							if( response.data ) {
								showAlerts("WBL4B.ERROR12");
							}else{
								comunication.setOrdElim(header);
								modalConfirm();
							}
						})
						.catch ( function(error) {
							$log.warn(error);
						});
					}
				});
			}
			
			$scope.checkStatusBtn = function() {
				if($scope.gridApi.selection.getSelectedCount() == 1 && $rootScope.currentUser.anul) {
					var header = selectRow($scope)[0];
					var toTrans = new Array();
					toTrans.push("WBL4B.ERROR11");
					$translate(toTrans).then(function(tr) {
						if(header.stat.id != 0 && header.stat.id != 1) {
							SweetAlert.swal(tr["WBL4B.ERROR11"]);
						}else{
							mae1013Service.hasLines(header.orno).then( function (response) {
								if( response.data ) {
									showAlerts("WBL4B.ERROR12");
								}else{
									comunication.setOrdElim(header);
									modalConfirm();
								}
							})
							.catch ( function(error) {
								$log.warn(error);
							});
						}
					});
				}
			}
			
			$scope.edit = function($itemScope, $event, modelValue, text, $li) {
				if( $itemScope.$parent.$parent.row.entity.stat.id == 0 ) { 
					modalEditEntity($itemScope.$parent.$parent.row.entity);
				}else{
					showAlerts("WBL4B.ERROR015");
				}
			}
			
			$scope.editBtn = function() {
				if($scope.gridApi.selection.getSelectedCount() == 1 ) {
					var row = selectRow($scope)[0];
					if( row.stat.id == 0 ) { 
						modalEditEntity(row);
					}else{
						showAlerts("WBL4B.ERROR015");
					}
				}
			}
			
			$scope.suspendContextual = function($itemScope, $event, modelValue,
					text, $li) {
				if( $itemScope.$parent.$parent.row.entity.stat.id == 1 ) { 
					comunication.setOrder($itemScope.$parent.$parent.row.entity);
					$rootScope.selectUTI1006("SUSP");
				}else{
					showAlerts("WBL4B.ERROR08");
				}
			}
			
			$scope.suspendBtn = function() {
				if($scope.gridApi.selection.getSelectedCount() == 1) {
					if( selectRow($scope)[0].stat.id == 1 ) {
						comunication.setOrder(selectRow($scope)[0]);
						comunication.setEvnt02(true);
						$rootScope.selectUTI1006("SUSP");
					}else{
						showAlerts("WBL4B.ERROR08");
					}
				}
			}
			
			$scope.retuContextual = function($itemScope, $event, modelValue,
					text, $li) {
				if( $itemScope.$parent.$parent.row.entity.stat.id == 2) {
					mae1013Service.retu($itemScope.$parent.$parent.row.entity.orno);
				}else{
					showAlerts("WBL4B.ERROR09");
				}
			}
			
			$scope.retuBtn = function() {
				if($scope.gridApi.selection.getSelectedCount() == 1 ) {
					if( selectRow($scope)[0].stat.id == 2) {
						mae1013Service.susp(selectRow($scope)[0].orno);
					}else{
						showAlerts("WBL4B.ERROR09");
					}
				}
			}
			
			$scope.asignPrec = function ( $itemScope, $event, modelValue,
					text, $li ) {
				comunication.setData01($itemScope.$parent.$parent.row.entity);
			}
			
			/* ***********ESCUCHADORES ************ */
			$scope.$watch(function() { return comunication.getMot_03() }, function() {
				if( comunication.isValid(comunication.getMot_03()) ){
					mae1013Service.susp(comunication.getOrder().orno, comunication.getMot_03());
					comunication.setMot_03(null);
				}
	          }
	        );
			
			$scope.$watch(function() { return comunication.getGrid1013() }, function() {
				if( comunication.isValid(comunication.getGrid1013()) ){
					getPage(scp, scp.st);
					comunication.setGrid1013(null);
				}
	          }
	        );
			
			//Procedimiento a seguir una vez seleccionado el motivo de anulación
			$scope.$watch(function() { return comunication.getMot_04() }, function() {
				if( comunication.isValid(comunication.getMot_04()) ){
					mae1013Service.inactivateWithMotivo(comunication.getOrdElim().orno, comunication.getMot_04())
					.then(function successCallback(response) {
						alrts.successMsg("GENE.RGTR_SUPR");
						comunication.setGrid1013("grid1013");
						comunication.setRelWdgts("relWdgts");
					},function errorCallback(response) {
					});
					comunication.setMot_04(null);
				}
	        });
			/* ************************************ */
			return null;
		},

		changeLangColumns : function($scope) {
			$scope.gridOptions.columnDefs = $scope.columns;
		},

		getPage : function($scope) {
			getPage($scope, $scope.st);
		},
		
		registerPaginationChanged : function($scope) {
			$scope.gridOptions.onRegisterApi = function(gridApi) {
				$scope.gridApi = gridApi;
				windowsGridResize( );
			};
			return null;
		},
		
		eventSearch : function($scope) {
			$scope.search = function() {
				getPage($scope, $scope.st);
			};
		}
	}
	/** ************************************************************* */

	/** ********************** FUNCIONES PRIVADAS ******************* */
	
	function getPage($scope, st) {
		var applConfig = new Object();
		var GridParameters = new Object();
		GridParameters.page = paginationOptions.pageNumber;
		GridParameters.pageSize = paginationOptions.pageSize;
		GridParameters.text_find = $scope.text;
		GridParameters.search_fields = $scope.search_fields;
		applConfig.grid = GridParameters;
		
		gridMae1013Service.subset(applConfig, st).then(function(response) {
			initGrid(response, $scope);
		})
		 .catch(function(error) {
        	initGrid(null, $scope);
        });
		$scope.countRowSelect = $scope.gridApi.selection.getSelectedCount();
	}
	
	function initGrid(json, $scope) {
		if (json.data.listData) {
			$scope.gridOptions.data = json.data.listData;
			$scope.gridOptions.totalItems = json.data.totalActive;
		} else {
			$scope.gridOptions.data = [];
			$scope.gridOptions.totalItems = 0;
		}
		$scope.countRowSelect = 0;
	}

	function inactivate($scope) {
		modalConfirm(scp);
	}

	function modalConfirm() {
		var modalInstance = $uibModal.open({
			animation : true,
			templateUrl : 'myModalContent.html',
			controller : scp.controllerDelete,
			size : "sm"
		});
		modalInstance.result.then(function(selectedItem) { // Se confirma

		}, function() {
		});
	}
	
	function modalEditEntity(mae1013) {
		var modalInstance = $uibModal.open({
			animation : true,
			templateUrl : 'modalEditMAE1013.html',
			controller : scp.controllerEdition,
			size : "md",
			resolve : {
				mae1013 : function() {
					return mae1013;
				}
			}
		});
		modalInstance.result.then(function() {
		}, function() { // Se cancela la eliminacion
		});
	}

	function modalDetailEntity($scope) {
		var modalInstance = $uibModal.open({
			animation : true,
			templateUrl : 'modalDetailEntity.html',
			controller : $scope.controllerDetail,
			size : "lg",
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
	
	function showInfo(toTraslate) {
		var toTrans = new Array();
		toTrans.push(toTraslate);
		$translate(toTrans).then(function(tr) {
			SweetAlert.swal({
				  title: "Info!",
				  text: tr[toTraslate],
				  type: "info",
				  confirmButtonText: "Ok"
				});
		});
	}
	
	function selectRow($scope) {
		return $scope.gridApi.selection.getSelectedRows();
	}
	
	function windowsGridResize ( ) {
		$interval( function() {
			scp.gridApi.core.handleWindowResize();
		}, 12, 502);
	}
	/** ************************************************************* */
}