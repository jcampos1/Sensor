/* ************** DECLARACION DE MODULOS ****************** */
'use strict';
angular.module("MAE1014Service", ['notify', 'messages']);

/* *********************** SERVICIO ITEMS POR ORDEN ********************** */
"use strict";
angular.module('MAE1014Service').service('mae1014Service', mae1014);
mae1014.$inject = [ 'comunication', '$http', '$q', 'alrts', '$translate', '$rootScope' ];
function mae1014(comunication, $http, $q, alrts, $translate, $rootScope) {
	return {
		update : function(entity, $uibModalInstance, opc, $scope, bcg, pscope) {
			checkEntity(entity)
			.then(function(response) {
				window.clearErrors("FATH_FORM");
	        	if(response.statusText == "ok" || response.status == "200") {
	        		update(entity, comunication.getOrder().orno, opc)
			        .then(function(data) {
			        	if($uibModalInstance){
			        		$uibModalInstance.close(true);
			        	}
			        	showMsg(opc);
			        	if(opc==0){
			        		$scope.mae1014 = new Object();
			        	}
			        	bcg.getPage2(comunication.getOrder().orno);
			        })
			        .catch(function(error) {
			        	console.log(error);
			        });
	        	}else {
	        		window.showErrors(response.flds);
	        	}
	        })
	        .catch(function(error) {
	        	console.log(error);
	        });
		},
		
		confirmNoDesp : function(entity, motivo, $scope) {
			confirmNoDesp(entity, motivo).then(function(response) {
				showMsg(3);
				$rootScope.reloadGrid($scope);
			 })
	        .catch(function(error) {
	        	console.log(error);
	        });
		},
		
		confirmDesp : function(entity, $scope) {
			confirmDesp(entity).then(function(response) {
				showMsg(4);
				$rootScope.reloadGrid($scope);
			 })
	        .catch(function(error) {
	        	console.log(error);
	        });
		},
	}

	function update(entity, orno, opc) {
		var url = '';
		switch(opc) {
		case 0:
			url = '/WeighBridgeStandAlone/MAE1014/create';
			return $http({
				url: url, 
				method: "POST",
				params: {mae1014:entity, orno:orno },
			});
			break;
		case 1:
		default:
			url = '/WeighBridgeStandAlone/MAE1014/update';
		return $http({
			url: url, 
			method: "POST",
			params: {mae1014:entity},
		});
			break;
		}
	}
	
	function checkEntity(entity) {
		return $http.post('/WeighBridgeStandAlone/MAE1014/checkMAE1014', entity);
	}
	
	function confirmNoDesp(entity, motivo) {
		return $http({
			url: '/WeighBridgeStandAlone/MAE1014/confirmNoDesp', 
			method: "POST",
			params: {mae1014:entity, uti1006:motivo },
		});
	}
	
	function confirmDesp(entity) {
		return $http.post('/WeighBridgeStandAlone/MAE1014/confirmDesp', entity);
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
			alrts.successMsg("MAE1014.RGTR_DESP");
			break;
		case 4:
			alrts.successMsg("MAE1014.RGTR_DISP_DESP");
			break;
		default:
			break;
		}
	}
}