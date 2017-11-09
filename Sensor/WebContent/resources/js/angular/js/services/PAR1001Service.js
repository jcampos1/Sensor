/* ************** DECLARACION DE MODULOS ****************** */
'use strict';
angular.module("PAR1001Service", ['notify', 'messages']);

/* *********************** SERVICIOS ********************** */
"use strict";
angular.module('PAR1001Service').service('par1001Service', par1001);
par1001.$inject = [ '$http', '$q', 'alrts', '$translate' ];
function par1001($http, $q, alrts, $translate) {
	return {
		update : function(entity, $uibModalInstance, opc, $scope, bcg, pscope) {
			checkEntityPromise(entity)
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
			        		$scope.par1001 = new Object();
			        	}
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
		
		getCurrentParameter: function() {
			return getCurrentParameter();
		},
	}

	function updatePromise(entity, opc) {
		var defered = $q.defer();
		var promise = defered.promise;
		$http.post('/WeighBridgeStandAlone/PAR1001/update', entity).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function checkEntityPromise(entity) {
		var defered = $q.defer();
		var promise = defered.promise;
		var url = '/WeighBridgeStandAlone/PAR1001/checkPAR1001';
		$http.post(url, entity).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function getCurrentParameter() {
		var defered = $q.defer();
		var promise = defered.promise;
		
		$http.post("/WeighBridgeStandAlone/PAR1001/current").success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function showMsg(opc) {
		switch(opc) {
		case 0:
			alrts.successMsg("GENE.RGTR_SUCS");
			break;
		case 1:
			alrts.successMsg("GENE.RGTR_UPDT");
			break;
		case 2:
			alrts.successMsg("GENE.RGTR_SUPR");
			break;
		default:
			break;
		}
	}
}