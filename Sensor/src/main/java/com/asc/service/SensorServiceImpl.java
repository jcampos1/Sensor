package com.asc.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.ISensorDao;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.REL1002;
import com.asc.process.entities.Sensor;
import com.asc.process.entities.UTI1006;
import com.asc.service.interfaces.ISensorService;
import com.asc.service.interfaces.generic.AbstractGenericService;

@Service
public class SensorServiceImpl extends AbstractGenericService<Sensor> implements ISensorService {

	private ISensorDao myDao;

	public SensorServiceImpl() {

	}

	@Autowired
	public SensorServiceImpl(IGenericDao<Sensor> genericDao) {
		super(genericDao);
		this.myDao = (ISensorDao) genericDao;
	}
	
	// Eliminacion logica del sensor
	@Override
	@Transactional
	public void inactivateWithMotivo(Sensor sensor, UTI1006 moti, MAE1001 userna) throws MyWebException {
		REL1002 rel1002;

		sensor.setActive(false);

		rel1002 = new REL1002();
		rel1002.setFecha_(LocalDateTime.now());
		rel1002.setMotivo(moti);
		rel1002.setUserna(userna);
		sensor.setEvento(rel1002);

		myDao.merge(sensor);
	}
	
	@Override
	@Transactional
	public void myOwnerAdd(Sensor sensor) throws MyWebException {
		sensor.setActive(true);
		myDao.create(sensor);
	}
	
	@Transactional(readOnly = true)
	@Override
	public List<Sensor> findActive() {
		return myDao.findActive();
	}
	
	@Transactional(readOnly = true)
	@Override
	public List<Sensor> getByNomenclature(String nomenc) {
		return myDao.getByNomenclature(nomenc);
	}
	
	@Override
	@Transactional(readOnly = true)
	public GenericObject<Sensor> findSubsetSimpleSensor(UTI1002 gp) {
		return myDao.findSubsetSimpleSensor(gp);
	}
}
