package com.asc.controller;

import java.io.IOException;
import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.asc.commons.entities.UTI1001;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.Sensor;
import com.asc.process.entities.UTI1006;
import com.asc.service.interfaces.ISensorService;
import com.asc.utils.JsonResponse;
import com.asc.validators.SensorValidator;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

// CONTROLADOR ESTACION DE TRABAJO

@RestController()
@RequestMapping("/Sensor")
public class SensorController extends Base<Sensor> {

	@Autowired
	private ISensorService				sensorServ;
	
	@Autowired
	private SensorValidator validator;

	private static final ObjectMapper	JSON_MAPPER	= new ObjectMapper();

	@Autowired
	public SensorController(ISensorService sensorServ) {
		super(sensorServ);
	}

	@RequestMapping(value = "/check", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public JsonResponse check(@RequestBody Sensor entity, BindingResult result) {
		validator.validate(entity, result);
		JsonResponse jr = converErrorsToJson(result);
		return jr;
	}
	
	@RequestMapping(value = "/find", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Sensor>> find() throws IOException, MyWebException {
		ArrayList<Sensor> sensors = (ArrayList<Sensor>) sensorServ.findActive();
		return new ResponseEntity<List<Sensor>>(sensors, HttpStatus.OK);
	}
			
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public ResponseEntity<Sensor> update(@RequestBody Sensor entity, BindingResult result, ModelMap modelMap)
			throws Exception {
		if ( entity.getId() != null ) {
			if ( service.getById(entity.getId()) == null ) { throw new Exception("Sensor not found"); }
		}

		sensorServ.merge(entity);
		return new ResponseEntity<Sensor>(entity, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<Sensor> create(@RequestBody Sensor entity, BindingResult result, ModelMap modelMap)
			throws Exception {
		
		if ( null != entity.getId() ) {
			if ( service.getById(entity.getId()) != null ) { throw new Exception(getMess("gene.duplicated")); }
		}
		
		sensorServ.myOwnerAdd(entity);
		return new ResponseEntity<Sensor>(entity, HttpStatus.OK);
	}

	@RequestMapping(value = "/inactivate", method = RequestMethod.DELETE, produces = "application/json; charset=UTF-8")
	public ResponseEntity<Void> inactivate(@RequestParam("obj") String obj, @RequestParam("uti1006") String moti)
			throws MyWebException, JsonParseException, JsonMappingException, IOException {
		Sensor entity = JSON_MAPPER.readValue(obj, Sensor.class);
		UTI1006 motive = JSON_MAPPER.readValue(moti, UTI1006.class);

		sensorServ.inactivateWithMotivo(entity, motive, getClassCurrentUserByLogin());

		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/externalPagination", method = RequestMethod.POST)
	public ResponseEntity<String> externalPagination(@RequestParam ( "uti1001" ) String json) throws MyWebException, JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		GenericObject<Sensor> objectGen;

		UTI1001 entity;
		try {
			entity = JSON_MAPPER.readValue(json, UTI1001.class);
			
			objectGen = sensorServ.findSubsetSimpleSensor(entity.getGrid());

			if (objectGen.getListData().isEmpty()) {
				return new ResponseEntity<String>(mapper.writeValueAsString(objectGen), HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<String>(mapper.writeValueAsString(objectGen), HttpStatus.OK);
		} catch (IOException e) {
			return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
		}
	}
}