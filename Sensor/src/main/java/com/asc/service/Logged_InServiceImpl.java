package com.asc.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.asc.commons.entities.UTI1005;
import com.asc.dao.interfaces.ILogged_InDAO;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.exceptions.MyWebException;
import com.asc.service.interfaces.ILogged_InService;
import com.asc.service.interfaces.generic.AbstractGenericService;

@Service
public class Logged_InServiceImpl extends AbstractGenericService<UTI1005> implements ILogged_InService {

	private ILogged_InDAO myDao;

	public Logged_InServiceImpl() {

	}

	@Autowired
	public Logged_InServiceImpl(IGenericDao<UTI1005> genericDao) {
		super(genericDao);
		this.myDao = (ILogged_InDAO) genericDao;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = MyWebException.class)
	public void myOwnAdd(UTI1005 entity) throws MyWebException {
		entity.setLogi_date(LocalDateTime.now());
		super.add(entity);
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = MyWebException.class)
	public void otherMetod(UTI1005 entity) throws MyWebException {
		myDao.update(entity);
	}
}