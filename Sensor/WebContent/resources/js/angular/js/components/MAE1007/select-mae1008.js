/*PERMITE SELECCIONAR UN PUERTO*/

"use strict";
angular.module('selectMAE1008', [ 'ui.bootstrap', 'messages' ]);

(function() {
	"use strict";
	angular.module("selectMAE1008").controller('modalSelectMAE1008Ctrl',
			modal_select_entity);

	modal_select_entity.$inject = [ '$scope', '$rootScope', '$uibModalInstance',
			'$http' ];
	function modal_select_entity($scope, $rootScope, $uibModalInstance, $http) {
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
		
		$rootScope.onDblClickRow = function(row) {
			$rootScope.rowSelected = new Object();
			$rootScope.rowSelected = row.entity;
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module('selectMAE1008').controller('selectMAE1008Controller',
			selectMAE1008Controller);
	selectMAE1008Controller.$inject = [ '$uibModal', '$rootScope', '$scope','$http','$interval'];
	function selectMAE1008Controller($uibModal, $rootScope, $scope, $http, $interval) {
		var vm = this;
		
		$scope.hideGrid = true;

		$scope.columns = [ {
			name : 'id',
			visible : false
		}, {
			name : 'port_name',
			width : '15%'
		}, {
			field : 'port_dsca',
			width : '20%'
		}, {
			field : 'baud',
			width : '16%',
			enableSorting : false
		}, {
			field : 'prty.dsca',
			width : '15%',
			enableSorting : false
		}, {
			field : 'bits_char',
			width : '10%',
			enableSorting : false
		}, {
			field : 'bits_stop',
			width : '10%',
			enableSorting : false
		}, {
			field : 'tout_read',
			width : '11%',
			enableSorting : false
		} ];

		$rootScope.gridOptions = {};

		$rootScope.gridOptions = {
			columnDefs : $scope.columns,
			selectionRowHeaderWidth : '2%',
			enableColumnMenus : false,

			multiSelect : false,
			enableRowSelection : true,
			enableSelectAll : false,
			enableFullRowSelection : true,
			rowTemplate : '<div style="cursor: pointer" ng-dblclick="grid.appScope.onDblClickRow(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ui-grid-cell> </div>',
			onRegisterApi : function(gridApi) {
				$scope.gridApi = gridApi;
				$interval(function() {
					$scope.gridApi.core
							.handleWindowResize();
				}, 500, 10);
			},
		};

		$http.get('MAE1008/all').success(function(data) {
			$rootScope.gridOptions.data = data;
		});

		vm.selectMAE1008 = function() {
			$scope.modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'modalSelectMAE1008Ctrl.html',
				controller : 'modalSelectMAE1008Ctrl',
				size : "lg",
				backdrop: false
			});
		}
	}
})();

angular
		.module('selectMAE1008')
		.component(
				'selectMae1008Component',
				{
					template : '<button data-toggle="tooltip" title="{{ \'GENE.PORT\' | translate }}" type="button" class="btn btn-primary" ng-click="$ctrl.selectMAE1008()"> <i class="fa fa-caret-right" aria-hidden="true"></i> </button>',
					controller : 'selectMAE1008Controller'
				});