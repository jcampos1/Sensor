package com.asc.dao.interfaces;

import java.util.List;

import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.process.entities.Station;

public interface IStationDao extends IGenericDao<Station> {

	List<Station> findActive();

}
