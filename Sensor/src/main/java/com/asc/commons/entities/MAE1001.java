package com.asc.commons.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.format.annotation.DateTimeFormat;

import com.asc.controller.abstracts.Configuration;
import com.asc.entities.abstracts.AbstractEntityID;
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

	@Column(name = "frst_name", nullable = false, length = Configuration.SIZE_EIGHTEEN)
	private String frst_name;

	@Column(name = "last_name", nullable = false, length = Configuration.SIZE_THIRTY)
	private String last_name;

	@NotNull
	@Column(name = "user_mail", unique = true, nullable = false, length = Configuration.SIZE_FIFTY_FOUR)
	private String user_mail;

	@Transient
	private String conf_mail;

	@NotNull
	@Column(name = "user_pass", nullable = false, length = Configuration.SIZE_HUNDRED)
	private String user_pass;

	@NotNull
	@Column(name = "phone", nullable = false, length = Configuration.SIZE_PHON)
	private String phone;

	@Transient
	private String conf_pass;

	// Validation Key
	@Column(name = "valk", nullable = false, length = Configuration.SIZE_THIRTY)
	private String valk;

	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	@Column(name = "crte_date", nullable = false)
	private LocalDateTime crte_date;

	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	@Column(name = "date_acti", nullable = false)
	private LocalDateTime date_acti;

	// Fail Attemps
	@Column(name = "atmt", nullable = false)
	private int atmt;

	// User bloqued
	@Column(name = "user_bloq", nullable = false, columnDefinition = "boolean default false")
	private Boolean user_bloq;

	// User deleted
	@Column(name = "user_dltd", nullable = false, columnDefinition = "boolean default false")
	private Boolean user_dltd;

	@Enumerated(EnumType.ORDINAL)
	LanguageEnum lang;

	private List<Role> roles = new ArrayList<Role>(0);

	// Crear orden manual
	@Column(name = "ornd", nullable = false, columnDefinition = "boolean default false")
	private Boolean ornd;
	
	// Realizar pesaje
	@Column(name = "pesaje", nullable = false, columnDefinition = "boolean default false")
	private Boolean pesaje;

	// Ingresar pesos manual
	@Column(name = "ingr", nullable = false, columnDefinition = "boolean default false")
	private Boolean ingr;

	// Eliminar pesos
	@Column(name = "dele", nullable = false, columnDefinition = "boolean default false")
	private Boolean dele;

	// Aprobar diferencia
	@Column(name = "apro", nullable = false, columnDefinition = "boolean default false")
	private Boolean apro;

	// Anular pedido
	@Column(name = "anul", nullable = false, columnDefinition = "boolean default false")
	private Boolean anul;

	// Aprobar devolución (Mal estado)
	@Column(name = "peso", nullable = false, columnDefinition = "boolean default false")
	private Boolean peso;

	// Generar OV devolución (Mal estado)
	@Column(name = "geov", nullable = false, columnDefinition = "boolean default false")
	private Boolean geov;

	public MAE1001() {
	}

	@Id
	@GeneratedValue
	@Column(name = "idus", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	public String getFrst_name() {
		return frst_name;
	}

	public void setFrst_name(String frst_name) {
		this.frst_name = frst_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getUser_mail() {
		return user_mail;
	}

	public void setUser_mail(String user_mail) {
		this.user_mail = user_mail;
	}

	@Transient
	public String getConf_mail() {
		return conf_mail;
	}

	public void setConf_mail(String conf_mail) {
		this.conf_mail = conf_mail;
	}

	public String getUser_pass() {
		return user_pass;
	}

	public void setUser_pass(String user_pass) {
		this.user_pass = user_pass;
	}

	@Transient
	public String getConf_pass() {
		return conf_pass;
	}

	public void setConf_pass(String conf_pass) {
		this.conf_pass = conf_pass;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getValk() {
		return valk;
	}

	public void setValk(String valk) {
		this.valk = valk;
	}

	public LocalDateTime getCrte_date() {
		return crte_date;
	}

	public void setCrte_date(LocalDateTime crte_date) {
		this.crte_date = crte_date;
	}

	public LocalDateTime getDate_acti() {
		return date_acti;
	}

	public void setDate_acti(LocalDateTime date_acti) {
		this.date_acti = date_acti;
	}

	public int getAtmt() {
		return atmt;
	}

	public void setAtmt(int atmt) {
		this.atmt = atmt;
	}

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

	public Boolean getUser_dltd() {
		return user_dltd;
	}

	public void setUser_dltd(Boolean user_dltd) {
		this.user_dltd = user_dltd;
	}

	public LanguageEnum getLang() {
		return lang;
	}

	public void setLang(LanguageEnum lang) {
		this.lang = lang;
	}

	public Boolean getOrnd() {
		return ornd;
	}

	public void setOrnd(Boolean ornd) {
		this.ornd = ornd;
	}

	public Boolean getPesaje() {
		return pesaje;
	}

	public void setPesaje(Boolean pesaje) {
		this.pesaje = pesaje;
	}

	public Boolean getIngr() {
		return ingr;
	}

	public void setIngr(Boolean ingr) {
		this.ingr = ingr;
	}

	public Boolean getDele() {
		return dele;
	}

	public void setDele(Boolean dele) {
		this.dele = dele;
	}

	public Boolean getApro() {
		return apro;
	}

	public void setApro(Boolean apro) {
		this.apro = apro;
	}

	public Boolean getAnul() {
		return anul;
	}

	public void setAnul(Boolean anul) {
		this.anul = anul;
	}

	public Boolean getPeso() {
		return peso;
	}

	public void setPeso(Boolean peso) {
		this.peso = peso;
	}

	public Boolean getGeov() {
		return geov;
	}

	public void setGeov(Boolean geov) {
		this.geov = geov;
	}

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "rel1001", joinColumns = {
			@JoinColumn(name = "idus", nullable = false, updatable = true, insertable = true) }, inverseJoinColumns = {
					@JoinColumn(name = "idrl", nullable = false, updatable = true, insertable = true) })
	public List<Role> getRoles() {
		return this.roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}
}
