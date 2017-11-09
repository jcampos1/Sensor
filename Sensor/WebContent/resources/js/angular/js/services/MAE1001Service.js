/* ************** DECLARACION DE MODULOS ****************** */
'use strict';
angular.module("MAE1001Service", ['notify', 'messages', 'SimulatorService']);

/* *********************** SERVICIOS ********************** */
"use strict";
angular.module('MAE1001Service').service('mae1001Service', mae1001);
mae1001.$inject = [ '$http', '$q', 'alrts', '$translate', 'SweetAlert' ];
function mae1001($http, $q, alrts, $translate, SweetAlert) {
	return {
		getRolesList: function() {
			return getRolesList();
		},
		
		getDataUser: function() {
			return getDataUser();
		},
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
}