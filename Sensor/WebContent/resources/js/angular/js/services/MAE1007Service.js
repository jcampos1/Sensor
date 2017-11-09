/* ************** DECLARACION DE MODULOS ****************** */
'use strict';
angular.module("MAE1007Service", ['notify', 'messages', 'SimulatorService']);

/* *********************** SERVICIOS ********************** */
"use strict";
angular.module('MAE1007Service').service('mae1007Service', mae1007);
mae1007.$inject = [ '$http', '$q', 'alrts', '$translate', 'SweetAlert', 'wbl4bService' ];
function mae1007($http, $q, alrts, $translate, SweetAlert, wbl4bService) {
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
			        		$scope.mae1007 = new Object();
			        	}
			        	$scope.$broadcast('new_mae1007', 1);
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
	        .catch(function(response) {
	        	console.log(response.error);
	        });
		},
		
		getCurrentSimulator: function() {
			return getPromiseListActive();
		},
		
		getLstNmax_stab: function() {
			return getLst( '/lstNmax_stab' );
		},
		
		getLstChar_sepa: function() {
			return getLst( '/lstChar_sepa' );
		},
		
		getLstNmax_unst: function() {
			return getLst( '/lstNmax_unst' );
		},
		
		getLstPosi_weig: function() {
			return getLst( '/lstPosi_weig' );
		},
		
		getLstPosi_stab: function() {
			return getLst( '/lstPosi_stab' );
		},
		
		getLstNmax_slep: function() {
			return getLst( '/lstNmax_slep' );
		},
		
		getLstVal_min: function() {
			return getLst( '/lstVal_min' );
		},
		
		getLstVal_max: function() {
			return getLst( '/lstVal_max' );
		},
		
		getLstNread_tried: function() {
			return getLst( '/lstNread_tried' );
		},
	}
	
	function getLst( route ) {
		var url = '/WeighBridgeStandAlone/MAE1007' + route;
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
			url = '/WeighBridgeStandAlone/MAE1007/create';
			break;
		case 1:
		default:
			url = '/WeighBridgeStandAlone/MAE1007/update';
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
		var url = '/WeighBridgeStandAlone/MAE1007/checkMAE1007';
		$http.post(url, entity).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function getPromiseListActive() {
		var defered = $q.defer();
		var promise = defered.promise;
		
		$http.post("/WeighBridgeStandAlone/MAE1007/current").success(function(data) {
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