package com.asc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asc.commons.entities.CNF1003;
import com.asc.dao.interfaces.ISignUpDAO;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.service.interfaces.ISignUpService;
import com.asc.service.interfaces.generic.AbstractGenericService;

@Service
public class SignUpServiceImpl extends AbstractGenericService<CNF1003> implements ISignUpService  {
private ISignUpDAO myDao;
	
	public SignUpServiceImpl() {

	}
	
	@Autowired
	public SignUpServiceImpl(IGenericDao<CNF1003> genericDao) {
		super(genericDao);
		this.myDao = (ISignUpDAO) genericDao;
	}
}
