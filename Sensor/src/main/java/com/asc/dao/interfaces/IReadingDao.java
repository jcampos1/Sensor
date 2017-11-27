package com.asc.dao.interfaces;

import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.process.entities.Reading;

public interface IReadingDao extends IGenericDao<Reading> {

	Reading findLastReadingOfStation(String namest);

}
