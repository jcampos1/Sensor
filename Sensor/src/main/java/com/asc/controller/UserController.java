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

import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.Role;
import com.asc.commons.entities.UTI1001;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.UTI1006;
import com.asc.service.interfaces.IRolesService;
import com.asc.service.interfaces.IUserService;
import com.asc.utils.JsonResponse;
import com.asc.validators.UserEditValidator;
import com.asc.validators.UserValidator;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iss.enums.LanguageEnum;

@RestController()
@RequestMapping("/user")
public class UserController extends Base<MAE1001> {

	@Autowired
	private IUserService userService;

	@Autowired
	private IRolesService rolServ;

	@Autowired
	private UserValidator validator;
	
	@Autowired
	private UserEditValidator validatorEdit;

	private static final ObjectMapper JSON_MAPPER = new ObjectMapper();

	@Autowired
	public UserController(IUserService userService) {
		super(userService);
	}

	// Validador
	@RequestMapping(value = "/check", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public JsonResponse check(@RequestBody MAE1001 entity, BindingResult result) {
		validator.validate(entity, result);
		JsonResponse jr = converErrorsToJson(result);
		return jr;
	}

	// Validador
	@RequestMapping(value = "/checkEdit", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public JsonResponse checkEdit(@RequestBody MAE1001 entity, BindingResult result) {
		validatorEdit.validate(entity, result);
		JsonResponse jr = converErrorsToJson(result);
		return jr;
	}

	// Actualizacion
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public ResponseEntity<MAE1001> edit(@RequestBody MAE1001 entity,
			BindingResult result, ModelMap modelMap) throws Exception {
		if (entity.getId() == null || service.getById(entity.getId()) == null) {
			throw new Exception("User not found");
		} else {
			userService.updateClient(entity);
		}
		return new ResponseEntity<MAE1001>(entity, HttpStatus.OK);
	}

	// Creacion
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<MAE1001> create(@RequestBody MAE1001 entity,
			BindingResult result, ModelMap modelMap) throws Exception {

		if (entity.getId() != null) {
			if (service.getById(entity.getId()) == null) {
				throw new Exception("User not found");
			}
		} else {
			userService.addClient(entity);
		}
		return new ResponseEntity<MAE1001>(entity, HttpStatus.OK);
	}

	@RequestMapping(value = "/roles", method = RequestMethod.POST)
	public ResponseEntity<List<Role>> getRoles() throws Exception {
		List<Role> lst = rolServ.list();
		if (lst.isEmpty()) {
			throw new Exception("Roles not found");
		}
		return new ResponseEntity<List<Role>>(lst, HttpStatus.OK);
	}

	// Usuario logueado
	@RequestMapping(value = "/currentUser", method = RequestMethod.POST)
	public ResponseEntity<MAE1001> getCurrentUser() throws Exception {
		return new ResponseEntity<MAE1001>(getClassCurrentUserByLogin(),
				HttpStatus.OK);
	}

	// Inactivar
	@RequestMapping(value = "/inactivate", method = RequestMethod.DELETE, produces = "application/json; charset=UTF-8")
	public ResponseEntity<Void> inactivate(@RequestParam("obj") String obj,
			@RequestParam("uti1006") String moti) throws MyWebException,
			JsonParseException, JsonMappingException, IOException {
		MAE1001 entity = JSON_MAPPER.readValue(obj, MAE1001.class);
		UTI1006 motive = JSON_MAPPER.readValue(moti, UTI1006.class);

		userService.inactivateWithMotivo(entity, motive,
				getClassCurrentUserByLogin());

		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@RequestMapping(value = "/forAprobation", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<MAE1001>> listActive() throws MyWebException {
		List<MAE1001> lst;
		lst = userService.getUsersPendings();

		if (lst.isEmpty()) {
			return new ResponseEntity<List<MAE1001>>(lst, HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<MAE1001>>(lst, HttpStatus.OK);
	}

	@RequestMapping(value = "/dataUser", method = RequestMethod.POST)
	public ResponseEntity<List<Integer>> dataUser() throws Exception {
		List<Integer> lst = new ArrayList<>();
		lst.add(userService.getUsersActive().size());
		lst.add(userService.getUsersPendings().size());
		return new ResponseEntity<List<Integer>>(lst, HttpStatus.OK);
	}

	// Obtiene el lenguaje del usuario
	@RequestMapping(value = "/language", method = RequestMethod.GET, produces = "application/json; charset=UTF-8")
	public ResponseEntity<LanguageEnum> getLanguage() throws MyWebException {

		MAE1001 us = getCurrentUserByLogin();

		if (us == null || us.getLang() == null) {
			return new ResponseEntity<LanguageEnum>(HttpStatus.NO_CONTENT);
		}
		LanguageEnum lang = us.getLang();

		return new ResponseEntity<LanguageEnum>(lang, HttpStatus.OK);
	}

	// Asigna lenguaje a usuario
	@RequestMapping(value = "/create_language", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public ResponseEntity<String> setLanguage(@RequestBody String lang)
			throws MyWebException {
		MAE1001 us = getCurrentUserByLogin();
		if (us == null) {
			return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
		}
		us.setLang(LanguageEnum.valueOf(lang));
		userService.update(us);

		return new ResponseEntity<String>(HttpStatus.CREATED);
	}

	// Cambia lenguaje del lado del servidor
	@RequestMapping(value = "/locale", method = RequestMethod.GET)
	public ResponseEntity<String> setLocale(
			@RequestParam(value = "locale", required = false) String var1)
			throws MyWebException {
		return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
	}

	@RequestMapping(value = "/externalPagination", method = RequestMethod.POST)
	public ResponseEntity<String> externalPagination(
			@RequestParam("uti1001") String json) throws MyWebException,
			JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		GenericObject<MAE1001> objectGen;

		UTI1001 entity;
		try {
			entity = JSON_MAPPER.readValue(json, UTI1001.class);

			objectGen = userService.findSubsetSimpleMAE1001(entity.getGrid());

			if (objectGen.getListData().isEmpty()) {
				return new ResponseEntity<String>(
						mapper.writeValueAsString(objectGen),
						HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<String>(
					mapper.writeValueAsString(objectGen), HttpStatus.OK);
		} catch (IOException e) {
			return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
		}
	}
}