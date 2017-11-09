package com.asc.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.IPAR1001DAO;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.PAR1001;
import com.asc.service.interfaces.IPAR1001Service;
import com.asc.service.interfaces.generic.AbstractGenericService;

@Service
public class PAR1001ServiceImpl extends AbstractGenericService<PAR1001> implements IPAR1001Service {
	
	private IPAR1001DAO myDao;

	public PAR1001ServiceImpl() {

	}
	
	@Autowired
	public PAR1001ServiceImpl(IGenericDao<PAR1001> genericDao) {
		super(genericDao);
		this.myDao = (IPAR1001DAO) genericDao;
	}

	@Transactional
	public void addToRecord(PAR1001 entity, MAE1001 user) throws MyWebException {
		try {
			PAR1001 lastRecord = myDao.searchLastRecord();
			if(lastRecord != null){
				lastRecord.setActive(false);
				myDao.update(lastRecord);
			}
			
			entity.setUser(user);
			entity.setFech(LocalDateTime.now());
			this.myDao.create(entity);
		} catch (Exception e) {
			throw new MyWebException(e);
		}
	}

	public PAR1001 getParameterCurrent() {
		return this.myDao.getParameterCurrent();
	}
	
	@Transactional(readOnly = true)
	public GenericObject<PAR1001> listSubsetParameters(UTI1002 gp, MAE1001 user) {
		return myDao.findSubsetParameters(gp, user);
	}
}
