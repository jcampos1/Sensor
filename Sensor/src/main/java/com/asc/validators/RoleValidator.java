package com.asc.validators;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.asc.commons.entities.Role;
import com.asc.controller.abstracts.Configuration;
import com.asc.service.interfaces.IRolesService;

@Component
public class RoleValidator extends Configuration implements Validator {

	@Autowired
	IRolesService roleServ;
	
	public boolean supports(Class<?> clazz) {
		return Role.class.equals(clazz);
	}

	public void validate(Object target, Errors errors) {
		Role role = (Role) target;

		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "name", "gene.required",
				getMess("gene.required"));
	}
}
