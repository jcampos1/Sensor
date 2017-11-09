/*MUESTRA CAMPO DE BUSQUEDA CON AUTOSUGERENCIA PARA MAE101 Y EL COMPONENTE PARA SELECCIONAR MAE101*/

"use strict";
angular.module('INPUTMAE1016', ['MAE1013Service']);
/** ************************************************************* */


angular.module('INPUTMAE1016').service('mae1016Service',
		mae1016Service);
mae1016Service.$inject = [ '$http', '$log', '$translate' ];
function mae1016Service($http, $log, $translate) {

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
		obj.grid.search_fields.push("dsca");
		obj.grid.search_fields.push("number");
		
		var url = '/WeighBridgeStandAlone/MAE1016/externPagSimple';
		return $http.post(url, obj);
	}
	/** ************************************************************* */
}

(function() {
	"use strict";
	angular.module('INPUTMAE1016').controller('searchMae1016Controller',
			searchMae1016Controller);
	searchMae1016Controller.$inject = [ 'comunication', 'parameterFactory', 'mae1013Service', 'mae1016Service', '$scope', 'i18nService', '$translate', '$window', 'translations', '$log'];
	function searchMae1016Controller(comunication, parameterFactory, mae1013Service, mae1016Service, $scope,
			i18nService, $translate, $window, translations, $log) {
		var vm = this;
		$scope.boxSearch = "box-search-mae1016";
		$scope.noResult = "no-result-mae1016";
		$scope.mae1016 = vm.mae1016;
		
		if( $scope.mae1016 != null ) {
			if( $scope.mae1016.hasOwnProperty("dsca") ) {
				$scope.text = $scope.mae1016.dsca;
			}
		}
		
		$scope.load = function ( ) {
			$scope.mae1016 = new Object();
			if( $scope.text != undefined && $scope.text != null) {
				mae1016Service.load($scope.text).then(function(response) {
					angular.element(document.querySelector( "#" + $scope.boxSearch )).show();
					$scope.lstMae1016 = response.data.listData;
					if( $scope.lstMae1016 == undefined || $scope.lstMae1016 == null) {
						angular.element(document.querySelector( "#" + $scope.noResult )).show();
					}else{
						angular.element(document.querySelector( "#" + $scope.noResult )).hide();
					}
				})
				.catch(function() { 
					
				});
			}else{
				$scope.lstMae1016 = [];
				angular.element(document.querySelector( "#" + $scope.noResult )).show();
				angular.element(document.querySelector( "#" + $scope.boxSearch )).hide();
			}
		}
		
		$scope.changeMae1016 = function ( mae1016 ) {
			updateMae1016( mae1016 );
			$scope.lstMae1016 = [];
			angular.element(document.querySelector( "#" + $scope.boxSearch )).hide();
			angular.element(document.querySelector( "#" + $scope.noResult )).hide();
		}
		
		$scope.close = function ( ) {
			angular.element(document.querySelector( "#" + $scope.boxSearch )).hide();
			angular.element(document.querySelector( "#" + $scope.noResult )).hide();
		}
		
		/*****************ESCUCHADORES*******************/
		$scope.$watch(function() { return comunication.getCompany() }, function() {
			if( comunication.isValid(comunication.getCompany())) {
				updateMae1016( comunication.getCompany() );
			}
          }
        );
		/***************************************************/
		
		/*****************FUNCIONES PRIVADAS*******************/
		function updateMae1016( mae1016 ) {
			$scope.mae1016 = mae1016;
			vm.mae1016 = mae1016;
			$scope.text = mae1016.dsca;
		}
		/***************************************************/
		
		/*****************INICIALIZACIONES*******************/
		updateMae1016(parameterFactory.getParam().company);
		comunication.setCompany(null);
		/***************************************************/
	}
})();

angular
.module('INPUTMAE1016')
.component(
		'searchMae1016Component',
		{
			templateUrl : "/WeighBridgeStandAlone/resources/js/angular/js/components/MAE1016/search-mae1016.jsp",
			controller : 'searchMae1016Controller',
			bindings: {
				mae1016: "=",
				formm: "=",
				nameform: "@"
			}
		});