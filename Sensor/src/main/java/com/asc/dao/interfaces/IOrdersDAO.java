package com.asc.dao.interfaces;

import com.asc.commons.entities.UTI1003;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.exceptions.MyWebException;

public interface IOrdersDAO extends IGenericDao<UTI1003> {
	void removeByGrid(Long id) throws MyWebException;
}
