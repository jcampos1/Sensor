package com.asc.dao;

import java.time.LocalDateTime;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import com.asc.commons.entities.UTI1005;
import com.asc.dao.interfaces.ILogged_InDAO;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.exceptions.MyWebException;

@Repository
public class Logged_InDAOImpl extends AbstractHibernateDao<UTI1005> implements ILogged_InDAO {
	public Logged_InDAOImpl() {
		setClazz(UTI1005.class);
	}

	@Override
	public void create(UTI1005 li) throws MyWebException {
		Session session = getCurrentSession();
		li.setLogi_date(LocalDateTime.now());
		try {
			session.saveOrUpdate(li);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
