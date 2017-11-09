/*MUESTRA CAMPO DE BUSQUEDA CON AUTOSUGERENCIA PARA MAE1011 Y EL COMPONENTE PARA SELECCIONAR MAE1011*/

"use strict";
angular.module('INPUTMAE1011', ['messages']);
/** ************************************************************* */


angular.module('INPUTMAE1011').service('mae1011Service',
		mae1011Service);
mae1011Service.$inject = [ '$http', '$log', '$translate' ];
function mae1011Service($http, $log, $translate) {

	/** ********************** INTERFAZ DEL SERVICIO **************** */
	return {
		load : function( text ) {
			return load( text );
		},
	}
	/** ************************************************************* */

	/** ********************** FUNCIONES PRIVADAS ******************* */
	
	function load( text ) {
		var obj = new Object();
		obj.grid = new Object();
		obj.grid.text_find = text;
		
		// Campos de busquedas
		obj.grid.search_fields = new Array();
		obj.grid.search_fields.push("cedu");
		obj.grid.search_fields.push("nomb");
		obj.grid.search_fields.push("apel");
		
		var url = '/WeighBridgeStandAlone/MAE1011/externPagSimple';
		return $http.post(url, obj);
	}
	/** ************************************************************* */
}

(function() {
	"use strict";
	angular.module('INPUTMAE1011').controller('searchMae1011Controller',
			searchMae1011Controller);
	searchMae1011Controller.$inject = [ 'comunication', 'mae1011Service', '$scope', 'i18nService', '$translate', '$window', 'translations', '$log'];
	function searchMae1011Controller(comunication, mae1011Service, $scope,
			i18nService, $translate, $window, translations, $log) {
		var vm = this;
		$scope.boxSearch = "box-search-mae1011";
		$scope.noResult = "no-result-mae1011";
		$scope.mae1011 = vm.mae1011;
		
		if( $scope.mae1011 != null ) {
			if( $scope.mae1011.hasOwnProperty("cedu") ) {
				$scope.text = $scope.mae1011.cedu;
			}
		}
		
		$scope.load = function ( ) {
			$scope.mae1011 = new Object();
			if( $scope.text != undefined && $scope.text != null) {
				mae1011Service.load($scope.text).then(function(response) {
					angular.element(document.querySelector( "#" + $scope.boxSearch )).show();
					$scope.lstMae1011 = response.data.listData;
					if( $scope.lstMae1011 == undefined || $scope.lstMae1011 == null) {
						angular.element(document.querySelector( "#" + $scope.noResult )).show();
					}else{
						angular.element(document.querySelector( "#" + $scope.noResult )).hide();
					}
				})
				.catch(function() { 
					
				});
			}else{
				$scope.lstMae1011 = [];
				angular.element(document.querySelector( "#" + $scope.noResult )).show();
				angular.element(document.querySelector( "#" + $scope.boxSearch )).hide();
			}
		}
		
		$scope.changeMae1011 = function ( mae1011 ) {
			$scope.mae1011 = mae1011;
			vm.mae1011 = mae1011;
			$scope.text = mae1011.cedu;
			$scope.lstMae1011 = [];
			angular.element(document.querySelector( "#" + $scope.boxSearch )).hide();
			angular.element(document.querySelector( "#" + $scope.noResult )).hide();
		}
		
		$scope.close = function ( ) {
			angular.element(document.querySelector( "#" + $scope.boxSearch )).hide();
			angular.element(document.querySelector( "#" + $scope.noResult )).hide();
		}
		
		/*****************ESCUCHADORES*******************/
		$scope.$watch(function() { return comunication.getCond() }, function() {
			if( comunication.isValid(comunication.getCond())) {
				$scope.mae1011 = comunication.getCond();
				vm.mae1011 = comunication.getCond();
				$scope.text = vm.mae1011.cedu;
			}
          }
        );
		/***************************************************/
	}
})();

angular
.module('INPUTMAE1011')
.component(
		'searchMae1011Component',
		{
			templateUrl : "/WeighBridgeStandAlone/resources/js/angular/js/components/MAE1011/search-mae1011.jsp",
			controller : 'searchMae1011Controller',
			bindings: {
				mae1011: "=",
				formm: "=",
				nameform: "@"
			}
		});