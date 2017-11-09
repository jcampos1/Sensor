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

// ENTIDAD: CONDUCTORES

@Entity
@Table(name = "mae1011")
public class MAE1011 extends AbstractEntityID {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String cedu;
	private String nomb;
	private String apel;
	
	public MAE1011() {
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idar", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	@NotBlank
	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_EIGHT)
	@Column(name = "cedu", nullable = false)
	public String getCedu() {
		return cedu;
	}

	public void setCedu(String cedu) {
		this.cedu = cedu;
	}

	@NotBlank
	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_30)
	@Column(name = "nomb", nullable = false)
	public String getNomb() {
		return nomb;
	}

	public void setNomb(String nomb) {
		this.nomb = nomb;
	}

	@NotBlank
	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_30)
	@Column(name = "apel", nullable = false)
	public String getApel() {
		return apel;
	}

	public void setApel(String apel) {
		this.apel = apel;
	}
}
