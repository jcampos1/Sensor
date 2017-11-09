/* ************** DECLARACION DE MODULOS ****************** */
'use strict';
angular.module('MAE1015Service', ['notify', 'messages', 'GRIDMAE1014']);

/* *********************** SERVICIO PESO POR LINEA ********************** */
"use strict";
angular.module('MAE1015Service').service('mae1015Service', mae1015);
mae1015.$inject = [ 'comunication', '$http', '$q', 'alrts', '$translate', '$rootScope', '$location', '$anchorScroll' ];
function mae1015(comunication, $http, $q, alrts, $translate, $rootScope, $location, $anchorScroll) {
	return {
		update : function(entity, $uibModalInstance, opc, $scope, bcg, pscope) {
			checkEntity(entity)
			.then(function(response) {
				window.clearErrors("FATH_FORM");
	        	if(response.statusText == "ok" || response.status == "200") {
	        		update(entity, opc)
			        .then(function(data) {
			        	if($uibModalInstance){
			        		$uibModalInstance.close(true);
			        	}
			        	showMsg(opc);
			        	if(opc==0){
			        		$rootScope.clearMAE1015();
			        		comunication.setLine(null);
			        		$scope.$emit('to_gridmae1014');
//			        		mae1014ConfigurationGrid.getPage2($rootScope.orno);
			        		$location.hash('mstr_mae1014');
						    $anchorScroll();
						    $scope.$emit('to_mae1010');
						    comunication.setEvnt03("evnt03");
						    comunication.setEvnt04(false);
			        	}
			        });
	        	}else {
	        		window.showErrors(response.flds);
	        	}
	        });
		},
		
		hasDesglose : function ( line ) {
			return hasDesglose( line );
		}
	}

	function update(entity, opc) {
		var url = '';
		switch(opc) {
		case 0:
			url = '/WeighBridgeStandAlone/MAE1015/create';
			return $http.post(url, entity);
			break;
		case 1:
		default:
			url = '/WeighBridgeStandAlone/MAE1015/update';
		return $http({
			url: url, 
			method: "POST",
			params: {mae1015:entity},
		});
			break;
		}
	}
	
	function hasDesglose( line ) { 
		var url = '/WeighBridgeStandAlone/MAE1015/hasDesglose';
		return $http({
			url: url, 
			method: "POST",
			params: {line:line},
		});
	}
	
	function checkEntity(entity) {
		return $http.post('/WeighBridgeStandAlone/MAE1015/checkMAE1015', entity);
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
		default:
			break;
		}
	}
}