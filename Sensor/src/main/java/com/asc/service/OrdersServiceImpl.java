package com.asc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asc.commons.entities.UTI1001;
import com.asc.commons.entities.UTI1003;
import com.asc.dao.interfaces.IMasterDAO;
import com.asc.dao.interfaces.IOrdersDAO;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.exceptions.MyWebException;
import com.asc.service.interfaces.IOrdersService;
import com.asc.service.interfaces.generic.AbstractGenericService;

@Service
public class OrdersServiceImpl extends AbstractGenericService<UTI1003> implements IOrdersService {
	
	private IOrdersDAO myDao;
	
//	public OrdersServiceImpl() {s
//
//	}
	
	@Autowired
	public OrdersServiceImpl(IGenericDao<UTI1003> genericDao) {
		super(genericDao);
		this.myDao = (IOrdersDAO) genericDao;
	}

	public void removeByGrid(Long id) throws MyWebException {
		myDao.removeByGrid(id);
	}
}
