package com.asc.process.entities;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.NaturalId;

import com.asc.controller.abstracts.Configuration;
import com.asc.entities.abstracts.AbstractEntity;

//ENTIDAD: ESTACION DE TRABAJO

@Entity
@Table(name = "station")
public class Station extends AbstractEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String namest;
	private String phonst;
	private Boolean status;
	private REL1002 evento;
	
//	private List<MAE1014> lines = new ArrayList<MAE1014>(0);
	
	public Station() {
	}
	
	@Id
	@NaturalId(mutable=true)
	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_30)
	@Column(name = "namest", unique = true, nullable = false)
	public String getNamest() {
		return namest;
	}

	public void setNamest(String namest) {
		this.namest = namest;
	}

	@NotNull
	@Column(name = "phonst", nullable = false, length = Configuration.SIZE_PHON)
	public String getPhonst() {
		return phonst;
	}

	public void setPhonst(String phonst) {
		this.phonst = phonst;
	}

	@Column(name = "status", nullable = false, columnDefinition = "boolean default false")
	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
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
