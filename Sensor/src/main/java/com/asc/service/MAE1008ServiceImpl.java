package com.asc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asc.dao.interfaces.IMAE1008DAO;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.MAE1008;
import com.asc.service.interfaces.IMAE1008Service;
import com.asc.service.interfaces.generic.AbstractGenericService;

//IMPLEMENTACION DE INTERFAZ PUERTO DE COMUNICACION

@Service
public class MAE1008ServiceImpl extends AbstractGenericService<MAE1008> implements IMAE1008Service {
	
	@SuppressWarnings("unused")
	private IMAE1008DAO myDao;

	public MAE1008ServiceImpl() {

	}
	
	@Autowired
	public MAE1008ServiceImpl(IGenericDao<MAE1008> genericDao) {
		super(genericDao);
		this.myDao = (IMAE1008DAO) genericDao;
	}
}
