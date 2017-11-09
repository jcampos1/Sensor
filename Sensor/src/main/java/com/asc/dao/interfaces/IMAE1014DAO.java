package com.asc.dao.interfaces;

import java.util.List;

import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.MAE1014;

public interface IMAE1014DAO extends IGenericDao<MAE1014> {

	GenericObject<MAE1014> findSubsetSimple(UTI1002 gp, String orno);

	List<MAE1014> findByStatus(String orno, Boolean active);

	List<MAE1014> getLinesByStatus(String nord, Boolean active);

	List<MAE1014> getLinesByWeigh(String nord, Boolean active);
}
