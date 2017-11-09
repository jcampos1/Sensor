package com.asc.validators;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.asc.controller.abstracts.Configuration;
import com.asc.process.entities.MAE1015;

//VALIDADOR LINEAS POR ORDEN

@Component
public class MAE1015Validator extends Configuration implements Validator {

	public boolean supports(Class<?> clazz) {
		return MAE1015.class.equals(clazz);
	}

	public void validate(Object target, Errors errors) {
	}
}
