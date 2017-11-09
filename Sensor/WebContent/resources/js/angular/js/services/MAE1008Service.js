/* ************** DECLARACION DE MODULOS ****************** */
'use strict';
angular.module("MAE1008Service", ['notify', 'messages']);

/* *********************** SERVICIOS ********************** */
"use strict";
angular.module('MAE1008Service').service('portService', port);
port.$inject = [ '$http', '$q', 'alrts', '$translate' ];
function port($http, $q, alrts, $translate) {
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
			        		$scope.port = new Object();
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
		
		getLstPrty: function() {
			return getLstPrty();
		},
		
		getLstBaud: function() {
			return getLstBaud();
		},
		
		getLstBits_char: function() {
			return getLstBits_char();
		},
		
		getLstBits_stop: function() {
			return getLstBits_stop();
		},
	}
	
	function getLstPrty( ) {
		var url = '/WeighBridgeStandAlone/MAE1008/lstPrty';
		return $http({
			url: url, 
			method: "POST",
		});
	}
	
	function getLstBaud( ) {
		var url = '/WeighBridgeStandAlone/MAE1008/lstBaud';
		return $http({
			url: url, 
			method: "POST",
		});
	}
	
	function getLstBits_char( ) {
		var url = '/WeighBridgeStandAlone/MAE1008/lstBits_char';
		return $http({
			url: url, 
			method: "POST",
		});
	}
	
	function getLstBits_stop( ) {
		var url = '/WeighBridgeStandAlone/MAE1008/lstBits_stop';
		return $http({
			url: url, 
			method: "POST",
		});
	}

	function updatePromise(entity, opc) {
		var defered = $q.defer();
		var promise = defered.promise;
		var url = '';
		switch(opc) {
		case 0:
			url = 'MAE1008/create';
			break;
		case 1:
		default:
			url = 'MAE1008/update';
			break;
		}
		$http.post(url, entity).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function checkEntityPromise(entity) {
		var defered = $q.defer();
		var promise = defered.promise;
		var url = 'MAE1008/checkMAE1008';
		$http.post(url, entity).success(function(data) {
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