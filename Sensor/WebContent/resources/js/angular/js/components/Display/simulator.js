"use strict";
angular.module('appCurrentActivities', ['ui.bootstrap', 'ngTouch', 'ui.grid',
'ui.grid.selection', 'ui.grid.pagination', 'adminModule', 'ui.bootstrap.contextMenu', 'ui.grid.exporter', 'newUser', 'newActivity', 'messages',
'constants', 'userValidator', 'activityApp', 'multipleSelect', 'isteven-multi-select','abstractService', 'notify']);

(function() {
	"use strict";
	angular.module("appCurrentActivities")
			.controller('modalEditEntityCtrl2', modal_edit_entity);

	modal_edit_entity.$inject = ['$scope', 'serv0', '$uibModalInstance',
			'adminService', '$http', 'basicConfig', 'actEdit',
			'functions', 'basicConfigurationGrid' ];
	function modal_edit_entity($scope, serv0, $uibModalInstance, adminService, $http,
			basicConfig, actEdit, functions, basicConfigurationGrid) {
		
		var vm = this;
		vm.projects_req = false;
		$scope.act = angular.copy(actEdit);
		
		serv0.getProjectsActivity($scope.act.id).then(function(response) {
			$scope.act.projs = response;
			functions.getItems("projects").then(function(response) {
				$scope.projectsList = functions.builMultSel($scope, response, $scope.act.projs);
			})
	        .catch(function(error) {
	        	console.log(error);
	        });
		})
        .catch(function(error) {
        	console.log(error);
        });
		
		functions.trans_multiselectProj($scope);
		
		$scope.submitForm = function(act) {
			var isNull = functions.delPropSelect($scope.selected);
			if(isNull) {
				vm.projects_req = true;
			}else{
				vm.projects_req = false;
				act.projs = $scope.selected;
				serv0.update(act, $uibModalInstance, 0, $scope);
			}
		};
		
		$scope.close = function(act) {
			var isNull = functions.delPropSelect($scope.selected);
			if(isNull) {
				vm.projects_req = true;
			}else{
				vm.projects_req = false;
				act.projs = $scope.selected;
				serv0.close(act, $uibModalInstance, $scope, basicConfigurationGrid, globalScope);
			}
		};
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	}
})();

(function() {
	"use strict";
	angular.module("appCurrentActivities").controller('modal_confirmation_delete2',
			modal_confirmation_delete);

	modal_confirmation_delete.$inject = [ '$scope', 'serv0', 'acti', '$uibModalInstance'];
	function modal_confirmation_delete($scope, serv0, acti, $uibModalInstance) {
		$scope.ok = function() {
			var ids = new Array();
			var obj = new Object();
			obj.id = acti.id;
			ids.push(obj);
			serv0.deleteAct(ids, $uibModalInstance);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();


(function() {
	"use strict";
	angular.module('appCurrentActivities')
			.controller('currentActivitiesController', currentActivitiesController);
	currentActivitiesController.$inject = [ '$scope', 'serv0', '$uibModal', '$translate', 'translations', 'NOT_CONTENT'];
	function currentActivitiesController($scope, serv0, $uibModal, $translate, translations, NOT_CONTENT) {
		var vm = this;
		
		translations.getLanguage().then(function(response) {
			if(response.status == NOT_CONTENT) {
				var lang = ($window.navigator.language || $window.navigator.userLanguage).indexOf("es") == 0 ? "es" : "en"; 
			}else {
				var lang = response.data;
			}
			$translate.use(lang);
			
			var toTrans = new Array();
			toTrans.push('GENE.REMOVE');
			
			$translate(toTrans).then(function(tr) {
				$scope.menuDelete = [
		              ['<span class="glyphicon glyphicon-trash"></span>&nbsp;'+tr['GENE.REMOVE'], vm.deleteActivity]
		        ];
			});
        })
        .catch(function(error) {
			console.log(error);
        });
		
		vm.open = function(act) {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'modalEditEntity.html',
				controller : 'modalEditEntityCtrl2',
				size : "lg",
				resolve : {
					actEdit : function() {
						return act;
					},
					
					parentScope : function() {
						return act;
					},
				}
			});
			modalInstance.result.then(function(arg) {
				vm.getActivities();
			}, function() { // Se cancela la eliminacion
				console.log('Modal dismissed at: ' + new Date());
			});
		}
		
		vm.deleteActivity = function($itemScope, $event, modelValue, text, $li) {
			vm.confirm($itemScope.act);
		}
		
		vm.deleteActivityIcon = function(act) {
			vm.confirm(act);
		}
		
		vm.confirm = function(act) {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'myModalContent.html',
				controller : 'modal_confirmation_delete2',
				size : "sm",
				resolve : {
					acti : function() {
						return act;
					},
				}
			});
			modalInstance.result.then(function(arg) { // Se confirma
				vm.getActivities();
			}, function() {
			});
		}
		
		vm.getActivities = function() {
			serv0.getCurrentActivities().then(function(response) {
				vm.acts = response;
			})
	        .catch(function(error) {
	        	console.log(error);
	        });
		}
		
		vm.getActivities();
	}
})();

"use strict";
angular.module('appCurrentActivities').service('serv0', serv0);
serv0.$inject = [ '$http', '$q', 'alrts'];
function serv0($http, $q, alrts, $translate) {
	return {
		deleteAct: function(ids, $uibModalInstance) {
			getPromiseDeleteAct(ids).then(function(data) {
				showMsg(1);
				$uibModalInstance.close(true);
			})
	        .catch(function(error) {
	        	console.log(error);
	        });
		},
	}

	function getPromiseListActive() {
		var defered = $q.defer();
		var promise = defered.promise;
		
		$http.post("activity/listActive").success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
}

angular.module('appCurrentActivities').component('currentActivities',
{
	templateUrl : "resources/js/angular/js/components/Display/testConnection.jsp",
	controller : 'simulatorController'
});