package com.iss.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Baud {
	PARITY_NONE("Ninguno", 0), PARITY_ODD("Impar", 1), PARITY_EVEN("Par", 2), PARITY_MARK("Marca",
			3), PARITY_SPACE("Espacio", 4);
	@JsonProperty
	private String dsca;

	@JsonProperty
	private int id;

	private Baud(String dsca, int id) {
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
