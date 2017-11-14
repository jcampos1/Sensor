package com.asc.validators;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.asc.controller.abstracts.Configuration;
import com.asc.process.entities.Typesensor;
import com.asc.service.interfaces.ITypesensorService;

@Component
public class TypesensorValidator extends Configuration implements Validator {

	@Autowired
	ITypesensorService typesensorServ;
	
	public boolean supports(Class<?> clazz) {
		return Typesensor.class.equals(clazz);
	}

	public void validate(Object target, Errors errors) {
		Typesensor typesensor = (Typesensor) target;

		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "namety", "gene.required",
				getMess("gene.required"));
	}
}
