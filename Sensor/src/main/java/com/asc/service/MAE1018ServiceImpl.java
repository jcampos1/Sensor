package com.asc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asc.dao.interfaces.IMAE1018DAO;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.process.entities.MAE1018;
import com.asc.service.interfaces.IMAE1018Service;
import com.asc.service.interfaces.generic.AbstractGenericService;

@Service
public class MAE1018ServiceImpl extends AbstractGenericService<MAE1018> implements IMAE1018Service {
	
	private IMAE1018DAO myDao;
	
	public MAE1018ServiceImpl() {

	}
	
	@Autowired
	public MAE1018ServiceImpl(IGenericDao<MAE1018> genericDao) {
		super(genericDao);
		this.myDao = (IMAE1018DAO) genericDao;
	}
}
