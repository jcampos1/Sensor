"use strict";
angular.module('userForAprob', ['ui.bootstrap', 'ngTouch', 'adminModule', 'ui.bootstrap.contextMenu', 'messages',
'constants', 'abstractService', 'notify', 'localytics.directives']);

(function() {
	"use strict";
	angular.module("userForAprob")
			.controller('modalDetailUserForAprobCtrl', modalDetailUserForAprobCtrl);

	modalDetailUserForAprobCtrl.$inject = [ '$scope', '$uibModalInstance', 'obj'];
	function modalDetailUserForAprobCtrl($scope, $uibModalInstance, obj) {
		
		$scope.user = angular.copy(obj);
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module("userForAprob")
			.controller('modalEditUserForAprobCtrl', modalEditUserForAprobCtrl);

	modalEditUserForAprobCtrl.$inject = ['comunication02', '$scope', 'servUFA', '$uibModalInstance',
			'adminService', 'userEdit',
			'functions', 'basicConfigurationGrid', 'userService' ];
	function modalEditUserForAprobCtrl(comunication02, $scope, servUFA, $uibModalInstance, adminService, userEdit, functions, basicConfigurationGrid, userService) {
		
		var vm = this;
		$scope.user = angular.copy(userEdit);
		$scope.user.conf_mail = $scope.user.user_mail;
		
		$scope.submitForm = function(user, form) {
			if( form.$valid) {
				userService.update(user, $uibModalInstance, 1, $scope, basicConfigurationGrid, globalScope);
			}
		};
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	}
})();

(function() {
	"use strict";
	angular.module("userForAprob").controller('modalConfirmUserForAprob',
			modalConfirmUserForAprob);

	modalConfirmUserForAprob.$inject = [ '$scope', 'servUFA', 'user', '$uibModalInstance'];
	function modalConfirmUserForAprob($scope, servUFA, user, $uibModalInstance) {
		$scope.ok = function() {
			var ids = new Array();
			var obj = new Object();
			obj.id = user.id;
			ids.push(obj);
			servUFA.deleteUser(ids, $uibModalInstance);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();


(function() {
	"use strict";
	angular.module('userForAprob')
			.controller('userForAprobController', userForAprobController);
	userForAprobController.$inject = [ '$scope', 'servUFA', '$uibModal', '$translate', 'translations', '$window', 'NOT_CONTENT'];
	function userForAprobController($scope, servUFA, $uibModal, $translate, translations, $window, NOT_CONTENT) {
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
			toTrans.push('GENE.DETAIL');
			
			$translate(toTrans).then(function(tr) {
				$scope.menuDelete = [['<span class="glyphicon glyphicon-zoom-in"></span>&nbsp;'+tr['GENE.DETAIL'], vm.detailClickRight],
					                  null, // Dividier
		              ['<span class="glyphicon glyphicon-trash"></span>&nbsp;'+tr['GENE.REMOVE'], vm.deleteUser]
		        ];
			});
        })
        .catch(function(error) {
			console.log(error);
        });
		
		vm.open = function(user) {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'modalEditEntity.html',
				controller : 'modalEditUserForAprobCtrl',
				size : "lg",
				resolve : {
					userEdit : function() {
						return user;
					},
					
					parentScope : function() {
						return user;
					},
				}
			});
			modalInstance.result.then(function(arg) {
				vm.getUserPendings();
			}, function() {
				console.log('Modal dismissed at: ' + new Date());
			});
		}
		
		vm.deleteUser = function($itemScope, $event, modelValue, text, $li) {
			vm.confirm($itemScope.user);
		}
		
		vm.deleteUserIcon = function(user) {
			vm.confirm(user);
		}
		
		vm.confirm = function(user) {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'myModalContent.html',
				controller : 'modalConfirmUserForAprob',
				size : "sm",
				resolve : {
					user : function() {
						return user;
					},
				}
			});
			modalInstance.result.then(function(arg) { // Se confirma
				vm.getUserPendings();
			}, function() {
			});
		}
		
		vm.getUserPendings = function() {
			servUFA.getUserPendings().then(function(response) {
				vm.users = response;
			})
	        .catch(function(error) {
	        	console.log(error);
	        });
		}
		
		vm.detailClickRight = function($itemScope, $event, modelValue,
				text, $li) {
			modalDetailEntity($itemScope.user);
		}
		
		function modalDetailEntity(entity) {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'modalDetailEntity.html',
				controller : 'modalDetailUserForAprobCtrl',
				size : "lg",
				resolve : {
					obj : function() {
						return entity;
					}
				}
			});
			modalInstance.result.then(function() {
			}, function() {
			});
		}
		
		$scope.$on("reload_user", function(event, data)
		{
			vm.getUserPendings();
		});
		
		vm.getUserPendings();
	}
})();

"use strict";
angular.module('userForAprob').service('servUFA', servUFA);
servUFA.$inject = [ '$http', '$q', 'alrts', 'comunication02'];
function servUFA($http, $q, alrts, comunication02) {
	return {
		getUserPendings: function() {
			return getPromiseListActive();
		},
		
		deleteUser: function(ids, $uibModalInstance) {
			getPromiseDeleteUser(ids).then(function(data) {
				showMsg(1);
				$uibModalInstance.close(true);
				comunication02.setEvnt01("reloadWidgets");
			})
	        .catch(function(error) {
	        	console.log(error);
	        });
		},
	}

	function getPromiseListActive() {
		var defered = $q.defer();
		var promise = defered.promise;
		
		$http.post("user/forAprobation").success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function getPromiseDeleteUser(ids) {
		var defered = $q.defer();
		var promise = defered.promise;
		
		$http['delete']("user/inactivate", {
			data : ids,
			headers : {
				"Content-Type" : "application/json;charset=utf-8"
			}
		}).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function showMsg(opc) {
		switch(opc) {
		case 0:
			alrts.successMsg("ALRT.ACT_UPDT");
			break;
		case 1:
			alrts.successMsg("ALRT.ACT_CMPL");
			break;
		default:
			alrts.successMsg("ALRT.ACT_DELE");
			break;
		}
	}
}

angular.module('userForAprob').component('userForAprobComponent',
{
	templateUrl : "/WeighBridgeStandAlone/resources/js/angular/js/components/usuario/user-for-aprob.jsp",
	controller : 'userForAprobController'
});