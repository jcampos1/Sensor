package com.asc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.asc.process.entities.MAE1008;
import com.asc.service.interfaces.IMAE1008Service;
import com.asc.utils.JsonResponse;
import com.asc.validators.MAE1008Validator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.iss.enums.Parity;

//CONTROLADOR PUERTO DE COMUNICACIÓN

@RestController()
@RequestMapping("/MAE1008")
public class MAE1008Controller extends Base<MAE1008> {

	@Autowired
	private IMAE1008Service portService;

	@Autowired
	private MAE1008Validator validator;
	
	private ObjectMapper mapper = new ObjectMapper();
	
	@Autowired
	public MAE1008Controller(IMAE1008Service portService) {
		super(portService);
		mapper.enable(SerializationFeature.INDENT_OUTPUT);
	}
	
	@RequestMapping(value = "/checkMAE1008", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public JsonResponse checkMAE1008(@RequestBody MAE1008 entity, BindingResult result) {
		validator.validate(entity, result);
		JsonResponse jr = converErrorsToJson(result);
		return jr;
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public ResponseEntity<MAE1008> editMAE1008(@RequestBody MAE1008 entity, BindingResult result, ModelMap modelMap)
			throws Exception {
		if (entity.getId() == null || service.getById(entity.getId()) == null) {
			throw new Exception("port not found");
		}

		portService.merge(entity);
		return new ResponseEntity<MAE1008>(entity, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<MAE1008> createMAE1008(@RequestBody MAE1008 entity, BindingResult result, ModelMap modelMap)
			throws Exception {
		if (entity.getId() != null) {
			if (service.getById(entity.getId()) == null) {
				throw new Exception("Port not found");
			}
		}
		
		portService.add(entity);
		return new ResponseEntity<MAE1008>(entity, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/lstBaud", method = RequestMethod.POST)
	public ResponseEntity<List<Integer>> lstBaud()
			throws Exception {
		return new ResponseEntity<List<Integer>>(getListBaud(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/lstPrty", method = RequestMethod.POST)
	public ResponseEntity<String> lstPrty()
			throws Exception {
		return new ResponseEntity<String>(mapper.writeValueAsString(getListOptions(Parity.class)), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/lstBits_stop", method = RequestMethod.POST)
	public ResponseEntity<List<Integer>> lstBits_stop()
			throws Exception {
		return new ResponseEntity<List<Integer>>(getListInteger(1, 3, 1), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/lstBits_char", method = RequestMethod.POST)
	public ResponseEntity<List<Integer>> lstBits_char()
			throws Exception {
		return new ResponseEntity<List<Integer>>(getListInteger(5, 8, 1), HttpStatus.OK);
	}
}