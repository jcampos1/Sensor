/*PERMITE SELECCIONAR UN MOTIVO BASANDOSE EN UN TIPO DE MOTIVO */


"use strict";
angular.module('selectUTI1006', [ 'ui.bootstrap', 'messages', 'ui.grid',
                          		'ui.grid.selection', 'ui.grid.pagination', 'ngTouch', 'GRIDUTI1006', 'constants', 'angular-ui-grid-translate' ]);
(function() {
	"use strict";
	angular.module("selectUTI1006").controller('SelectUTI1006Ctrl',
			SelectUTI1006Ctrl);

	SelectUTI1006Ctrl.$inject = [ '$scope', '$rootScope',
			'$uibModalInstance', 'UTI1006ConfigurationGrid', 'comunication', 'uiGridConstants', 'i18nService', '$translate', '$window', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND' ];
	function SelectUTI1006Ctrl($scope, $rootScope, $uibModalInstance, UTI1006ConfigurationGrid, comunication, uiGridConstants, i18nService, $translate, $window, translations, OK, NOT_CONTENT, NOT_FOUND) {
		
		var toTrans = new Array();
		toTrans.push('GENE.CODE');
		toTrans.push('GENE.DSCA');
		
		$translate(toTrans).then(function(translation) {
			$scope.translation = translation;
			$scope.columns = [];
			language_grid();
			
			/** ******************************************************************************** */

			/* ********************** CONFIGURACION DE UI-GRID ************** */
			UTI1006ConfigurationGrid.initializeGridOptions($scope, $uibModalInstance);
			UTI1006ConfigurationGrid.registerPaginationChanged($scope);

			/** **************************************************************** */

			UTI1006ConfigurationGrid.getPage($scope, comunication.getData04());

			function language_grid() {
				$scope.columns = [ {
					name : 'id',
					visible : false,
					width : '8%'
				}, {
					name : 'code_m',
					displayName : $scope.translation['GENE.CODE'],
					width : '30%'
				}, {
					field : 'dsca_m',
					displayName : $scope.translation['GENE.DSCA'],
					width : '59%'
				}];
			}

			
			function trans(lang) {
				$translate.use(lang);
				$scope.lang = lang;
				$translate(toTrans).then(function(translation) {
					$scope.translation = translation;
					language_grid();
					$scope.gridOptions.columnDefs = $scope.columns;
				});
			}
			
			translations.getLanguage().then(function(response) {
				if(response.status == NOT_CONTENT) {
					var lang = ($window.navigator.language || $window.navigator.userLanguage).indexOf("es") == 0 ? "es" : "en"; 
				}else {
					var lang = response.data;
				}
				//Se establece el lenguaje del lado del cliente
				trans(lang);
				//Se establece el lenguaje del lado del servidor
				translations.setLocale(lang).then(function(response) {
				})
		        .catch(function(error) {
		        	$log.error(error);
		        });
	        })
	        .catch(function(error) {
	        	$log.error(error);
	        });
		});
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

//Controlador principal del componente
(function() {
	"use strict";
	angular.module('selectUTI1006').controller('SelectUTI1006Controller',
			SelectUTI1006Controller);
	SelectUTI1006Controller.$inject = [ 'comunication', '$uibModal', '$rootScope', '$scope', '$log',
			'$interval', 'UTI1006ConfigurationGrid', 'uiGridConstants', 'i18nService', '$translate', '$window', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND' ];
	function SelectUTI1006Controller(comunication, $uibModal, $rootScope, $scope, $log,
			$interval, UTI1006ConfigurationGrid, uiGridConstants, i18nService, $translate, $window, translations, OK, NOT_CONTENT, NOT_FOUND) {
		
		//Escuchador para accionar componente
		$scope.$watch(function ( ) { return comunication.getEvnt07() }, function ( ) {
			if (comunication.isValid(comunication.getEvnt07())) {
				$log.info("Se ejecuta el controlador");
				//Tipo de motivo
				$scope.type_m = comunication.getData04();
				//Muestra modal con motivos
				openGrid( );
				comunication.setEvnt07(null);
			}
		});
		
		function openGrid( ) {
			$scope.modalInstance = $uibModal.open({
				 animation : true,
				 templateUrl : 'SelectUTI1006Ctrl.html',
				 controller : 'SelectUTI1006Ctrl',
				 size : "md",
				 backdrop: false,
			});
			$scope.modalInstance.result.then(function(data) {
				 switch ($scope.type_m) {						
					case "ELIM":
						//ELIMINACION DE ESTACION
						$log.info("Motivo seleccionado");$log.info(data);
						$log.info("SE EMITE EL EVENTO DE ELIMINACION");
						comunication.setData05(data);
						comunication.setEvnt08("emit");
						break;
					default:
						break;
				}
			}, function() {
			});
		}
	}
})();

/************************************************************
 *Componente para la seleccion de motivo de eliminacion
 *-Desplegar: 
 ***comunication.setData04("ELIM"); ->Tipo de motivo
 ***comunication.setEvnt07("emit"); ->Acciona el componente
 *-Respuesta:
 ***comunication.getData05(); ->Motivo seleccionado
 ***********************************************************/
angular
		.module('selectUTI1006')
		.component(
				'selectUti1006Component',
				{
					templateUrl : "/Sensor/resources/views/forms/UTI1006/select-uti1006.jsp",
					controller : 'SelectUTI1006Controller'
				});