package com.asc.dao.interfaces;

import java.util.List;

import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.process.entities.MAE1007;

//DAO: UNIDAD DE DISPLAY
public interface IMAE1007DAO extends IGenericDao<MAE1007> {

	MAE1007 findDisplayByDefault(Boolean defaul);

	List<MAE1007> findDisplayByUsed(Boolean isused);
}
