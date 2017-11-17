package com.asc.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Repository;

import com.asc.commons.entities.Role;
import com.asc.commons.entities.Role_;
import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.IRolesDAO;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;

@Repository
public class RolesDAOImpl extends AbstractHibernateDao<Role> implements IRolesDAO {
	public RolesDAOImpl() {
		setClazz(Role.class);
	}

	public Role findbyRol(String rol) throws MyWebException {
		Role ret;
		try {
			CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
			CriteriaQuery<Role> criteria = builder.createQuery(Role.class);
			Root<Role> root = criteria.from(Role.class);
			
			criteria.select(root);
			criteria.where(builder.equal(root.get(Role_.name), rol));
			ret = getCurrentSession().createQuery(criteria).getSingleResult();
		} catch(Exception e) {
			System.out.println("findbyRol Excep: " + e.toString());
			ret = null;
		}
		return ret;
	}
	
	@Override
	public List<Role> findActive() {
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<Role> criteria = builder.createQuery(Role.class);
		Root<Role> root = criteria.from(Role.class);

		criteria.select(root);
		Predicate pred = builder.equal(root.get( Role_.active), true);
		criteria.where(pred);

		return getCurrentSession().createQuery(criteria).getResultList();
	}
	
	@Override
	public GenericObject<Role> findSubsetSimpleRole(UTI1002 gp) {
		int fromIndex, toIndex;
		long totalRecords;
		List<Role> lst = new ArrayList<Role>();

		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<Role> criteria = builder.createQuery(Role.class);
		Root<Role> root = criteria.from(Role.class);

		fromIndex = gp.getPage();
		toIndex = gp.getPageSize();

		criteria.select(root).distinct(true);
		Predicate pred = builder.equal(root.get(Role_.active), true);
		
		criteria.where(pred);

		totalRecords = getCurrentSession().createQuery(criteria).getResultList().size();
		lst = getCurrentSession().createQuery(criteria).setFirstResult((fromIndex - 1) * toIndex).setMaxResults(toIndex)
				.getResultList();
		GenericObject<Role> objectGen = new GenericObject<Role>(totalRecords, lst);

		return objectGen;
	}
}
