/*MUESTRA CAMPO DE BUSQUEDA CON AUTOSUGERENCIA PARA MAE1018 Y EL COMPONENTE PARA SELECCIONAR MAE1018*/

"use strict";
angular.module('INPUTMAE1018', ['messages']);
/** ************************************************************* */


angular.module('INPUTMAE1018').service('mae1018Service',
		mae1018Service);
mae1018Service.$inject = [ '$http', '$log', '$translate' ];
function mae1018Service($http, $log, $translate) {

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
		obj.grid.search_fields.push("dsca_a");
		obj.grid.search_fields.push("code_a");
		
		var url = '/WeighBridgeStandAlone/MAE1018/externPagSimple';
		return $http.post(url, obj);
	}
	/** ************************************************************* */
}

(function() {
	"use strict";
	angular.module('INPUTMAE1018').controller('searchMae1018Controller',
			searchMae1018Controller);
	searchMae1018Controller.$inject = [ 'comunication', 'mae1018Service', '$scope', 'i18nService', '$translate', '$window', 'translations', '$log'];
	function searchMae1018Controller(comunication, mae1018Service, $scope,
			i18nService, $translate, $window, translations, $log) {
		var vm = this;
		$scope.boxSearch = "box-search-mae1018";
		$scope.noResult = "no-result-mae1018";
		
		$scope.mae1018 = vm.mae1018;
		
		if( $scope.mae1018 != null  ) {
			if( $scope.mae1018.hasOwnProperty("code_a") ) {
				$scope.text = $scope.mae1018.code_a;
			}
		}
		
		$scope.load = function ( ) {
			$scope.mae1018 = new Object();
			if( $scope.text != undefined && $scope.text != null) {
				mae1018Service.load($scope.text).then(function(response) {
					console.log(response);
					angular.element(document.querySelector( "#" + $scope.boxSearch )).show();
					$scope.lstMae1018 = response.data.listData;
					if( $scope.lstMae1018 == undefined || $scope.lstMae1018 == null) {
						angular.element(document.querySelector( "#" + $scope.noResult )).show();
					}else{
						angular.element(document.querySelector( "#" + $scope.noResult )).hide();
					}
				})
				.catch(function() { 
					
				});
			}else{
				$scope.lstMae1018 = [];
				angular.element(document.querySelector( "#" + $scope.noResult )).show();
				angular.element(document.querySelector( "#" + $scope.boxSearch )).hide();
			}
		}
		
		$scope.changeMae1018 = function ( mae1018 ) {
			$scope.mae1018 = mae1018;
			vm.mae1018 = mae1018;
			$scope.text = mae1018.code_a;
			$scope.lstMae1018 = [];
			angular.element(document.querySelector( "#" + $scope.boxSearch )).hide();
			angular.element(document.querySelector( "#" + $scope.noResult )).hide();
		}
		
		$scope.close = function ( ) {
			angular.element(document.querySelector( "#" + $scope.boxSearch )).hide();
			angular.element(document.querySelector( "#" + $scope.noResult )).hide();
		}
		
		/*****************ESCUCHADORES*******************/
		
		//Partner origen
		$scope.$watch(function() { return comunication.getOrig_a() }, function() {
			if( comunication.isValid(comunication.getOrig_a())) {
				$scope.mae1018 = comunication.getOrig_a();
				vm.mae1018 = comunication.getOrig_a();
				$scope.text = vm.mae1018.code_a;
			}
          }
        );
		/***************************************************/
	}
})();

(function() {
	"use strict";
	angular.module('INPUTMAE1018').controller('searchMae1018DController',
			searchMae1018DController);
	searchMae1018DController.$inject = [ 'comunication', 'mae1018Service', '$scope', 'i18nService', '$translate', '$window', 'translations', '$log'];
	function searchMae1018DController(comunication, mae1018Service, $scope,
			i18nService, $translate, $window, translations, $log) {
		var vm = this;
		$scope.boxSearch = "box-search-mae1018d";
		$scope.noResult = "no-result-mae1018d";
		
		$scope.mae1018 = vm.mae1018;
		
		if( $scope.mae1018 != null  ) {
			if( $scope.mae1018.hasOwnProperty("code_a") ) {
				$scope.text = $scope.mae1018.code_a;
			}
		}
		
		$scope.load = function ( ) {
			$scope.mae1018 = new Object();
			if( $scope.text != undefined && $scope.text != null) {
				mae1018Service.load($scope.text).then(function(response) {
					angular.element(document.querySelector( "#" + $scope.boxSearch )).show();
					$scope.lstMae1018 = response.data.listData;
					if( $scope.lstMae1018 == undefined || $scope.lstMae1018 == null) {
						angular.element(document.querySelector( "#" + $scope.noResult )).show();
					}else{
						angular.element(document.querySelector( "#" + $scope.noResult )).hide();
					}
				})
				.catch(function() { 
					
				});
			}else{
				$scope.lstMae1018 = [];
				angular.element(document.querySelector( "#" + $scope.noResult )).show();
				angular.element(document.querySelector( "#" + $scope.boxSearch )).hide();
			}
		}
		
		$scope.changeMae1018 = function ( mae1018 ) {
			$scope.mae1018 = mae1018;
			vm.mae1018 = mae1018;
			$scope.text = mae1018.code_a;
			$scope.lstMae1018 = [];
			angular.element(document.querySelector( "#" + $scope.boxSearch )).hide();
			angular.element(document.querySelector( "#" + $scope.noResult )).hide();
		}
		
		$scope.close = function ( ) {
			angular.element(document.querySelector( "#" + $scope.boxSearch )).hide();
			angular.element(document.querySelector( "#" + $scope.noResult )).hide();
		}
		
		/*****************ESCUCHADORES*******************/
		
		$scope.$watch(function() { return comunication.getDest_a() }, function() {
			if( comunication.isValid(comunication.getDest_a())) {
				$scope.mae1018 = comunication.getDest_a();
				vm.mae1018 = comunication.getDest_a();
				$scope.text = vm.mae1018.code_a;
			}
          }
        );
		/***************************************************/
	}
})();

angular
.module('INPUTMAE1018')
.component(
		'searchMae1018Component',
		{
			templateUrl : "/WeighBridgeStandAlone/resources/js/angular/js/components/MAE1018/search-mae1018.jsp",
			controller : 'searchMae1018Controller',
			bindings: {
				mae1018: "=",
				formm: "=",
				nameform: "@"
			}
		});

angular
.module('INPUTMAE1018')
.component(
		'searchMae1018DComponent',
		{
			templateUrl : "/WeighBridgeStandAlone/resources/js/angular/js/components/MAE1018/search-mae1018d.jsp",
			controller : 'searchMae1018DController',
			bindings: {
				mae1018: "=",
				formm: "=",
				nameform: "@"
			}
		});