package com.iss.enums;

import com.asc.commons.entities.Options;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonFormat(shape= JsonFormat.Shape.OBJECT)
@JsonAutoDetect()
public enum StatusOrpEnum {
	CREA("Creada", 0), PROC("En proceso", 1), SUSPE("Suspendida", 2), ELIMI("Eliminada", 3), CLOS("Cerrada", 4), EXPO("Exportada", 5);
	
	@JsonProperty
	private String dsca;

	@JsonProperty
	private int id;

	private StatusOrpEnum(String dsca, int id) {
		this.id = id;
		this.dsca = dsca;
	}
	
	@JsonCreator
	public static StatusOrpEnum getEnumFromValue(Options obj) {
		StatusOrpEnum st = StatusOrpEnum.values()[obj.getId()];
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
