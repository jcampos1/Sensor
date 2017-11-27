package com.asc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asc.dao.interfaces.IReadingDao;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.process.entities.Reading;
import com.asc.service.interfaces.IReadingService;
import com.asc.service.interfaces.generic.AbstractGenericService;

@Service
public class ReadingServiceImpl extends AbstractGenericService<Reading> implements IReadingService {

	private IReadingDao myDao;

	public ReadingServiceImpl() {

	}

	@Autowired
	public ReadingServiceImpl(IGenericDao<Reading> genericDao) {
		super(genericDao);
		this.myDao = (IReadingDao) genericDao;
	}
	
	@Transactional(readOnly = true)
	@Override
	public Reading findLastReadingOfStation(String namest) {
		return myDao.findLastReadingOfStation(namest);
	}
}
