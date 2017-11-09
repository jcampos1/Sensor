package com.asc.dao;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Repository;

import com.asc.commons.entities.UTI1004;
import com.asc.dao.interfaces.IEmail_MessDAO;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.exceptions.MyWebException;

@Repository
public class Email_MessDAOImpl extends AbstractHibernateDao<UTI1004> implements IEmail_MessDAO {

	public Email_MessDAOImpl() {
		setClazz(UTI1004.class);
	}

	@Override
	public void delete(UTI1004 entity) throws MyWebException {
		try {
			entity.setMess_dled(true);
			super.update(entity);
		} catch (MyWebException e) {
			throw e;
		}
	}

	@Override
	public void create(UTI1004 entity) throws MyWebException {
		entity.setCrte_date(LocalDateTime.now());
		entity.setMess_dled(false);
		entity.setProc_flag(false);
		super.create(entity);
	}

	public List<UTI1004> findPending() {
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<UTI1004> criteria = builder.createQuery(UTI1004.class);
		Root<UTI1004> root = criteria.from(UTI1004.class);

		criteria.select(root);
		Predicate pred = null;
		pred = builder.and(builder.equal(root.get("mess_dled"), false), builder.equal(root.get("proc_flag"), false));
		criteria.where(pred);
		return getCurrentSession().createQuery(criteria).getResultList();
	}
}
