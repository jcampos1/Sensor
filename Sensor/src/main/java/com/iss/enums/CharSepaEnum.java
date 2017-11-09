package com.iss.enums;

import com.asc.commons.entities.Options;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonFormat(shape= JsonFormat.Shape.OBJECT)
@JsonAutoDetect()
public enum CharSepaEnum {
	SPACE(" ", 0), COMMA(",", 1), POINT(".", 2);
	@JsonProperty
	private String dsca;

	@JsonProperty
	private int id;

	private CharSepaEnum(String dsca, int id) {
		this.id = id;
		this.dsca = dsca;
	}
	
	@JsonCreator
	public static CharSepaEnum getEnumFromValue(Options obj) {
		CharSepaEnum st = CharSepaEnum.values()[obj.getId()];
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
