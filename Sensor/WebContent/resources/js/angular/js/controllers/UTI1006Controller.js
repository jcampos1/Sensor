//APP MOTIVOS

'use strict';
angular.module("UTI1006APP", [ 'ui.bootstrap', 'ngTouch', 'ui.grid',
		'ui.grid.selection', 'ui.grid.pagination',
		'ui.bootstrap.contextMenu', 'ui.grid.exporter', 'messages',
		'constants', 'UTI1006Service', 'abstractService', 'notify', 'angular-ui-grid-translate','oitozero.ngSweetAlert' ]);


//Controlador principal
(function() {
	"use strict";
	angular.module("UTI1006APP").controller('uti1006Controller', uti1006Controller);
	uti1006Controller.$inject = [ '$scope', 'UTI1006ConfigurationGrid', 'comunication', '$uibModal', '$log',
			'uiGridConstants',
			'i18nService', '$translate', '$window', '$rootScope', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND', 'uti1006Service', 'SweetAlert' ];

	function uti1006Controller($scope, UTI1006ConfigurationGrid, comunication, $uibModal, $log,
			uiGridConstants,
			i18nService, $translate, $window, $rootScope, translations, OK, NOT_CONTENT, NOT_FOUND, uti1006Service, SweetAlert) {
		
		/** * ****INICIALIZACION DE VARIABLES Y ESTRUCTURAS * **** */
		uti1006Service.listReasonType().then(function(lst) {
			$rootScope.lstType = lst.data;
		});
		
		var toTrans = new Array();
		toTrans.push('GENE.CODE');
		toTrans.push('GENE.DSCA');
		
		// Detalle de motivo
		$scope.detail = function ( ) {
			if(comunication.getData07()!=null){
				var modalInstance = $uibModal.open({
					animation : true,
					templateUrl : "detailMotive.html",
					controller : "DetailMotiveCtrl",
					size : "md"
				});
			}else{
				showAlerts("GENE.ERROR01");
			}
		}
		
		// Actualizacion de etsacion
		$scope.update = function ( ) {
			if(comunication.getData07()!=null){
				var modalInstance = $uibModal.open({
					animation : true,
					templateUrl : "updateUTI1006.html",
					controller : "UpdateUTI1006Ctrl",
					size : "md"
				});
			}else{
				showAlerts("GENE.ERROR01");
			}
		}
		
		//Creacion de motivo
		$scope.create = function() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'NewUTI1006Ctrl.html',
				controller : 'NewUTI1006Ctrl',
				size : "md"
			});
		};
		
		//Eliminar motivo
		$scope.remove = function ( ) {
			if(comunication.getData07()!=null){
				var modalInstance = $uibModal.open({
					animation : true,
					templateUrl : "confirm.html",
					controller : "DeleteUTI1006Ctrl",
					size : "sm"
				});
			}else{
				showAlerts("GENE.ERROR01");
			}
		}
		
		$translate(toTrans).then(function(translation) {
			$scope.translation = translation;
			$scope.columns = [];
			language_grid();
			
			/** ******************************************************************************** */

			/* ********************** CONFIGURACION DE UI-GRID ************** */
			UTI1006ConfigurationGrid.initializeGridOptionsAdmin($scope);
			UTI1006ConfigurationGrid.registerPaginationChanged($scope);
			/** **************************************************************** */
			
			function language_grid() {
				$scope.columns = [ {
					name : 'code_m',
					displayName : $scope.translation['GENE.CODE'],
					width : '30%'
				}, {
					field : 'dsca_m',
					displayName : $scope.translation['GENE.DSCA'],
					width : '67%'
				}];
			}
			
			//Se obtienen motivos
			function reload(){
				UTI1006ConfigurationGrid.getPage($scope);
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
			
			reload();
			
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
		
		// Escuchador para recargar lista de motivos
		$scope.$watch(function ( ) { return comunication.getEvnt09() }, function ( ) {
			if (comunication.isValid(comunication.getEvnt09())) {
				comunication.setEvnt09(null);
				//Se obtienen motivos
				UTI1006ConfigurationGrid.getPage($scope);
			}
		});
		
		// Escuchador para edicion de motivo por doble click en fila
		$scope.$watch(function ( ) { return comunication.getEvnt10() }, function ( ) {
			if (comunication.isValid(comunication.getEvnt10())) {
				comunication.setEvnt10(null);
				//Se obtienen motivos
				$scope.update();
			}
		});
		
		function showAlerts(toTraslate) {
			var toTrans = new Array();
			toTrans.push(toTraslate);
			$translate(toTrans).then(function(tr) {
				SweetAlert.swal({
					  title: "Error!",
					  text: tr[toTraslate],
					  type: "error",
					  confirmButtonText: "Ok"
					});
			});
		}
	}
})();

//Controlador para detalle
(function() {
	"use strict";
	angular.module("UTI1006APP")
			.controller('DetailMotiveCtrl', DetailMotiveCtrl);

	DetailMotiveCtrl.$inject = [ '$scope', '$uibModalInstance', 'comunication'];
	function DetailMotiveCtrl($scope, $uibModalInstance, comunication) {
		
		//Motivo seleccionado
		$scope.uti1006 = comunication.getData07();
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

//Controlador para edicion
(function() {
	"use strict";
	angular.module("UTI1006APP")
			.controller('UpdateUTI1006Ctrl', UpdateUTI1006Ctrl);

	UpdateUTI1006Ctrl.$inject = [ '$scope', '$log', '$uibModalInstance', 'comunication', 'uti1006Service'];
	function UpdateUTI1006Ctrl($scope, $log, $uibModalInstance, comunication, uti1006Service) {
		
		$scope.uti1006 = angular.copy(comunication.getData07());
		
		$scope.update = function(form) {
			if( form.$valid ) {
				uti1006Service.update($scope.uti1006, $uibModalInstance, 1, $scope);
			}
		};
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();

//Controlador para nuevo
(function() {
	"use strict";
	angular.module("UTI1006APP").controller('NewUTI1006Ctrl',
			NewUTI1006Ctrl);

	NewUTI1006Ctrl.$inject = [ '$scope', '$uibModalInstance', 'uti1006Service' ];
	function NewUTI1006Ctrl($scope, $uibModalInstance, uti1006Service) {
		$scope.uti1006 = new Object();

		$scope.create = function(form) {
			if( form.$valid ) {
				uti1006Service.update($scope.uti1006, $uibModalInstance, 0, $scope);
			}
		}

		$scope.cancel = function() {
			$uibModalInstance.dismiss(false);
		};
	}
})();


//Eliminacion de motivo
(function ( ) {
	"use strict";
	angular.module("UTI1006APP").controller("DeleteUTI1006Ctrl",
			DeleteUTI1006Ctrl);

	DeleteUTI1006Ctrl.$inject = [ '$scope', '$log',
			'$uibModalInstance', 'alrts', 'comunication', 'uti1006Service' ];
	function DeleteUTI1006Ctrl ( $scope, $log,
			$uibModalInstance, alrts, comunication, uti1006Service ) {
		
		$scope.ok = function ( ) {
			$scope.cancel();
			uti1006Service.inactivate(comunication.getData07())
			.then(function successCallback ( response ) {
					alrts.successMsg("GENE.RGTR_SUPR");
					//Recargar lista
		        	comunication.setEvnt09("emit");
			}, function errorCallback ( error ) {
				$log.error(response);
			});
		};

		$scope.cancel = function ( ) {
			$uibModalInstance.dismiss(false);
		};
	}
})();

//Componente creacion de usuario
angular
		.module('UTI1006APP')
		.component(
				'createUti1006Component',
				{
					templateUrl : 'resources/views/forms/UTI1006/create.jsp',
					controller : 'uti1006Controller'
				});