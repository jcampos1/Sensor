package com.asc.commons.entities;

import java.io.Serializable;

public class Options implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private int id;
	
	private String dsca;
	
	public Options() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDsca() {
		return dsca;
	}

	public void setDsca(String dsca) {
		this.dsca = dsca;
	}
}
