package com.asc.process.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotBlank;
import org.springframework.format.annotation.DateTimeFormat;

import com.asc.controller.abstracts.Configuration;
import com.asc.entities.abstracts.AbstractEntityID;
import com.asc.serializers.LocalDateTimeDeserializer;
import com.asc.serializers.LocalDateTimeSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.iss.enums.CharSepaEnum;

//ENTIDAD: UNIDAD DE DISPLAY

@Entity
@Table(name = "mae1007")
public class MAE1007 extends AbstractEntityID {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String code;
	private String dsca;
	private CharSepaEnum char_sepa;
	private String char_stab;
	private String char_unit;
	private Integer nmax_stab;
	private Integer nmax_unst;
	private Integer posi_weig;
	private Integer nmax_slep;
	private Integer posi_stab;
	private Integer nread_tried;
	private LocalDateTime ingr_date;
	private Double val_min;
	private Double val_max;
	private MAE1008 port;
	private Boolean isused;
	private Boolean defaul;
	private Integer srvrpo;
	private Boolean traced;

	public MAE1007() {
		
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "iddu", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	@NotBlank
	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_DESC)
	@Column(name = "dsca", nullable = false)
	public String getDsca() {
		return dsca;
	}

	public void setDsca(String dsca) {
		this.dsca = dsca;
	}

	@Size(min = Configuration.ZERO, max = Configuration.SIZE_THREE)
	@Column(name = "char_stab", nullable = true)
	public String getChar_stab() {
		return char_stab;
	}

	public void setChar_stab(String char_stab) {
		this.char_stab = char_stab;
	}

	@Min(Configuration.SIZE_ONE)
	@Max(Configuration.SIZE_TEN)
	@Column(name = "posi_stab", nullable = false)
	public Integer getPosi_stab() {
		return posi_stab;
	}

	public void setPosi_stab(Integer posi_stab) {
		this.posi_stab = posi_stab;
	}

	@NotBlank
	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_THREE)
	@Column(name = "char_unit", nullable = false)
	public String getChar_unit() {
		return char_unit;
	}

	public void setChar_unit(String char_unit) {
		this.char_unit = char_unit;
	}

	@Min(Configuration.SIZE_ONE)
	@Max(Configuration.SIZE_TEN)
	@Column(name = "posi_weig", nullable = false)
	public Integer getPosi_weig() {
		return posi_weig;
	}

	public void setPosi_weig(Integer posi_weig) {
		this.posi_weig = posi_weig;
	}

	@ManyToOne
	@JoinColumn(name = "idcp")
	public MAE1008 getPort() {
		return port;
	}

	public void setPort(MAE1008 port) {
		this.port = port;
	}

	@Min(Configuration.SIZE_FIVE)
	@Max(Configuration.SIZE_50)
	@Column(name = "nmax_stab", nullable = false)
	public Integer getNmax_stab() {
		return nmax_stab;
	}

	public void setNmax_stab(Integer nmax_stab) {
		this.nmax_stab = nmax_stab;
	}

	@Min(Configuration.SIZE_ONE)
	@Column(name = "nmax_slep", nullable = false)
	public Integer getNmax_slep() {
		return nmax_slep;
	}

	public void setNmax_slep(Integer nmax_slep) {
		this.nmax_slep = nmax_slep;
	}

	@Min(Configuration.SIZE_FIVE)
	@Max(Configuration.SIZE_50)
	@Column(name = "nmax_unst", nullable = false)
	public Integer getNmax_unst() {
		return nmax_unst;
	}

	public void setNmax_unst(Integer nmax_unst) {
		this.nmax_unst = nmax_unst;
	}

	@Column(name = "nread_tried")
	@Min(Configuration.SIZE_ONE)
	public Integer getNread_tried() {
		return nread_tried;
	}

	public void setNread_tried(Integer nread_tried) {
		this.nread_tried = nread_tried;
	}

	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	@Column(name = "ingr_date", nullable = false)
	public LocalDateTime getIngr_date() {
		return ingr_date;
	}

	public void setIngr_date(LocalDateTime ingr_date) {
		this.ingr_date = ingr_date;
	}

	@Min(-50)
	@Max(0)
	@Column(name = "val_min", nullable = false)
	public Double getVal_min() {
		return val_min;
	}

	public void setVal_min(Double val_min) {
		this.val_min = val_min;
	}

	@Min(0)
	@Max(50)
	@Column(name = "val_max", nullable = false)
	public Double getVal_max() {
		return val_max;
	}

	public void setVal_max(Double val_max) {
		this.val_max = val_max;
	}

	@Enumerated(EnumType.ORDINAL)
	public CharSepaEnum getChar_sepa() {
		return char_sepa;
	}

	public void setChar_sepa(CharSepaEnum char_sepa) {
		this.char_sepa = char_sepa;
	}

	@NotBlank
	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_6)
	@Column(name = "code", nullable = false)
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@Column(name = "isused", nullable = false, columnDefinition = "boolean default false")
	public Boolean getIsused() {
		return isused;
	}

	public void setIsused(Boolean isused) {
		this.isused = isused;
	}

	@Column(name = "defaul", nullable = false, columnDefinition = "boolean default false")
	public Boolean getDefaul() {
		return defaul;
	}

	public void setDefaul(Boolean defaul) {
		this.defaul = defaul;
	}

	@Column(name = "srvrpo")
	@Min(Configuration.MIN_SRVR_PORT)
	public Integer getSrvrpo() {
		return srvrpo;
	}

	public void setSrvrpo(Integer srvrpo) {
		this.srvrpo = srvrpo;
	}

	@Column(name = "traced", nullable = false, columnDefinition = "boolean default false")
	public Boolean getTraced() {
		return traced;
	}

	public void setTraced(Boolean traced) {
		this.traced = traced;
	}
	
	@Override
	public String toString() {
		return "DisplayUnit [iddu=" + id + ", dsca=" + dsca + "]";
	}
}
