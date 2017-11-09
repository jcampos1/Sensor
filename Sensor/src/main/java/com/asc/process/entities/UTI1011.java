package com.asc.process.entities;

import java.util.ArrayList;
import java.util.List;

/**
 * LISTA DE CONTENEDORES PARA MAESTRO
 */

public class UTI1011<T>{

	private Double pestar;
	private List<T> lstcon = new ArrayList<T>(0);
	
	public UTI1011() {
		
	}

	public Double getPestar() {
		return pestar;
	}

	public void setPestar(Double pestar) {
		this.pestar = pestar;
	}

	public List<T> getLstcon() {
		return lstcon;
	}

	public void setLstcon(List<T> lstcon) {
		this.lstcon = lstcon;
	}
}