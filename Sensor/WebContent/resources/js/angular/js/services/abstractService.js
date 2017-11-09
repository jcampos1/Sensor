/* ************** DECLARACION DE MODULOS ****************** */
'use strict';
angular.module("abstractService", ['messages']);

/* *********************** FILTROS ********************** */
angular.module('abstractService').filter('trunText', function(){
    return function(input, limit){
    	return (input.length > limit) ? input.substr(0, limit)+'...' : input;
    };
})

/* *********************** SERVICIOS ********************** */
"use strict";
angular.module('abstractService').service('functions', general);
general.$inject = [ '$http', '$q', 'alrts', '$translate' ];
function general($http, $q, alrts, $translate) {
	return {
		yes_no : function($scope) {
			var lst2 = new Array();
			var toTrans = new Array();
			
			toTrans.push("DOMAIN.YES");
			toTrans.push("DOMAIN.NO");
			
		    $translate(toTrans).then(function(transl) {
		    	$scope.yes_no = new Array();
		    	var acti = new Object();
		    	acti.id = true;
		    	acti.name = transl["DOMAIN.YES"];
		    	$scope.yes_no.push(acti);
		    	acti = new Object();
		    	acti.id = false;
		    	acti.name = transl["DOMAIN.NO"];
		    	$scope.yes_no.push(acti);
		    	
		    	$scope.current_acti = new Object();
		    	if($scope.user.active) {
		    		$scope.current_acti.id = true;
		    		$scope.current_acti.name = transl["DOMAIN.YES"];
		    	}else{
		    		$scope.current_acti.id = false;
		    		$scope.current_acti.name = transl["DOMAIN.NO"];
		    	}
		    });
		},
		
		getItems: function(opc) {
			switch (opc) {
			case "projects":
				return getItems('project/all');
				break;
			default:
				break;
			}
		},
		
		builMultSel: function(vm, response, selected) {
			return builMultSel(vm, response, selected);
		},
		
		delPropSelect: function(lst) {
			var isNull = true;
			angular.forEach( lst, function( value, key ) { 
				delete value.ticked;
				isNull = false;
			});
			return isNull;
		},
		
		trans_multiselectProj : function($scope) {
			var toTrans = new Array();
			toTrans.push("MULT_SELE.ALL_PROJ");
			toTrans.push("MULT_SELE.NONE_PROJ");
			toTrans.push("MULT_SELE.RESE");
			toTrans.push("MULT_SELE.SEAR_PROJ");
			toTrans.push("MULT_SELE.NOTH_PROJ");
			getTrans($scope, toTrans);
		},
		
		trans_multiselectRols : function($scope) {
			var toTrans = new Array();
			toTrans.push("MULT_SELE.ALL_ROLS");
			toTrans.push("MULT_SELE.NONE_ROLS");
			toTrans.push("MULT_SELE.RESE");
			toTrans.push("MULT_SELE.SEAR_ROLS");
			toTrans.push("MULT_SELE.NOTH_ROLS");
			getTrans($scope, toTrans);
		},
	}
	
	function getTrans($scope, toTrans) {
		$translate(toTrans).then(function(transl) {
	    	$scope.localLang = {
			    "selectAll"       : transl[toTrans[0]],
			    "selectNone"      : transl[toTrans[1]],
			    "reset"           : transl[toTrans[2]],
			    "search"          : transl[toTrans[3]],
			    "nothingSelected" : transl[toTrans[4]]
			}
	    });
	}
	
	function getItems(url) {
		var defered = $q.defer();
		var promise = defered.promise;
		
		$http.post(url).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function builMultSel($scope, lst, selected) {
		var lst2 = new Array();
    	var isEqual;
    	angular.forEach(lst, function(obj1) {
    		var aux = new Object();
    		var aux = obj1;
    		isEqual = false;
    		angular.forEach(selected, function(obj2) {
    			if(obj2.id == obj1.id){
    				isEqual = true;
    			}
			}); 
    		if(isEqual){
    			aux.ticked= true;
    		}else{
    			aux.ticked= false;
    		}
    		
    		lst2.push(aux);
		});
    	
    	return lst2;
    	
//    	$scope.projectsList = lst2;
	}
}