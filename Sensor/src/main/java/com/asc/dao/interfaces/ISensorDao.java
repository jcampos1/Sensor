package com.asc.dao.interfaces;

import java.util.List;

import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.Sensor;

public interface ISensorDao extends IGenericDao<Sensor> {

	List<Sensor> findActive();

	GenericObject<Sensor> findSubsetSimpleSensor(UTI1002 gp);

	List<Sensor> getByNomenclature(String nomenc);
}
