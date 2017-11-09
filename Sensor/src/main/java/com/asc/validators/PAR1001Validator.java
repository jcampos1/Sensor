package com.asc.validators;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.asc.controller.abstracts.Configuration;
import com.asc.process.entities.PAR1001;

@Component
public class PAR1001Validator extends Configuration implements Validator {

	public boolean supports(Class<?> clazz) {
		return PAR1001.class.equals(clazz);
	}

	public void validate(Object target, Errors errors) {
		PAR1001 param = (PAR1001) target;
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "seri", "gene.required",
				getMess("gene.required"));
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "cddp", "gene.required",
				getMess("gene.required"));
		
		if (!param.getPescon() && !param.getRep_te()) {
			errors.rejectValue("pescon", "gene.error001", getMess("gene.error001"));
			errors.rejectValue("rep_te", "gene.error001", getMess("gene.error001"));
		}
	}
}
