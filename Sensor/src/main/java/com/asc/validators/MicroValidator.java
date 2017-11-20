package com.asc.validators;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.asc.controller.abstracts.Configuration;
import com.asc.process.entities.Micro;

@Component
public class MicroValidator extends Configuration implements Validator {

	public boolean supports(Class<?> clazz) {
		return Micro.class.equals(clazz);
	}

	public void validate(Object target, Errors errors) {
		Micro micro = (Micro) target;
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "port_name", "gene.required",
				getMess("port_name.required"));
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "port_dsca", "gene.required",
				getMess("port_dsca.required"));
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "prty", "gene.required",
				getMess("prty.required"));
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "baud", "gene.required",
				getMess("baud.required"));
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "bits_char", "gene.required",
				getMess("bits_char.required"));
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "bits_stop", "gene.required",
				getMess("bits_stop.required"));
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "tout_read", "gene.required",
				getMess("tout_read.required"));
	}
}
