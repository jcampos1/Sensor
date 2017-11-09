/* ************** DECLARACION DE MODULOS ****************** */
'use strict';
angular.module("AlertService", ['notify', 'messages', 'oitozero.ngSweetAlert']);

/* *********************** SERVICIOS ********************** */
"use strict";
angular.module('AlertService').service('alertService', alertService);
alertService.$inject = [ '$http', '$log', '$q', 'alrts', '$translate', 'SweetAlert', '$rootScope', 'comunication' ];
function alertService($http, $log, $q, alrts, $translate, SweetAlert, $rootScope, comunication) {
	return {
		showMessageAlert : function(opc, cb, cb2, nord, getByOrno, updtOrdr) {
			var toTrans = new Array();
			
			toTrans.push("WBL4B.ERROR03");
			toTrans.push("WBL4B.ERROR04");
			toTrans.push("WBL4B.ERROR05");
			toTrans.push("WBL4B.ERROR06");
			toTrans.push("GENE.CONF_DELE");
			
			$translate(toTrans).then(function(tr) {
				switch(opc) {
				case 0:
					//Orden sin lineas
					showAlerts(tr["WBL4B.ERROR03"]);
					break;
				case 1:
					//Lineas sin peso
					showAlerts(tr["WBL4B.ERROR04"]);
					break;
				case 2:
					//Lineas con mercancia faltante
					showConfirmation(tr["WBL4B.ERROR05"], tr["GENE.CONF_DELE"], cb, cb2, nord, getByOrno, updtOrdr);
					break;
					
				case 3:
					//Orden con estado incorrecto para realizar cierre
					showAlerts(tr["WBL4B.ERROR06"]);
					break;
				default:
					break;
				}
			});
		},
	}
	
	function showAlerts(text) {
		SweetAlert.swal({
		  title: "Error!",
		  text: text,
		  type: "error",
		  confirmButtonText: "Ok"
		});
	}
	
	function showConfirmation(text, title, cb, cb2, nord, getByOrno, updtOrdr) {
		swal({
		  title: title,
		  text: text,
		  type: "info",
		  showCancelButton: true,
		  closeOnConfirm: true,
		  showLoaderOnConfirm: true,
		},
		function(isConfirm){
			if ( isConfirm ) {
				cb( nord ).then( function (response) {
					$rootScope.reloadMAE1013();
					cb2(nord).then( function ( response ) {
						window.open("/WeighBridgeStandAlone/MAE1013/printOrder?nord="+nord, '_blank');
						alrts.successMsg("ALRT.ORDER_CLOSE");
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
				})
				.catch( function( error ) {
				});
				
			}
		});
	}
}