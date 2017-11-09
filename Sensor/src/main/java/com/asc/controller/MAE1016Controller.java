package com.asc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asc.process.entities.MAE1016;
import com.asc.service.interfaces.IMAE1016Service;

//CONTROLADOR COMPAÑIA

@RestController()
@RequestMapping("/MAE1016")
public class MAE1016Controller extends Base<MAE1016> {
	
	@Autowired
	private IMAE1016Service compService;
	
	@Autowired
	public MAE1016Controller(IMAE1016Service mae1016Service) {
		super(mae1016Service);
	}
}