package com.asc.service.interfaces;

import java.util.List;

import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.Role;
import com.asc.commons.entities.UTI1002;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.UTI1006;
import com.asc.service.interfaces.generic.IGenericService;

public interface IRolesService extends IGenericService<Role> {
	Role findbyRol(final String rol) throws MyWebException;

	void inactivateWithMotivo(Role role, UTI1006 moti, MAE1001 userna) throws MyWebException;

	void myOwnerAdd(Role role) throws MyWebException;

	GenericObject<Role> findSubsetSimpleRole(UTI1002 gp);

	List<Role> findActive();
}
