package com.asc.dao.interfaces;

import java.util.List;

import com.asc.commons.entities.Role;
import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;

public interface IRolesDAO extends IGenericDao<Role> {
	Role findbyRol(final String rol) throws MyWebException;

	GenericObject<Role> findSubsetSimpleRole(UTI1002 gp);

	List<Role> findActive();
}
