// Controlador principal de entidad
(function ( ) {
	"use strict";
	angular.module("processApp").controller('MicroCtrl',
			MicroCtrl);
	MicroCtrl.$inject = [ '$scope', '$uibModal', '$log', 'i18nService',
			'$translate', '$window', '$rootScope', 'translations', 'OK',
			'NOT_CONTENT', 'NOT_FOUND', 'MicroService', 'comunication', 'SweetAlert' ];

	function MicroCtrl ( $scope, $uibModal, $log, i18nService,
			$translate, $window, $rootScope, translations, OK, NOT_CONTENT,
			NOT_FOUND, MicroService, comunication, SweetAlert ) {
		/** * ****INICIALIZACION DE VARIABLES Y ESTRUCTURAS * **** */

		// Detalle de microcontrolador
		$scope.detail = function ( micro ) {
			comunication.setData17(micro);
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : "detailMicro.html",
				controller : "DetailMicroCtrl",
				size : "md"
			});
			
		}
		
		// Actualizacion de microcontrolador
		$scope.update = function ( micro ) {
			comunication.setData17(micro);
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : "updateMicro.html",
				controller : "UpdateMicroCtrl",
				size : "md"
			});
		}
		
		// Escuchador para recargar microcontrolador
		$scope.$watch(function ( ) { return comunication.getEvnt21() }, function ( ) {
			if (comunication.isValid(comunication.getEvnt21())) {
				comunication.setEvnt21(null);
				MicroService.find().then(function(response){
					$scope.micro = response.data;
				})
				.catch(function(error){
					$log.error(error);
				});
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
		
		//Se obtiene microcontrolador actual
		MicroService.find()
		.then(function(response){
			$scope.micro = response.data;
		})
		.catch(function(error){
			$log.error(error);
		});
	}
})();

//Detalle de entidad
(function ( ) {
	"use strict";
	angular.module("processApp").controller('DetailMicroCtrl',
			DetailMicroCtrl);

	DetailMicroCtrl.$inject = [ '$scope', '$uibModalInstance',
			'comunication' ];
	function DetailMicroCtrl ( $scope, $uibModalInstance,
			comunication ) {
		
		//Microcontrolador seleccionado
		$scope.micro = comunication.getData17();
		
		$scope.cancel = function ( ) {
			$uibModalInstance.dismiss(false);
		};
	}
})();

// Edicion de entidad
(function ( ) {
	"use strict";
	angular.module("processApp").controller('UpdateMicroCtrl',
			UpdateMicroCtrl);

	UpdateMicroCtrl.$inject = [ '$scope', '$log', '$http', '$uibModalInstance',
			'MicroService', 'comunication', 'TryReadingService' ];
	function UpdateMicroCtrl ( $scope, $log, $http, $uibModalInstance,
			MicroService, comunication, TryReadingService ) {
		$scope.micro = angular.copy(comunication.getData17());
		
		MicroService.getLstPrty( ).then(function(response){
			$scope.lstPrty = response.data;
		})
		.catch(function(error) {
			$log.error(error);
		});
		
		MicroService.getLstBaud( ).then(function(response){
			$scope.lstBaud = response.data;
		})
		.catch(function(error) {
			$log.error(error);
		});
		
		MicroService.getLstTolein( ).then(function(response){
			$scope.lstTolein = response.data;
		})
		.catch(function(error) {
			$log.error(error);
		});
		
		MicroService.getLstBits_char( ).then(function(response){
			$scope.lstBits_char = response.data;
		})
		.catch(function(error) {
			$log.error(error);
		});
		
		MicroService.getLstBits_stop( ).then(function(response){
			$scope.lstBits_stop = response.data;
		})
		.catch(function(error) {
			$log.error(error);
		});
		
		$scope.update = function ( form ) {
			if (form.$valid) {
				MicroService.update($scope.micro, $uibModalInstance, 1, $scope);
			}
		};
		
		$scope.addMessage = function() {
			  TryReadingService.send();
		  };

		  TryReadingService.receive().then(null, null, function(message) {
			  console.log("mensaje recibido es: ");
			  console.log(message);
		  });
		
		$scope.cancel = function ( ) {
			$uibModalInstance.dismiss(false);
		};
	}
})();

//Componente de creacion de rol
angular.module('processApp').component('currentMicroComponent',
{
	templateUrl : 'resources/views/forms/micro/current.jsp',
	controller : 'MicroCtrl'
});