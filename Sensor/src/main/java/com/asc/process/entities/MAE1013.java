package com.asc.process.entities;

import java.beans.Transient;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.format.annotation.DateTimeFormat;

import com.asc.commons.entities.MAE1001;
import com.asc.controller.abstracts.Configuration;
import com.asc.entities.abstracts.AbstractEntity;
import com.asc.serializers.LocalDateTimeDeserializer;
import com.asc.serializers.LocalDateTimeSerializer;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.iss.enums.PrintEnum;
import com.iss.enums.SourceEnum;
import com.iss.enums.StatusOrpEnum;
import com.iss.enums.TipmEnum;

//ENTIDAD: CABECERA ORDEN DE PESAJE

@Entity
@Table(name = "mae1013")
public class MAE1013 extends AbstractEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String orno;
	private TipmEnum tipm;
	private String cddp;
	private MAE1012 motr;
	private MAE1011 cond;
	private String prec;
	private LocalDateTime fech;
	private LocalDateTime fech_desp;
	private LocalDateTime fech_carg;
	private LocalDateTime fech_confpe;
	private MAE1001 user;
	private StatusOrpEnum stat;
	private REL1002 evento;
	private PrintEnum impres;
	private List<MAE1014> lines = new ArrayList<MAE1014>(0);
	private MAE1016 company;
	private SourceEnum origin;
	private SourceEnum destin;
	private MAE1017 orig_p;
	private MAE1018 orig_a;
	private MAE1017 dest_p;
	private MAE1018 dest_a;
	private Boolean confpe;
	
	private String fechstr;
	private String fech_despstr;
	private String fech_cargstr;
	private Double tar_to;
	private Double bru_to;
	
	public MAE1013() {
	}
	
	@Id
	@NaturalId(mutable=true)
	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_NINE)
	@Column(name = "orno", unique = true, nullable = false)
	public String getOrno() {
		return orno;
	}

	public void setOrno(String orno) {
		this.orno = orno;
	}

	@NotNull
	@ManyToOne
	public MAE1012 getMotr() {
		return motr;
	}

	public void setMotr(MAE1012 motr) {
		this.motr = motr;
	}
	
	@NotNull
	@ManyToOne
	public MAE1011 getCond() {
		return cond;
	}

	public void setCond(MAE1011 cond) {
		this.cond = cond;
	}

	@NotNull
	@ManyToOne
	public MAE1001 getUser() {
		return user;
	}

	public void setUser(MAE1001 user) {
		this.user = user;
	}

	@Enumerated(EnumType.ORDINAL)
	public TipmEnum getTipm() {
		return tipm;
	}

	public void setTipm(TipmEnum tipm) {
		this.tipm = tipm;
	}

	@Enumerated(EnumType.ORDINAL)
	public PrintEnum getImpres() {
		return impres;
	}

	public void setImpres(PrintEnum impres) {
		this.impres = impres;
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

	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_40)
	@Column(name = "prec", nullable = true)
	public String getPrec() {
		return prec;
	}

	public void setPrec(String prec) {
		this.prec = prec;
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

	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	@Column(name = "fech_desp", nullable = true)
	public LocalDateTime getFech_desp() {
		return fech_desp;
	}

	public void setFech_desp(LocalDateTime fech_desp) {
		this.fech_desp = fech_desp;
	}

	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	@Column(name = "fech_carg", nullable = true)
	public LocalDateTime getFech_carg() {
		return fech_carg;
	}

	public void setFech_carg(LocalDateTime fech_carg) {
		this.fech_carg = fech_carg;
	}


	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	@Column(name = "fech_confpe", nullable = true)
	public LocalDateTime getFech_confpe() {
		return fech_confpe;
	}

	public void setFech_confpe(LocalDateTime fech_confpe) {
		this.fech_confpe = fech_confpe;
	}

	@Enumerated(EnumType.ORDINAL)
	public StatusOrpEnum getStat() {
		return stat;
	}

	public void setStat(StatusOrpEnum stat) {
		this.stat = stat;
	}
	
	@ManyToOne(cascade= CascadeType.ALL)
	public REL1002 getEvento() {
		return evento;
	}

	public void setEvento(REL1002 evento) {
		this.evento = evento;
	}

	@OneToMany(fetch = FetchType.LAZY, cascade= CascadeType.ALL, mappedBy = "header")
	@JsonIgnore
	@JsonManagedReference
	public List<MAE1014> getLines() {
		return lines;
	}

	public void setLines(List<MAE1014> lines) {
		this.lines = lines;
	}

	@Transient
	public String getFechstr() {
		return fechstr;
	}

	public void setFechstr(String fechstr) {
		this.fechstr = fechstr;
	}

	@Transient
	public String getFech_despstr() {
		return fech_despstr;
	}

	public void setFech_despstr(String fech_despstr) {
		this.fech_despstr = fech_despstr;
	}
	@Transient
	public String getFech_cargstr() {
		return fech_cargstr;
	}

	public void setFech_cargstr(String fech_cargstr) {
		this.fech_cargstr = fech_cargstr;
	}

	@Transient
	public Double getTar_to() {
		return tar_to;
	}

	public void setTar_to(Double tar_to) {
		this.tar_to = tar_to;
	}

	@Transient
	public Double getBru_to() {
		return bru_to;
	}

	public void setBru_to(Double bru_to) {
		this.bru_to = bru_to;
	}
	
	@NotNull
	@ManyToOne
	public MAE1016 getCompany() {
		return company;
	}

	public void setCompany(MAE1016 company) {
		this.company = company;
	}

	@Enumerated(EnumType.ORDINAL)
	public SourceEnum getOrigin() {
		return origin;
	}

	public void setOrigin(SourceEnum origin) {
		this.origin = origin;
	}

	@Enumerated(EnumType.ORDINAL)
	public SourceEnum getDestin() {
		return destin;
	}

	public void setDestin(SourceEnum destin) {
		this.destin = destin;
	}

	@ManyToOne
	public MAE1017 getOrig_p() {
		return orig_p;
	}

	public void setOrig_p(MAE1017 orig_p) {
		this.orig_p = orig_p;
	}

	@ManyToOne
	public MAE1018 getOrig_a() {
		return orig_a;
	}

	public void setOrig_a(MAE1018 orig_a) {
		this.orig_a = orig_a;
	}

	@ManyToOne
	public MAE1017 getDest_p() {
		return dest_p;
	}

	public void setDest_p(MAE1017 dest_p) {
		this.dest_p = dest_p;
	}

	@ManyToOne
	public MAE1018 getDest_a() {
		return dest_a;
	}

	public void setDest_a(MAE1018 dest_a) {
		this.dest_a = dest_a;
	}

	@Column(name = "confpe", nullable = false, columnDefinition = "boolean default false")
	public Boolean getConfpe() {
		return confpe;
	}

	public void setConfpe(Boolean confpe) {
		this.confpe = confpe;
	}
}
