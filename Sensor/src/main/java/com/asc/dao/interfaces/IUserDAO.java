package com.asc.dao.interfaces;

import java.util.List;

import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;

public interface IUserDAO extends IGenericDao<MAE1001> {
	
	public List<MAE1001> listSubsetActive(int fromIndex, int toIndex);
	public long countActive();
	MAE1001 findbyEmail(final String mail) throws MyWebException;
	public List<MAE1001> getUsersPendings();
	public List<MAE1001> findAdministrators() throws MyWebException;
	List<MAE1001> getUsersActive();
	GenericObject<MAE1001> findSubsetSimpleMAE1001(UTI1002 gp);
}
