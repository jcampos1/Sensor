package com.asc.dao.interfaces;

import java.util.List;

import com.asc.commons.entities.UTI1004;
import com.asc.dao.interfaces.generic.IGenericDao;

public interface IEmail_MessDAO extends IGenericDao<UTI1004> {

	List<UTI1004> findPending();
}
