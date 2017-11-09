/* ************** DECLARACION DE MODULOS ****************** */
angular.module("GRIDMAE1015", [ 'ui.bootstrap', 'ngTouch', 'ui.grid',
		'ui.grid.pagination', 'ui.grid.selection', 'messages' ]);

/* *********************** SERVICIOS ********************** */
"use strict";
angular.module('GRIDMAE1015').service('gridMae1015Service', gridMae1015Service);
gridMae1015Service.$inject = [ '$http' ];
function gridMae1015Service($http) { // declaramos la factory
	return {
		subset : function(pkmae1014) {
			return $http({
				url: "/WeighBridgeStandAlone/MAE1015/findAll", 
				method: "POST",
				params: {pkmae1014:pkmae1014 },
			});
		},

		inactivateWithMotivo : function(pk, moti) {
			return $http({
				url : "/WeighBridgeStandAlone/MAE1015/inactivate",
				method : "DELETE",
				params : {
					pkmae1015 : pk,
					uti1006 : moti
				},
			});
		},
	}
}

"use strict";
angular.module('GRIDMAE1015').service('mae1015ConfigurationGrid',
		mae1015ConfigurationGrid);
mae1015ConfigurationGrid.$inject = [ 'comunication', 'gridMae1015Service', '$http', '$log',
		'$uibModal', 'uiGridConstants', '$translate', '$rootScope', '$interval'];
function mae1015ConfigurationGrid(comunication, gridMae1015Service, $http, $log, $uibModal,
		uiGridConstants, $translate, $rootScope, $interval) {
	/** ********************** VARIABLES PRIVADAS ******************* */
	var paginationOptions = {
		pageNumber : 1,
		pageSize : 10,
		sort : null
	};
	var gridOptions;
	var scp; // Como alternativa a scope
	var deta, cont, remo;

	/** ************************************************************* */

	/** ********************** INTERFAZ DEL SERVICIO **************** */
	return {
		initMenuOptions : function($scope) {
			scp = $scope;
			$scope.menuOptions = new Array();
			
			deta = ['<span class="glyphicon glyphicon-zoom-in"></span>&nbsp;'+ $scope.translation['GENE.DETAIL'],$scope.detailClickRight ];
			cont = ['<span class="fa fa-object-ungroup"></span>&nbsp;'+ $scope.translation['GENE.SHOW_WEIG'],$scope.findContenContext ];
			remo = ['<span class="glyphicon glyphicon-trash"></span>&nbsp;'+ $scope.translation['GENE.REMOVE'],$scope.elim ];
			
			$scope.menuOptions.push(deta);
			$scope.menuOptions.push(cont);
			if( currentUser.dele && comunication.getOrder().stat.id == 1 ) {
				$scope.menuOptions.push(null);
				$scope.menuOptions.push(remo);
			}
		},

		initializeGridOptions : function($scope) {
			$scope.gridOptions = {
				exporterMenuCsv : true,
				enableGridMenu : true,
				enablePaginationControls: false,

				rowHeight : 22,
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
				rowTemplate : '<div style="cursor: pointer" ng-click="grid.appScope.updateCountRowSel(row)" context-menu="grid.appScope.menuOptions" ng-dblclick="grid.appScope.onDblClickRow(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ui-grid-cell> </div>'
			};

			// Evento para agregar pesadas para el item seleccionado
			$scope.onDblClickRow = function(row) {
				$scope.rowDetail = row.entity;
				modalDetailEntity($scope);
			};
			
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
			
			$scope.findContenContext = function($itemScope, $event, modelValue,
					text, $li) {
				comunication.setEvnt01($itemScope.$parent.$parent.row.entity);
			}
			
			$scope.findContenBtn = function() {
				if($scope.gridApi.selection.getSelectedCount() == 1 ) {
					comunication.setEvnt01(selectRow($scope)[0]);
				}
			}
			
			$scope.elim = function($itemScope, $event, modelValue,
					text, $li) {
				var line = $itemScope.$parent.$parent.row.entity;
				
				$rootScope.pk = line.pk;
//				if(line.pesxli.length > 0) {
//					showAlerts("GENE.ERR001");
//				}else{
					modalConfirm(scp);
//				}
			}
			
			$scope.elimBtn = function() {
				if($scope.gridApi.selection.getSelectedCount() == 1 && $rootScope.currentUser.dele) {
					var line = selectRow($scope)[0];
					$rootScope.pk = line.pk;
					modalConfirm(scp);
				}
			}
			
			$rootScope.getPageMAE105 = function(line) {
				getPage(scp, line.pk);
			}
			
			$scope.$watch(function() { return comunication.getLine_desg() }, function() {
				if( comunication.isValid(comunication.getLine_desg()) ){
					getPage(scp, comunication.getLine_desg().pk);
				}
	          }
	        );
			
			return null;
		},

		changeLangColumns : function($scope) {
			$scope.gridOptions.columnDefs = $scope.columns;
		},

		getPage : function($scope) {
			getPage($scope, comunication.getLine_desg().pk);
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
	function getPage($scope, pkmae1014) {
		gridMae1015Service.subset(pkmae1014).then(function(response) {
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
			templateUrl : $scope.modalDelete,
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
			templateUrl : 'modalDetailEntityMAE1015.html',
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