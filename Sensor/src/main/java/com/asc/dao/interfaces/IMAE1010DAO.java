package com.asc.dao.interfaces;

import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.MAE1010;
import com.iss.enums.TypeContentEnum;

public interface IMAE1010DAO extends IGenericDao<MAE1010> {
	GenericObject<MAE1010> findSubsetSimple(TypeContentEnum type);
}
