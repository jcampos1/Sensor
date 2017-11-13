package com.asc.dao.interfaces;

import java.util.List;

import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.process.entities.Sensor;

public interface ISensorDao extends IGenericDao<Sensor> {

	List<Sensor> findActive();

}
