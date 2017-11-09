'use strict';
angular.module("widgets01", [ 'Comunication01', 'messages', 'localytics.directives', 'MAE1013Service']);


(function() {
	"use strict";
	angular.module('widgets01').controller('widgets01Controller',
			widgets01Controller);
	widgets01Controller.$inject = [ 'comunication', 'mae1013Service', '$scope',
			'uiGridConstants', 'i18nService', '$translate', 'translations' ];
	function widgets01Controller(comunication, mae1013Service, $scope, uiGridConstants, i18nService, $translate, translations) {
		var vm = this;
		
		mae1013Service.getLstStat().then(function(response) {
			$scope.stats = response;
			comunication.setStat(response[0]);
		})
        .catch(function(error) {
        	console.log(error);
        });
		
		$scope.$watch(function() { return comunication.getRelWdgts() }, function() {
			if( comunication.isValid(comunication.getRelWdgts()) ){
				reloadWidgets ( );
				comunication.setRelWdgts(null);
			}
          }
        );
		
		vm.queryByStat = function(st) {
			comunication.setStat(st);
		}
		
		function reloadWidgets ( ) {
			mae1013Service.getCantOrdersByStatus().then(function(response) {
				$scope.lstCant = response;
			})
	        .catch(function(error) {
	        	console.log(error);
	        });
		}
		
		reloadWidgets();
	}
})();

angular
		.module('widgets01')
		.component(
				'widgets01Component',
				{
					templateUrl : "/WeighBridgeStandAlone/resources/js/angular/js/components/WIDGETS/widgets01.jsp",
					controller : 'widgets01Controller',
					controllerAs: 'vm'
				});