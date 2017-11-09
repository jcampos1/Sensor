package com.asc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asc.process.entities.MAE1009;
import com.asc.service.interfaces.IMAE1009Service;

//CONTROLADOR ARTICULOS

@RestController()
@RequestMapping("/MAE1009")
public class MAE1009Controller extends Base<MAE1009> {
	
	@Autowired
	private IMAE1009Service artiService;
	
	@Autowired
	public MAE1009Controller(IMAE1009Service mae1009Service) {
		super(mae1009Service);
	}
}