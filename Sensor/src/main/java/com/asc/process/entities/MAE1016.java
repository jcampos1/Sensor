package com.asc.process.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import com.asc.controller.abstracts.Configuration;
import com.asc.entities.abstracts.AbstractEntityID;

// ENTIDAD: COMPAÑIA
@Entity
@Table(name = "mae1016")
public class MAE1016 extends AbstractEntityID {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String dsca;
	private Integer number;
	
	public MAE1016() {
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idco", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	@Column(name = "dsca", nullable = false)
	public String getDsca() {
		return dsca;
	}

	public void setDsca(String dsca) {
		this.dsca = dsca;
	}

	@Min(Configuration.MIN_COMPANY)
	@Max(Configuration.MAX_COMPANY)
	@Column(name = "number", nullable = false)
	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

	@Override
	public String toString() {
		return "ComPort [idco=" + id + ", dsca=" + dsca + ", number=" + number + "]";
	}
}
