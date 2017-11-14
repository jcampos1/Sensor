package com.asc.dao.interfaces;

import java.util.List;

import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.Station;

public interface IStationDao extends IGenericDao<Station> {

	List<Station> findActive();

	GenericObject<Station> findSubsetSimpleStation(UTI1002 gp);

}
