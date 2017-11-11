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

import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.Station;
import com.asc.process.entities.UTI1006;
import com.asc.service.interfaces.IStationService;
import com.asc.utils.JsonResponse;
import com.asc.utils.StringUtil;
import com.asc.validators.StationValidator;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

// CONTROLADOR ESTACION DE TRABAJO

@RestController()
@RequestMapping("/Station")
public class StationController extends Base<Station> {

	@Autowired
	private IStationService				stationServ;
	
	@Autowired
	private StationValidator validator;

	private static final ObjectMapper	JSON_MAPPER	= new ObjectMapper();

	@Autowired
	public StationController(IStationService stationServ) {
		super(stationServ);
	}

	@RequestMapping(value = "/check", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public JsonResponse check(@RequestBody Station entity, BindingResult result) {
		validator.validate(entity, result);
		JsonResponse jr = converErrorsToJson(result);
		return jr;
	}
	
	@RequestMapping(value = "/find", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Station>> find() throws IOException, MyWebException {
		ArrayList<Station> stations = (ArrayList<Station>) stationServ.findActive();
		return new ResponseEntity<List<Station>>(stations, HttpStatus.OK);
	}
			
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public ResponseEntity<Station> update(@RequestBody Station entity, BindingResult result, ModelMap modelMap)
			throws Exception {
		if ( !StringUtil.isEmptyOrNullValue(entity.getNamest()) ) {
			if ( service.getById(entity.getNamest()) == null ) { throw new Exception("parameter not found"); }
		}

		stationServ.merge(entity);
		return new ResponseEntity<Station>(entity, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<Station> create(@RequestBody Station entity, BindingResult result, ModelMap modelMap)
			throws Exception {
		
		entity.setActive(true);
		entity.setStatus(false);
		stationServ.add(entity);
		return new ResponseEntity<Station>(entity, HttpStatus.OK);
	}

	@RequestMapping(value = "/inactivate", method = RequestMethod.DELETE, produces = "application/json; charset=UTF-8")
	public ResponseEntity<Void> delete(@RequestParam("namest") String namest, @RequestParam("uti1006") String moti)
			throws MyWebException, JsonParseException, JsonMappingException, IOException {
		UTI1006 entity = JSON_MAPPER.readValue(moti, UTI1006.class);

		stationServ.inactivateWithMotivo(namest, entity, getClassCurrentUserByLogin());

		return new ResponseEntity<Void>(HttpStatus.OK);
	}
}