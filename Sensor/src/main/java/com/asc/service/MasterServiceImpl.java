package com.asc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asc.commons.entities.UTI1002;
import com.asc.commons.entities.UTI1001;
import com.asc.dao.interfaces.IMasterDAO;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.exceptions.MyWebException;
import com.asc.service.interfaces.IMasterService;
import com.asc.service.interfaces.generic.AbstractGenericService;
import com.iss.enums.MasterEnum;

@Service
public class MasterServiceImpl extends AbstractGenericService<UTI1001> implements IMasterService {
	
	private IMasterDAO myDao;
	
	public MasterServiceImpl() {

	}
	
	@Autowired
	public MasterServiceImpl(IGenericDao<UTI1001> genericDao) {
		super(genericDao);
		this.myDao = (IMasterDAO) genericDao;
	}

	@Transactional(readOnly = true)
	public UTI1002 getByAppConfigUserId(Long id, MasterEnum mstr) throws MyWebException {
		return myDao.getByAppConfigUserId(id, mstr);
	}

	@Transactional(readOnly = true)
	public UTI1001 getByMasterUserId(Long id, MasterEnum mstr) throws MyWebException {
		return myDao.getByMasterUserId(id, mstr);
	}
}
