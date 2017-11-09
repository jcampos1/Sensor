package com.asc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asc.commons.entities.CNF1002;
import com.asc.dao.interfaces.IRolesDAO;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.exceptions.MyWebException;
import com.asc.service.interfaces.IRolesService;
import com.asc.service.interfaces.generic.AbstractGenericService;

@Service
public class RolesServiceImpl extends AbstractGenericService<CNF1002> implements IRolesService {
	private IRolesDAO myDao;

	public RolesServiceImpl() {

	}

	@Autowired
	public RolesServiceImpl(IGenericDao<CNF1002> genericDao) {
		super(genericDao);
		this.myDao = (IRolesDAO) genericDao;
	}

	public CNF1002 findbyRol(String rol) throws MyWebException {
		return myDao.findbyRol(rol);
	}
}
