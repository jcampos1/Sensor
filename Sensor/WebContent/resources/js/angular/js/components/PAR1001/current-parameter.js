"use strict";
angular.module('currentParameter', ['ui.bootstrap', 'ngTouch',
 'adminModule', 'ui.bootstrap.contextMenu', 'messages',
'constants', 'PAR1001Service', 'selectMAE1016', 'notify']);

(function() {
	"use strict";
	angular.module("currentParameter")
			.controller('modalEditEntityCtrl2', modal_edit_entity);

	modal_edit_entity.$inject = ['$scope', 'servCurrentParameter', '$uibModalInstance', 'par1001Edit', 'basicConfigurationGrid' ];
	function modal_edit_entity($scope, servCurrentParameter, $uibModalInstance,
			par1001Edit, basicConfigurationGrid) {
		
		var vm = this;
		$scope.par1001 = angular.copy(par1001Edit);
		
		$scope.$on('select-mae1016', function(event, data) {
			$scope.par1001.company = data;
	    });
		
		$scope.submitForm = function(par1001, form) {
			if( form.$valid ) {
				if(!par1001.rep_te && !par1001.pescon) {
				}else{
					servCurrentParameter.update(par1001, $uibModalInstance, 0, $scope, basicConfigurationGrid, globalScope);
				}
			}
		};
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	}
})();

(function() {
	"use strict";
	angular.module('currentParameter')
			.controller('currentParameterController', currentParameterController);
	currentParameterController.$inject = [ '$scope', 'servCurrentParameter', '$uibModal', '$translate', 'translations', 'NOT_CONTENT'];
	function currentParameterController($scope, servCurrentParameter, $uibModal, $translate, translations, NOT_CONTENT) {
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
			$translate(toTrans).then(function(tr) {
				$scope.menuEdit = [
		              ['<span class="glyphicon glyphicon-trash"></span>&nbsp;'+tr['GENE.BTN_EDIT'], vm.openClickRight]
		        ];
			});
        })
        .catch(function(error) {
			console.log(error);
        });
		
		vm.open = function(par1001) {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'modalEditEntity.html',
				controller : 'modalEditEntityCtrl2',
				size : "lg",
				resolve : {
					par1001Edit : function() {
						return par1001;
					},
					
					parentScope : function() {
						return par1001;
					},
				}
			});
			modalInstance.result.then(function(arg) {
				vm.getParameter();
			}, function() {
			});
		}
		
		vm.openClickRight = function($itemScope, $event, modelValue, text, $li) {
			vm.open($itemScope.vm.par1001);
		}
		
		vm.getParameter = function() {
			servCurrentParameter.getCurrentParameter().then(function(response) {
				vm.par1001 = response;
			})
	        .catch(function(error) {
	        	console.log(error);
	        });
		}
		
		vm.getParameter();
	}
})();

"use strict";
angular.module('currentParameter').service('servCurrentParameter', servCurrentParameter);
servCurrentParameter.$inject = [ '$http', '$q', 'alrts'];
function servCurrentParameter($http, $q, alrts, $translate) {
	return {
		getCurrentParameter: function() {
			return getPromiseListActive();
		},
		
		update : function(entity, $uibModalInstance, opc, $scope, bcg, pscope) {
			checkPAR1001Promise(entity)
			.then(function(response) {
				window.clearErrors("FATH_FORM");
	        	if(response.status == "ok") {
	        		updatePromise(entity)
			        .then(function(data) {
			        	if($uibModalInstance){
			        		$uibModalInstance.close(true);
			        	}
			        	showMsg(opc);
			        	bcg.getPage(pscope, 3);
			        })
			        .catch(function(error) {
			        	console.log(error);
			        });
	        	}else {
	        		window.showErrors(response.flds);
	        	}
	        })
	        .catch(function(response) {
	        	console.log(response.error);
	        });
		},
	}

	function getPromiseListActive() {
		var defered = $q.defer();
		var promise = defered.promise;
		
		$http.post("PAR1001/current").success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function checkPAR1001Promise(entity) {
		var defered = $q.defer();
		var promise = defered.promise;

		$http.post('PAR1001/checkPAR1001', entity).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function updatePromise(entity) {
		var defered = $q.defer();
		var promise = defered.promise;
		
		$http.post('PAR1001/update', entity).success(function(data) {
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
			break;
		}
	}
}

angular.module('currentParameter').component('currentParameter',
{
	templateUrl : "resources/js/angular/js/components/PAR1001/currentParameter.jsp",
	controller : 'currentParameterController'
});