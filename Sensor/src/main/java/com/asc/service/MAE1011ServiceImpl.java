package com.asc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.IMAE1011DAO;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.MAE1011;
import com.asc.service.interfaces.IMAE1011Service;
import com.asc.service.interfaces.generic.AbstractGenericService;

@Service
public class MAE1011ServiceImpl extends AbstractGenericService<MAE1011> implements IMAE1011Service {
	
	private IMAE1011DAO myDao;
	
	public MAE1011ServiceImpl() {

	}
	
	@Autowired
	public MAE1011ServiceImpl(IGenericDao<MAE1011> genericDao) {
		super(genericDao);
		this.myDao = (IMAE1011DAO) genericDao;
	}
}
