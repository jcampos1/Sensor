/* ************** DECLARACION DE MODULOS ****************** */
angular.module("GRIDMAE1014", [ 'ui.bootstrap', 'ngTouch', 'ui.grid',
		'ui.grid.pagination', 'ui.grid.selection', 'messages', 'MAE1014Service', 'selectUTI1006', 'oitozero.ngSweetAlert', 'SimulatorService', 'MAE1015Service' ]);

/* *********************** SERVICIOS ********************** */
"use strict";
angular.module('GRIDMAE1014').service('gridMae1014Service', crud);
crud.$inject = [ '$http' ];
function crud($http) { // declaramos la factory
	return {
		subset : function(orno) {
			return $http({
				url: "/WeighBridgeStandAlone/MAE1014/findAll", 
				method: "POST",
				params: { orno:orno },
			});
		},

		inactivateWithMotivo : function(pk, moti) {
			return $http({
				url : "/WeighBridgeStandAlone/MAE1014/inactivate",
				method : "DELETE",
				params : {
					pkmae1014 : pk,
					uti1006 : moti
				},
			});
		},
	}
}

"use strict";
angular.module('GRIDMAE1014').service('mae1014ConfigurationGrid',
		mae1014ConfigurationGrid);
mae1014ConfigurationGrid.$inject = [ 'comunication', 'gridMae1014Service', '$http', '$log',
		'$uibModal', 'uiGridConstants', '$translate', '$rootScope', 'mae1014Service', '$rootScope', 'SweetAlert', '$anchorScroll', '$location', 'wbl4bService', '$interval', 'mae1015Service'];
function mae1014ConfigurationGrid(comunication, gridMae1014Service, $http, $log, $uibModal,
		uiGridConstants, $translate, $rootScope, mae1014Service, $rootScope, SweetAlert, $anchorScroll, $location, wbl4bService, $interval, mae1015Service) {
	/** ********************** VARIABLES PRIVADAS ******************* */
	var paginationOptions = {
		pageNumber : 1,
		pageSize : 10,
		sort : null
	};
	var gridOptions;
	var scp, line_nodesp; // Como alternativa a scope
	var det, stwe, node, desg, edit, remo, ord;

	/** ************************************************************* */

	/** ********************** INTERFAZ DEL SERVICIO **************** */
	return {
		initMenuOptions : function($scope) {
			scp = $scope;
			$scope.menuOptions = new Array();
			
			det = ['<span class="glyphicon glyphicon-zoom-in"></span>&nbsp;'+ $scope.translation['GENE.DETAIL'],$scope.detailClickRight ];
			stwe = ['<span class="fa fa-life-ring"></span>&nbsp;'+ $scope.translation['GENE.START_WE'],$scope.onDblClickRowContextual ];
			node = ['<span class="glyphicon glyphicon-check"></span>&nbsp;'+ $scope.translation['MAE1014.NODESP'],$scope.motivos ];
			desg = ['<span class="glyphicon glyphicon-th-list"></span>&nbsp;'+ $scope.translation['MAE1014.DESG_P'],$scope.desglose ];
			edit = ['<span class="glyphicon glyphicon-edit"></span>&nbsp;'+ $scope.translation['GENE.BTN_EDIT'],$scope.edit ];
			remo = ['<span class="glyphicon glyphicon-trash"></span>&nbsp;'+ $scope.translation['GENE.REMOVE'],$scope.checkLine ];
			
			ord = comunication.getOrder();
			
			$scope.menuOptions.push(det);
			
			if( ord.confpe ) {
				if( currentUser.pesaje && ord.stat.id == 1 ) {
					$scope.menuOptions.push(stwe);
					$scope.menuOptions.push(node);
				}
				$scope.menuOptions.push(desg);
			}else{
				if( currentUser.ornd && ( ord.stat.id == 0 || ord.stat.id == 1 )) {
					$scope.menuOptions.push(edit);
					$scope.menuOptions.push(remo);
				}
			}
		},

		initializeGridOptions : function($scope) {
			$scope.gridOptions = {
				exporterMenuCsv : true,
				enableGridMenu : true,
				useExternalPagination : false,
				enablePaginationControls: false,

				rowHeight : 25,
				showGridFooter : true,
				columnDefs : $scope.columns,

				selectionRowHeaderWidth : '2%',

				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
				enableColumnMenus : false,
				minRowsToShow : 8,

				multiSelect : false,
				enableRowSelection : true,
				enableSelectAll : true,
				enableFullRowSelection : true,
				rowTemplate : '<div ng-click="grid.appScope.updateCountRowSel(row)" ng-dblclick="grid.appScope.onDblClickRow(row)" context-menu="grid.appScope.menuOptions" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell grow class03" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ui-grid-cell> </div>'
			};
			
			// Evento para agregar pesadas para el item seleccionado
			$scope.onDblClickRow = function(row) {
				if ( $rootScope.mae1013.stat.id == 0 || $rootScope.mae1013.stat.id == 1) {
					$scope.$emit('to_mae1010');
					$rootScope.clearMAE1015();
					comunication.setLine(row.entity);
					comunication.setEvnt04(true);
					$location.hash('ctrl-pesaje');
				    $anchorScroll();
				    if( !row.entity.item.iscont || scp.par1001.pescon ) { 
				    	wbl4bService.runSimulator($rootScope.getDisp());
				    }
				}
			};
			
			$scope.onDblClickRowBtn = function() {
				if($scope.gridApi.selection.getSelectedCount() == 1 ) {
					$scope.$emit('to_mae1010');
					$rootScope.clearMAE1015();
					var row = selectRow($scope)[0];
					comunication.setLine(row);
					comunication.setEvnt04(true);
					$location.hash('ctrl-pesaje');
				    $anchorScroll();
				    if( !row.item.iscont || scp.par1001.pescon ) { 
				    	wbl4bService.runSimulator($rootScope.getDisp());
				    }
				}
			};
			
			$scope.onDblClickRowContextual = function($itemScope, $event, modelValue,
					text, $li) {
					$scope.$emit('to_mae1010');
					$rootScope.clearMAE1015();
					var row = $itemScope.$parent.$parent.row.entity;
					comunication.setLine(row);
					comunication.setEvnt04(true);
					$location.hash('ctrl-pesaje');
				    $anchorScroll();
				    if( !row.item.iscont || scp.par1001.pescon ) { 
				    	wbl4bService.runSimulator($rootScope.getDisp());
				    }
			};
			
			$scope.motivos = function($itemScope, $event, modelValue,
					text, $li) {
				$scope.row_selected = $itemScope.$parent.$parent.row.entity;
				processMotivos($scope);
			}
			
			$scope.motivosBtn = function() {
				if($scope.gridApi.selection.getSelectedCount() == 1 ) {
					$scope.row_selected = selectRow($scope)[0];
					processMotivos($scope);
				}
			}
			
			$scope.checkLine = function($itemScope, $event, modelValue,
					text, $li) {
				var line = $itemScope.$parent.$parent.row.entity;
				
				comunication.setLine_dele(line);
				if(line.pesxli.length > 0) {
					showAlerts("GENE.ERR001");
				}else{
					modalConfirm(scp);
				}
			}
			
			$scope.checkLineBtn = function() {
				if($scope.gridApi.selection.getSelectedCount() == 1 ) {
					var line = selectRow($scope)[0];
					comunication.setLine_dele(line);
					if(line.pesxli.length > 0) {
						showAlerts("GENE.ERR001");
					}else{
						modalConfirm(scp);
					}
				}
			}
			
			$scope.edit = function($itemScope, $event, modelValue,
					text, $li) {
				$scope.rowEdit = $itemScope.$parent.$parent.row.entity;
				if($scope.rowEdit.pesxli.length > 0) {
					showAlerts("GENE.ERR001");
				}else{
					modalEditEntity($scope);
				}
			}
			
			$scope.editBtn = function() {
				if($scope.gridApi.selection.getSelectedCount() == 1 ) {
					$scope.rowEdit = selectRow($scope)[0];
					if($scope.rowEdit.pesxli.length > 0) {
						showAlerts("GENE.ERR001");
					}else{
						modalEditEntity($scope);
					}
				}
			}
			
			/*Es utilizada para controlar la activación/desactivación de iconos*/
			$scope.updateCountRowSel = function(row) {
					$scope.countRowSelect = $scope.gridApi.selection.getSelectedCount();
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
			
			$scope.desglose = function($itemScope, $event, modelValue,
					text, $li) {
				processDesglose($itemScope.$parent.$parent.row.entity);
			}
			
			$scope.desgloseBtn = function() {
				if($scope.gridApi.selection.getSelectedCount() == 1 ) {
					processDesglose(selectRow($scope)[0]);
				}
			}
			
			$rootScope.confirmNoDesp = function(motivo) {
				mae1014Service.confirmNoDesp($scope.row_selected, motivo, $scope);
			}
			
			$rootScope.reloadGrid = function($scope) {
				getPage($scope, comunication.getOrder().orno);
			}
			
			$rootScope.reloadMAE1014 = function() {
				getPage(scp, comunication.getOrder().orno);
			}
			
			// ESCUCHADORES
			$scope.$on('reload_gridmae1014', function(event, data) 
			{
				getPage(scp, comunication.getOrder().orno);
			});
			
			$scope.$watch(function() { return comunication.getMot_nodesp() }, function() {
				if( comunication.isValid(comunication.getMot_nodesp()) ) {
					mae1014Service.confirmNoDesp(line_nodesp, comunication.getMot_nodesp(), $scope);
					comunication.setMot_nodesp(null);
				}
	          }
	        );

			return null;
		},

		changeLangColumns : function($scope) {
			$scope.gridOptions.columnDefs = $scope.columns;
		},

		getPage : function($scope, orno) {
			getPage($scope, orno);
		},
		
		getPage2 : function(orno) {
			getPage(scp, orno);
		},

		registerPaginationChanged : function($scope) {
			$scope.gridOptions.onRegisterApi = function(gridApi) {
				$scope.gridApi = gridApi;
				windowsGridResize( );
			};
			return null;
		},
	}
	/** ************************************************************* */

	/** ********************** FUNCIONES PRIVADAS ******************* */
	
	function processMotivos($scope) {
		mae1015Service.hasDesglose( $scope.row_selected ).then( function( response ) {
			if( response.data ) {
				showAlerts("GENE.ERR001");
			}else{
				if( !$scope.row_selected.despac ) {
					mae1014Service.confirmDesp($scope.row_selected, $scope);
				}else{
					line_nodesp = $scope.row_selected;
					$rootScope.selectUTI1006("CONF");
				}
			}
		})
		.catch(function(error) {
			$log.error(error);
		});
	}
	
	function processDesglose(line) {
		if(line.pesxli.length > 0) {
			comunication.setLine_desg(line);
			$location.hash('mstr_mae1015');
		    $anchorScroll();
		}else{
			showInfo("GENE.ALRT001");
		}
	}
	
	function getPage($scope, orno) {
		gridMae1014Service.subset(orno).then(function(response) {
			initGrid(response, $scope);
		})
		 .catch(function(error) {
        	initGrid(null, $scope);
        });
	}
	
	function initGrid(json, $scope) {
		if (json.data) {
			$scope.gridOptions.data = json.data;
		} else {
			$scope.gridOptions.data = [];
		}
		$scope.countRowSelect = 0;
	}

	function inactivate($scope) {
		modalConfirm(scp);
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
		}, 10, 500);
	}
	/** ************************************************************* */
}