package com.asc.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.asc.commons.entities.UTI1002;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.MAE1014;
import com.asc.process.entities.MAE1014.PKMAE1014;
import com.asc.process.entities.UTI1006;
import com.asc.service.interfaces.IMAE1014Service;
import com.asc.utils.JsonResponse;
import com.asc.validators.MAE1014Validator;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

// CONTROLADOR ITEM DE ORDEN
 
@RestController()
@RequestMapping("/MAE1014")
public class MAE1014Controller extends Base<MAE1014> {

	@Autowired
	private IMAE1014Service itemServ;
	
	@Autowired
	private MAE1014Validator validator;
	
	private static final ObjectMapper JSON_MAPPER = new ObjectMapper();

	@Autowired
	public MAE1014Controller(IMAE1014Service itemServ) {
		super(itemServ);
	}
	
	@RequestMapping(value = "/checkMAE1014", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public JsonResponse checkMAE1014(@RequestBody MAE1014 entity, BindingResult result) {
		validator.validate(entity, result);
		JsonResponse jr = converErrorsToJson(result);
		return jr;
	}

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<MAE1014> createMAE1014(@RequestParam("mae1014") String obj, @RequestParam("orno") String str)
			throws Exception {
		
		MAE1014 entity = JSON_MAPPER.readValue(obj, MAE1014.class);
		String orno = JSON_MAPPER.readValue(str, String.class);
		
		return new ResponseEntity<MAE1014>(itemServ.myOwnerAdd(orno, entity), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public ResponseEntity<MAE1014> update(@RequestParam("mae1014") String obj)
			throws Exception {
		
		MAE1014 entity = JSON_MAPPER.readValue(obj, MAE1014.class);
		return new ResponseEntity<MAE1014>(itemServ.myOwnerUpdate(entity), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/confirmNoDesp", method = RequestMethod.POST)
	public ResponseEntity<MAE1014> confirmNoDesp(@RequestParam("mae1014") String obj, @RequestParam("uti1006") String obj2)
			throws Exception {
		
		MAE1014 entity = JSON_MAPPER.readValue(obj, MAE1014.class);
		UTI1006 motivo = JSON_MAPPER.readValue(obj2, UTI1006.class);
		
		return new ResponseEntity<MAE1014>(itemServ.confirmNoDesp(entity, motivo, getClassCurrentUserByLogin()), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/confirmDesp", method = RequestMethod.POST)
	public ResponseEntity<MAE1014> confirmDesp(@RequestBody MAE1014 entity)
			throws Exception {
		return new ResponseEntity<MAE1014>(itemServ.confirmDesp(entity), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/inactivate", method = RequestMethod.DELETE, produces = "application/json; charset=UTF-8")
	public ResponseEntity<MAE1014> delete(@RequestParam("pkmae1014") String key, @RequestParam("uti1006") String moti)
			throws MyWebException, JsonParseException, JsonMappingException, IOException {
		
		UTI1006 motivo = JSON_MAPPER.readValue(moti, UTI1006.class);
		PKMAE1014 pk = JSON_MAPPER.readValue(key, PKMAE1014.class);
		
		itemServ.inactivateWithMotivo(pk, motivo, getClassCurrentUserByLogin());

		return new ResponseEntity<MAE1014>(HttpStatus.NO_CONTENT);
	}

	@RequestMapping(value = "/externalPagination", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> externalPagination(@RequestParam("uti1002") String uti1002, @RequestParam("orno") String str) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		GenericObject<MAE1014> objectGen;

		UTI1002 entity = JSON_MAPPER.readValue(uti1002, UTI1002.class);
		
		objectGen = itemServ.listSubsetSimple(entity, str);

		if (objectGen.getListData().isEmpty()) {
			return new ResponseEntity<String>(mapper.writeValueAsString(objectGen), HttpStatus.NO_CONTENT);
		}

		return new ResponseEntity<String>(mapper.writeValueAsString(objectGen), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/findAll", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> findAll(@RequestParam("orno") String str) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();

		List<MAE1014> lst = itemServ.findByStatus(str, true);

		if (lst.isEmpty()) {
			return new ResponseEntity<String>(mapper.writeValueAsString(lst), HttpStatus.NO_CONTENT);
		}

		return new ResponseEntity<String>(mapper.writeValueAsString(lst), HttpStatus.OK);
	}
}