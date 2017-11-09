package com.asc.controller;

import java.io.IOException;
import java.util.Iterator;
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
import com.asc.process.entities.MAE1010;
import com.asc.process.entities.MAE1014;
import com.asc.process.entities.MAE1014.PKMAE1014;
import com.asc.process.entities.MAE1015;
import com.asc.process.entities.MAE1015.PKMAE1015;
import com.asc.process.entities.UTI1006;
import com.asc.process.entities.UTI1008;
import com.asc.process.entities.UTI1011;
import com.asc.service.interfaces.IMAE1015Service;
import com.asc.utils.JsonResponse;
import com.asc.validators.MAE1015Validator;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

// CONTROLADOR PESAJES DE LINEA
 
@RestController()
@RequestMapping("/MAE1015")
public class MAE1015Controller extends Base<MAE1015> {

	@Autowired
	private IMAE1015Service pesServ;
	
	@Autowired
	private MAE1015Validator validator;
	
	private static final ObjectMapper JSON_MAPPER = new ObjectMapper();

	@Autowired
	public MAE1015Controller(IMAE1015Service pesServ) {
		super(pesServ);
	}
	
	@RequestMapping(value = "/checkMAE1015", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public JsonResponse checkMAE1015(@RequestBody MAE1015 entity, BindingResult result) {
		validator.validate(entity, result);
		JsonResponse jr = converErrorsToJson(result);
		return jr;
	}

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<MAE1015> createMAE1015(@RequestBody MAE1015 entity)
			throws Exception {
		
		return new ResponseEntity<MAE1015>(pesServ.myOwnerAdd(entity), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/inactivate", method = RequestMethod.DELETE, produces = "application/json; charset=UTF-8")
	public ResponseEntity<MAE1015> delete(@RequestParam("pkmae1015") String key, @RequestParam("uti1006") String moti)
			throws MyWebException, JsonParseException, JsonMappingException, IOException {
		
		UTI1006 motivo = JSON_MAPPER.readValue(moti, UTI1006.class);
		PKMAE1015 pk = JSON_MAPPER.readValue(key, PKMAE1015.class);
		
		pesServ.inactivateWithMotivo(pk, motivo, getClassCurrentUserByLogin());

		return new ResponseEntity<MAE1015>(HttpStatus.NO_CONTENT);
	}
	
	@RequestMapping(value = "/hasDesglose", method = RequestMethod.POST)
	public ResponseEntity<Boolean> hasDesglose(@RequestParam("line") String obj1)
			throws MyWebException, JsonParseException, JsonMappingException, IOException {
		
		MAE1014 line = JSON_MAPPER.readValue(obj1, MAE1014.class);

		return new ResponseEntity<Boolean>(!pesServ.findByStatus(line.getPk(), true).isEmpty(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/findConten", method = RequestMethod.POST)
	public ResponseEntity<String> findConten(@RequestParam("desg") String obj1)
			throws MyWebException, JsonParseException, JsonMappingException, IOException {
		
		ObjectMapper mapper = new ObjectMapper();
		List<UTI1008> lst;
		UTI1008 conten;
		UTI1011 obj = new UTI1011();
		Double total = 0.0, pestar;
		MAE1015 desg = JSON_MAPPER.readValue(obj1, MAE1015.class);
		MAE1015 entity = pesServ.getById(desg.getPk());
		
		if (entity.getLstcon().isEmpty()) {
			return new ResponseEntity<String>(mapper.writeValueAsString(obj), HttpStatus.NO_CONTENT);
		}
		
		lst = entity.getLstcon();
		for ( int i = 0; i < lst.size(); i++ ) {
			conten = lst.get(i);
			pestar = conten.getConten().getPest()*conten.getNconte();
			lst.get(i).setTotal(pestar);
			total += pestar;
		}
		obj.setLstcon(entity.getLstcon());
		obj.setPestar(total);

		return new ResponseEntity<String>(mapper.writeValueAsString(obj), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/externalPagination", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> externalPagination(@RequestParam("uti1002") String uti1002, @RequestParam("pkmae1014") String obj2) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		GenericObject<MAE1015> objectGen;

		UTI1002 entity = JSON_MAPPER.readValue(uti1002, UTI1002.class);
		PKMAE1014 pk_mae1014 = JSON_MAPPER.readValue(obj2, PKMAE1014.class);
		
		objectGen = pesServ.listSubsetSimple(entity, pk_mae1014);

		if (objectGen.getListData().isEmpty()) {
			return new ResponseEntity<String>(mapper.writeValueAsString(objectGen), HttpStatus.NO_CONTENT);
		}

		return new ResponseEntity<String>(mapper.writeValueAsString(objectGen), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/findAll", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> findAll(@RequestParam("pkmae1014") String obj2) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();

		PKMAE1014 pk_mae1014 = JSON_MAPPER.readValue(obj2, PKMAE1014.class);
		
		List<MAE1015> lst = pesServ.findByStatus(pk_mae1014, true);

		if (lst.isEmpty()) {
			return new ResponseEntity<String>(mapper.writeValueAsString(lst), HttpStatus.NO_CONTENT);
		}

		return new ResponseEntity<String>(mapper.writeValueAsString(lst), HttpStatus.OK);
	}
}