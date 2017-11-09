/* *********************** SERVICIOS ********************** */
"use strict";
angular.module('processApp').service('stationService', stationService);
stationService.$inject = [ 'comunication', '$http', '$log', '$q', 'alrts'];
function stationService(comunication, $http, $log, $q, alrts) {
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
			        		$scope.station = new Object();
			        	}
			        	
			        	//Recargar lista
			        	comunication.setEvnt06("emit");
			        })
			        .catch(function(error) {
			        	$log.error(error);
			        });
	        	}else {
	        		window.showErrors(response.flds);
	        	}
	        })
	        .catch(function(response) {
	        	$log.error(response.error);
	        });
		},
		
		//Elimina logicamente una estacion
		inactivate: function(namest, moti) {
			return inactivate(namest, moti);
		},
	}
	
	function find() {
		return $http.get("/Sensor/Station/find");
	}
	
	//Comprobar informacion asociada a la entidad
	function check(entity) {
		var defered = $q.defer();
		var promise = defered.promise;
		var url = '/Sensor/Station/check';
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
			url = '/Sensor/Station/create';
			break;
		case 1:
		default:
			url = '/Sensor/Station/update';
			break;
		}
		$http.post(url, entity).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function inactivate(namest, moti) {
		return $http({
			url : path + "/inactivate",
			method : "DELETE",
			params : {
				namest : namest,
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
		default:
			break;
		}
	}
}