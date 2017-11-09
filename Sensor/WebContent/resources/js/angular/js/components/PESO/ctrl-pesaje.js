/*CONTROLES DE PESAJE*/

"use strict";
angular.module('CTRLPESAJE', [ 'ui.bootstrap', 'messages', 'MAE1007Service', 'SimulatorService', 'PAR1001Service', 'MAE1015Service' ]);

(function() {
	"use strict";
	angular.module('CTRLPESAJE').controller('ctrlPesajeController',
			ctrlPesajeController);
	ctrlPesajeController.$inject = ['comunication', '$log', 'parameterFactory', 'mae1007Service', '$scope', 'wbl4bService', '$rootScope', 'par1001Service', 'mae1015Service', '$filter', 'FLTRNUMB'];
	function ctrlPesajeController(comunication, $log, parameterFactory, mae1007Service, $scope, wbl4bService, $rootScope, par1001Service, mae1015Service, $filter, FLTRNUMB) {
		var vm = this;
		var disp_defa = null;
		var decimals = 2;
		var d = 2;
		
		$scope.currentUser = currentUser;
		$scope.separator = separator;

		$rootScope.getArray_mae1010 = function ( ) {
			return $scope.array_mae1010;
		}
		
		// Evento tomar peso
		$scope.captureWeigh = function (disp) {
			$scope.showLoading = true;
			wbl4bService.runSimulator(disp).then(function(data) {
				wbl4bService.captureWeigh(disp.srvrpo, '3').then(function(num) {
					$scope.showLoading = false;
					if(num.num >= 0 ) {
//					if( toNumber(num.numstr) >= 0 ) { /*
//						$scope.weight = toString(toNumber(num.numstr));/*
//						$scope.pes_br = toString(toNumber(num.numstr));/*
						
						$scope.weight = num.num;
						$scope.pes_br = num.num;
						$scope.pes_ne = calcNeto(); 
						updateDiference( );
					}else{
						wbl4bService.showMessageAlert(toNumber(num.numstr));
					}
				})
		        .catch(function(error) {
		        	$scope.showLoading = false;
		        });
	        })
	        .catch(function(error) {
	        	$scope.showLoading = false;
	        	console.log(error);
	        });
		}
		
		$scope.changeDisp = function (newValue, oldPort) {
			wbl4bService.closeApp2(parseInt(oldPort)).then(function( response ) {
				wbl4bService.runSimulator($scope.disp);
			})
			.catch(function( error ) {
				$log.warn(error);
			});
		}
		
		 // Evento confirmar peso
		$scope.confirmWeigh = function () {
			var mae1015 = new Object();
			mae1015.line = comunication.getLine();
			mae1015.lstcon = $scope.array_mae1010;
			if( !$scope.pes_ma && $scope.se_pesa() ) {
				mae1015.indica = $scope.disp;
			}
			
			mae1015.pestar = $scope.pes_ta;
			mae1015.pesbru = $scope.pes_br;
			mae1015.pesnet = $scope.pes_ne;
			mae1015.pesman = $scope.pes_ma;
			
			mae1015Service.update(mae1015, null, 0, $scope, null, null);
		}
		
		/*************MÉTODOS GENÉRICOS***************/
		$rootScope.updatePes_ta = function() {
			var acum = 0;
			$scope.array_mae1010.forEach(function(elem) {
//				acum += toNumber(elem.conten.pest)*elem.nconte; /*
				acum += elem.conten.pest*elem.nconte;
			});
//			$scope.pes_ta = toString(acum);  /*
			$scope.pes_ta = acum;
		}
		
		$rootScope.getDisp = function() {
			return $scope.disp;
		}
		
		$rootScope.updatePes_teo = function() {
			if ( comunication.getLine() != undefined && comunication.getLine().item.iscont ) {
				// Se ha seleccionado tanto el contenedor como el embalaje
				var num_cont = numUnitCont();
				var num_emba = numUnitEmbala();
				if ( num_cont > 0 || num_emba > 0 ) {
					$scope.pes_teo = comunication.getLine().item.peso*numUnitEmbala() + $scope.pes_ta;
					chePesCont();
				}
			}
		}
		
		$rootScope.clearMAE1015 = function() {
			$scope.dibrte = 0;
			$scope.pobrte = 0;
			$scope.disp = disp_defa;
			$scope.pes_ma = false;
			$scope.pes_ne = 0;
			$scope.pes_ta = 0;
			$scope.pes_br = 0;
			$scope.contai = new Object();
			$scope.contai.pest = 0;
			$scope.embala = new Object();
			$scope.embala.pest = 0;
			$scope.pes_teo = 0;
			
			$scope.weight = 0;
			
			$scope.array_mae1010 = new Array();
			setLine_ord( null ); 
		}
		
		/******************************/
		
		$scope.pescon = function ( ) {
			return $scope.par1001.pescon;
		}
		
		//Determina si hay que pesar el articulo seleccionado
		$scope.se_pesa = function ( ) {
			if ( !$scope.getIscont() || ($scope.getIscont() && $scope.pescon()) ) {
				return true;
			} else {
				return false;
			}
		}
		
		$scope.isValidPes_ma = function ( form ){
			console.log(form.pes_ma);
			if ( comunication.getLine() != undefined ) {
				var num_cont = numUnitCont();
				var num_emba = numUnitEmbala();
				if( comunication.getLine().item.iscont ) {
					if ( num_cont > 0 && num_emba > 0 ) {
						
					}else{
						alert("Debe seleccionar contenedor y artículo de embalaje");
						return false;
					}
				}else{
					if ( num_cont > 0 || num_emba > 0 ) {
						
					}else{
						alert("Debe seleccionar contenedor o artículo de embalaje");
						return false;
					}
				}
			}
		}
		
		/****ESCUCHADORES****/
		$scope.$watchCollection("array_mae1010", function(newCollection, oldCollection){
			if (newCollection === oldCollection) {
               return;
            }
			 
			$rootScope.updatePes_ta();
			$rootScope.updatePes_teo();
	    });
		
		$scope.$watch("weight", function(newValue, oldValue){
			if (newValue === oldValue) {
                return;
            }
			
			if( $scope.pes_ma ) {
				$scope.pes_br = $scope.weight;
				$scope.pes_ne = calcNeto();
				$rootScope.updatePes_teo();
				updateDiference( );
			}
	    });
		
		$scope.$watch(function() { return comunication.getLine() }, function() {
			if( comunication.isValid(comunication.getLine()) ) {
				$scope.line_ord = comunication.getLine();
//				if( getIscont() ) {
//					//Se calcula la cantidad pedida en KGS para el artículo
//					$scope.cantp_kgs = $scope.line_ord.cant_p * $scope.line_ord.arpeso;
//				}
			}
			
		});
		/*******************/
		
		/****FUNCIONES LOCALES****/
		
		function setLine_ord ( data ) {
			$scope.line_ord = data;
		}
		
		function chePesCont( ) {
			if( !$scope.par1001.pescon ) {
				$scope.pes_br = $scope.pes_teo;
				$scope.pes_ne = comunication.getLine().item.peso*numUnitEmbala();
			} 
		}
		
		function numUnitEmbala ( ) {
			var num = 0;
			$scope.array_mae1010.forEach(function(elem) {
				if ( elem.conten.type.dsca === $rootScope.cest.dsca || elem.conten.type.dsca === $rootScope.caja.dsca ) {
					num+= elem.nconte;
				}
			});
			return num;
		}
		
		function numUnitCont ( ) {
			var num = 0;
			$scope.array_mae1010.forEach(function(elem) {
				if ( elem.conten.type.dsca != $rootScope.carr.dsca || elem.conten.type.dsca != $rootScope.pale.dsca ) {
					num+= elem.nconte;
				}
			});
			return num;
		}
		
		//Calcula el peso neto y devuelve la representacion en string del resultado
		function calcNeto( ) {
			return $scope.pes_br-$scope.pes_ta;
//			return toString(accounting.unformat($scope.pes_br)-accounting.unformat($scope.pes_ta)); /*
		}
		
		//Calcula la diferencia entre el peso bruto y teórico
		function calcDibrte( ) {
			return $scope.pes_br - $scope.pes_teo;
//			return accounting.unformat($scope.pes_br) - accounting.unformat($scope.pes_teo); /*
		}
		
		//Calcula el porcentaje de diferencia entre bruto y teórico
		function calcPobrte( ) {
			return Math.abs(100-($scope.pes_br/$scope.pes_teo)*100);
//			return Math.abs(100-((accounting.unformat($scope.pes_br)/accounting.unformat($scope.pes_teo))*100));/*
		}
		
		//Actualiza diferencia de peso en Kg y porcentaje en caso de que el articulo pesado sea teórico
		function updateDiference( ) {
			if( comunication.getLine().item.iscont ) {
				$scope.dibrte = calcDibrte( );
				$scope.pobrte = calcPobrte( );
			}
		}
		
		$scope.getIscont = function  ( ) {
			return getIscont();
		}
		
		function getIscont ( ) {
			return comunication.getLine().item.iscont;
		}
		/*******************/
		
		/****INICIALIZACIONES****/
		$scope.getCurrentSimulator = function(){
			mae1007Service.getCurrentSimulator().then(function(response) {
				$scope.indicators = response;
				$scope.disp = disp_defa = $scope.indicators[0];
			})
	        .catch(function(error) {
	        	console.log(error);
	        });
		}
		
		par1001Service.getCurrentParameter().then(function(response) {
			$scope.par1001 = response;
		})
        .catch(function(error) {
        	console.log(error);
        });
		
		$scope.getCurrentSimulator();
		
		$rootScope.clearMAE1015();
		/*************************/
	}
})();

angular
		.module('CTRLPESAJE')
		.component(
				'ctrlPesajeComponent',
				{
					templateUrl : "/WeighBridgeStandAlone/resources/views/component/PESO/ctrl-pesaje.jsp",
					controller : 'ctrlPesajeController'
				});