package com.asc.dao;

import org.springframework.stereotype.Repository;

import com.asc.dao.interfaces.IMAE1018DAO;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.process.entities.MAE1018;

@Repository
public class MAE1018DAOImpl extends AbstractHibernateDao<MAE1018> implements IMAE1018DAO {
	public MAE1018DAOImpl() {
		setClazz(MAE1018.class);
	}
}
