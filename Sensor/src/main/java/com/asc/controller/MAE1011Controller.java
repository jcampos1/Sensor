package com.asc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asc.process.entities.MAE1011;
import com.asc.service.interfaces.IMAE1011Service;

//CONTROLADOR CONDUCTORES

@RestController()
@RequestMapping("/MAE1011")
public class MAE1011Controller extends Base<MAE1011> {
	
	@Autowired
	private IMAE1011Service condService;
	
	@Autowired
	public MAE1011Controller(IMAE1011Service mae1012Service) {
		super(mae1012Service);
	}
}