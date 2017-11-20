/* *********************** SERVICIOS ********************** */
"use strict";
angular.module('processApp').service('mae1001Service', mae1001Service);
mae1001Service.$inject = [ '$http', '$log', '$q', 'alrts', '$translate', 'comunication' ];
function mae1001Service($http, $log, $q, alrts, $translate, comunication) {
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
			        		//Recargar lista de usuarios pendientes por aprobacion
				        	comunication.setEvnt19("emit");
			        	}else{
			        		//Recargar lista de usuarios
				        	comunication.setEvnt18("emit");
			        	}
			        })
			        .catch(function(error) {
			        	showMsg(3);
			        	$log.error(error);
			        });
	        	}else {
	        		$log.error(response.flds);
	        		window.showErrors(response.flds);
	        	}
	        })
	        .catch(function(response) {
	        	$log.error(response.error);
	        });
		},
		
		//Elimina logicamente un usuario
		inactivate: function(obj, moti) {
			return inactivate(obj, moti);
		},
		
		//Activa un usuario
		activate: function(obj) {
			return activate(obj);
		},
		
		forAprobation: function(){
			return forAprobation();
		},
		
		login: function(username, password){
			return login(username, password);
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
	
	function activate(entity) {
		var defered = $q.defer();
		var promise = defered.promise;
		$http.post('/Sensor/user/activate', entity).success(function(data) {
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
	
	//Usuarios por aprobacion
	function forAprobation( ){
		return $http.get("/Sensor/user/forAprobation");
	}
	
	function login(username, password) {
		return $http({
			url : "/Sensor/login",
			method : "POST",
			params : {
				username : username,
				password : password
			},
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