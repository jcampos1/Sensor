package com.asc.process.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Min;

import com.asc.entities.abstracts.AbstractEntityID;
import com.fasterxml.jackson.annotation.JsonBackReference;

/**
 * PAREJA ARTICULO CONTENEDOR Y CANTIDAD SELECCIONADA
 */

@Entity
@Table(name = "uti1008")
public class UTI1008 extends AbstractEntityID {

	private static final long serialVersionUID = 1L;

	private MAE1010 conten;
	private Integer nconte;
	private MAE1015 linepe;
	private Double total;
	
	/*Peso tara del articulo contenedor utilizado*/
	private Double copest;

	public UTI1008() {

	}

	@Id
	@GeneratedValue
	@Column(name = "idmo", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	@ManyToOne(cascade= CascadeType.ALL)
	public MAE1010 getConten() {
		return conten;
	}

	public void setConten(MAE1010 conten) {
		this.conten = conten;
	}

	@Min(0)
	@Column(name = "nconte", columnDefinition = "int default 0")
	public Integer getNconte() {
		return nconte;
	}

	public void setNconte(Integer nconte) {
		this.nconte = nconte;
	}

	@ManyToOne(cascade= CascadeType.ALL)
	@JsonBackReference
	public MAE1015 getLinepe() {
		return linepe;
	}

	public void setLinepe(MAE1015 linepe) {
		this.linepe = linepe;
	}

	@Transient
	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	@Min(0)
	@Column(name = "copest", nullable = false)
	public Double getCopest() {
		return copest;
	}

	public void setCopest(Double copest) {
		this.copest = copest;
	}
}