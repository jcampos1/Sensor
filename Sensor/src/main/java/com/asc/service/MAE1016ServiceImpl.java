package com.asc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.IMAE1016DAO;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.MAE1016;
import com.asc.service.interfaces.IMAE1016Service;
import com.asc.service.interfaces.generic.AbstractGenericService;

@Service
public class MAE1016ServiceImpl extends AbstractGenericService<MAE1016> implements IMAE1016Service {
	
	private IMAE1016DAO myDao;
	
	public MAE1016ServiceImpl() {

	}
	
	@Autowired
	public MAE1016ServiceImpl(IGenericDao<MAE1016> genericDao) {
		super(genericDao);
		this.myDao = (IMAE1016DAO) genericDao;
	}
}
