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

//ENTIDAD: PARTNER

@Entity
@Table(name = "mae1017")
public class MAE1017 extends AbstractEntityID {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String code_p;
	private String dsca_p;
	
	public MAE1017() {
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idpa", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	@NotBlank
	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_NINE)
	@Column(name = "code_p", nullable = false)
	public String getCode_p() {
		return code_p;
	}

	public void setCode_p(String code_p) {
		this.code_p = code_p;
	}

	@NotBlank
	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_DESC)
	@Column(name = "dsca_p", nullable = false)
	public String getDsca_p() {
		return dsca_p;
	}

	public void setDsca_p(String dsca_p) {
		this.dsca_p = dsca_p;
	}
}
