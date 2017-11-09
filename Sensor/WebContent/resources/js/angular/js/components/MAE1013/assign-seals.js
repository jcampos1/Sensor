/*GESTIONA LA ASIGNACIÓN DE LOS PRECINTOS*/

"use strict";
angular.module('assignSeals', [ 'ui.bootstrap', 'messages', 'ngTouch' ]);

(function() {
	"use strict";
	angular.module("assignSeals").controller('modalAssignSealsCtrl',
			modalAssignSealsCtrl);

	modalAssignSealsCtrl.$inject = [ '$scope', '$uibModalInstance', 'vm', 'assignSealsService' ];
	function modalAssignSealsCtrl($scope, $uibModalInstance, vm, assignSealsService) {
		
		$scope.submitPrecForm = function(prec0,prec1,prec2,prec3,prec4){
			var prec = prec0+"-"+prec1+"-"+prec2+"-"+prec3+"-"+prec4;
			vm.prec = prec;
			assignSealsService.saveOrUpdateSeals(vm.orno, prec).then(function(response) {
				assignSealsService.show(0);
				$uibModalInstance.dismiss(false);
			 })
	        .catch(function(error) {
	        	console.log(error);
	        });
		}
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module('assignSeals').controller('assignSealsController',
			assignSealsController);
	assignSealsController.$inject = [ '$uibModal', '$rootScope', '$scope',
			'$http', '$interval' ];
	function assignSealsController($uibModal, $rootScope, $scope, $http,
			$interval) {
		var vm = this;
		vm.assignSeals = function() {
			$scope.modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'modalAssignSealsCtrl.html',
				controller : 'modalAssignSealsCtrl',
				size : "lg",
				backdrop: false,
				resolve: {
			    	vm: function()
			        {
			          	return vm;
			        }
			    }
			});
		}
	}
})();

"use strict";
angular.module('assignSeals').service('assignSealsService', assignSealsService);
assignSealsService.$inject = [ '$http', '$q', 'alrts', '$translate' ];
function assignSealsService($http, $q, alrts, $translate) {
	return {
		saveOrUpdateSeals: function(orno, prec) {
			return saveOrUpdateSeals(orno, prec);
		},
	}
	
	function saveOrUpdateSeals(orno, prec) {
		var defered = $q.defer();
		var promise = defered.promise;
		$http({
			url: "/WeighBridgeStandAlone/MAE1013/assignSeals", 
			method: "POST",
			params: {orno:orno, prec:prec},
		}).success(function(data){
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function showMsg(opc) {
		switch(opc) {
		case 0:
			alrts.successMsg("GENE.SEALS_SAVE");
			break;
		default:
			break;
		}
	}
}

angular
		.module('assignSeals')
		.component(
				'assignSealsComponent',
				{
					templateUrl : "/WeighBridgeStandAlone/resources/js/angular/js/components/MAE1013/assign-seals.jsp",
					controller : 'assignSealsController',
					bindings: {
					    orno: "@"
					}
				});