package com.asc.service.interfaces;

import com.asc.commons.entities.CNF1002;
import com.asc.exceptions.MyWebException;
import com.asc.service.interfaces.generic.IGenericService;

public interface IRolesService extends IGenericService<CNF1002> {
	CNF1002 findbyRol(final String rol) throws MyWebException;
}
