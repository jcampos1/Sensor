package com.asc.validators;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.asc.controller.abstracts.Configuration;
import com.asc.process.entities.MAE1007;

@Component
public class MAE1007Validator extends Configuration implements Validator {

	public boolean supports(Class<?> clazz) {
		return MAE1007.class.equals(clazz);
	}

	public void validate(Object target, Errors errors) {
		MAE1007 display = (MAE1007) target;
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "char_sepa", "gene.required",
				getMess("gene.required"));
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "dsca", "gene.required",
				getMess("gene.required"));
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "char_unit", "gene.required",
				getMess("gene.required"));
	}
}
