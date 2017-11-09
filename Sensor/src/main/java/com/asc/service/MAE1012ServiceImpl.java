package com.asc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.IMAE1012DAO;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.MAE1012;
import com.asc.service.interfaces.IMAE1012Service;
import com.asc.service.interfaces.generic.AbstractGenericService;

@Service
public class MAE1012ServiceImpl extends AbstractGenericService<MAE1012> implements IMAE1012Service {
	
	private IMAE1012DAO myDao;
	
	public MAE1012ServiceImpl() {

	}
	
	@Autowired
	public MAE1012ServiceImpl(IGenericDao<MAE1012> genericDao) {
		super(genericDao);
		this.myDao = (IMAE1012DAO) genericDao;
	}

	@Transactional(readOnly = true)
	public GenericObject<MAE1012> findSubsetSimpleMotr(UTI1002 gp) {
		return myDao.findSubsetSimpleMotr(gp);
	}
}
