package com.asc.service;

import org.springframework.stereotype.Service;

import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.IGridParametersDAO;
import com.asc.service.interfaces.IGridParametersService;
import com.asc.service.interfaces.generic.AbstractGenericService;

@Service
public class GridParametersServiceImpl extends AbstractGenericService<UTI1002> implements IGridParametersService {
	
	private IGridParametersDAO myDao;
	
	public GridParametersServiceImpl() {

	}

	public UTI1002 getByUserId(Long id) {
		return myDao.getByUserId(id);
	}
}
