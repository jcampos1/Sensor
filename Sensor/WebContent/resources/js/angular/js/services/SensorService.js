/* *********************** SERVICIOS ********************** */
"use strict";
angular.module('processApp').service('SensorService', SensorService);
SensorService.$inject = [ 'comunication', '$http', '$log', '$q', 'alrts'];
function SensorService(comunication, $http, $log, $q, alrts) {
	return {
		//Encuentra todas las entidades activas
		find: function( ) {
			return find();
		},
		
		//Chequea y actualiza la entidad
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
			        		$scope.sensor = new Object();
			        	}
			        	
			        	//Recargar lista de sensores
			        	comunication.setEvnt11("emit");
			        })
			        .catch(function(error) {
			        	showMsg(3);
			        	$log.error(error);
			        });
	        	}else {
	        		window.showErrors(response.flds);
	        	}
	        })
	        .catch(function(response) {
	        	$log.error(response);
	        });
		},
		
		//Elimina logicamente una estacion
		inactivate: function(obj, moti) {
			return inactivate(obj, moti);
		},
	}
	
	function find() {
		return $http({
			url : "/Sensor/Sensor/find",
			method : "GET",
			type: "application/json"
		});
		
		
	}
	
	//Comprobar informacion asociada a la entidad
	function check(entity) {
		var defered = $q.defer();
		var promise = defered.promise;
		var url = '/Sensor/Sensor/check';
		$http.post(url, entity).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function update(entity, opc) {
		var defered = $q.defer();
		var promise = defered.promise;
		var url = '';
		switch(opc) {
		case 0:
			url = '/Sensor/Sensor/create';
			break;
		case 1:
		default:
			url = '/Sensor/Sensor/update';
			break;
		}
		$http.post(url, entity).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function inactivate(obj, moti) {
		return $http({
			url : "/Sensor/Station/inactivate",
			method : "DELETE",
			params : {
				obj : obj,
				uti1006 : moti
			},
		});
	}
	
	//Muestra mensaje de operación realizada exitosamente
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