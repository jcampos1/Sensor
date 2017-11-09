package com.asc.dao.interfaces;

import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.PAR1001;

public interface IPAR1001DAO extends IGenericDao<PAR1001> {
	PAR1001 getParameterCurrent();
	public GenericObject<PAR1001> findSubsetParameters(UTI1002 gp, MAE1001 user);
	public PAR1001 searchLastRecord();
}
