package com.asc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.asc.process.entities.Micro;
import com.asc.service.interfaces.IMicroService;
import com.asc.utils.JsonResponse;
import com.asc.validators.MicroValidator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.iss.enums.Parity;

//CONTROLADOR MICROCONTROLADOR

@RestController()
@RequestMapping("/Micro")
public class MicroController extends Base<Micro> {

	@Autowired
	private IMicroService microService;

	@Autowired
	private MicroValidator validator;
	
	private static final ObjectMapper	JSON_MAPPER	= new ObjectMapper();
	
	private ObjectMapper mapper = new ObjectMapper();
	
	@Autowired
	public MicroController(IMicroService microService, SimpMessagingTemplate template) {
		super(microService);
		mapper.enable(SerializationFeature.INDENT_OUTPUT);
	}
	
	@RequestMapping(value = "/find", method = RequestMethod.GET)
	public ResponseEntity<Micro> find()
			throws Exception {
		return new ResponseEntity<Micro>(microService.list().get(0), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/check", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public JsonResponse check(@RequestBody Micro entity, BindingResult result) {
		validator.validate(entity, result);
		JsonResponse jr = converErrorsToJson(result);
		return jr;
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public ResponseEntity<Micro> edit(@RequestBody Micro entity, BindingResult result, ModelMap modelMap)
			throws Exception {
		if (entity.getId() == null || service.getById(entity.getId()) == null) {
			throw new Exception("microcontroller not found");
		}

		microService.merge(entity);
		return new ResponseEntity<Micro>(entity, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/runMicro", method = RequestMethod.POST)
	public ResponseEntity<Void> runMicro(@RequestParam("entity") String obj, @RequestParam("modeTry") String modeTry)
			throws Exception {

		Micro entity = JSON_MAPPER.readValue(obj, Micro.class);
		
		//Se inicia el proceso de lectura
		beginReading(entity, JSON_MAPPER.readValue(modeTry, Boolean.class));
		
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/stopMicro", method = RequestMethod.POST)
	public ResponseEntity<Void> stopMicro()
			throws Exception {

		stopReading();
		
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/lstBaud", method = RequestMethod.POST)
	public ResponseEntity<List<Integer>> lstBaud()
			throws Exception {
		return new ResponseEntity<List<Integer>>(getListBaud(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/lstTolein", method = RequestMethod.POST)
	public ResponseEntity<List<Integer>> lstTolein()
			throws Exception {
		return new ResponseEntity<List<Integer>>(getListInteger(2, 70, 2), HttpStatus.OK);
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