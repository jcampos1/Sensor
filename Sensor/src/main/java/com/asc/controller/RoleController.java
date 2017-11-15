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

import com.asc.commons.entities.Role;
import com.asc.commons.entities.UTI1001;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.UTI1006;
import com.asc.service.interfaces.IRolesService;
import com.asc.utils.JsonResponse;
import com.asc.validators.RoleValidator;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

// CONTROLADOR ENTIDAD ROLE O DOMINIO

@RestController()
@RequestMapping("/Role")
public class RoleController extends Base<Role> {

	@Autowired
	private IRolesService roleServ;
	
	@Autowired
	private RoleValidator validator;

	private static final ObjectMapper	JSON_MAPPER	= new ObjectMapper();

	@Autowired
	public RoleController(IRolesService roleServ) {
		super(roleServ);
	}

	@RequestMapping(value = "/check", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public JsonResponse check(@RequestBody Role entity, BindingResult result) {
		validator.validate(entity, result);
		JsonResponse jr = converErrorsToJson(result);
		return jr;
	}
	
	@RequestMapping(value = "/find", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Role>> find() throws IOException, MyWebException {
		ArrayList<Role> roles = (ArrayList<Role>) roleServ.findActive();
		return new ResponseEntity<List<Role>>(roles, HttpStatus.OK);
	}
			
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public ResponseEntity<Role> update(@RequestBody Role entity, BindingResult result, ModelMap modelMap)
			throws Exception {
		if ( entity.getId() != null ) {
			if ( service.getById(entity.getId()) == null ) { throw new Exception("Role not found"); }
		}

		roleServ.merge(entity);
		return new ResponseEntity<Role>(entity, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<Role> create(@RequestBody Role entity, BindingResult result, ModelMap modelMap)
			throws Exception {
		
		if ( null != entity.getId() ) {
			if ( service.getById(entity.getId()) != null ) { throw new Exception(getMess("gene.duplicated")); }
		}
		
		roleServ.myOwnerAdd(entity);
		return new ResponseEntity<Role>(entity, HttpStatus.OK);
	}

	@RequestMapping(value = "/inactivate", method = RequestMethod.DELETE, produces = "application/json; charset=UTF-8")
	public ResponseEntity<Void> inactivate(@RequestParam("obj") String obj, @RequestParam("uti1006") String moti)
			throws MyWebException, JsonParseException, JsonMappingException, IOException {
		Role entity = JSON_MAPPER.readValue(obj, Role.class);
		UTI1006 motive = JSON_MAPPER.readValue(moti, UTI1006.class);

		roleServ.inactivateWithMotivo(entity, motive, getClassCurrentUserByLogin());

		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/externalPagination", method = RequestMethod.POST)
	public ResponseEntity<String> externalPagination(@RequestParam ( "uti1001" ) String json) throws MyWebException, JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		GenericObject<Role> objectGen;

		UTI1001 entity;
		try {
			entity = JSON_MAPPER.readValue(json, UTI1001.class);
			
			objectGen = roleServ.findSubsetSimpleRole(entity.getGrid());

			if (objectGen.getListData().isEmpty()) {
				return new ResponseEntity<String>(mapper.writeValueAsString(objectGen), HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<String>(mapper.writeValueAsString(objectGen), HttpStatus.OK);
		} catch (IOException e) {
			return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
		}
	}
}