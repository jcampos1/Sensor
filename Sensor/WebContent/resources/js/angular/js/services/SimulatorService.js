/* ************** DECLARACION DE MODULOS ****************** */
'use strict';
angular.module("SimulatorService", ['notify', 'messages', 'oitozero.ngSweetAlert']);

/* *********************** SERVICIOS ********************** */
"use strict";
angular.module('SimulatorService').service('wbl4bService', wbl4bService);
wbl4bService.$inject = [ '$http', '$q', 'alrts', '$translate', 'SweetAlert' ];
function wbl4bService($http, $q, alrts, $translate, SweetAlert) {
	return {
		runSimulator : function(entity) {
			return runSimulator(entity);
		},
		
		getSeparator : function() {
			return getSeparator();
		},
		
		captureWeigh : function(port, operation) { 
			return captureWeigh(port, operation);
		},
		
		closeApp : function(port) {
			closeAppFunction(port);
		},
		
		closeApp2 : function(port) {
			return closeApp(port);
		},
		
		showMessageAlert : function(response) {
			var toTrans = new Array();
			
			toTrans.push("WBL4B.EXCEPT_RESULT");
			toTrans.push("WBL4B.ERROR_OPEN_PORT");
			toTrans.push("WBL4B.ERROR_CLOSE_PORT");
			toTrans.push("WBL4B.ERROR_READ_PORT");
			toTrans.push("WBL4B.ERROR_METHOD_RUN");
			toTrans.push("WBL4B.LIBRARY_NOT_FOUND");
			toTrans.push("WBL4B.PORT_NOT_FOUND");
			toTrans.push("WBL4B.UNSTAB");
			toTrans.push("WBL4B.WEIGHT_NEGATIVE");
			toTrans.push("WBL4B.NO_CHECK_ZERO");
			toTrans.push("WBL4B.WEIGH_OCUPPIED");
			toTrans.push("WBL4B.WEIGH_UNOCUPPIED");
			toTrans.push("WBL4B.DISCONECT");
			
			$translate(toTrans).then(function(tr) {
				switch(response) {
				case -100.00:
					SweetAlert.swal(tr["WBL4B.EXCEPT_RESULT"]);
					break;
				case -120.00:
					SweetAlert.swal(tr["WBL4B.ERROR_OPEN_PORT"]);
					break;
				case -140.00:
					SweetAlert.swal(tr["WBL4B.ERROR_CLOSE_PORT"]);
					break;
				case -160.00:
					SweetAlert.swal(tr["WBL4B.ERROR_READ_PORT"]);
					break;
				case -180.00:
					SweetAlert.swal(tr["ERROR_METHOD_RUN"]);
					break;
				case -400.00:
					SweetAlert.swal(tr["WBL4B.LIBRARY_NOT_FOUND"]);
					break;
				case -420.00:
					SweetAlert.swal(tr["WBL4B.PORT_NOT_FOUND"]);
					break;
				case -300.00:
					SweetAlert.swal(tr["WBL4B.UNSTAB"]);
					break;
				case -320.00:
					SweetAlert.swal(tr["WBL4B.WEIGHT_NEGATIVE"]);
					break;
				case -340.00:
					SweetAlert.swal(tr["WBL4B.NO_CHECK_ZERO"]);
					break;
				case -220.00:
					SweetAlert.swal(tr["WBL4B.WEIGH_OCUPPIED"]);
					break;
				case -240.00:
					SweetAlert.swal(tr["WBL4B.WEIGH_UNOCUPPIED"]);
					break;
				case -500.00:
					SweetAlert.swal(tr["WBL4B.DISCONECT"]);
					break;
				default:
					break;
				}
			});
		},
	}
	
	function closeAppFunction(port) {
		closeApp(port).then(function(data) {
		}).catch(function(error) {
        	console.log(error);
        });
	}

	function runSimulator(entity) {
		var defered = $q.defer();
		var promise = defered.promise;
		console.log("LOS DATOS DE CONFIGURACION SON.");
		console.log(entity);
		$http.post('/WeighBridgeStandAlone/indicator/', entity).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function getSeparator() {
		var defered = $q.defer();
		var promise = defered.promise;
		$http.post('/WeighBridgeStandAlone/indicator/getSeparator').success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function captureWeigh(port, operation) {
		console.log("El puerto enviado es: "+port+", la operacion es: "+operation);
		
		var defered = $q.defer();
		var promise = defered.promise;
		
		$http({
			url: "/WeighBridgeStandAlone/indicator/captureWeight", 
			method: "POST",
			params: {port:port, operation:operation },
		}).success(function(data){
					defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		
		return promise;
	}
	
	function closeApp(port) {
		var defered = $q.defer();
		var promise = defered.promise;
		$http.post('/WeighBridgeStandAlone/indicator/closeApp', port).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
}