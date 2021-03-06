'use strict';
angular.module("processApp", [ 'MEDIOAPP', 'widgets01', 'GRIDUTI1006', 'MAE1008APP', 'MAE1007APP', 'UTI1006APP', 'PAR1001APP', 'MAE1013APP', 'MAE1014APP', 'MAE1015APP', 'selectMAE1016', 'selectMAE1017', 'selectMAE1018', 'desgloseMAE1010', 'CMAE1010_01', 'commons', 'localytics.directives', 'ui.router', 'CTRLPESAJE', 'dynamicNumber', 'Comunication02']);

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
                 templateUrl: "/Sensor/resources/views/masters/mstrMAE1001.jsp"
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
                templateUrl: "/Sensor/resources/views/masters/mstrMAE1008.jsp"
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
                templateUrl: "/Sensor/resources/views/masters/mstrMAE1007.jsp"
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
     .state('sensor', {
        url: "/sensor",
        views:{
        	"widgets":{
                template: "<widgets02-component />"
        	},
        	"mstr":{
                templateUrl: "/Sensor/resources/views/masters/mstrSensor.jsp"
        	},
        } 
     })
     .state('typesensor', {
        url: "/typesensor",
        views:{
        	"widgets":{
                template: "<widgets02-component />"
        	},
        	"mstr":{
                templateUrl: "/Sensor/resources/views/masters/mstrTypesensor.jsp"
        	},
        } 
     })
     .state('role', {
        url: "/role",
        views:{
        	"widgets":{
                template: "<widgets02-component />"
        	},
        	"mstr":{
                templateUrl: "/Sensor/resources/views/masters/mstrRole.jsp"
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
                templateUrl: "/Sensor/resources/views/forms/PAR1001/list.jsp"
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
                templateUrl: "/Sensor/resources/views/masters/mstrUTI1006.jsp"
        	},
        } 
    })
    .state('header', {
            url: "/header",
            views:{
            	"content-header":{
                     templateUrl: "/Sensor/resources/views/includes/content-header.jsp"
                },
                "header":{
                     templateUrl: "/Sensor/resources/views/masters/mstrMAE1013.jsp"
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
                    templateUrl: "/Sensor/resources/views/includes/content-header2.jsp"
                },
                "header":{
                     templateUrl: "/Sensor/resources/views/forms/MAE1013/detailPage.jsp"
                },
                "lines": {

                    templateUrl: "/Sensor/resources/views/masters/mstrMAE1014.jsp"
                },
                "conten": {
                    templateUrl: "/Sensor/resources/views/forms/MAE1010/contenedores.jsp"
                },
                "peso": {
                    template: "<ctrl-pesaje-component></ctrl-pesaje-component>"
                },
                "desglose": {
                	 templateUrl: "/Sensor/resources/views/masters/mstrMAE1015.jsp"
                }
            } 
        })
        .state('lines_readonly', {
            url: "/linesReadOnly",
            views:{
            	"content-header":{
                    templateUrl: "/Sensor/resources/views/includes/content-header2.jsp"
                },
                "header":{
                     templateUrl: "/Sensor/resources/views/forms/MAE1013/detailPage.jsp"
                },
                "lines": {

                    templateUrl: "/Sensor/resources/views/masters/mstrMAE1014.jsp"
                },
                "desglose": {
                	 templateUrl: "/Sensor/resources/views/masters/mstrMAE1015.jsp"
                }
            } 
        })
        .state('lines_prod', {
            url: "/linesOrder",
            views:{
            	"content-header":{
                    templateUrl: "/Sensor/resources/views/includes/content-header2.jsp"
                },
                "header":{
                     templateUrl: "/Sensor/resources/views/forms/MAE1013/detailPage.jsp"
                },
                "lines": {

                    templateUrl: "/Sensor/resources/views/masters/mstrMAE1014.jsp"
                },
            } 
        })
});


angular.module("processApp").directive("match", function() {
	return {
		require : 'ngModel',
		link : function(scope, elem, attrs, ctrl) {
			var firstPassword = '#' + attrs.match;
			$(elem).add(firstPassword).on('keyup', function() {
				scope.$apply(function() {
					var v = elem.val() === $(firstPassword).val();
					ctrl.$setValidity('match', v);
				});
			});
		}
	}
});