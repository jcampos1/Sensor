package com.asc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.MAE1010;
import com.asc.service.interfaces.IMAE1010Service;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iss.enums.TypeContentEnum;

//CONTROLADOR CONTENEDORES

@RestController()
@RequestMapping("/MAE1010")
public class MAE1010Controller extends Base<MAE1010> {
	
	@Autowired
	private IMAE1010Service contService;
	
	@Autowired
	public MAE1010Controller(IMAE1010Service contService) {
		super(contService);
	}
	
	@RequestMapping(value = "/getByType", method = RequestMethod.POST)
	public ResponseEntity<String> getByType(@RequestBody TypeContentEnum type) throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		GenericObject<MAE1010> objectGen;

		objectGen = contService.findSubsetSimple(type);

		if (objectGen.getListData().isEmpty()) {
			return new ResponseEntity<String>(mapper.writeValueAsString(objectGen), HttpStatus.NO_CONTENT);
		}
		
//		NumberFormat numberFormatter;
//		numberFormatter = NumberFormat.getNumberInstance(LocaleContextHolder.getLocale());
//		for ( int i = 0; i < objectGen.getListData().size(); i++ ) {
//				objectGen.getListData().get(i).setPeststr(numberFormatter.format(objectGen.getListData().get(i).getPest()));
//				System.out.println(objectGen.getListData().get(i).getPeststr());
//		}

		return new ResponseEntity<String>(mapper.writeValueAsString(objectGen), HttpStatus.OK);
	}
}