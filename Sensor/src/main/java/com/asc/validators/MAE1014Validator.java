package com.asc.validators;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.asc.controller.abstracts.Configuration;
import com.asc.process.entities.MAE1014;

//VALIDADOR LINEAS POR ORDEN

@Component
public class MAE1014Validator extends Configuration implements Validator {

	public boolean supports(Class<?> clazz) {
		return MAE1014.class.equals(clazz);
	}

	public void validate(Object target, Errors errors) {
	}
}
