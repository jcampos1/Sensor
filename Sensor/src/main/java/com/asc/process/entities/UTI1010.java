package com.asc.process.entities;

/**
 * LINEA DE CONTENEDOR EN ORDEN DE PESAJE
 */

public class UTI1010{


	private MAE1010 conten;
	private Integer cant;
	private Double pestar;
	
	public UTI1010() {
		
	}

	public MAE1010 getConten() {
		return conten;
	}

	public void setConten(MAE1010 conten) {
		this.conten = conten;
	}

	public Double getPestar() {
		return pestar;
	}

	public void setPestar(Double pestar) {
		this.pestar = pestar;
	}

	public Integer getCant() {
		return cant;
	}

	public void setCant(Integer cant) {
		this.cant = cant;
	}
}