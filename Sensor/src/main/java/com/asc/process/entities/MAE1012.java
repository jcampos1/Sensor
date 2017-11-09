package com.asc.process.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotBlank;

import com.asc.controller.abstracts.Configuration;
import com.asc.entities.abstracts.AbstractEntityID;

//SESION RELACIONADA EN BAAN fmfmd0555m000
//ENTIDAD: MEDIO DE TRANSPORTE

@Entity
@Table(name = "mae1012")
public class MAE1012 extends AbstractEntityID {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String motr;
	private String dsca;
	private String plac;
	
	public MAE1012() {
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idtr", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	@NotBlank
	@Size(min = Configuration.SIZE_ONE, max = Configuration.MOTR_MT)
	@Column(name = "motr", nullable = false)
	public String getMotr() {
		return motr;
	}

	public void setMotr(String motr) {
		this.motr = motr;
	}

	@NotBlank
	@Size(min = Configuration.SIZE_ONE, max = Configuration.DSCA_MT)
	@Column(name = "dsca", nullable = false)
	public String getDsca() {
		return dsca;
	}

	public void setDsca(String dsca) {
		this.dsca = dsca;
	}

	@NotBlank
	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_EIGHT)
	@Column(name = "plac", nullable = false)
	public String getPlac() {
		return plac;
	}

	public void setPlac(String plac) {
		this.plac = plac;
	}
}
