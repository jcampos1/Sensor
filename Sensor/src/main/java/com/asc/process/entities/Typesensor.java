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

//ENTIDAD: TIPO SENSOR (EJMPLO: TEMPARATURA SUELO, GAS, ULTRAVIOLETA)

@Entity
@Table(name = "typesensor")
public class Typesensor extends AbstractEntityID {

	private static final long serialVersionUID = 1L;
	
	private String namety;
	private String descty;
	private REL1002 evento;
	
	public Typesensor() {
	}
	
	
	@Id
	@GeneratedValue
	@Column(name = "idty", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	@NotNull
	@Column(name = "namety", nullable = false, length = Configuration.SIZE_50)
	public String getNamety() {
		return namety;
	}


	public void setNamety(String namety) {
		this.namety = namety;
	}

	@Column(name = "descty", nullable = true, length = Configuration.SIZE_100)
	public String getDescty() {
		return descty;
	}

	public void setDescty(String descty) {
		this.descty = descty;
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
