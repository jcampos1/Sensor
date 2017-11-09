package com.asc.service.interfaces;

import java.util.List;

import com.asc.commons.entities.MAE1001;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.Station;
import com.asc.process.entities.UTI1006;
import com.asc.service.interfaces.generic.IGenericService;

public interface IStationService extends IGenericService<Station> {
	public void inactivateWithMotivo(String namest, UTI1006 moti, MAE1001 userna) throws MyWebException;

	List<Station> findActive();
}
