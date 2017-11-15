package com.asc.validators;

import java.util.Iterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.asc.commons.entities.Role;
import com.asc.commons.entities.MAE1001;
import com.asc.controller.abstracts.Configuration;
import com.asc.exceptions.MyWebException;
import com.asc.service.interfaces.IRolesService;
import com.asc.service.interfaces.IUserService;
import com.asc.utils.StringUtil;
import com.iss.enums.ModalityEnum;

@Component
public class UserValidator extends Configuration implements Validator {

	@Autowired
	private IUserService userService;

	@Autowired
	private IRolesService rolesService;

	private ModalityEnum mlty;

	public boolean supports(Class<?> clazz) {
		return MAE1001.class.equals(clazz);
	}

	public void validate(Object target, Errors errors) {
		MAE1001 user = (MAE1001) target;
		switch (getMlty()) {
		case NEW:
			ValidationUtils.rejectIfEmptyOrWhitespace(errors, "frst_name", "frst_name.required",
					getMess("frst_name.required"));
			ValidationUtils.rejectIfEmptyOrWhitespace(errors, "last_name", "last_name.required",
					getMess("last_name.required"));
			valid(user, errors);
			break;
		case EDIT_ADMIN:
			ValidationUtils.rejectIfEmptyOrWhitespace(errors, "frst_name", "frst_name.required",
					getMess("frst_name.required"));
			ValidationUtils.rejectIfEmptyOrWhitespace(errors, "phone", "phone.required", getMess("phone.required"));

			if (user.getRoles().isEmpty()) {
				errors.rejectValue("roles", "roles.req", getMess("roles.req"));
			} else {
				Boolean band = Boolean.TRUE;
				Iterator<Role> it = user.getRoles().iterator();
				Role rol = null, out = null;
				while (it.hasNext() && band) {
					rol = (Role) it.next();
					try {
						out = rolesService.findbyRol(rol.getName());
						if (null == out) {
							errors.rejectValue("roles", "roles.req", getMess("roles.req"));
							band = false;
						}
					} catch (MyWebException e) {
						e.printStackTrace();
						band = false;
					}
				}
			}
			break;
		default:
			break;
		}
	}

	private void valid(MAE1001 user, Errors errors) {
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "phone", "phone.required", getMess("phone.required"));

		if (!StringUtil.isEmptyOrNullValue(user.getUser_mail())
				&& !StringUtil.isEmptyOrNullValue(user.getConf_mail())) {
			if (!user.getUser_mail().equals(user.getConf_mail())) {
				errors.rejectValue("conf_mail", "conf_mail.nomatch", getMess("conf_mail.nomatch"));
			} else {
				try {
					if (null != userService.findbyEmail(user.getUser_mail())) {
						errors.rejectValue("user_mail", "user_mail.registred", getMess("user_mail.registred"));
					}
				} catch (MyWebException e) {
					e.printStackTrace();
				}
			}
		} else {
			if (StringUtil.isEmptyOrNullValue(user.getUser_mail())) {
				errors.rejectValue("user_mail", "user_mail.required", getMess("user_mail.required"));
			} else {
				try {
					if (null != userService.findbyEmail(user.getUser_mail())) {
						errors.rejectValue("user_mail", "user_mail.registred", getMess("user_mail.registred"));
					}
				} catch (MyWebException e) {
					e.printStackTrace();
				}
			}

			ValidationUtils.rejectIfEmptyOrWhitespace(errors, "conf_mail", "user_mail.required",
					getMess("user_mail.required"));
		}
		if (!StringUtil.isEmptyOrNullValue(user.getUser_pass())
				&& !StringUtil.isEmptyOrNullValue(user.getConf_pass())) {
			if (!user.getUser_pass().equals(user.getConf_pass())) {
				errors.rejectValue("conf_pass", "conf_pass.nomatch", getMess("conf_pass.nomatch"));
			}
		} else {
			ValidationUtils.rejectIfEmptyOrWhitespace(errors, "user_pass", "user_pass.required",
					getMess("user_pass.required"));
			ValidationUtils.rejectIfEmptyOrWhitespace(errors, "conf_pass", "conf_pass.required",
					getMess("conf_pass.required"));
		}
	}

	public ModalityEnum getMlty() {
		return mlty;
	}

	public void setMlty(ModalityEnum mlty) {
		this.mlty = mlty;
	}
}
