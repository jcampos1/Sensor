package com.asc.dao;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Repository;

import com.asc.commons.entities.CNF1002;
import com.asc.dao.interfaces.IRolesDAO;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.exceptions.MyWebException;

@Repository
public class RolesDAOImpl extends AbstractHibernateDao<CNF1002> implements IRolesDAO {
	public RolesDAOImpl() {
		setClazz(CNF1002.class);
	}

	public CNF1002 findbyRol(String rol) throws MyWebException {
		CNF1002 ret;
		try {
			CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
			CriteriaQuery<CNF1002> criteria = builder.createQuery(CNF1002.class);
			Root<CNF1002> root = criteria.from(CNF1002.class);
			
			criteria.select(root);
			criteria.where(builder.equal(root.get("role_name"), rol));
			ret = getCurrentSession().createQuery(criteria).getSingleResult();
		} catch(Exception e) {
			System.out.println("findbyRol Excep: " + e.toString());
			ret = null;
		}
		return ret;
	}
}
