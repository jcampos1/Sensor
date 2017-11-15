/* ************** DECLARACION DE MODULOS ****************** */
'use strict';
angular.module("UTI1006Service", ['notify', 'messages']);

/* *********************** SERVICIO MOTIVOS ********************** */
"use strict";
angular.module('UTI1006Service').service('uti1006Service', uti1006);
uti1006.$inject = [ '$http', '$q', 'alrts', '$translate', 'comunication' ];
function uti1006($http, $q, alrts, $translate, comunication) {
	return {
		update : function(entity, $uibModalInstance, opc, $scope) {
			check(entity)
			.then(function(response) {
				window.clearErrors("FATH_FORM");
	        	if(response.status == "ok") {
	        		update(entity, opc)
			        .then(function(data) {
			        	if($uibModalInstance){
			        		$uibModalInstance.close(true);
			        	}
			        	showMsg(opc);
			        	if(opc==0){
			        		$scope.uti1006 = new Object();
			        	}
			        	//Recargar lista de motivos
			        	comunication.setEvnt09("emit");
			        })
			        .catch(function(error) {
			        	showMsg(3);
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
		
		getSubsetMoti : function(obj, type_m) { 
			return getSubsetMoti(obj, type_m);
		},
		
		listReasonType: function() {
			return $http.post('UTI1006/listReasonType');
		},
		
		//Elimina logicamente un motivo
		inactivate: function(uti1006) {
			return inactivate(uti1006);
		},
	}

	function update(entity, opc) {
		var defered = $q.defer();
		var promise = defered.promise;
		var url = '';
		switch(opc) {
		case 0:
			url = 'UTI1006/create';
			break;
		case 1:
		default:
			url = 'UTI1006/update';
			break;
		}
		$http.post(url, entity).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function check(entity) {
		var defered = $q.defer();
		var promise = defered.promise;
		var url = 'UTI1006/checkUTI1006';
		$http.post(url, entity).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function getSubsetMoti(obj, type_m) {
		var defered = $q.defer();
		var promise = defered.promise;
		
		$http({
			url: "/Sensor/UTI1006/externalPagination", 
			method: "POST",
			params: {uti1001:obj, type_m:type_m },
		}).success(function(data){
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		
		return promise;
	}
	
	function inactivate(uti1006) {
		return $http['delete']("/Sensor/UTI1006/inactivate", {
					data : uti1006,
					headers : {
						"Content-Type" : "application/json;charset=utf-8"
					}
				});
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
		case 3:
			alrts.dangerMsg("GENE.ERRORSERV");
			break;
		default:
			break;
		}
	}
}