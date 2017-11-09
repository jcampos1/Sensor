package com.iss.enums;

import com.asc.commons.entities.Options;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonFormat(shape= JsonFormat.Shape.OBJECT)
@JsonAutoDetect()
public enum TypeContentEnum {
	PALE("PALE", 0), CEST("CEST", 1), CAJA("CAJA", 2), CARR("CARR", 3);
	
	@JsonProperty
	private String dsca;

	@JsonProperty
	private int id;

	private TypeContentEnum(String dsca, int id) {
		this.id = id;
		this.dsca = dsca;
	}
	
	@JsonCreator
	public static TypeContentEnum getEnumFromValue(Options obj) {
		TypeContentEnum en = TypeContentEnum.values()[obj.getId()];
		return en;
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
