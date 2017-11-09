/* ************** DECLARACION DE MODULOS ****************** */
'use strict';
angular.module("ParameterFactory", ['messages']);

/* *********************** SERVICIOS ********************** */
"use strict";
angular.module('ParameterFactory').factory('parameterFactory', parameterFactory);
parameterFactory.$inject = [ '$http', '$q','$translate' ];
function parameterFactory($http, $q, $translate) {
	return {
		param: null,
		getParam: function() {
	      return this.param;
	    },
	    setParam: function(data) {
	      this.param = data;
	    },
	    
	    getParameterCurrent: function() {
	      return getParameterCurrent();
	    },
		    
	    isValid: function(data, prop) {
	    	if( prop ) {
	    		return data.hasOwnProperty(prop);
	    	}else{
	    		return data!=null && data!=undefined;
	    	}
		}
	}
	
	function getParameterCurrent() {
		var defered = $q.defer();
		var promise = defered.promise;
		var url = '/WeighBridgeStandAlone/MAE1013/cddp';
		$http.post(url).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
}