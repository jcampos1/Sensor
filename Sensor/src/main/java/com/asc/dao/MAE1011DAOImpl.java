package com.asc.dao;

import org.springframework.stereotype.Repository;

import com.asc.dao.interfaces.IMAE1011DAO;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.process.entities.MAE1011;

@Repository
public class MAE1011DAOImpl extends AbstractHibernateDao<MAE1011> implements IMAE1011DAO {
	public MAE1011DAOImpl() {
		setClazz(MAE1011.class);
	}
}
