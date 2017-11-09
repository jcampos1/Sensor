/* ************** DECLARACION DE MODULOS ****************** */
'use strict';
angular.module("Comunication01", ['ui.router']);

angular.module("Comunication01").factory('comunication', function($state, $log) {
  return {
	  
	/*USADOS EN LA CREACION MAE1013*/
	sources: new Array(),
	valsrce: new Object(),
    origin: new Object(),
    destin: new Object(),
    orig_p: null,
    orig_a: null,
    dest_p: null,
    dest_a: null,
    cond: null,
    motr: null,
    company: null,
    confpe: null,
    
    /*USADOS PARA EL PROCESO DE PESAJE*/
    
    order: null,
    ordElim: null, 
    line: null,
    line_desg: null,
    mot_02: null,
    mot_03: null, //Suspension
    mot_04: null, //Eliminacion de estacion
    
    evnt01: null, //Mostrar articulo contenedores
    evnt02: null, //Habilitar/Deshabilitar boton de creación de línea (mae1014)
    evnt03: null, //Recargar grilla de articulos retornables
    evnt04: null, //Deshabilitar el ingreso de cantidad de articulos contenedores
    evnt05: null, //Actualizar orden tratada en la vista de líneas
    evnt06: null, //Actualizacion lista de estaciones de trabajo
    
    data02: null, //Entidad a detallar
    data03: null, //Estacion a eliminar
    
    /*USADO PARA FILTRAR POR STATUS DE ORDEN EN MAESTRO DE CABECERA*/
    stat: null,
    
    /*USADO PARA RECARGAR LOS WIDGETS QUE MUESTRAN CANTIDADES POR ESTATUS*/
    relWdgts: null,
    
    /*PARA RECARGAR GRILLA*/
    grid1013: null,
    
    getOrigin: function() {
      return this.origin;
    },
    setOrigin: function(data) {
      this.origin = data;
    },
    getDestin: function() {
        return this.destin;
	},
	setDestin: function(data) {
	    this.destin = data;
	},
	getSources: function() {
        return this.destin;
	},
	setSources: function(data) {
	    this.destin = data;
	},
	getValsrce: function() {
        return this.valsrce;
	},
	setValsrce: function(data) {
	    this.valsrce = data;
	},
	getOrig_p: function() {
        return this.orig_p;
	},
	setOrig_p: function(data) {
	    this.orig_p = data;
	},
	getOrig_a: function() {
        return this.orig_a;
	},
	setOrig_a: function(data) {
	    this.orig_a = data;
	},
	getDest_p: function() {
        return this.dest_p;
	},
	setDest_p: function(data) {
	    this.dest_p = data;
	},
	getDest_a: function() {
        return this.dest_a;
	},
	setDest_a: function(data) {
	    this.dest_a = data;
	},
	getCond: function() {
        return this.cond;
	},
	setCond: function(data) {
	    this.cond = data;
	},
	getMotr: function() {
        return this.motr;
	},
	setMotr: function(data) {
	    this.motr = data;
	},
	getCompany: function() {
        return this.company;
	},
	setCompany: function(data) {
	    this.company = data;
	},
	getOrder: function() {
        return this.order;
	},
	setOrder: function(data) {
	    this.order = data;
	},
	getConfpe: function() {
        return this.confpe;
	},
	setConfpe: function(data) {
	    this.confpe = data;
	},
	
	//línea seleccionada para el inicio del pesaje
	getLine: function() {
        return this.line;
	},
	setLine: function(data) {
	    this.line = data;
	},
	getItem: function() {
        return this.item;
	},
	setItem: function(data) {
	    this.item = data;
	},
	getLine_desg: function() {
        return this.line_desg;
	},
	setLine_desg: function(data) {
	    this.line_desg = data;
	},
	
	 /*USADOS PARA MOTIVOS*/
	getMot_nodesp: function() {
        return this.mot_nodesp;
	},
	setMot_nodesp: function(data) {
	    this.mot_nodesp = data;
	},
	getMot_02: function() {
        return this.mot_02;
	},
	setMot_02: function(data) {
	    this.mot_02 = data;
	},
	getMot_03: function() {
        return this.mot_03;
	},
	setMot_03: function(data) {
	    this.mot_03 = data;
	},
	getMot_04: function() {
        return this.mot_04;
	},
	setMot_04: function(data) {
	    this.mot_04 = data;
	},
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
	getEvnt06: function() {
        return this.evnt06;
	},
	setEvnt06: function(data) {
	    this.evnt06 = data;
	},
	
	
	getLine_dele: function() {
        return this.line_dele;
	},
	setLine_dele: function(data) {
	    this.line_dele = data;
	},
	
	getStat: function() {
        return this.stat;
	},
	setStat: function(data) {
	    this.stat = data;
	},
	
	getRelWdgts: function() {
        return this.relWdgts;
	},
	setRelWdgts: function(data) {
	    this.relWdgts = data;
	},
	
	getGrid1013: function() {
        return this.grid1013;
	},
	setGrid1013: function(data) {
	    this.grid1013 = data;
	},
	
	getOrdElim: function() {
        return this.ordElim;
	},
	setOrdElim: function(data) {
	    this.ordElim = data;
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
	
	isValid: function(data) {
		return data!=null && data!=undefined;
	},
	
	/*****************************************************************/
	/*Params: ?*******************************************************/
	/*Descripción: cambio de vista entre mae1013 -> mae1014***********/
	funct01: function ( ) {
		if( this.order.stat.id != 0 && this.order.stat.id != 1) {
			$state.go('lines_readonly');
		}else{
			if( this.order.confpe ) {
				if( this.order.stat.id  == 1 && currentUser.pesaje ) {
					$state.go('lines');
				}else{
					$state.go('lines_readonly');
				}
			}else{
				$state.go('lines_prod');
			}
		}
	}
  };
});