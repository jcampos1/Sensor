package com.asc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asc.dao.interfaces.IMicroDAO;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.process.entities.Micro;
import com.asc.service.interfaces.IMicroService;
import com.asc.service.interfaces.generic.AbstractGenericService;

//IMPLEMENTACION DE INTERFAZ MICROCONTROLADOR

@Service
public class MicroServiceImpl extends AbstractGenericService<Micro> implements IMicroService {
	
	@SuppressWarnings("unused")
	private IMicroDAO myDao;

	public MicroServiceImpl() {

	}
	
	@Autowired
	public MicroServiceImpl(IGenericDao<Micro> genericDao) {
		super(genericDao);
		this.myDao = (IMicroDAO) genericDao;
	}
}
