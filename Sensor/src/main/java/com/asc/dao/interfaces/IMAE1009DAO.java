package com.asc.dao.interfaces;

import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.MAE1009;

public interface IMAE1009DAO extends IGenericDao<MAE1009> {
	public GenericObject<MAE1009> findSubsetSimple(UTI1002 gp);
}
