package com.asc.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.IStationDao;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.REL1002;
import com.asc.process.entities.Station;
import com.asc.process.entities.UTI1006;
import com.asc.service.interfaces.IStationService;
import com.asc.service.interfaces.generic.AbstractGenericService;

@Service
public class StationServiceImpl extends AbstractGenericService<Station> implements IStationService {

	private IStationDao myDao;

	public StationServiceImpl() {

	}

	@Autowired
	public StationServiceImpl(IGenericDao<Station> genericDao) {
		super(genericDao);
		this.myDao = (IStationDao) genericDao;
	}
	
	// Eliminacion logica de la estacion
	@Override
	@Transactional
	public void inactivateWithMotivo(String namest, UTI1006 moti, MAE1001 userna) throws MyWebException {
		REL1002 rel1002;

		Station station = myDao.findOne(namest);
		station.setActive(false);

		rel1002 = new REL1002();
		rel1002.setFecha_(LocalDateTime.now());
		rel1002.setMotivo(moti);
		rel1002.setUserna(userna);
		station.setEvento(rel1002);

		myDao.update(station);
	}
	
	@Override
	@Transactional
	public void myOwnerAdd(Station station) throws MyWebException {
		station.setActive(Boolean.TRUE);
		station.setStatus(Boolean.TRUE);
		myDao.create(station);
	}
	
	@Transactional(readOnly = true)
	@Override
	public List<Station> findActive() {
		return myDao.findActive();
	}
	
	@Override
	@Transactional(readOnly = true)
	public GenericObject<Station> findSubsetSimpleStation(UTI1002 gp) {
		return myDao.findSubsetSimpleStation(gp);
	}
}
