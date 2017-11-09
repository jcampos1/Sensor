package com.asc.validators;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.asc.controller.abstracts.Configuration;
import com.asc.process.entities.MAE1008;

@Component
public class MAE1008Validator extends Configuration implements Validator {

	public boolean supports(Class<?> clazz) {
		return MAE1008.class.equals(clazz);
	}

	public void validate(Object target, Errors errors) {
		MAE1008 port = (MAE1008) target;
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "port_name", "port_name.required",
				getMess("port_name.required"));
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "port_dsca", "port_dsca.required",
				getMess("port_dsca.required"));
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "prty", "prty.required",
				getMess("prty.required"));
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "baud", "baud.required",
				getMess("baud.required"));
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "bits_char", "bits_char.required",
				getMess("bits_char.required"));
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "bits_stop", "bits_stop.required",
				getMess("bits_stop.required"));
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "tout_read", "tout_read.required",
				getMess("tout_read.required"));
	}
}
