package com.asc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.asc.commons.entities.UTI1002;
import com.asc.commons.entities.UTI1001;
import com.asc.commons.entities.MAE1001;
import com.asc.controller.abstracts.Configuration;
import com.asc.exceptions.MyWebException;
import com.asc.service.interfaces.IMasterService;
import com.asc.service.interfaces.IOrdersService;
import com.asc.service.interfaces.IUserService;
import com.iss.enums.MasterEnum;

@RestController()
@RequestMapping("/master")
public class MasterController extends Configuration {
	
	@Autowired
	private IMasterService masterService;
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private IOrdersService ordersService;
	
	@RequestMapping(value = "/config", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public ResponseEntity<UTI1002> getMasterConfig(@RequestBody MasterEnum mstr) throws MyWebException {
		MAE1001 us = userService.findbyEmail(getLogin());
		UTI1002 app_conf = masterService.getByAppConfigUserId(us.getId(), mstr);
		if (app_conf == null) {
			return new ResponseEntity<UTI1002>(app_conf, HttpStatus.NO_CONTENT);
		} 
		return new ResponseEntity<UTI1002>(app_conf, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/create", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public ResponseEntity<Void> create(@RequestBody UTI1001 entity) throws MyWebException {
		MAE1001 us = userService.findbyEmail(getLogin());
		UTI1001 mstr = masterService.getByMasterUserId(us.getId(), entity.getMstr());
		if( mstr != null) {
			masterService.removeById(mstr.getId());
		}
		entity.setUser(us);
		masterService.update(entity);
		return new ResponseEntity<Void>(HttpStatus.CREATED);
	}
}