package com.asc.dao;

import org.springframework.stereotype.Repository;

import com.asc.dao.interfaces.IMAE1017DAO;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.process.entities.MAE1017;

@Repository
public class MAE1017DAOImpl extends AbstractHibernateDao<MAE1017> implements IMAE1017DAO {
	public MAE1017DAOImpl() {
		setClazz(MAE1017.class);
	}
}
