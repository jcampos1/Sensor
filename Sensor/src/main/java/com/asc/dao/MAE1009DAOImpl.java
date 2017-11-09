package com.asc.dao;

import org.springframework.stereotype.Repository;

import com.asc.dao.interfaces.IMAE1009DAO;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.process.entities.MAE1009;

@Repository
public class MAE1009DAOImpl extends AbstractHibernateDao<MAE1009> implements IMAE1009DAO {
	public MAE1009DAOImpl() {
		setClazz(MAE1009.class);
	}
}
