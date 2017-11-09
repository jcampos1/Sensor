package com.asc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asc.process.entities.MAE1012;
import com.asc.service.interfaces.IMAE1012Service;

//CONTROLADOR MEDIO DE TRANSPORTE

@RestController()
@RequestMapping("/MAE1012")
public class MAE1012Controller extends Base<MAE1012> {
	
	@Autowired
	private IMAE1012Service motrService;
	
	@Autowired
	public MAE1012Controller(IMAE1012Service mae1012Service) {
		super(mae1012Service);
	}
}