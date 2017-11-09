package com.asc.commons.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.format.annotation.DateTimeFormat;

import com.asc.controller.abstracts.Configuration;
import com.asc.entities.abstracts.AbstractEntityID;

@Entity
@DynamicInsert(true)
@DynamicUpdate(true)
@Table(name = "conf1003", indexes = @Index(name = "idx_sgup_mail", columnList = "user_mail", unique = true))
public class CNF1003 extends AbstractEntityID {
	
	private static final long serialVersionUID = 1L;
	
	@Column(name="frst_name", nullable=false, length = Configuration.SIZE_EIGHTEEN)
	private String frst_name;
	
	@Column(name="last_name", nullable=false, length = Configuration.SIZE_THIRTY)
	private String last_name;
	
	@NotNull
	@Column(name = "user_mail", unique = true, nullable = false, length = Configuration.SIZE_FIFTY_FOUR)
	private String user_mail;
	
	@NotNull
	@Column(name = "user_pass", nullable = false, length = Configuration.SIZE_HUNDRED)
	private String user_pass;
	
	@Transient
	private String conf_pass;
	
	// Validation Key
	@Column(name = "valk", nullable = false, length = Configuration.SIZE_THIRTY)
	private String valk;
	
	// Create Date
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	@Column(name = "crte_date", nullable = false)
	private LocalDateTime crte_date;
	
	// Activate Date
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	@Column(name = "date_acti", nullable = false)
	private LocalDateTime date_acti;
	
	// Fail Attemps
	@Column(name = "atmt", nullable = false)
	private int atmt;
	
	// User bloqued
	@Column(name = "user_bloq", nullable = false, columnDefinition = "boolean default false")
	private Boolean user_bloq;
	
	@Column(name = "user_acti", nullable = false, columnDefinition = "boolean default false")
	private Boolean user_acti;
	
	@Id
	@GeneratedValue
	@Column(name = "idsu", unique = true, nullable = false)
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

	public String getUser_pass() {
		return user_pass;
	}

	public void setUser_pass(String user_pass) {
		this.user_pass = user_pass;
	}

	public String getConf_pass() {
		return conf_pass;
	}

	public void setConf_pass(String conf_pass) {
		this.conf_pass = conf_pass;
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

	public Boolean getUser_acti() {
		return user_acti;
	}

	public void setUser_acti(Boolean user_acti) {
		this.user_acti = user_acti;
	}
}
