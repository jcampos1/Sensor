package com.asc.process.entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotBlank;

import com.asc.controller.abstracts.Configuration;
import com.asc.entities.abstracts.AbstractEntityID;
import com.iss.enums.TypeContentEnum;

// ENTIDAD RELACIONADA EN BAAN whint611
// ENTIDAD: CONTENEDORES

@Entity
@Table(name = "mae1010")
public class MAE1010 extends AbstractEntityID {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private TypeContentEnum type;
	private String item;
	private Boolean reto;
	private Double pest;
	private String peststr;
	private Boolean pesb; 
	private Integer cant = 0;
	private String codear;
	
	public MAE1010() {
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idar", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	@NotBlank
	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_47)
	@Column(name = "item", nullable = false)
	public String getItem() {
		return item;
	}

	public void setItem(String item) {
		this.item = item;
	}
	
	@NotBlank
	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_47)
	@Column(name = "codear", nullable = false)
	public String getCodear() {
		return codear;
	}

	public void setCodear(String codear) {
		this.codear = codear;
	}

	@Min(0)
	@Column(name = "pest", nullable = false)
	public Double getPest() {
		return pest;
	}

	public void setPest(Double pest) {
		this.pest = pest;
	}

	@Enumerated(EnumType.ORDINAL)
	public TypeContentEnum getType() {
		return type;
	}

	public void setType(TypeContentEnum type) {
		this.type = type;
	}

	@Column(name = "reto", nullable = false)
	public Boolean getReto() {
		return reto;
	}

	public void setReto(Boolean reto) {
		this.reto = reto;
	}

	@Column(name = "pesb", nullable = false)
	public Boolean getPesb() {
		return pesb;
	}

	public void setPesb(Boolean pesb) {
		this.pesb = pesb;
	}

	@Transient
	public Integer getCant() {
		return cant;
	}

	public void setCant(Integer cant) {
		this.cant = cant;
	}

	@Transient
	public String getPeststr() {
		return peststr;
	}

	public void setPeststr(String peststr) {
		this.peststr = peststr;
	}
}

