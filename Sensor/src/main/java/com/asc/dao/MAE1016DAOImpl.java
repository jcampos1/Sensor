package com.asc.dao;

import org.springframework.stereotype.Repository;

import com.asc.dao.interfaces.IMAE1016DAO;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.process.entities.MAE1016;

@Repository
public class MAE1016DAOImpl extends AbstractHibernateDao<MAE1016> implements IMAE1016DAO {
	public MAE1016DAOImpl() {
		setClazz(MAE1016.class);
	}
}
