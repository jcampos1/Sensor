/* ************** DECLARACION DE MODULOS ****************** */
'use strict';
angular.module("Comunication02", ['ui.router']);

angular.module("Comunication02").factory('comunication02', function($state, $log) {
  return {
	
	data01: null, //Lista de paridad
	data02: null, //Lista de baudios
	data03: null, //Lista de caracteres
	data04: null, //Lista de bits de parada
	
	/*USADOS EN LA CREACION MAE1013*/
	evnt01: null, //Recargar widgets
    evnt02: null, //Recargar grilla generica
    evnt03: null, //Recargar grilla de articulos retornables
    evnt04: null, //Deshabilitar el ingreso de cantidad de articulos contenedores
    evnt05: null, //Actualizar orden tratada en la vista de líneas
    
	getEvnt01: function() {
        return this.evnt01;
	},
	setEvnt01: function(data) {
	    this.evnt01 = data;
	},
	getEvnt02: function() {
        return this.evnt02;
	},
	setEvnt02: function(data) {
	    this.evnt02 = data;
	},
	getEvnt03: function() {
        return this.evnt03;
	},
	setEvnt03: function(data) {
	    this.evnt03 = data;
	},
	getEvnt04: function() {
        return this.evnt04;
	},
	setEvnt04: function(data) {
	    this.evnt04 = data;
	},
	getEvnt05: function() {
        return this.evnt05;
	},
	setEvnt05: function(data) {
	    this.evnt05 = data;
	},
	
	getData01: function() {
        return this.data01;
	},
	setData01: function(data) {
	    this.data01 = data;
	},
	getData02: function() {
        return this.data02;
	},
	setData02: function(data) {
	    this.data02 = data;
	},
	getData03: function() {
        return this.data03;
	},
	setData03: function(data) {
	    this.data03 = data;
	},
	getData04: function() {
        return this.data04;
	},
	setData04: function(data) {
	    this.data04 = data;
	},
	
	isValid: function(data) {
		return data!=null && data!=undefined;
	},
  };
});