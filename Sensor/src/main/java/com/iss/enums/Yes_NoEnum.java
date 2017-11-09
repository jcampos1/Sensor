package com.iss.enums;

import com.asc.commons.entities.Options;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonFormat(shape= JsonFormat.Shape.OBJECT)
@JsonAutoDetect()
public enum Yes_NoEnum {
	YES("YES", 1), NO("NO", 2);
	
	@JsonProperty
	private String dsca;

	@JsonProperty
	private int id;

	private Yes_NoEnum(String dsca, int id) {
		this.id = id;
		this.dsca = dsca;
	}
	
	@JsonCreator
	public static Yes_NoEnum getEnumFromValue(Options obj) {
		Yes_NoEnum en = Yes_NoEnum.values()[obj.getId()];
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
