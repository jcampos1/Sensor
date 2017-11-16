package com.asc.validators;

import java.util.Iterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.Role;
import com.asc.controller.abstracts.Configuration;
import com.asc.exceptions.MyWebException;
import com.asc.service.interfaces.IRolesService;
import com.asc.service.interfaces.IUserService;
import com.asc.utils.StringUtil;

@Component
public class UserEditValidator extends Configuration implements Validator {

	@Autowired
	private IUserService userService;

	@Autowired
	private IRolesService rolesService;

	public boolean supports(Class<?> clazz) {
		return MAE1001.class.equals(clazz);
	}

	public void validate(Object target, Errors errors) {
		MAE1001 user = (MAE1001) target;

		// Se valida nombre
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "frst_name",
				"gene.required", getMess("gene.required"));
		// Se valida apellido
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "last_name",
				"gene.required", getMess("gene.required"));
		// Se valida telefono
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "phone",
				"gene.required", getMess("gene.required"));

		if (!StringUtil.isEmptyOrNullValue(user.getUser_mail())
				&& !StringUtil.isEmptyOrNullValue(user.getConf_mail())) {
			if (!user.getUser_mail().equals(user.getConf_mail())) {
				errors.rejectValue("conf_mail", "conf_mail.nomatch",
						getMess("conf_mail.nomatch"));
			}
		} else {
			errors.rejectValue("user_mail", "gene.required",
					getMess("gene.required"));
			ValidationUtils.rejectIfEmptyOrWhitespace(errors, "conf_mail",
					"gene.required", getMess("gene.required"));
		}

		if (!StringUtil.isEmptyOrNullValue(user.getUser_pass())
				&& !StringUtil.isEmptyOrNullValue(user.getConf_pass())) {
			if (!user.getUser_pass().equals(user.getConf_pass())) {
				errors.rejectValue("conf_pass", "conf_pass.nomatch",
						getMess("conf_pass.nomatch"));
			}
		} else {
			ValidationUtils.rejectIfEmptyOrWhitespace(errors, "user_pass",
					"gene.required", getMess("gene.required"));
			ValidationUtils.rejectIfEmptyOrWhitespace(errors, "conf_pass",
					"gene.required", getMess("gene.required"));
		}

		if (user.getRoles().isEmpty()) {
			errors.rejectValue("roles", "gene.required", getMess("gene.required"));
		} else {
			Boolean band = Boolean.TRUE;
			Iterator<Role> it = user.getRoles().iterator();
			Role rol = null, out = null;

			// Se comprueba que roles existan
			while (it.hasNext() && band) {
				rol = (Role) it.next();
				try {
					out = rolesService.findbyRol(rol.getName());
					if (null == out) {
						errors.rejectValue("roles", "gene.required",
								getMess("gene.required"));
						band = false;
					}
				} catch (MyWebException e) {
					e.printStackTrace();
					band = false;
				}
			}
		}
	}
}
