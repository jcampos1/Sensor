package com.asc.dao.interfaces;

import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.MAE1012;

public interface IMAE1012DAO extends IGenericDao<MAE1012> {
	public GenericObject<MAE1012> findSubsetSimpleMotr(UTI1002 gp);
}
