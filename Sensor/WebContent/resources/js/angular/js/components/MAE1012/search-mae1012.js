/*MUESTRA CAMPO DE BUSQUEDA CON AUTOSUGERENCIA PARA MAE1012 Y EL COMPONENTE PARA SELECCIONAR MAE1012*/

"use strict";
angular.module('INPUTMAE1012', ['messages', 'MAE1013Service' ]);

(function() {
	"use strict";
	angular.module('INPUTMAE1012').controller('searchMae1012Controller',
			searchMae1012Controller);
	searchMae1012Controller.$inject = [ 'comunication', 'mae1013Service', '$scope', 'i18nService', '$translate', '$window', 'translations'];
	function searchMae1012Controller(comunication, mae1013Service, $scope,
			i18nService, $translate, $window, translations) {
		var vm = this;
		$scope.boxSearch = "box-search-mae1012";
		$scope.noResult = "no-result-mae1012";
		$scope.mae1012 = vm.mae1012;
		
		if( $scope.mae1012 != null ) {
			if( $scope.mae1012.hasOwnProperty("dsca") ) {
				$scope.dsca = $scope.mae1012.dsca;
			}
		}
		
		$scope.loadMotr = function ( ) {
			$scope.mae1012 = new Object();
			if( $scope.dsca != undefined && $scope.dsca != null) {
				mae1013Service.loadMotr($scope.dsca).then(function(response) {
					angular.element(document.querySelector( "#" + $scope.boxSearch )).show();
					$scope.motrs = response.data.listData;
					if( $scope.motrs == undefined || $scope.motrs == null) {
						angular.element(document.querySelector( "#" + $scope.noResult )).show();
					}else{
						angular.element(document.querySelector( "#" + $scope.noResult )).hide();
					}
				})
				.catch(function() { 
					
				});
			}else{
				$scope.motrs = [];
				angular.element(document.querySelector( "#" + $scope.noResult )).show();
				angular.element(document.querySelector( "#" + $scope.boxSearch )).hide();
			}
		}
		
		$scope.changeMotr = function ( motr ) {
			$scope.mae1012 = motr;
			vm.mae1012 = motr;
			$scope.dsca = $scope.mae1012.dsca;
			$scope.motrs = [];
			angular.element(document.querySelector( "#" + $scope.boxSearch )).hide();
			angular.element(document.querySelector( "#" + $scope.noResult )).hide();
		}
		
		$scope.close = function ( ) {
			angular.element(document.querySelector( "#" + $scope.boxSearch )).hide();
			angular.element(document.querySelector( "#" + $scope.noResult )).hide();
		}
		
		/*****************ESCUCHADORES*******************/
		$scope.$watch(function() { return comunication.getMotr() }, function() {
			if( comunication.isValid(comunication.getMotr())) {
				$scope.mae1012 = comunication.getMotr();
				vm.mae1012 = comunication.getMotr();
				$scope.dsca = $scope.mae1012.dsca;
			}
          }
        );
		/***************************************************/
	}
})();

angular
.module('INPUTMAE1012')
.component(
		'searchMae1012Component',
		{
			templateUrl : "/WeighBridgeStandAlone/resources/js/angular/js/components/MAE1012/search-mae1012.jsp",
			controller : 'searchMae1012Controller',
			bindings: {
				mae1012: "=",
				formm: "=",
				nameform: "@"
			}
		});