package com.asc.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.asc.commons.entities.CNF1002;
import com.asc.commons.entities.IdsDelete;
import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.UTI1001;
import com.asc.commons.entities.UTI1003;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.service.interfaces.IMasterService;
import com.asc.service.interfaces.IRolesService;
import com.asc.service.interfaces.IUserService;
import com.asc.utils.JsonResponse;
import com.asc.validators.UserValidator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iss.enums.LanguageEnum;
import com.iss.enums.ModalityEnum;

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
	private IMasterService masterService;

	@Autowired
	public UserController(IUserService userService) {
		super(userService);
	}

	@RequestMapping(value = "/checkUser", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public JsonResponse checkUser(@RequestBody MAE1001 entity, BindingResult result) {
		validator.setMlty(ModalityEnum.NEW);
		validator.validate(entity, result);
		JsonResponse jr = converErrorsToJson(result);
		return jr;
	}

	@RequestMapping(value = "/checkUserEditAdmin", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public JsonResponse checkUserEdit(@RequestBody MAE1001 entity, BindingResult result) {
		validator.setMlty(ModalityEnum.EDIT_ADMIN);
		validator.validate(entity, result);
		JsonResponse jr = converErrorsToJson(result);
		return jr;
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public ResponseEntity<MAE1001> editUser(@RequestBody MAE1001 entity, BindingResult result, ModelMap modelMap)
			throws Exception {
		if (entity.getId() == null || service.getById(entity.getId()) == null) {
			throw new Exception("User not found");
		} else {
			userService.updateClient(entity);
		}
		return new ResponseEntity<MAE1001>(entity, HttpStatus.OK);
	}

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<MAE1001> createUser(@RequestBody MAE1001 entity, BindingResult result, ModelMap modelMap)
			throws Exception {

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
	public ResponseEntity<List<CNF1002>> getRoles()
			throws Exception {
		List<CNF1002> lst = rolServ.list();
		if (lst.isEmpty()) {
			throw new Exception("Roles not found");
		}
		return new ResponseEntity<List<CNF1002>>(lst, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/currentUser", method = RequestMethod.POST)
	public ResponseEntity<MAE1001> getCurrentUser()
			throws Exception {
		return new ResponseEntity<MAE1001>(getClassCurrentUserByLogin(), HttpStatus.OK);
	}

	@RequestMapping(value = "/inactivate", method = RequestMethod.DELETE, produces = "application/json; charset=UTF-8")
	public ResponseEntity<MAE1001> deleteUsers(@RequestBody List<IdsDelete> lst) throws MyWebException {
		if (!lst.isEmpty()) {
			userService.inactivateUser(lst);
		}
		return new ResponseEntity<MAE1001>(HttpStatus.NO_CONTENT);
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
	public ResponseEntity<List<Integer>> dataUser()
			throws Exception {
		List<Integer> lst = new ArrayList<>();
		lst.add(userService.getUsersActive().size());
		lst.add(userService.getUsersPendings().size());
		return new ResponseEntity<List<Integer>>(lst, HttpStatus.OK);
	}

	@Override
	@RequestMapping(value = "/subset", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> subset(@RequestBody UTI1001 entity) throws IOException, MyWebException {
		ObjectMapper mapper = new ObjectMapper();
		GenericObject<MAE1001> objectGen;
		MAE1001 us = getCurrentUserByLogin();
		UTI1001 mstr = masterService.getByMasterUserId(us.getId(), entity.getMstr());
		if (mstr != null) {
			masterService.removeById(mstr.getId());
		}
		entity.setUser(us);
		Set<UTI1003> so = resetOrders(entity.getGrid().getOrders());
		entity.getGrid().setOrders(so);

		masterService.update(entity);
		objectGen = userService.listSubsetUser(entity.getGrid());

		if (objectGen.getListData().isEmpty()) {
			return new ResponseEntity<String>(mapper.writeValueAsString(objectGen), HttpStatus.NO_CONTENT);
		}

		return new ResponseEntity<String>(mapper.writeValueAsString(objectGen), HttpStatus.OK);
	}

	@Override
	@RequestMapping(value = "/subsetListData", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> subsetListData(@RequestBody UTI1001 entity) throws IOException, MyWebException {
		ObjectMapper mapper = new ObjectMapper();
		GenericObject<MAE1001> objectGen;
		objectGen = userService.listSubsetUser(entity.getGrid());

		if (objectGen.getListData().isEmpty()) {
			return new ResponseEntity<String>(mapper.writeValueAsString(objectGen), HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<String>(mapper.writeValueAsString(objectGen), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/language", method = RequestMethod.GET, produces = "application/json; charset=UTF-8")
	public ResponseEntity<LanguageEnum> getLanguage() throws MyWebException {
		
		MAE1001 us = getCurrentUserByLogin();

		if (us == null || us.getLang() == null) {
			return new ResponseEntity<LanguageEnum>(HttpStatus.NO_CONTENT);
		}
		LanguageEnum lang = us.getLang();

		return new ResponseEntity<LanguageEnum>(lang, HttpStatus.OK);
	}

	@RequestMapping(value = "/create_language", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public ResponseEntity<String> setLanguage(@RequestBody String lang) throws MyWebException {
		MAE1001 us = getCurrentUserByLogin();
		if (us == null) {
			return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
		}
		us.setLang(LanguageEnum.valueOf(lang));
		userService.update(us);

		return new ResponseEntity<String>(HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/locale", method = RequestMethod.GET)
	public ResponseEntity<String> setLocale(@RequestParam(value="locale",required=false) String var1) throws MyWebException {
		return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
	}
}