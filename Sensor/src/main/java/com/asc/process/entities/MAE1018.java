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

//ENTIDAD: ALMACEN

@Entity
@Table(name = "mae1018")
public class MAE1018 extends AbstractEntityID {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String code_a;
	private String dsca_a;
	
	public MAE1018() {
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idal", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	@NotBlank
	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_6)
	@Column(name = "code_a", nullable = false)
	public String getCode_a() {
		return code_a;
	}

	public void setCode_a(String code_a) {
		this.code_a = code_a;
	}

	@NotBlank
	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_DESC)
	@Column(name = "dsca_a", nullable = false)
	public String getDsca_a() {
		return dsca_a;
	}

	public void setDsca_a(String dsca_a) {
		this.dsca_a = dsca_a;
	}
}
