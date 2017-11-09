package com.asc.process.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.event.spi.PostLoadEvent;
import org.hibernate.event.spi.PostLoadEventListener;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.format.annotation.DateTimeFormat;

import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.UTI1007;
import com.asc.controller.abstracts.Configuration;
import com.asc.entities.abstracts.AbstractEntityID;
import com.asc.serializers.LocalDateTimeDeserializer;
import com.asc.serializers.LocalDateTimeSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

//ENTIDAD: PARAMETROS GENERALES

@Entity
@DynamicInsert(true)
@DynamicUpdate(true)
@Table(name = "par1001")
public class PAR1001 extends AbstractEntityID {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String dsca;
	private String seri;
	private String cddp;
	private MAE1001 user;
	private LocalDateTime fech;
	private String lastor;
	private String lastse;
	private Boolean rep_te;
	private Boolean pescon;
	private MAE1016 company;
	
	public PAR1001() {
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idpa", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	@NotNull
	@ManyToOne
	public MAE1001 getUser() {
		return user;
	}

	public void setUser(MAE1001 user) {
		this.user = user;
	}

	@NotBlank
	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_3)
	@Column(name = "seri", nullable = false)
	public String getSeri() {
		return seri;
	}

	public void setSeri(String seri) {
		this.seri = seri;
	}

	@NotBlank
	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_6)
	@Column(name = "cddp", nullable = false)
	public String getCddp() {
		return cddp;
	}

	public void setCddp(String cddp) {
		this.cddp = cddp;
	}

	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	@Column(name = "fech", nullable = false)
	public LocalDateTime getFech() {
		return fech;
	}

	public void setFech(LocalDateTime fech) {
		this.fech = fech;
	}

	@NotBlank
	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_HUNDRED)
	@Column(name = "dsca", nullable = false)
	public String getDsca() {
		return dsca;
	}

	public void setDsca(String dsca) {
		this.dsca = dsca;
	}

	@Column(name = "active", nullable = true, columnDefinition = "boolean default true")
	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_NINE)
	@Column(name = "lastor", nullable = true)
	public String getLastor() {
		return lastor;
	}

	public void setLastor(String lastor) {
		this.lastor = lastor;
	}

	// ultima serie usada
	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_3)
	@Column(name = "lastse", nullable = true)
	public String getLastse() {
		return lastse;
	}

	public void setLastse(String lastse) {
		this.lastse = lastse;
	}

	//reportar lo teorico
	@Column(name = "rep_te", nullable = false, columnDefinition = "boolean default false")
	public Boolean getRep_te() {
		return rep_te;
	}

	public void setRep_te(Boolean rep_te) {
		this.rep_te = rep_te;
	}

	//pesar articulos contados
	@Column(name = "pescon", nullable = false, columnDefinition = "boolean default true")
	public Boolean getPescon() {
		return pescon;
	}

	public void setPescon(Boolean pescon) {
		this.pescon = pescon;
	}

	@NotNull
	@ManyToOne
	public MAE1016 getCompany() {
		return company;
	}

	public void setCompany(MAE1016 company) {
		this.company = company;
	}
}
