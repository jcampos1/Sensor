/*PERMITE LA ASIGNACIÓN DE PRECINTO DADA UNA ORDEN*/

"use strict";
angular.module('CPREC', [ 'ui.bootstrap', 'messages', 'ui.grid',
                          		'ui.grid.selection', 'ui.grid.pagination', 'ngTouch', 'GRIDMAE1012', 'constants', 'angular-ui-grid-translate', 'commons' ]);

angular.module('CPREC').service('CPRECServ01',
		CPRECServ01);
CPRECServ01.$inject = [ '$http', '$log', '$translate' ];
function CPRECServ01($http, $log, $translate) {

	/** ********************** INTERFAZ DEL SERVICIO **************** */
	return {
		asignPrec : function( nord, prec ) {
			return asignPrec( nord, prec );
		}
	}
	/** ************************************************************* */

	/** ********************** FUNCIONES PRIVADAS ******************* */
	
	function asignPrec( nord, prec ) {
		return $http({
			url: '/WeighBridgeStandAlone/MAE1013/asignPrec', 
			method: "POST",
			params: {nord:nord, prec:prec },
		});
	}
	
	/** ************************************************************* */
}

(function() {
	"use strict";
	angular.module("CPREC").controller('modalCPRECCtrl',
			modalCPRECCtrl);

	modalCPRECCtrl.$inject = [ 'comunication', 'CPRECServ01', 'alrts', '$log', '$scope','$uibModalInstance', 'i18nService', '$translate', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND' ];
	function modalCPRECCtrl(comunication, CPRECServ01, alrts, $log, $scope, $uibModalInstance, uiGridConstants, i18nService, $translate, translations, OK, NOT_CONTENT, NOT_FOUND) {
		
		$scope.prec = comunication.getData01().prec;
		$scope.save = function ( form ) {
			if( form.$valid ) {
				CPRECServ01.asignPrec( comunication.getData01().orno, $scope.prec ).then(function(response){
					$uibModalInstance.dismiss(false);
					alrts.successMsg("ALRT.ALRT02");
					comunication.setGrid1013("grid1013");
					comunication.setData01(null);
					if( comunication.isValid(comunication.getOrder()) ) {
						comunication.setEvnt05("evnt05");
					}
				})
				.catch(function(error){
					$log.warn(error);
					comunication.setData01(null);
				});
			}
		}
		
		$scope.cancel = function() {
			comunication.setData01(null);
			$uibModalInstance.dismiss(false);
		};
	}
})();

(function() {
	"use strict";
	angular.module('CPREC').controller('CPRECCtrl',
			CPRECCtrl);
	CPRECCtrl.$inject = [ 'comunication', '$uibModal', '$scope','i18nService', '$translate', 'translations', 'OK', 'NOT_CONTENT', 'NOT_FOUND' ];
	function CPRECCtrl(comunication, $uibModal, $scope, i18nService, $translate, translations, OK, NOT_CONTENT, NOT_FOUND) {
		var vm = this;
		
		$scope.$watch(function() { return comunication.getData01() }, function() {
			if( comunication.isValid(comunication.getData01()) ){
				$scope.modalInstance = $uibModal.open({
				 animation : true,
				 templateUrl : 'modalCPRECCtrl.html',
				 controller : 'modalCPRECCtrl',
				 size : "md",
				 backdrop: false,
				 });
				 $scope.modalInstance.result.then(function(data) {
				}, function() {
				});
			}
          }
        );
	}
})();

angular
		.module('CPREC')
		.component(
				'precComponent',
				{
					templateUrl : "/WeighBridgeStandAlone/resources/js/angular/js/components/PREC/CPREC.jsp",
					controller : 'CPRECCtrl'
				});