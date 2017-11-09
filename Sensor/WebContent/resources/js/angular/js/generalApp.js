'use strict';
angular.module("generalApp", [ 'myApp', 'MAE1008APP', 'MAE1007APP', 'PAR1001APP', 'Comunication01', 'UTI1006APP', 'messages', 'notify', 'localytics.directives', 'ui.router', 'ngLoadingSpinner', 'widgets02']);

angular.module("generalApp").config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/users');
    $stateProvider.state('users', {
            url: "/users",
            views:{
            	"widgets":{
                     template: "<widgets02-component />"
                },
                "mstr":{
                     templateUrl: "/WeighBridgeStandAlone/resources/views/masters/mstrUser.jsp"
                },
            } 
        })
        .state('port', {
            url: "/port",
            views:{
            	"widgets":{
                    template: "<widgets02-component />"
            	},
            	"mstr":{
                    templateUrl: "/WeighBridgeStandAlone/resources/views/masters/mstrMAE1008.jsp"
            	},
            } 
        })
        .state('display', {
            url: "/display",
            views:{
            	"widgets":{
                    template: "<widgets02-component />"
            	},
            	"mstr":{
                    templateUrl: "/WeighBridgeStandAlone/resources/views/masters/mstrMAE1007.jsp"
            	},
            } 
        })
         .state('parameters', {
            url: "/parameters",
            views:{
            	"widgets":{
                    template: "<widgets02-component />"
            	},
            	"mstr":{
                    templateUrl: "/WeighBridgeStandAlone/resources/views/masters/mstrPAR1001.jsp"
            	},
            } 
        })
        .state('reasons', {
            url: "/reasons",
            views:{
            	"widgets":{
                    template: "<widgets02-component />"
            	},
            	"mstr":{
                    templateUrl: "/WeighBridgeStandAlone/resources/views/masters/mstrUTI1006.jsp"
            	},
            } 
        })
});