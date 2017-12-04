package com.asc.validators;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.asc.controller.abstracts.Configuration;
import com.asc.process.entities.Sensor;
import com.asc.service.interfaces.ISensorService;

@Component
public class SensorValidator extends Configuration implements Validator {

	@Autowired
	ISensorService sensorServ;
	
	public boolean supports(Class<?> clazz) {
		return Sensor.class.equals(clazz);
	}

	public void validate(Object target, Errors errors, Boolean edition) {
		Sensor sensor = (Sensor) target;

		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "namese", "gene.required",
				getMess("gene.required"));
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "nomenc", "gene.required",
				getMess("gene.required"));
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "rango", "gene.required",
				getMess("gene.required"));
		
		if( !edition ){
			if(null != sensorServ.getByStationAndNomenclature(sensor.getNomenc(), sensor.getStation().getNamest())){
				errors.rejectValue("nomenc", "gene.duplicated",
						getMess("gene.duplicated"));
			}
		}
	}
}