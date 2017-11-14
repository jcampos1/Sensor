package com.asc.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.ITypesensorDao;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.REL1002;
import com.asc.process.entities.Typesensor;
import com.asc.process.entities.UTI1006;
import com.asc.service.interfaces.ITypesensorService;
import com.asc.service.interfaces.generic.AbstractGenericService;

@Service
public class TypesensorServiceImpl extends AbstractGenericService<Typesensor> implements ITypesensorService {

	private ITypesensorDao myDao;

	public TypesensorServiceImpl() {

	}

	@Autowired
	public TypesensorServiceImpl(IGenericDao<Typesensor> genericDao) {
		super(genericDao);
		this.myDao = (ITypesensorDao) genericDao;
	}
	
	// Eliminacion logica de la estacion
	@Override
	@Transactional
	public void inactivateWithMotivo(Typesensor typesensor, UTI1006 moti, MAE1001 userna) throws MyWebException {
		REL1002 rel1002;

		typesensor.setActive(false);

		rel1002 = new REL1002();
		rel1002.setFecha_(LocalDateTime.now());
		rel1002.setMotivo(moti);
		rel1002.setUserna(userna);
		typesensor.setEvento(rel1002);

		myDao.merge(typesensor);
	}
	
	@Override
	@Transactional
	public void myOwnerAdd(Typesensor typesensor) throws MyWebException {
		typesensor.setActive(true);
		myDao.create(typesensor);
	}

	@Override
	@Transactional(readOnly = true)
	public GenericObject<Typesensor> findSubsetSimpleTypesensor(UTI1002 gp) {
		return myDao.findSubsetSimpleTypesensor(gp);
	}
}
