package com.asc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asc.dao.interfaces.IMAE1010DAO;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.MAE1010;
import com.asc.service.interfaces.IMAE1010Service;
import com.asc.service.interfaces.generic.AbstractGenericService;
import com.iss.enums.TypeContentEnum;

@Service
public class MAE1010ServiceImpl extends AbstractGenericService<MAE1010> implements IMAE1010Service {
	
	private IMAE1010DAO myDao;
	
	public MAE1010ServiceImpl() {

	}
	
	@Autowired
	public MAE1010ServiceImpl(IGenericDao<MAE1010> genericDao) {
		super(genericDao);
		this.myDao = (IMAE1010DAO) genericDao;
	}

	@Transactional(readOnly = true)
	public GenericObject<MAE1010> findSubsetSimple(TypeContentEnum type) {
		return myDao.findSubsetSimple(type);
	}
}
