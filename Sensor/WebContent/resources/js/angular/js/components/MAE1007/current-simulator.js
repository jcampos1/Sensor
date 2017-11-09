-"use strict";
angular.module('currentSimulator', ['ui.bootstrap', 'ngTouch',
 'adminModule', 'ui.bootstrap.contextMenu', 'messages',
'constants', 'MAE1007Service', 'notify', 'SimulatorService']);

(function() {
	"use strict";
	angular.module("currentSimulator")
			.controller('modalDetailcurrentSimulatorCtrl', modalDetailcurrentSimulatorCtrl);

	modalDetailcurrentSimulatorCtrl.$inject = [ '$scope', '$uibModalInstance', 'obj'];
	function modalDetailcurrentSimulatorCtrl($scope, $uibModalInstance, obj) {
		
		$scope.mae1007 = angular.copy(obj);
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module("currentSimulator")
			.controller('modalEditMAE1007Ctrl2', modalEditMAE1007Ctrl2);

	modalEditMAE1007Ctrl2.$inject = ['$scope', 'servCurrentSimulator', '$uibModalInstance', 'mae1007Edit', 'basicConfigurationGrid', '$rootScope', 'mae1007Service', 'wbl4bService' ];
	function modalEditMAE1007Ctrl2($scope, servCurrentSimulator, $uibModalInstance,
			mae1007Edit, basicConfigurationGrid, $rootScope, mae1007Service, wbl4bService) {
		
		var vm = this;
		$scope.mae1007 = angular.copy(mae1007Edit);
		$scope.mae1007.nmax_slep = $scope.mae1007.nmax_slep/1000;
		$rootScope.rowSelected = $scope.mae1007.port;
		
		$scope.submitForm = function(mae1007, form) {
			if( form.$valid ) {
				mae1007.port = $rootScope.rowSelected;
				servCurrentSimulator.update(mae1007, $uibModalInstance, 0, $scope, basicConfigurationGrid, globalScope);
			}
		};
		
		$scope.tryConnection = function(mae1007, form) {
			if( form.$valid ) {
				$scope.isRunApp = true;
				mae1007.port = $rootScope.rowSelected;
				wbl4bService.runSimulator(mae1007);
			}
		}
		
		$scope.captureWeigh = function(srvrpo, operation, form) {
			if( form.$valid ) {
				wbl4bService.captureWeigh(srvrpo, operation).then(function(response) {
					$scope.weight = response.numstr;
					wbl4bService.showMessageAlert(response);
				})
		        .catch(function(error) {
		        });
			}
		}
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	}
})();

(function() {
	"use strict";
	angular.module("currentSimulator").controller('modalConfirmCurrentSimulator',
			modalConfirmCurrentSimulator);

	modalConfirmCurrentSimulator.$inject = [ '$scope', 'servCurrentSimulator', 'mae1007', '$uibModalInstance'];
	function modalConfirmCurrentSimulator($scope, servCurrentSimulator, mae1007, $uibModalInstance) {
		$scope.ok = function() {
			var ids = new Array();
			var obj = new Object();
			obj.id = mae1007.id;
			ids.push(obj);
			servCurrentSimulator.dlete(ids, $uibModalInstance);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module('currentSimulator')
			.controller('currentSimulatorController', currentSimulatorController);
	currentSimulatorController.$inject = [ '$scope', 'servCurrentSimulator', '$uibModal', '$translate', 'translations', 'NOT_CONTENT'];
	function currentSimulatorController($scope, servCurrentSimulator, $uibModal, $translate, translations, NOT_CONTENT) {
		var vm = this;
		
		translations.getLanguage().then(function(response) {
			if(response.status == NOT_CONTENT) {
				var lang = ($window.navigator.language || $window.navigator.userLanguage).indexOf("es") == 0 ? "es" : "en"; 
			}else {
				var lang = response.data;
			}
			$translate.use(lang);
			
			var toTrans = new Array();
			toTrans.push('GENE.BTN_EDIT');
			toTrans.push('GENE.DETAIL');
			$translate(toTrans).then(function(tr) {
				$scope.menuEdit = [['<span class="glyphicon glyphicon-zoom-in"></span>&nbsp;'+tr['GENE.DETAIL'], vm.detailClickRight],
					                  null, // Dividier
		              ['<span class="glyphicon glyphicon-trash"></span>&nbsp;'+tr['GENE.BTN_EDIT'], vm.openClickRight]
		        ];
			});
        })
        .catch(function(error) {
			console.log(error);
        });
		
		vm.open = function(mae1007) {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'modalEditEntity.html',
				controller : 'modalEditMAE1007Ctrl2',
				size : "md",
				resolve : {
					mae1007Edit : function() {
						return mae1007;
					},
					
					parentScope : function() {
						return mae1007;
					},
				}
			});
			modalInstance.result.then(function(arg) {
				vm.getSimulator();
			}, function() {
			});
		}
		
		vm.dlete = function($itemScope, $event, modelValue, text, $li) {
			vm.confirm($itemScope.vm.mae1007);
		}
		
		vm.deleteIcon = function(mae1007) {
			vm.confirm(mae1007);
		}
		
		vm.confirm = function(mae1007) {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'myModalContent.html',
				controller : 'modalConfirmCurrentSimulator',
				size : "sm",
				resolve : {
					mae1007 : function() {
						return mae1007;
					},
				}
			});
			modalInstance.result.then(function(arg) { // Se confirma
			}, function() {
			});
		}
		
		vm.openClickRight = function($itemScope, $event, modelValue, text, $li) {
			vm.open($itemScope.vm.mae1007);
		}
		
		vm.getSimulator = function() {
			servCurrentSimulator.getCurrentSimulator().then(function(response) {
				vm.lst_mae1007 = response;
			})
	        .catch(function(error) {
	        	console.log(error);
	        });
		}
		
		vm.detailClickRight = function($itemScope, $event, modelValue,
				text, $li) {
			modalDetailEntity($itemScope.vm.mae1007);
		}
		
		function modalDetailEntity(entity) {
			console.log(entity);
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'modalDetailEntity.html',
				controller : 'modalDetailcurrentSimulatorCtrl',
				size : "md",
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
		
		$scope.$on("reload_mae1007", function(event, data)
		{
			vm.getSimulator();
		});
		
		vm.getSimulator();
	}
})();

"use strict";
angular.module('currentSimulator').service('servCurrentSimulator', servCurrentSimulator);
servCurrentSimulator.$inject = [ '$http', '$q', 'alrts', 'wbl4bService'];
function servCurrentSimulator($http, $q, alrts, wbl4bService ) {
	return {
		getCurrentSimulator: function() {
			return getPromiseListActive();
		},
		
		update : function(entity, $uibModalInstance, opc, $scope, bcg, pscope) {
			checkMAE1007Promise(entity)
			.then(function(response) {
				window.clearErrors("FATH_FORM");
	        	if(response.status == "ok") {
	        		updatePromise(entity)
			        .then(function(data) {
			        	if($uibModalInstance){
			        		$uibModalInstance.close(true);
			        	}
			        	showMsg(opc);
			        	bcg.getPage(pscope, 2);
			        	wbl4bService.closeApp(entity.srvrpo);
			        })
			        .catch(function(error) {
			        	console.log(error);
			        });
	        	}else {
	        		window.showErrors(response.flds);
	        	}
	        })
	        .catch(function(error) {
	        	console.log(error);
	        });
		},
		
		dlete: function(ids, $uibModalInstance) {
			getPromiseDelete(ids).then(function(data) {
				showMsg(1);
				$uibModalInstance.close(true);
			})
	        .catch(function(error) {
	        	console.log(error);
	        });
		},
	}
	
	function getPromiseDelete(ids) {
		var defered = $q.defer();
		var promise = defered.promise;
		
		$http['delete']("MAE1007/delete", {
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

	function getPromiseListActive() {
		var defered = $q.defer();
		var promise = defered.promise;
		
		$http.post("MAE1007/current").success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function checkMAE1007Promise(entity) {
		var defered = $q.defer();
		var promise = defered.promise;

		$http.post('MAE1007/checkMAE1007', entity).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function updatePromise(entity) {
		var defered = $q.defer();
		var promise = defered.promise;
		
		$http.post('MAE1007/update', entity).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function showMsg(opc) {
		switch(opc) {
		case 0:
			alrts.successMsg("GENE.RGTR_UPDT");
			break;
		default:
			alrts.successMsg("ALRT.RGTR_SUPR");
			break;
		}
	}
}

angular.module('currentSimulator').component('currentSimulator',
{
	templateUrl : "resources/js/angular/js/components/MAE1007/currentSimulator.jsp",
	controller : 'currentSimulatorController'
});