package com.asc.service.interfaces;

import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.UTI1002;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.PAR1001;
import com.asc.service.interfaces.generic.IGenericService;

public interface IPAR1001Service extends IGenericService<PAR1001> {
	void addToRecord(PAR1001 entity, MAE1001 user) throws MyWebException;
	PAR1001 getParameterCurrent();
	public GenericObject<PAR1001> listSubsetParameters(UTI1002 gp, MAE1001 user);
}
