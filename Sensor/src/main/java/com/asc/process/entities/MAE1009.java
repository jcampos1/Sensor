package com.asc.process.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.validator.constraints.NotBlank;

import com.asc.controller.abstracts.Configuration;
import com.asc.entities.abstracts.AbstractEntityID;

//ENTIDAD: ARTICULOS

@Entity
@DynamicInsert(true)
@DynamicUpdate(true)
@Table(name = "mae1009")
public class MAE1009 extends AbstractEntityID {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String item;
	private String dsca;
	private String cuni;
	private String stuw;
	private Boolean iscont;
	private Double peso;
	
	public MAE1009() {
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idar", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	@NotBlank
	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_DESC_SHORT)
	@Column(name = "dsca", nullable = false)
	public String getDsca() {
		return dsca;
	}

	public void setDsca(String dsca) {
		this.dsca = dsca;
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
	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_3)
	@Column(name = "cuni", nullable = false)
	public String getCuni() {
		return cuni;
	}

	public void setCuni(String cuni) {
		this.cuni = cuni;
	}

	@NotBlank
	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_3)
	@Column(name = "stuw", nullable = false)
	public String getStuw() {
		return stuw;
	}

	public void setStuw(String stuw) {
		this.stuw = stuw;
	}

	@Column(name = "iscont", nullable = false, columnDefinition = "boolean default false")
	public Boolean getIscont() {
		return iscont;
	}

	public void setIscont(Boolean iscont) {
		this.iscont = iscont;
	}

	@Min(0)
	@Column(name = "peso", nullable = false)
	public Double getPeso() {
		return peso;
	}

	public void setPeso(Double peso) {
		this.peso = peso;
	}

	@Override
	public String toString() {
		return "MAE1009 [idar=" + id + ", dsca=" + dsca + "]";
	}
}
