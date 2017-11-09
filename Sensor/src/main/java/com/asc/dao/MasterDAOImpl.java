package com.asc.dao;

import javax.persistence.NoResultException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.asc.commons.entities.UTI1002;
import com.asc.commons.entities.UTI1001;
import com.asc.dao.interfaces.IMasterDAO;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.exceptions.MyWebException;
import com.asc.service.interfaces.IUserService;
import com.iss.enums.MasterEnum;

@Repository
public class MasterDAOImpl extends AbstractHibernateDao<UTI1001> implements IMasterDAO {
	@Autowired
	IUserService us;

	public MasterDAOImpl() {
		setClazz(UTI1001.class);
	}

	public UTI1002 getByAppConfigUserId(Long id, MasterEnum mstr) throws MyWebException {
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<UTI1001> criteria = builder.createQuery(UTI1001.class);
		Root<UTI1001> root = criteria.from(UTI1001.class);

		criteria.select(root);

		Predicate pred = null;

		pred = builder.and(builder.equal(root.get("user"), us.getById(id)), builder.equal(root.get("mstr"), mstr));

		criteria.where(pred);

		try {
			return getCurrentSession().createQuery(criteria).getSingleResult().getGrid();
		} catch (NoResultException nre) {
			return null;
		}
	}

	public UTI1001 getByMasterUserId(Long id, MasterEnum mstr) throws MyWebException {
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<UTI1001> criteria = builder.createQuery(UTI1001.class);
		Root<UTI1001> root = criteria.from(UTI1001.class);

		criteria.select(root);

		Predicate pred = null;

		pred = builder.and(builder.equal(root.get("user"), us.getById(id)), builder.equal(root.get("mstr"), mstr));

		criteria.where(pred);

		try {
			return getCurrentSession().createQuery(criteria).getSingleResult();
		} catch (NoResultException nre) {
			return null;
		}
	}
}
