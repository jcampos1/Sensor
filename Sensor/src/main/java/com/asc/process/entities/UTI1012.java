package com.asc.process.entities;

import java.util.ArrayList;
import java.util.List;

/**
 * LISTA DE CONTENEDORES PARA MAESTRO
 */

public class UTI1012{

	private Double pestar;
	private List<UTI1008> lstcon = new ArrayList<UTI1008>(0);
	
	public UTI1012() {
		
	}

	public Double getPestar() {
		return pestar;
	}

	public void setPestar(Double pestar) {
		this.pestar = pestar;
	}

	public List<UTI1008> getLstcon() {
		return lstcon;
	}

	public void setLstcon(List<UTI1008> lstcon) {
		this.lstcon = lstcon;
	}
}