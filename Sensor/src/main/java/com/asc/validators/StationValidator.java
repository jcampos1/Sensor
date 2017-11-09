package com.asc.validators;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.asc.controller.abstracts.Configuration;
import com.asc.process.entities.Station;
import com.asc.service.interfaces.IStationService;

@Component
public class StationValidator extends Configuration implements Validator {

	@Autowired
	IStationService stationServ;
	
	public boolean supports(Class<?> clazz) {
		return Station.class.equals(clazz);
	}

	public void validate(Object target, Errors errors) {
		Station station = (Station) target;
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "namest", "gene.required",
				getMess("gene.required"));
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "phonst", "gene.required",
				getMess("gene.required"));
		
		if(!station.getNamest().isEmpty()){
			
		}
		
	}
}
