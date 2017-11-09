package com.asc.dao.interfaces;

import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.MAE1011;

public interface IMAE1011DAO extends IGenericDao<MAE1011> {
	public GenericObject<MAE1011> findSubsetSimple(UTI1002 gp);
}
