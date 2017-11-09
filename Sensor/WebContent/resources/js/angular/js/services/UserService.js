/* ************** DECLARACION DE MODULOS ****************** */
'use strict';
angular.module("userValidator", ['notify', 'messages', 'Comunication02']);

/* *********************** SERVICIOS ********************** */
"use strict";
angular.module('userValidator').service('userService', user);
user.$inject = [ 'comunication02', '$http', '$q', 'alrts', '$translate' ];
function user(comunication02, $http, $q, alrts, $translate) {
	var path;
	var path_appl_conf = "appl_conf";

	return {
		checkUser : function(entity) {
			checkUserPromise(entity)
			.then(function(response) {
	        })
	        .catch(function(error) {
	        });
		},
		
		update : function(entity, $uibModalInstance, opc, $scope,  bcg, pscope) {
			checkUserPromise(entity, opc)
			.then(function(response) {
				window.clearErrors("FATH_FORM");
	        	if(response.status == "ok") {
	        		updatePromise(entity, opc)
			        .then(function(data) {
			        	if($uibModalInstance){
			        		$uibModalInstance.close(true);
			        	}
			        	showMsg(opc);
			        	if(opc ==0){
			        		$scope.user = new Object();
			        	}else{
			        		if( entity.user_mail == currentUser.user_mail ) {
			        			currentUser = entity;
			        		}
			        	}
			        	
			        	if( entity.active ) {
			        		comunication02.setEvnt01("reloadWidgets");
			        	}
			        	bcg.getPage(pscope, 0);
			        })
			        .catch(function(error) {
			        	console.log(error);
			        });
	        	}else {
	        		window.showErrors(response.flds);
	        	}
	        })
	        .catch(function(response) {
	        	console.log(response.error);
	        });
		},
		
		getRoles: function() {
			return getRoles();
		},
		
		rolesTranslate: function($scope, lst) {
			return rolesTranslate($scope, lst);
		},
	}

	function updatePromise(entity, opc) {
		var defered = $q.defer();
		var promise = defered.promise;
		var url = '';
		
		switch(opc) {
		case 0:
			url = 'user/create';
			break;
		case 1:
		default:
			url = 'user/update';
			break;
		}
		
		$http.post(url, entity).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function checkUserPromise(entity, opc) {
		var defered = $q.defer();
		var promise = defered.promise;
		var url = '';
		
		switch(opc) {
		case 0:
			url = 'user/checkUser';
			break;
		case 1:
			url = 'user/checkUserEditAdmin';
			break;
		default:
			url = 'user/checkUserEditUser';
			break;
		}

		$http.post(url, entity).success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function getRoles() {
		var defered = $q.defer();
		var promise = defered.promise;
		
		$http.post('user/roles').success(function(data) {
			defered.resolve(data);
		}).error(function(err) {
			defered.reject(err);
		});
		return promise;
	}
	
	function rolesTranslate($scope, lst) {
		var lst2 = new Array();
		var toTrans = new Array();
		
		angular.forEach(lst, function(rol) {
			toTrans.push("USER."+rol.role_name);
			}); 
		
		
	    $translate(toTrans).then(function(transl) {
	    	var isEqual;
	    	angular.forEach(lst, function(rol) {
	    		var aux = new Object();
	    		var aux = rol;
	    		aux.dsca = transl["USER."+rol.role_name];
	    		isEqual = false;
	    		angular.forEach($scope.user.roles, function(rol_curr) {
	    			if(rol_curr.role_name == rol.role_name){
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
	    	
			$scope.rolesList = lst2;
			});
	}
	
	function showMsg(opc) {
		
		switch(opc) {
		case 0:
			alrts.successMsg("CONF.SEND_MAIL");
			break;
		case 1:
		default:
			alrts.successMsg("ALRT.USER_UPDT");
			break;
		}
	}
}