package com.iss.enums;

import com.asc.commons.entities.Options;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
@JsonAutoDetect()
public enum Parity {
	PARITY_NONE("Ninguno", 0), PARITY_ODD("Impar", 1), PARITY_EVEN("Par", 2), PARITY_MARK("Marca",
			3), PARITY_SPACE("Espacio", 4);
	@JsonProperty
	private String dsca;

	@JsonProperty
	private int id;

	private Parity(String dsca, int id) {
		this.id = id;
		this.dsca = dsca;
	}

	@JsonCreator
	public static Parity getEnumFromValue(Options obj) {
		Parity st = Parity.values()[obj.getId()];
		return st;
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
