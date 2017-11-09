package com.asc.controller.forms.entities;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import com.asc.controller.abstracts.Configuration;
import com.asc.validatos.levels.OrderedChecksMail.lengthMail;
import com.asc.validatos.levels.OrderedChecksMail.patterMail;
import com.asc.validatos.levels.OrderedChecksMail.requiredMail;

public class Ask4Mail {

	@Email(groups = { patterMail.class })
	@NotBlank(groups = { requiredMail.class })
	@Length(min = Configuration.SIZE_MINIMUM, max = Configuration.SIZE_FIFTY_FOUR, groups = {
			lengthMail.class })
	private String login;

	public Ask4Mail() {

	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

}
