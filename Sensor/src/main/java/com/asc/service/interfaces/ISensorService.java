package com.asc.service.interfaces;

import java.util.List;

import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.UTI1002;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.Sensor;
import com.asc.process.entities.UTI1006;
import com.asc.service.interfaces.generic.IGenericService;

public interface ISensorService extends IGenericService<Sensor> {
	public void inactivateWithMotivo(Sensor sensor, UTI1006 moti, MAE1001 userna) throws MyWebException;

	List<Sensor> findActive();

	void myOwnerAdd(Sensor sensor) throws MyWebException;

	GenericObject<Sensor> findSubsetSimpleSensor(UTI1002 gp);
}
