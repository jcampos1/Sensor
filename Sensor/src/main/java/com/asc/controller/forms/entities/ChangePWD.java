package com.asc.controller.forms.entities;

import javax.persistence.Transient;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import com.asc.controller.abstracts.Configuration;
import com.asc.validatos.levels.OrderedChecksMail.lengthMail;
import com.asc.validatos.levels.OrderedChecksMail.patterMail;
import com.asc.validatos.levels.OrderedChecksMail.requiredMail;

public class ChangePWD {

	@Email(groups = { patterMail.class })
	@NotBlank(groups = { requiredMail.class })
	@Length(min = Configuration.SIZE_MINIMUM, max = Configuration.SIZE_FIFTY_FOUR, groups = {
			lengthMail.class })
	private String login;

	@NotBlank(groups = { requiredMail.class })
	@Length(min = Configuration.SIZE_MINIMUM, max = Configuration.SIZE_HUNDRED, groups = {
			lengthMail.class })
	private String pass;

	@Transient
	private String conf_pass;

	public ChangePWD() {

	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPass() {
		return pass;
	}

	public void setPass(String pass) {
		this.pass = pass;
	}

	@Transient
	public String getConf_pass() {
		return conf_pass;
	}

	public void setConf_pass(String conf_pass) {
		this.conf_pass = conf_pass;
	}
}