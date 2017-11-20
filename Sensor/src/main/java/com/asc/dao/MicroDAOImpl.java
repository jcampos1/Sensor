package com.asc.dao;

import org.springframework.stereotype.Repository;

import com.asc.dao.interfaces.IMicroDAO;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.process.entities.Micro;

//DAO: IMPLEMENTACION DEL DAO MICROCONTROLADOR
@Repository
public class MicroDAOImpl extends AbstractHibernateDao<Micro> implements IMicroDAO {
	public MicroDAOImpl() {
		setClazz(Micro.class);
	}
}