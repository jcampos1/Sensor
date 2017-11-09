package com.asc.controller;

import java.io.IOException;
import java.util.Set;

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
import org.springframework.web.servlet.ModelAndView;

import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.UTI1001;
import com.asc.commons.entities.UTI1003;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.PAR1001;
import com.asc.service.interfaces.IMasterService;
import com.asc.service.interfaces.IPAR1001Service;
import com.asc.utils.JsonResponse;
import com.asc.validators.PAR1001Validator;
import com.fasterxml.jackson.databind.ObjectMapper;

//CONTROLADOR PARAMETROS GENERALES

@RestController()
@RequestMapping("/PAR1001")
public class PAR1001Controller extends Base<PAR1001> {

	@Autowired
	private IPAR1001Service paramService;

	@Autowired
	private PAR1001Validator validator;
	
	@Autowired
	private IMasterService masterService;

	@Autowired
	public PAR1001Controller(IPAR1001Service paramService) {
		super(paramService);
	}

	@RequestMapping(value = { "/mstrPAR1001" }, method = RequestMethod.POST)
	public ModelAndView par1001() throws MyWebException {
		ModelAndView model = new ModelAndView();
		model.addObject("par1001", new PAR1001());
		model.setViewName("par1001");
		return model;
	}

	@RequestMapping(value = { "/" }, method = RequestMethod.GET)
	public ModelAndView welcomePage() throws MyWebException {
		ModelAndView model = new ModelAndView();
		model.addObject("par1001", new PAR1001());
		model.setViewName("template/index");

		return model;
	}

	@RequestMapping(value = "/checkPAR1001", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public JsonResponse checkPAR1001(@RequestBody PAR1001 entity, BindingResult result) {
		validator.validate(entity, result);
		JsonResponse jr = converErrorsToJson(result);
		return jr;
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public ResponseEntity<PAR1001> editPAR1001(@RequestBody PAR1001 entity, BindingResult result, ModelMap modelMap)
			throws Exception {
		if (entity.getId() != null) {
			if (service.getById(entity.getId()) == null) {
				throw new Exception("parameter not found");
			}
		}

		paramService.addToRecord(entity, getClassCurrentUserByLogin());
		return new ResponseEntity<PAR1001>(entity, HttpStatus.OK);
	}

	@RequestMapping(value = "/current", method = RequestMethod.POST)
	public ResponseEntity<PAR1001> currentPAR1001() throws Exception {
		PAR1001 entity = paramService.getParameterCurrent();
		return new ResponseEntity<PAR1001>(entity, HttpStatus.OK);
	}
	
	@Override
	@RequestMapping(value = "/subset", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> subset(@RequestBody UTI1001 entity) throws IOException, MyWebException {
		ObjectMapper mapper = new ObjectMapper();
		GenericObject<PAR1001> objectGen;
		MAE1001 us = getCurrentUserByLogin();
		UTI1001 mstr = masterService.getByMasterUserId(us.getId(), entity.getMstr());
		if (mstr != null) {
			masterService.remove(mstr);
		}
		entity.setUser(us);
		Set<UTI1003> so = resetOrders(entity.getGrid().getOrders());
		entity.getGrid().setOrders(so);
		
		masterService.update(entity);

		objectGen = paramService.listSubsetParameters(entity.getGrid(), us);

		if (objectGen.getListData().isEmpty()) {
			return new ResponseEntity<String>(mapper.writeValueAsString(objectGen), HttpStatus.NO_CONTENT);
		}

		return new ResponseEntity<String>(mapper.writeValueAsString(objectGen), HttpStatus.OK);
	}
	
	@Override
	@RequestMapping(value = "/subsetListData", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> subsetListData(@RequestBody UTI1001 entity) throws IOException, MyWebException {
		ObjectMapper mapper = new ObjectMapper();
		GenericObject<PAR1001> objectGen;
		objectGen = paramService.listSubsetParameters(entity.getGrid(), getClassCurrentUserByLogin());
		
		if (objectGen.getListData().isEmpty()) {
			return new ResponseEntity<String>(mapper.writeValueAsString(objectGen), HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<String >(mapper.writeValueAsString(objectGen), HttpStatus.OK);
	}
}