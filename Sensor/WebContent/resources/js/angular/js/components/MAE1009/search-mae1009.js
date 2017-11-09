/*MUESTRA CAMPO DE BUSQUEDA CON AUTOSUGERENCIA PARA MAE1009 Y EL COMPONENTE PARA SELECCIONAR MAE1009*/

"use strict";
angular.module('INPUTMAE1009', ['messages']);
/** ************************************************************* */


angular.module('INPUTMAE1009').service('mae1009Service',
		mae1009Service);
mae1009Service.$inject = [ '$http', '$log', '$translate' ];
function mae1009Service($http, $log, $translate) {

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
		
		obj.grid.search_fields.push("item");
		obj.grid.search_fields.push("dsca");
		
		var url = '/WeighBridgeStandAlone/MAE1009/externPagSimple';
		return $http.post(url, obj);
	}
	/** ************************************************************* */
}

(function() {
	"use strict";
	angular.module('INPUTMAE1009').controller('searchMae1009Controller',
			searchMae1009Controller);
	searchMae1009Controller.$inject = [ 'comunication', 'mae1009Service', '$scope', 'i18nService', '$translate', '$window', 'translations', '$log'];
	function searchMae1009Controller(comunication, mae1009Service, $scope,
			i18nService, $translate, $window, translations, $log) {
		var vm = this;
		
		$scope.load = function ( ) {
			$scope.mae1009 = new Object();
			if( $scope.text != undefined && $scope.text != null) {
				mae1009Service.load($scope.text).then(function(response) {
					angular.element(document.querySelector( "#" + $scope.boxSearch )).show();
					$scope.lstMae1009 = response.data.listData;
					if( $scope.lstMae1009 == undefined || $scope.lstMae1009 == null) {
						angular.element(document.querySelector( "#" + $scope.noResult )).show();
					}else{
						angular.element(document.querySelector( "#" + $scope.noResult )).hide();
					}
				})
				.catch(function() { 
					
				});
			}else{
				$scope.lstMae1009 = [];
				angular.element(document.querySelector( "#" + $scope.noResult )).show();
				angular.element(document.querySelector( "#" + $scope.boxSearch )).hide();
			}
		}
		
		$scope.changeMae1009 = function ( mae1009 ) {
			updateMae1016( mae1009 );
			$scope.lstMae1009 = [];
			angular.element(document.querySelector( "#" + $scope.boxSearch )).hide();
			angular.element(document.querySelector( "#" + $scope.noResult )).hide();
		}
		
		$scope.close = function ( ) {
			angular.element(document.querySelector( "#" + $scope.boxSearch )).hide();
			angular.element(document.querySelector( "#" + $scope.noResult )).hide();
		}
		
		/*****************ESCUCHADORES*******************/
		$scope.$watch(function() { return comunication.getItem() }, function() {
			if( comunication.isValid(comunication.getItem()) ) {
				updateMae1016( comunication.getItem() );
			}
          }
        );
		/***************************************************/
		
		/*****************FUNCIONES PRIVADAS*******************/
		function updateMae1016( mae1009 ) {
			$scope.mae1009 = mae1009;
			vm.mae1009 = mae1009;
			$scope.text = vm.mae1009.item;
		}
		/***************************************************/
		
		/*****************INICIALIZACIONES*******************/
		$scope.boxSearch = "box-search-mae1009";
		$scope.noResult = "no-result-mae1009";
		$scope.mae1009 = vm.mae1009;
		if( vm.mae1009 != null && vm.mae1009 != undefined && vm.mae1009.hasOwnProperty("item") ) {
			$scope.text = vm.mae1009.item;
		}
		/***************************************************/
	}
})();

angular
.module('INPUTMAE1009')
.component(
		'searchMae1009Component',
		{
			templateUrl : "/WeighBridgeStandAlone/resources/js/angular/js/components/MAE1009/search-mae1009.jsp",
			controller : 'searchMae1009Controller',
			bindings: {
				mae1009: "=",
				formm: "=",
				nameform: "@"
			}
		});