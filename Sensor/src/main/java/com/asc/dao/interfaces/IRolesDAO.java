package com.asc.dao.interfaces;

import com.asc.commons.entities.CNF1002;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.exceptions.MyWebException;

public interface IRolesDAO extends IGenericDao<CNF1002> {
	CNF1002 findbyRol(final String rol) throws MyWebException;
}
