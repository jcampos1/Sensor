package com.iss.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum IttpEnum {
	RECEPCION("Recepción", 1), ENTREGA("Entrega", 2), TRANSFERENCIA("Transferencia", 3), TRANSFERENCIAOEC("Transferencia OEC", 4);
	@JsonProperty
	private String dsca;

	@JsonProperty
	private int id;

	private IttpEnum(String dsca, int id) {
		this.id = id;
		this.dsca = dsca;
	}

	public String getDsca() {
		return dsca;
	}

	public void setDsca(String dsca) {
		this.dsca = dsca;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
}
