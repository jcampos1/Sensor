package com.asc.validators;

import org.springframework.security.core.userdetails.User;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.asc.controller.forms.entities.ChangePWD;
import com.asc.utils.StringUtil;

public class PasswordFormValidator implements Validator {

	public boolean supports(Class<?> clazz) {
		return User.class.equals(clazz);
	}

	public void validate(Object target, Errors errors) {
		String pass = "", cpass = "";

		if (target instanceof com.asc.commons.entities.MAE1001) {
			com.asc.commons.entities.MAE1001 sf = (com.asc.commons.entities.MAE1001) target;
			pass = sf.getUser_pass();
			cpass = sf.getConf_pass();
		} else if (target instanceof ChangePWD) {
			ChangePWD pwd = (ChangePWD) target;
			pass = pwd.getPass();
			cpass = pwd.getConf_pass();
		}
		if (StringUtil.isEmptyOrNullValue(cpass)) {
			errors.rejectValue("conf_pass", "required.field");
		} else if (!pass.equals(cpass)) {
			errors.rejectValue("conf_pass", "valid.diff");
		}
	}

}