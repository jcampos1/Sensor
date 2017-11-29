"use strict";
angular.module('processApp').service('MicroService', MicroService);
MicroService.$inject = [ '$http', '$q', '$log', 'alrts', '$translate', 'comunication' ];
function MicroService($http, $q, $log, alrts, $translate, comunication) {
	return {
		update : function(entity, $uibModalInstance, opc, $scope) {
			check(entity)
			.then(function(response) {
				window.clearErrors("FATH_FORM");
	        	if(response.status == "ok") {
	        		update(entity, opc)
			        .then(function(data) {
			        	runMicro(entity, false)
				        .then(function(data) {
				        	if($uibModalInstance){
				        		$uibModalInstance.close(true);
				        	}
				        	showMsg(opc);
				        	//Evento para recargar datos de microcontrolador actualizado
				        	comunication.setEvnt21("emit");
				        })
				        .catch(function(error) {
				        	showMsg(3);
				        	$log.error(error);
				        });
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
	        	$log.error(response.error);
	        });
		},
		
		find: function() {
			return find();
		},
		
		getLstPrty: function() {
			return getLstPrty();
		},
		
		getLstBaud: function() {
			return getLstBaud();
		},
		
		getLstTolein: function() {
			return getLstTolein();
		},
		
		getLstBits_char: function() {
			return getLstBits_char();
		},
		
		getLstBits_stop: function() {
			return getLstBits_stop();
		},
		
		runMicro: function(entity, modeTry) {
			return runMicro(entity, modeTry);
		},
		
		stopMicro: function() {
			return stopMicro();
		},
	}
	
	function getLstPrty( ) {
		var url = '/Sensor/Micro/lstPrty';
		return $http({
			url: url, 
			method: "POST",
		});
	}
	
	function getLstBaud( ) {
		var url = '/Sensor/Micro/lstBaud';
		return $http({
			url: url, 
			method: "POST",
		});
	}
	
	function getLstTolein( ) {
		return $http({
			url: '/Sensor/Micro/lstTolein', 
			method: "POST",
		});
	}
	
	function getLstBits_char( ) {
		var url = '/Sensor/Micro/lstBits_char';
		return $http({
			url: url, 
			method: "POST",
		});
	}
	
	function getLstBits_stop( ) {
		var url = '/Sensor/Micro/lstBits_stop';
		return $http({
			url: url, 
			method: "POST",
		});
	}
	
	function find( ) {
		return $http({
			url: '/Sensor/Micro/find', 
			method: "GET",
		});
	}

	function update(entity, opc) {
		var defered = $q.defer();
		var promise = defered.promise;
		var url = '';
		switch(opc) {
		case 0:
			url = '/Sensor/Micro/create';
			break;
		case 1:
		default:
			url = '/Sensor/Micro/update';
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
		var url = '/Sensor/Micro/check';
		$http.post(url, entity).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function runMicro(entity, modeTry) {
		return $http({
			url : "/Sensor/Micro/runMicro",
			method : "POST",
			params : {
				entity : entity,
				modeTry : modeTry
			},
		});
	}
	
	function stopMicro() {
		return $http({
			url : "/Sensor/Micro/stopMicro",
			method : "POST"
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