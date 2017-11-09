/*MUESTRA CAMPO DE BUSQUEDA CON AUTOSUGERENCIA PARA MAE1017 Y EL COMPONENTE PARA SELECCIONAR MAE1017*/

"use strict";
angular.module('INPUTMAE1017', ['messages']);
/** ************************************************************* */


angular.module('INPUTMAE1017').service('mae1017Service',
		mae1017Service);
mae1017Service.$inject = [ '$http', '$log', '$translate' ];
function mae1017Service($http, $log, $translate) {

	/** ********************** INTERFAZ DEL SERVICIO **************** */
	return {
		load : function( text ) {
			return load( text );
		},
	}
	/** ************************************************************* */

	/** ********************** FUNCIONES PRIVADAS ******************* */
	
	function load( text ) {
		console.log("TEXTO A BUSCAR: "+text);
		var obj = new Object();
		obj.grid = new Object();
		obj.grid.text_find = text;
		
		// Campos de busquedas
		obj.grid.search_fields = new Array();
		obj.grid.search_fields.push("dsca_p");
		obj.grid.search_fields.push("code_p");
		
		var url = '/WeighBridgeStandAlone/MAE1017/externPagSimple';
		return $http.post(url, obj);
	}
	/** ************************************************************* */
}

(function() {
	"use strict";
	angular.module('INPUTMAE1017').controller('searchMae1017Controller',
			searchMae1017Controller);
	searchMae1017Controller.$inject = [ 'comunication', 'mae1017Service', '$scope', 'i18nService', '$translate', '$window', 'translations', '$log'];
	function searchMae1017Controller(comunication, mae1017Service, $scope,
			i18nService, $translate, $window, translations, $log) {
		var vm = this;
			$scope.boxSearch = "box-search-mae1017";
			$scope.noResult = "no-result-mae1017";
		
		$scope.mae1017 = vm.mae1017;
		
		if( $scope.mae1017 != null ) {
			if( $scope.mae1017.hasOwnProperty("dsca_p")) {
				$scope.text = $scope.mae1017.dsca_p;
			}
		}
		
		$scope.load = function ( ) {
			$scope.mae1017 = new Object();
			if( $scope.text != undefined && $scope.text != null) {
				mae1017Service.load($scope.text).then(function(response) {
					console.log(response);
					angular.element(document.querySelector( "#" + $scope.boxSearch )).show();
					$scope.lstMae1017 = response.data.listData;
					if( $scope.lstMae1017 == undefined || $scope.lstMae1017 == null) {
						angular.element(document.querySelector( "#" + $scope.noResult )).show();
					}else{
						angular.element(document.querySelector( "#" + $scope.noResult )).hide();
					}
				})
				.catch(function() { 
					
				});
			}else{
				$scope.lstMae1017 = [];
				angular.element(document.querySelector( "#" + $scope.noResult )).show();
				angular.element(document.querySelector( "#" + $scope.boxSearch )).hide();
			}
		}
		
		$scope.changeMae1017 = function ( mae1017 ) {
			$scope.mae1017 = mae1017;
			vm.mae1017 = mae1017;
			$scope.text = mae1017.dsca_p;
			$scope.lstMae1017 = [];
			angular.element(document.querySelector( "#" + $scope.boxSearch )).hide();
			angular.element(document.querySelector( "#" + $scope.noResult )).hide();
		}
		
		$scope.close = function ( ) {
			angular.element(document.querySelector( "#" + $scope.boxSearch )).hide();
			angular.element(document.querySelector( "#" + $scope.noResult )).hide();
		}
		
		/*****************ESCUCHADORES*******************/
		
		//Partner origen
		$scope.$watch(function() { return comunication.getOrig_p() }, function() {
			if( comunication.isValid(comunication.getOrig_p())) {
				$scope.mae1017 = comunication.getOrig_p();
				vm.mae1017 = comunication.getOrig_p();
				$scope.text = vm.mae1017.dsca_p;
			}
          }
        );
		/***************************************************/
	}
})();

(function() {
	"use strict";
	angular.module('INPUTMAE1017').controller('searchMae1017DController',
			searchMae1017DController);
	searchMae1017DController.$inject = [ 'comunication', 'mae1017Service', '$scope', 'i18nService', '$translate', '$window', 'translations', '$log'];
	function searchMae1017DController(comunication, mae1017Service, $scope,
			i18nService, $translate, $window, translations, $log) {
		var vm = this;
		$scope.boxSearch = "box-search-mae1017d";
		$scope.noResult = "no-result-mae1017d";
		
		$scope.mae1017 = vm.mae1017;
		
		if( $scope.mae1017 != null ) {
			if( $scope.mae1017.hasOwnProperty("dsca_p")) {
				$scope.text = $scope.mae1017.dsca_p;
			}
		}
		
		$scope.load = function ( ) {
			$scope.mae1017 = new Object();
			if( $scope.text != undefined && $scope.text != null) {
				mae1017Service.load($scope.text).then(function(response) {
					angular.element(document.querySelector( "#" + $scope.boxSearch )).show();
					$scope.lstMae1017 = response.data.listData;
					if( $scope.lstMae1017 == undefined || $scope.lstMae1017 == null) {
						angular.element(document.querySelector( "#" + $scope.noResult )).show();
					}else{
						angular.element(document.querySelector( "#" + $scope.noResult )).hide();
					}
				})
				.catch(function() { 
					
				});
			}else{
				$scope.lstMae1017 = [];
				angular.element(document.querySelector( "#" + $scope.noResult )).show();
				angular.element(document.querySelector( "#" + $scope.boxSearch )).hide();
			}
		}
		
		$scope.changeMae1017 = function ( mae1017 ) {
			$scope.mae1017 = mae1017;
			vm.mae1017 = mae1017;
			$scope.text = mae1017.dsca_p;
			$scope.lstMae1017 = [];
			angular.element(document.querySelector( "#" + $scope.boxSearch )).hide();
			angular.element(document.querySelector( "#" + $scope.noResult )).hide();
		}
		
		$scope.close = function ( ) {
			angular.element(document.querySelector( "#" + $scope.boxSearch )).hide();
			angular.element(document.querySelector( "#" + $scope.noResult )).hide();
		}
		
		/*****************ESCUCHADORES*******************/
		
		$scope.$watch(function() { return comunication.getDest_p() }, function() {
			if( comunication.isValid(comunication.getDest_p())) {
				$scope.mae1017 = comunication.getDest_p();
				vm.mae1017 = comunication.getDest_p();
				$scope.text = vm.mae1017.dsca_p;
			}
          }
        );
		/***************************************************/
	}
})();

angular
.module('INPUTMAE1017')
.component(
		'searchMae1017Component',
		{
			templateUrl : "/WeighBridgeStandAlone/resources/js/angular/js/components/MAE1017/search-mae1017.jsp",
			controller : 'searchMae1017Controller',
			bindings: {
				mae1017: "=",
				formm: "=",
				nameform: "@"
			}
		});

angular
.module('INPUTMAE1017')
.component(
		'searchMae1017DComponent',
		{
			templateUrl : "/WeighBridgeStandAlone/resources/js/angular/js/components/MAE1017/search-mae1017d.jsp",
			controller : 'searchMae1017DController',
			bindings: {
				mae1017: "=",
				formm: "=",
				nameform: "@"
			}
		});