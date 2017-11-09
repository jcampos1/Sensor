package com.asc.dao;


import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Repository;

import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.IGridParametersDAO;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;

@Repository
public class GridParametersDAOImpl extends AbstractHibernateDao<UTI1002> implements IGridParametersDAO {
	public GridParametersDAOImpl() {
		setClazz(UTI1002.class);
	}

	public UTI1002 getByUserId(Long id) {
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<UTI1002> criteria = builder.createQuery(UTI1002.class);
		Root<UTI1002> root = criteria.from(UTI1002.class);

		criteria.select(root);

		Predicate pred = null;

		pred = builder.and(builder.equal(root.get("active"), true), builder.equal(root.get("id"), id));

		criteria.where(pred);

		return getCurrentSession().createQuery(criteria).getSingleResult();
	}
}
