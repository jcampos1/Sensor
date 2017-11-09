package com.asc.controller;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.asc.commons.entities.IdsDelete;
import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.UTI1001;
import com.asc.commons.entities.UTI1003;
import com.asc.controller.abstracts.Configuration;
import com.asc.entities.abstracts.AbstractEntity;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.service.interfaces.IMasterService;
import com.asc.service.interfaces.generic.IGenericService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Transactional(readOnly = false)
public abstract class Base<T extends AbstractEntity> extends Configuration {

	protected IGenericService<T> service;

	@Autowired
	private IMasterService masterService;

	public Base(IGenericService<T> service) {
		this.service = service;
	}

	@RequestMapping(value = "/subset", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> subset(@RequestBody UTI1001 entity) throws IOException, MyWebException {

		ObjectMapper mapper = new ObjectMapper();

		MAE1001 us = getCurrentUserByLogin();
		UTI1001 mstr = masterService.getByMasterUserId(us.getId(), entity.getMstr());
		if (mstr != null) {
			masterService.remove(mstr);
		}
		entity.setUser(us);
		Set<UTI1003> so = resetOrders(entity.getGrid().getOrders());
		entity.getGrid().setOrders(so);
		
		masterService.update(entity);

		GenericObject<T> objectGen = service.listSubset(entity.getGrid());

		if (objectGen.getListData().isEmpty()) {
			return new ResponseEntity<String>(mapper.writeValueAsString(objectGen), HttpStatus.NO_CONTENT);
		}

		return new ResponseEntity<String>(mapper.writeValueAsString(objectGen), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/subsetListData", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> subsetListData(@RequestBody UTI1001 entity) throws IOException, MyWebException {
		ObjectMapper mapper = new ObjectMapper();
		GenericObject<T> objectGen = service.listSubset(entity.getGrid());
		if (objectGen.getListData().isEmpty()) {
			return new ResponseEntity<String>(mapper.writeValueAsString(objectGen), HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<String >(mapper.writeValueAsString(objectGen), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<T> get(@PathVariable("id") long id) throws MyWebException {
		T entity = service.getById(id);
		if (entity == null) {
			return new ResponseEntity<T>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<T>(entity, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.GET, value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> all() throws JsonProcessingException {
		List<T> l = service.list();
		ObjectMapper mapper = new ObjectMapper();
		return new ResponseEntity<String>(mapper.writeValueAsString(l), HttpStatus.OK);
	}

	@RequestMapping(value = "/delete", method = RequestMethod.DELETE, produces = "application/json; charset=UTF-8")
	public ResponseEntity<T> delete(@RequestBody List<IdsDelete> lst) throws MyWebException {
		if (!lst.isEmpty()) {
			service.remove(lst);
		}
		return new ResponseEntity<T>(HttpStatus.NO_CONTENT);
	}
	
	@RequestMapping(value = "/externPagSimple", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> findSubsetSimple(@RequestBody UTI1001 entity) throws IOException, MyWebException {
		ObjectMapper mapper = new ObjectMapper();
		GenericObject<T> objectGen;

		objectGen = service.listSubsetSimple(entity.getGrid());

		if (objectGen.getListData().isEmpty()) {
			return new ResponseEntity<String>(mapper.writeValueAsString(objectGen), HttpStatus.NO_CONTENT);
		}

		return new ResponseEntity<String>(mapper.writeValueAsString(objectGen), HttpStatus.OK);
	}
}