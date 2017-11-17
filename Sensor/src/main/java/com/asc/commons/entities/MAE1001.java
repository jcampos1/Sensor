package com.asc.commons.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.format.annotation.DateTimeFormat;

import com.asc.controller.abstracts.Configuration;
import com.asc.entities.abstracts.AbstractEntityID;
import com.asc.process.entities.REL1002;
import com.asc.process.entities.Station;
import com.asc.serializers.LocalDateTimeDeserializer;
import com.asc.serializers.LocalDateTimeSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.iss.enums.LanguageEnum;

@Entity
@DynamicInsert(true)
@DynamicUpdate(true)
@Table(name = "mae1001", indexes = @Index(name = "idx_user_mail", columnList = "user_mail", unique = true))
public class MAE1001 extends AbstractEntityID {

	private static final long serialVersionUID = 1L;

	private String frst_name;
	private String last_name;
	private String user_mail;
	private String user_pass;
	private String phone;
	private String valk;
	private LocalDateTime crte_date;
	private LocalDateTime date_acti;
	private int atmt;
	private Boolean user_bloq;
	private Boolean user_dltd;
	private LanguageEnum lang;
	private REL1002 evento;
	private Set<Role> roles = new HashSet<Role>();
	
//	private List<Role> roles = new ArrayList<Role>(0);

	@Transient
	private String conf_mail;

	@Transient
	private String conf_pass;

	public MAE1001() {
	}

	@Id
	@GeneratedValue
	@Column(name = "idus", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	@Column(name = "frst_name", nullable = false, length = Configuration.SIZE_EIGHTEEN)
	public String getFrst_name() {
		return frst_name;
	}

	public void setFrst_name(String frst_name) {
		this.frst_name = frst_name;
	}

	@Column(name = "last_name", nullable = false, length = Configuration.SIZE_THIRTY)
	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	@NotNull
	@Column(name = "user_mail", unique = true, nullable = false, length = Configuration.SIZE_FIFTY_FOUR)
	public String getUser_mail() {
		return user_mail;
	}

	public void setUser_mail(String user_mail) {
		this.user_mail = user_mail;
	}

	@NotNull
	@Column(name = "user_pass", nullable = false, length = Configuration.SIZE_HUNDRED)
	public String getUser_pass() {
		return user_pass;
	}

	public void setUser_pass(String user_pass) {
		this.user_pass = user_pass;
	}

	@NotNull
	@Column(name = "phone", nullable = false, length = Configuration.SIZE_PHON)
	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	// Validation Key
	@Column(name = "valk", nullable = false, length = Configuration.SIZE_THIRTY)
	public String getValk() {
		return valk;
	}

	public void setValk(String valk) {
		this.valk = valk;
	}

	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	@Column(name = "crte_date", nullable = false)
	public LocalDateTime getCrte_date() {
		return crte_date;
	}

	public void setCrte_date(LocalDateTime crte_date) {
		this.crte_date = crte_date;
	}

	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	@Column(name = "date_acti", nullable = true)
	public LocalDateTime getDate_acti() {
		return date_acti;
	}

	public void setDate_acti(LocalDateTime date_acti) {
		this.date_acti = date_acti;
	}

	// Fail Attemps
	@Column(name = "atmt", nullable = false)
	public int getAtmt() {
		return atmt;
	}

	public void setAtmt(int atmt) {
		this.atmt = atmt;
	}

	@Column(name = "user_bloq", nullable = true, columnDefinition = "boolean default false")
	public Boolean getUser_bloq() {
		return user_bloq;
	}

	public void setUser_bloq(Boolean user_bloq) {
		this.user_bloq = user_bloq;
	}

	@Column(name = "active", nullable = true, columnDefinition = "boolean default true")
	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	// User deleted
	@Column(name = "user_dltd", nullable = false, columnDefinition = "boolean default false")
	public Boolean getUser_dltd() {
		return user_dltd;
	}

	public void setUser_dltd(Boolean user_dltd) {
		this.user_dltd = user_dltd;
	}

	@Enumerated(EnumType.ORDINAL)
	public LanguageEnum getLang() {
		return lang;
	}

	public void setLang(LanguageEnum lang) {
		this.lang = lang;
	}

	@ManyToOne(cascade = CascadeType.ALL)
	public REL1002 getEvento() {
		return evento;
	}

	public void setEvento(REL1002 evento) {
		this.evento = evento;
	}

//	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
//	@JoinTable(name = "rel1001", joinColumns = {
//			@JoinColumn(name = "idus", nullable = false, updatable = true, insertable = true) }, inverseJoinColumns = {
//					@JoinColumn(name = "idrl", nullable = false, updatable = true, insertable = true) })
//	public List<Role> getRoles() {
//		return this.roles;
//	}
//
//	public void setRoles(List<Role> roles) {
//		this.roles = roles;
//	}

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name="rel1001", joinColumns={@JoinColumn(name="idus")}, inverseJoinColumns={@JoinColumn(name="idrl")})
	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	@Transient
	public String getConf_mail() {
		return conf_mail;
	}

	public void setConf_mail(String conf_mail) {
		this.conf_mail = conf_mail;
	}

	@Transient
	public String getConf_pass() {
		return conf_pass;
	}

	public void setConf_pass(String conf_pass) {
		this.conf_pass = conf_pass;
	}
}
