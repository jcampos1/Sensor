package com.asc.validators;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.asc.controller.abstracts.Configuration;
import com.asc.process.entities.MAE1013;

@Component
public class MAE1013Validator extends Configuration implements Validator {

	public boolean supports(Class<?> clazz) {
		return MAE1013.class.equals(clazz);
	}

	public void validate(Object target, Errors errors) {
		MAE1013 header = (MAE1013) target;
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "cddp", "gene.required",
				getMess("gene.required"));
		
		if( null == header.getTipm() ) {
			errors.rejectValue("tipm", "gene.required", getMess("gene.required"));
		}
		
		if( null == header.getMotr() ) {
			errors.rejectValue("motr", "gene.required", getMess("gene.required"));
		}
		
		if( null == header.getCond() ) {
			errors.rejectValue("cond", "gene.required", getMess("gene.required"));
		}
		
		if( null == header.getCompany() ) {
			errors.rejectValue("company", "gene.required", getMess("gene.required"));
		}
		
		if( !header.getLines().isEmpty() ) {
			errors.rejectValue("lines", "line.no_required", getMess("line.no_required"));
		}
	}
}
