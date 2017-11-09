/* ************** DECLARACION DE MODULOS ****************** */
'use strict';
angular.module("MAE1013Service", ['notify', 'messages', 'AlertService']);

/* *********************** SERVICIOS ********************** */
"use strict";
angular.module('MAE1013Service').service('mae1013Service', mae1013);
mae1013.$inject = [ 'comunication', '$http', '$log', '$q', 'alrts', '$translate', '$rootScope', '$state', 'alertService' ];
function mae1013( comunication, $http, $log, $q, alrts, $translate, $rootScope, $state, alertService ) {
	return {
		update : function(entity, $uibModalInstance, opc, $scope) {
			checkEntityPromise(entity)
			.then(function(response) {
				window.clearErrors("FATH_FORM");
	        	if(response.status == "ok") {
	        		updatePromise(entity, opc)
			        .then(function(entityNew) {
			        	if($uibModalInstance){
			        		$uibModalInstance.close(true);
			        	}
			        	showMsg(opc);
			        	if(opc==0){
			        		$scope.mae1013 = new Object();
			        		comunication.setOrder(entityNew);
			        		$rootScope.row_selected = entityNew;
			        		comunication.funct01();
			        	}else{
			        		comunication.setGrid1013("grid1013");
//			        		bcg.getPage(pscope);
			        	}
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
		
		loadMotr : function(text) {
			return loadMotr(text);
		},
		
		inactivateWithMotivo : function(orno, moti) {
			return inactivateWithMotivo(orno, moti);
		},
		
		susp: function(orno, moti) {
			return suspOrRetu(orno, moti).then( function ( response ) {
				showMsg(3);
				comunication.setRelWdgts("relWgts");
				comunication.setGrid1013("grid1013");
			})
	        .catch(function(error) {
	        	console.log(error);
	        });;
		},
		
		retu: function(orno) {
			suspOrRetu(orno).then( function ( response ) {
				showMsg(4);
				comunication.setRelWdgts("relWgts");
				comunication.setGrid1013("grid1013");
			})
	        .catch(function(error) {
	        	console.log(error);
	        });
		},
		
		getLstTipm : function() {
			return getLstTipm();
		},
		
		getLstStat : function() {
			return getLstStat();
		},
		
		getCantOrdersByStatus : function() {
			return getCantOrdersByStatus();
		},
		
		getSource : function() {
			return getSource();
		},
		
		getParameterCurrent : function() {
			return getParameterCurrent();
		},
		
		getCurrentUser : function() {
			return getCurrentUser();
		},
		
		hasLines : function ( nord ) {
			return hasLines ( nord );
		},
		
		AllDispatched : function( nord ) {
			return AllDispatched( nord );
		},
		
		finishedLines : function( nord ) {
			return finishedLines( nord );
		},
		
		generatePDF : function( nord ) {
			return generatePDF( nord );
		},
		
		printOrder : function( nord ) {
			printOrder( nord ).then( function ( response ) {
				window.open("/WeighBridgeStandAlone/MAE1013/printOrder?nord="+nord, '_blank');
			}).catch( function(error) {
			} );
		},
		
		closeOrder : function ( nord, updtOrdr ) {
			toClose( nord ).then(function( response ) {
				if( response.data ) {
					hasLines( nord ).then( function (response) {
						if ( response.data ) {
							AllDispatched( nord ).then( function ( response ) {
								if ( response.data ) {
									finishedLines( nord ).then( function ( response ) {
										if( response.data ) {
											closeOrder( nord ).then( function ( response ) {
												generatePDF( nord ).then( function ( response ) {
													window.open("/WeighBridgeStandAlone/MAE1013/printOrder?nord="+nord, '_blank');
													alert("Update es: "+updtOrdr);
													if( updtOrdr ) {
														getByOrno( nord ).then( function ( response ) {
															$log.info("LA ORDEN ES: ");$log.info(response);
															comunication.setOrder(response.data);
															comunication.funct01();
														}).catch( function(error) {
															$log.warn(error);
														});
													}else{
														comunication.setRelWdgts("relWgts");
														comunication.setGrid1013("grid1013");
													}
												}).catch( function(error) {
												} );
											}).catch( function(error) {
											} );
											
										}else{
											alertService.showMessageAlert( 2, closeOrder, generatePDF, nord, getByOrno, updtOrdr );
										}
									}).catch( function(error) {
										
									} );
								}else{
									alertService.showMessageAlert(1);
								}
							}).catch( function(error) {
								
							} );
						}else{ 
							alertService.showMessageAlert(0);
						}
						
					} )
					.catch ( function(error) {
						
					} );
				}else{
					alertService.showMessageAlert(3);
				}
			})
			.catch(function () {
				
			});
		},
		
		confirmPe: function( nord ) {
			return confirmPe( nord );
		},
		
		getByOrno: function ( nord ) {
			return getByOrno( nord );
		}
	}

	function updatePromise(entity, opc) {
		var defered = $q.defer();
		var promise = defered.promise;
		var url = '';
		switch(opc) {
		case 0:
			url = '/WeighBridgeStandAlone/MAE1013/create';
			break;
		case 1:
		default:
			url = '/WeighBridgeStandAlone/MAE1013/update';
			break;
		}
		$http.post(url, entity).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function generatePDF( nord ) {
		var url = '/WeighBridgeStandAlone/MAE1013/generatePDF';
			return $http({
				url: url, 
				method: "POST",
				params: { nord:nord },
			});
	}
	
	function confirmPe( nord ) {
		var url = '/WeighBridgeStandAlone/MAE1013/confirmPe';
		return $http({
			url: url, 
			method: "POST",
			params: { nord:nord }
		});
	}
	
	function getByOrno( nord ) {
		var url = '/WeighBridgeStandAlone/MAE1013/getByOrno';
		return $http({
			url: url, 
			method: "POST",
			params: { nord:nord }
		});
	}
	
	function loadMotr( text ) {
		var obj = new Object();
		obj.grid = new Object();
		obj.grid.text_find = text;
		
		// Campos de busquedas
		obj.grid.search_fields = new Array();
		obj.grid.search_fields.push("motr");
		obj.grid.search_fields.push("dsca");
		obj.grid.search_fields.push("plac");
		
		var url = '/WeighBridgeStandAlone/MAE1012/externPagSimple';
		return $http.post(url, obj);
	}
	
	function suspOrRetu( orno, moti ) {
		var url = '/WeighBridgeStandAlone/MAE1013/suspOrRetu';
			return $http({
				url: url, 
				method: "POST",
				params: { orno:orno, moti:moti },
			});
	}
	
	function printOrder( nord ) {
		var url = '/WeighBridgeStandAlone/MAE1013/printOrder';
			return $http({
				url: url, 
				method: "GET",
				params: { nord:nord },
			});
	}
	
	function hasLines( nord ) {
		var url = '/WeighBridgeStandAlone/MAE1013/hasLines';
			return $http({
				url: url, 
				method: "POST",
				params: { nord:nord },
			});
	}
	
	function toClose( nord ) {
		var url = '/WeighBridgeStandAlone/MAE1013/toClose';
			return $http({
				url: url, 
				method: "POST",
				params: { nord:nord },
			});
	}
	
	function AllDispatched( nord ) {
		var url = '/WeighBridgeStandAlone/MAE1013/hasLinesUndispatched';
			return $http({
				url: url, 
				method: "POST",
				params: { nord:nord },
			});
	}
	
	function finishedLines( nord ) {
		var url = '/WeighBridgeStandAlone/MAE1013/finishedLines';
			return $http({
				url: url, 
				method: "POST",
				params: { nord:nord },
			});
	}
	
	function closeOrder( nord ) {
		var url = '/WeighBridgeStandAlone/MAE1013/closeOrder';
			return $http({
				url: url, 
				method: "POST",
				params: { nord:nord },
			});
	}
	
	function checkEntityPromise(entity) {
		var defered = $q.defer();
		var promise = defered.promise;
		var url = '/WeighBridgeStandAlone/MAE1013/checkMAE1013';
		$http.post(url, entity).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function getCantOrdersByStatus( ) {
		var defered = $q.defer();
		var promise = defered.promise;
		var url = '/WeighBridgeStandAlone/MAE1013/cantOrdersByStatus';
		$http.post(url).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function getLstTipm() {
		var defered = $q.defer();
		var promise = defered.promise;
		var url = '/WeighBridgeStandAlone/MAE1013/tipm';
		$http.post(url).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function getLstStat() {
		var defered = $q.defer();
		var promise = defered.promise;
		var url = '/WeighBridgeStandAlone/MAE1013/statusOrp';
		$http.post(url).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function getSource() {
		var defered = $q.defer();
		var promise = defered.promise;
		var url = '/WeighBridgeStandAlone/MAE1013/source';
		$http.post(url).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function getCurrentUser() {
		var url = '/WeighBridgeStandAlone/user/currentUser';
		return $http.post(url);
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
	
	function inactivateWithMotivo(orno, moti) { 
		return $http({
		url : "/WeighBridgeStandAlone/MAE1013/inactivate",
		method : "DELETE",
		params : {
			orno : orno,
			uti1006 : moti
		},
		});
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
			alrts.successMsg("GENE.SUSP_OR");
			break;
		case 4:
			alrts.successMsg("GENE.PROC_OR");
			break;
		default:
			break;
		}
	}
}