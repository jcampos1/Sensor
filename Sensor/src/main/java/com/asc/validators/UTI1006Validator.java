package com.asc.validators;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.asc.controller.abstracts.Configuration;
import com.asc.process.entities.UTI1006;

//VALIDADOR MOTIVOS

@Component
public class UTI1006Validator extends Configuration implements Validator {

	public boolean supports(Class<?> clazz) {
		return UTI1006.class.equals(clazz);
	}

	public void validate(Object target, Errors errors) {
		UTI1006 moti = (UTI1006) target;
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "code_m", "gene.required", getMess("gene.required"));
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "dsca_m", "gene.required", getMess("gene.required"));
	}
}
