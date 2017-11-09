package com.asc.dao.interfaces;

import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.generic.IGenericDao;

public interface IGridParametersDAO extends IGenericDao<UTI1002> {
	UTI1002 getByUserId(Long id);
}
