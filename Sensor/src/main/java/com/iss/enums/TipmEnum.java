package com.iss.enums;

import com.asc.commons.entities.Options;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonFormat(shape= JsonFormat.Shape.OBJECT)
@JsonAutoDetect()
public enum TipmEnum {
	RECE("Recepción", 0), DESP("Despacho", 1), REIN("Reintegro", 2), DEVO("Devolución", 3), INVE("Inventario", 4);
	
	@JsonProperty
	private String dsca;

	@JsonProperty
	private int id;

	private TipmEnum(String dsca, int id) {
		this.id = id;
		this.dsca = dsca;
	}
	
	@JsonCreator
	public static TipmEnum getEnumFromValue(Options obj) {
		TipmEnum st = TipmEnum.values()[obj.getId()];
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
