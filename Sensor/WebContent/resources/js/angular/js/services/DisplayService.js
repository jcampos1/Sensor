/* ************** DECLARACION DE MODULOS ****************** */
'use strict';
angular.module("DisplayService", []);

/* *********************** SERVICIOS ********************** */
"use strict";
angular.module('DisplayService').service('projService', proj);
proj.$inject = [ '$http', '$q', 'alrts', '$translate' ];
function proj($http, $q, alrts, $translate) {
	var path;
	var path_appl_conf = "appl_conf";

	return {
		checkProject : function(entity) {
			checkProjectPromise(entity)
			.then(function(response) {
	        	console.log("El Project es valido");
	        	console.log(response);
	        })
	        .catch(function(error) {
	        	console.log("Usuario inválido");
	        	console.log(error);
	        });
		},
		
		update : function(entity, $uibModalInstance, opc, $scope, bcg, pscope) {
			checkProjectPromise(entity, opc)
			.then(function(response) {
				window.clearErrors("FATH_FORM");
	        	if(response.status == "ok") {
	        		updatePromise(entity, opc)
			        .then(function(data) {
			        	if($uibModalInstance){
			        		$uibModalInstance.close(true);
			        	}
			        	showMsg(opc);
			        	if(opc==0){
			        		$scope.proj = new Object();
			        	}
			        	bcg.getPage(pscope, 1);
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
		
		close : function(entity, $uibModalInstance, $scope, bcg, pscope) {
			checkProjectPromise(entity, 1)
			.then(function(response) {
				window.clearErrors("FATH_FORM");
	        	if(response.status == "ok") {
	        		closePromise(entity)
			        .then(function(data) {
			        	$uibModalInstance.close(true);
			        	showMsg(2);
			        	bcg.getPage(pscope, 1);
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
		
		getStatus: function() {
			return getStatus();
		}
	}

	function updatePromise(entity, opc) {
		var defered = $q.defer();
		var promise = defered.promise;
		var url = '';
		
		switch(opc) {
		case 0:
			url = 'project/create';
			break;
		case 1:
		default:
			url = 'project/update';
			break;
		}
		
		$http.post(url, entity).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function closePromise(entity) {
		var defered = $q.defer();
		var promise = defered.promise;
		
		$http.post('project/close', entity).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function checkProjectPromise(entity, opc) {
		var defered = $q.defer();
		var promise = defered.promise;
		var url = '';
		
		switch(opc) {
		case 0:
			url = 'project/checkProject';
			break;
		default:
			url = 'project/checkEditProject';
			break;
		}

		$http.post(url, entity).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function getStatus() {
		var defered = $q.defer();
		var promise = defered.promise;
		
		$http.post('project/status').success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function showMsg(opc) {
		
		switch(opc) {
		case 0:
			alrts.successMsg("ALRT.PROJ_NEW");
			break;
		case 1:
			alrts.successMsg("ALRT.PROJ_UPDT");
			break;
		case 2:
			alrts.successMsg("ALRT.PROJ_CLSE");
			break;
		default:
			alrts.successMsg("ALRT.PROJ_DELE");
			break;
		}
	}
}