package com.asc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.IMAE1009DAO;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.MAE1009;
import com.asc.service.interfaces.IMAE1009Service;
import com.asc.service.interfaces.generic.AbstractGenericService;

@Service
public class MAE1009ServiceImpl extends AbstractGenericService<MAE1009> implements IMAE1009Service {
	
	private IMAE1009DAO myDao;
	
	public MAE1009ServiceImpl() {

	}
	
	@Autowired
	public MAE1009ServiceImpl(IGenericDao<MAE1009> genericDao) {
		super(genericDao);
		this.myDao = (IMAE1009DAO) genericDao;
	}

	@Transactional(readOnly = true)
	public GenericObject<MAE1009> findSubsetSimple(UTI1002 gp) {
		return myDao.findSubsetSimple(gp);
	}
}
