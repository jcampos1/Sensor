'use strict';
angular.module("processApp", [ 'MEDIOAPP',  'myApp', 'widgets01', 'widgets02', 'MAE1008APP', 'MAE1007APP', 'UTI1006APP', 'PAR1001APP', 'MAE1013APP', 'MAE1014APP', 'MAE1015APP', 'selectMAE1016', 'selectMAE1017', 'selectMAE1018', 'desgloseMAE1010', 'CMAE1010_01', 'commons', 'localytics.directives', 'ui.router', 'CTRLPESAJE', 'dynamicNumber', 'Comunication02']);

angular.module("processApp").config(['dynamicNumberStrategyProvider', function(dynamicNumberStrategyProvider){
  dynamicNumberStrategyProvider.addStrategy('general', {
    numFract: 2,
    numSep: separator.sepade,
    numFixed: true,
    numThousand: true
  });
  dynamicNumberStrategyProvider.addStrategy('pedido', {
  	numInt: 11,
    numFract: 2,
    numSep: separator.sepade,
    numNeg: false,
    numThousand: true
  });
}]);

angular.module("processApp").config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/header');
    $stateProvider
    .state('users', {
        url: "/admin/users",
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
        url: "/admin/port",
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
        url: "/admin/display",
        views:{
        	"widgets":{
                template: "<widgets02-component />"
        	},
        	"mstr":{
                templateUrl: "/WeighBridgeStandAlone/resources/views/masters/mstrMAE1007.jsp"
        	},
        } 
    })
    .state('station', {
        url: "/station",
        views:{
        	"widgets":{
                template: "<widgets02-component />"
        	},
        	"stations":{
                templateUrl: "/Sensor/resources/views/forms/station/list.jsp",
                controller: "StationCtrl"
        	},
        } 
     })
     .state('parameters', {
        url: "/admin/parameters",
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
        url: "/admin/reasons",
        views:{
        	"widgets":{
                template: "<widgets02-component />"
        	},
        	"mstr":{
                templateUrl: "/WeighBridgeStandAlone/resources/views/masters/mstrUTI1006.jsp"
        	},
        } 
    })
    .state('header', {
            url: "/header",
            views:{
            	"content-header":{
                     templateUrl: "/WeighBridgeStandAlone/resources/views/includes/content-header.jsp"
                },
                "header":{
                     templateUrl: "/WeighBridgeStandAlone/resources/views/masters/mstrMAE1013.jsp"
                },
                "widgets":{
                    template: "<widgets01-component ></widgets01-component>"
               }
            } 
        })
        .state('lines', {
            url: "/lines",
            views:{
            	"content-header":{
                    templateUrl: "/WeighBridgeStandAlone/resources/views/includes/content-header2.jsp"
                },
                "header":{
                     templateUrl: "/WeighBridgeStandAlone/resources/views/forms/MAE1013/detailPage.jsp"
                },
                "lines": {

                    templateUrl: "/WeighBridgeStandAlone/resources/views/masters/mstrMAE1014.jsp"
                },
                "conten": {
                    templateUrl: "/WeighBridgeStandAlone/resources/views/forms/MAE1010/contenedores.jsp"
                },
                "peso": {
                    template: "<ctrl-pesaje-component></ctrl-pesaje-component>"
                },
                "desglose": {
                	 templateUrl: "/WeighBridgeStandAlone/resources/views/masters/mstrMAE1015.jsp"
                }
            } 
        })
        .state('lines_readonly', {
            url: "/linesReadOnly",
            views:{
            	"content-header":{
                    templateUrl: "/WeighBridgeStandAlone/resources/views/includes/content-header2.jsp"
                },
                "header":{
                     templateUrl: "/WeighBridgeStandAlone/resources/views/forms/MAE1013/detailPage.jsp"
                },
                "lines": {

                    templateUrl: "/WeighBridgeStandAlone/resources/views/masters/mstrMAE1014.jsp"
                },
                "desglose": {
                	 templateUrl: "/WeighBridgeStandAlone/resources/views/masters/mstrMAE1015.jsp"
                }
            } 
        })
        .state('lines_prod', {
            url: "/linesOrder",
            views:{
            	"content-header":{
                    templateUrl: "/WeighBridgeStandAlone/resources/views/includes/content-header2.jsp"
                },
                "header":{
                     templateUrl: "/WeighBridgeStandAlone/resources/views/forms/MAE1013/detailPage.jsp"
                },
                "lines": {

                    templateUrl: "/WeighBridgeStandAlone/resources/views/masters/mstrMAE1014.jsp"
                },
            } 
        })
});