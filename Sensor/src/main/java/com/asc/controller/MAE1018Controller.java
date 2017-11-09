package com.asc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asc.process.entities.MAE1018;
import com.asc.service.interfaces.IMAE1018Service;

//CONTROLADOR ALMACEN

@RestController()
@RequestMapping("/MAE1018")
public class MAE1018Controller extends Base<MAE1018> {
	
	@Autowired
	private IMAE1018Service almaService;
	
	@Autowired
	public MAE1018Controller(IMAE1018Service mae1018Service) {
		super(mae1018Service);
	}
}