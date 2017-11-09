package com.asc.commons.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import com.asc.controller.abstracts.Configuration;
import com.asc.entities.abstracts.AbstractEntityID;
import com.iss.enums.MailType;

/**
 * Email Messages
 */

@Entity
@DynamicInsert(true)
@DynamicUpdate(true)
@Table(name = "uti1004")
public class UTI1004 extends AbstractEntityID {

	private static final long serialVersionUID = 1L;

	@NotNull
	@Column(name = "user", nullable = false)
	private MAE1001 user;

	@NotNull
	@Email
	@NotBlank
	@Length(min = Configuration.SIZE_MINIMUM, max = Configuration.SIZE_HUNDRED)
	@Column(name = "send_to", nullable = false, length = Configuration.SIZE_HUNDRED)
	private String send_to;

	@NotNull
	@Enumerated(EnumType.STRING)
	@Column(name = "type_mess", nullable = false)
	private MailType type_mess;

	@NotNull
	@NotBlank
	@Size(min = Configuration.SIZE_MINIMUM, max = Configuration.SIZE_FIVE_THOUSAND)
	@Column(name = "mail_mess", nullable = false, length = Configuration.SIZE_FIVE_THOUSAND)
	private String mail_mess;

	@Column(name = "crte_date")
	private LocalDateTime crte_date;

	@Column(name = "send_date")
	private LocalDateTime send_date;

	@Column(name = "proc_flag", nullable = false, columnDefinition = "boolean default false")
	private Boolean proc_flag;

	@Column(name = "mess_dled", nullable = false, columnDefinition = "boolean default false")
	private Boolean mess_dled;

	private String mess_subj;

	private String mess_adtf;

	public UTI1004() {

	}

	@Id
	@GeneratedValue
	@Column(name = "idms", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "idus")
	public MAE1001 getUser() {
		return user;
	}

	public void setUser(MAE1001 user) {
		this.user = user;
	}

	public String getSend_to() {
		return send_to;
	}

	public void setSend_to(String send_to) {
		this.send_to = send_to;
	}

	public MailType getType_mess() {
		return type_mess;
	}

	public void setType_mess(MailType type_mess) {
		this.type_mess = type_mess;
	}

	public String getMail_mess() {
		return mail_mess;
	}

	public void setMail_mess(String mail_mess) {
		this.mail_mess = mail_mess;
	}

	public LocalDateTime getCrte_date() {
		return crte_date;
	}

	public void setCrte_date(LocalDateTime crte_date) {
		this.crte_date = crte_date;
	}

	public LocalDateTime getSend_date() {
		return send_date;
	}

	public void setSend_date(LocalDateTime send_date) {
		this.send_date = send_date;
	}

	public Boolean getProc_flag() {
		return proc_flag;
	}

	public void setProc_flag(Boolean proc_flag) {
		this.proc_flag = proc_flag;
	}

	public Boolean getMess_dled() {
		return mess_dled;
	}

	public void setMess_dled(boolean mess_dled) {
		this.mess_dled = mess_dled;
	}

	public String getMess_subj() {
		return mess_subj;
	}

	public void setMess_subj(String mess_subj) {
		this.mess_subj = mess_subj;
	}

	public String getMess_adtf() {
		return mess_adtf;
	}

	public void setMess_adtf(String mess_adtf) {
		this.mess_adtf = mess_adtf;
	}

}