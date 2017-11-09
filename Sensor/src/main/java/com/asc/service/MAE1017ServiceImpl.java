package com.asc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asc.dao.interfaces.IMAE1017DAO;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.process.entities.MAE1017;
import com.asc.service.interfaces.IMAE1017Service;
import com.asc.service.interfaces.generic.AbstractGenericService;

@Service
public class MAE1017ServiceImpl extends AbstractGenericService<MAE1017> implements IMAE1017Service {
	
	private IMAE1017DAO myDao;
	
	public MAE1017ServiceImpl() {

	}
	
	@Autowired
	public MAE1017ServiceImpl(IGenericDao<MAE1017> genericDao) {
		super(genericDao);
		this.myDao = (IMAE1017DAO) genericDao;
	}
}
