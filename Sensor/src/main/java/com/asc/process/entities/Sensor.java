package com.asc.process.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.asc.controller.abstracts.Configuration;
import com.asc.entities.abstracts.AbstractEntityID;

//ENTIDAD: SENSOR

@Entity
@Table(name = "sensort")
public class Sensor extends AbstractEntityID {

	private static final long serialVersionUID = 1L;
	
	private String namese;
	private String nomenc;
	private String rango;
	private Boolean active;
	private REL1002 evento;
	
//	private List<MAE1014> lines = new ArrayList<MAE1014>(0);
	
	public Sensor() {
	}
	
	
	@Id
	@GeneratedValue
	@Column(name = "idse", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	@NotNull
	@Column(name = "namese", nullable = false, length = Configuration.SIZE_50)
	public String getNamese() {
		return namese;
	}

	public void setNamese(String namese) {
		this.namese = namese;
	}

	@NotNull
	@Column(name = "nomenc", nullable = false, length = Configuration.SIZE_NOMENC)
	public String getNomenc() {
		return nomenc;
	}

	public void setNomenc(String nomenc) {
		this.nomenc = nomenc;
	}

	@NotNull
	@Column(name = "rango", nullable = false, length = Configuration.SIZE_RANGO)
	public String getRango() {
		return rango;
	}

	public void setRango(String rango) {
		this.rango = rango;
	}


	@Column(name = "active", nullable = true, columnDefinition = "boolean default true")
	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}
	
	@ManyToOne(cascade= CascadeType.ALL)
	public REL1002 getEvento() {
		return evento;
	}

	public void setEvento(REL1002 evento) {
		this.evento = evento;
	}
}
