package com.asc.dao;

import org.springframework.stereotype.Repository;

import com.asc.dao.interfaces.IMAE1008DAO;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.process.entities.MAE1008;

//DAO: IMPLEMENTACION DEL DAO PUERTO DE COMUNICACION
@Repository
public class MAE1008DAOImpl extends AbstractHibernateDao<MAE1008> implements IMAE1008DAO {
	public MAE1008DAOImpl() {
		setClazz(MAE1008.class);
	}
}