package com.asc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asc.process.entities.MAE1017;
import com.asc.service.interfaces.IMAE1017Service;

//CONTROLADOR PARTNER

@RestController()
@RequestMapping("/MAE1017")
public class MAE1017Controller extends Base<MAE1017> {
	
	@Autowired
	private IMAE1017Service partService;
	
	@Autowired
	public MAE1017Controller(IMAE1017Service mae1017Service) {
		super(mae1017Service);
	}
}