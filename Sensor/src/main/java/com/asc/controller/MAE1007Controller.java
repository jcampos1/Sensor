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
import org.springframework.web.servlet.ModelAndView;

import com.asc.exceptions.MyWebException;
import com.asc.process.entities.MAE1007;
import com.asc.service.interfaces.IMAE1007Service;
import com.asc.utils.JsonResponse;
import com.asc.validators.MAE1007Validator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iss.enums.CharSepaEnum;
import com.iss.enums.Parity;

//CONTROLADOR UNIDAD DE DISPLAY

@RestController()
@RequestMapping("/MAE1007")
public class MAE1007Controller extends Base<MAE1007> {

	@Autowired
	private IMAE1007Service displayService;

	@Autowired
	private MAE1007Validator validator;

	private static final ObjectMapper JSON_MAPPER = new ObjectMapper();
	
	@Autowired
	public MAE1007Controller(IMAE1007Service displayService) {
		super(displayService);
	}

	@RequestMapping(value = { "/mstrMAE1007" }, method = RequestMethod.POST)
	public ModelAndView mae1007() throws MyWebException {
		ModelAndView model = new ModelAndView();
		model.addObject("mae1007", new MAE1007());
		model.setViewName("mae1007");
		return model;
	}

	@RequestMapping(value = { "/" }, method = RequestMethod.GET)
	public ModelAndView welcomePage() throws MyWebException {
		ModelAndView model = new ModelAndView();
		model.addObject("mae1007", new MAE1007());
		model.setViewName("template/index");

		return model;
	}

	@RequestMapping(value = "/checkMAE1007", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public JsonResponse checkMAE1007(@RequestBody MAE1007 entity, BindingResult result) {
		validator.validate(entity, result);
		JsonResponse jr = converErrorsToJson(result);
		return jr;
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public ResponseEntity<MAE1007> editMAE1007(@RequestBody MAE1007 entity, BindingResult result, ModelMap modelMap)
			throws Exception {
		if (entity.getId() == null || service.getById(entity.getId()) == null) {
			throw new Exception("display not found");
		}

		displayService.myOwnAdd(entity);
		return new ResponseEntity<MAE1007>(entity, HttpStatus.OK);
	}

	@RequestMapping(value = "/current", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> current() throws Exception {
		List<MAE1007> lst = displayService.findDisplayByUsed(true);
		return new ResponseEntity<String>(JSON_MAPPER.writeValueAsString(lst), HttpStatus.OK);
	}

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<MAE1007> createMAE1007(@RequestBody MAE1007 entity, BindingResult result, ModelMap modelMap)
			throws Exception {
		if (entity.getId() != null) {
			if (service.getById(entity.getId()) == null) {
				throw new Exception("display not found");
			}
		}

		displayService.myOwnAdd(entity);
		return new ResponseEntity<MAE1007>(entity, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/lstNmax_stab", method = RequestMethod.POST)
	public ResponseEntity<List<Integer>> lstNmax_stab()
			throws Exception {
		return new ResponseEntity<List<Integer>>(getListInteger(5, 50, 5), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/lstChar_sepa", method = RequestMethod.POST)
	public ResponseEntity<String> lstChar_sepa()
			throws Exception {
		return new ResponseEntity<String>(JSON_MAPPER.writeValueAsString(getListOptions(CharSepaEnum.class)), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/lstNmax_unst", method = RequestMethod.POST)
	public ResponseEntity<List<Integer>> lstNmax_unst()
			throws Exception {
		return new ResponseEntity<List<Integer>>(getListInteger(5, 50, 5), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/lstPosi_weig", method = RequestMethod.POST)
	public ResponseEntity<List<Integer>> lstPosi_weig()
			throws Exception {
		return new ResponseEntity<List<Integer>>(getListInteger(1, 10, 1), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/lstPosi_stab", method = RequestMethod.POST)
	public ResponseEntity<List<Integer>> lstPosi_stab()
			throws Exception {
		return new ResponseEntity<List<Integer>>(getListInteger(1, 10, 1), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/lstNmax_slep", method = RequestMethod.POST)
	public ResponseEntity<List<Integer>> lstNmax_slep()
			throws Exception {
		return new ResponseEntity<List<Integer>>(getListInteger(1, 5, 1), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/lstVal_min", method = RequestMethod.POST)
	public ResponseEntity<List<Integer>> lstVal_min()
			throws Exception {
		return new ResponseEntity<List<Integer>>(getListInteger(-50, 0, 5), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/lstVal_max", method = RequestMethod.POST)
	public ResponseEntity<List<Integer>> lstVal_max()
			throws Exception {
		return new ResponseEntity<List<Integer>>(getListInteger(0, 50, 5), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/lstNread_tried", method = RequestMethod.POST)
	public ResponseEntity<List<Integer>> lstNread_tried()
			throws Exception {
		return new ResponseEntity<List<Integer>>(getListInteger(100, 600, 100), HttpStatus.OK);
	}
}