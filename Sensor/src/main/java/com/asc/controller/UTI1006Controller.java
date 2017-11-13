package com.asc.controller;

import java.io.IOException;
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

import com.asc.commons.entities.Options;
import com.asc.commons.entities.UTI1001;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.UTI1006;
import com.asc.service.interfaces.IUTI1006Service;
import com.asc.utils.JsonResponse;
import com.asc.validators.UTI1006Validator;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iss.enums.ReasonType;

//CONTROLADOR MOTIVOS

@RestController()
@RequestMapping("/UTI1006")
public class UTI1006Controller extends Base<UTI1006> {

	@Autowired
	private IUTI1006Service motiServ;

	@Autowired
	private UTI1006Validator validator;

	private static final ObjectMapper JSON_MAPPER = new ObjectMapper();
	
	@Autowired
	public UTI1006Controller(IUTI1006Service motiServ) {
		super(motiServ);
	}

	@RequestMapping(value = "/checkUTI1006", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public JsonResponse checkUTI1006(@RequestBody UTI1006 entity, BindingResult result) {
		validator.validate(entity, result);
		JsonResponse jr = converErrorsToJson(result);
		return jr;
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public ResponseEntity<UTI1006> editUTI1006(@RequestBody UTI1006 entity, BindingResult result, ModelMap modelMap)
			throws Exception {
		if (entity.getId() == null || service.getById(entity.getId()) == null) {
			throw new Exception("display not found");
		}

		motiServ.merge(entity);
		return new ResponseEntity<UTI1006>(entity, HttpStatus.OK);
	}

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<UTI1006> createUTI1006(@RequestBody UTI1006 entity, BindingResult result, ModelMap modelMap)
			throws Exception {
		if (entity.getId() != null) {
			if (service.getById(entity.getId()) == null) {
				throw new Exception("Reason not found");
			}
		}
		motiServ.add(entity);
		return new ResponseEntity<UTI1006>(entity, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/inactivate", method = RequestMethod.DELETE, produces = "application/json; charset=UTF-8")
	public ResponseEntity<Void> inactivate(@RequestBody UTI1006 uti1006)
			throws MyWebException, JsonParseException, JsonMappingException, IOException {
		motiServ.inactivate(uti1006);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/motiByType", method = RequestMethod.POST)
	public ResponseEntity<List<UTI1006>> motiByType(@RequestParam("type_m") ReasonType type_m) throws Exception {
		return new ResponseEntity<List<UTI1006>>(motiServ.motiByType(type_m), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/externalPagination", method = RequestMethod.POST)
	public ResponseEntity<String> externalPagination(@RequestParam ( "uti1001" ) String json, @RequestParam ( value= "type_m", required = false) ReasonType type_m) throws MyWebException, JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		GenericObject<UTI1006> objectGen;

		UTI1001 entity;
		try {
			entity = JSON_MAPPER.readValue(json, UTI1001.class);
			
			objectGen = motiServ.findSubsetSimpleMoti(entity.getGrid(), type_m);

			if (objectGen.getListData().isEmpty()) {
				return new ResponseEntity<String>(mapper.writeValueAsString(objectGen), HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<String>(mapper.writeValueAsString(objectGen), HttpStatus.OK);
		} catch (IOException e) {
			return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
		}
	}
	
	//LISTAS
	@RequestMapping(value = "/listReasonType", method = RequestMethod.POST)
	public ResponseEntity<List<Options>> listReasonType() throws Exception {
		return new ResponseEntity<List<Options>>(getListOptions(ReasonType.class), HttpStatus.OK);
	}

}