/* ************** DECLARACION DE MODULOS ****************** */
'use strict';
angular.module("MAE1001Service", ['notify', 'messages', 'SimulatorService']);

/* *********************** SERVICIOS ********************** */
"use strict";
angular.module('MAE1001Service').service('mae1001Service', mae1001);
mae1001.$inject = [ '$http', '$log', '$q', 'alrts', '$translate', 'comunication' ];
function mae1001($http, $log, $q, alrts, $translate, comunication) {
	return {
		getRolesList: function() {
			return getRolesList();
		},
		
		getDataUser: function() {
			return getDataUser();
		},
		
		update : function(entity, $uibModalInstance, opc, $scope) {
			check(entity, opc)
			.then(function(response) {
				window.clearErrors("FATH_FORM");
	        	if(response.status == "ok") {
	        		update(entity, opc)
			        .then(function(data) {
			        	if($uibModalInstance){
			        		$uibModalInstance.close(true);
			        	}
			        	showMsg(opc);
			        	if(opc ==0){
			        		$scope.user = new Object();
			        		//Recargar lista de usuarios
				        	comunication.setEvnt18("emit");
			        	}else{
			        		//Recargar lista de usuarios pendientes por aprobacion
				        	comunication.setEvnt19("emit");
			        	}
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
	        	log.error(response.error);
	        });
		},
		
		//Elimina logicamente un usuario
		inactivate: function(obj, moti) {
			return inactivate(obj, moti);
		},
	}
	
	// Comprobar informacion asociada a la entidad
	function check(entity, opc) {
		var url = "";
		switch (opc) {
		case 0:
			url = '/Sensor/user/check';
			break;
		default:
			url = '/Sensor/user/checkEdit';
			break;
		}
		
		var defered = $q.defer();
		var promise = defered.promise;
		
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
			url = '/Sensor/user/create';
			break;
		case 1:
		default:
			url = '/Sensor/user/update';
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
			url : "/Sensor/user/inactivate",
			method : "DELETE",
			params : {
				obj : obj,
				uti1006 : moti
			},
		});
	}
	
	function getRolesList( ) {
		var url = '/WeighBridgeStandAlone/user/roles';
		return $http({
			url: url, 
			method: "POST"
		});
	}
	
	function getDataUser( ) {
		var url = '/WeighBridgeStandAlone/user/dataUser';
		return $http({
			url: url, 
			method: "POST"
		});
	}
	
	// Muestra mensaje de operación realizada exitosamente
	function showMsg(opc) {		
		switch(opc) {
		case 0:
			alrts.successMsg("CONF.SEND_MAIL");
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