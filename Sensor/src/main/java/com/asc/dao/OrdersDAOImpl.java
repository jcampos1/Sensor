package com.asc.dao;


import javax.persistence.NoResultException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.asc.commons.entities.UTI1003;
import com.asc.dao.interfaces.IOrdersDAO;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.exceptions.MyWebException;

@Repository
public class OrdersDAOImpl extends AbstractHibernateDao<UTI1003> implements IOrdersDAO {
	public OrdersDAOImpl() {
		setClazz(UTI1003.class);
	}
	
	@Transactional(readOnly = false)
	public void removeByGrid(Long id) throws MyWebException {
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<UTI1003> criteria = builder.createQuery(UTI1003.class);
		Root<UTI1003> root = criteria.from(UTI1003.class);

		criteria.select(root);

		Predicate pred = null;

		pred = builder.and(builder.equal(root.get("grid"), id));

		criteria.where(pred);

		try {
			UTI1003 ord = getCurrentSession().createQuery(criteria).getSingleResult();
			if( ord != null ) {
				this.deleteById(ord.getId());
			}
		}catch (NoResultException e) {
		}
	}
}
