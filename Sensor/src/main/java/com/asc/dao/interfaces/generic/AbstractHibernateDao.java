package com.asc.dao.interfaces.generic;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.SingularAttribute;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import com.asc.commons.entities.IdsDelete;
import com.asc.commons.entities.UTI1002;
import com.asc.commons.entities.UTI1003;
import com.asc.entities.abstracts.AbstractEntity;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;

@Repository
public abstract class AbstractHibernateDao<T extends AbstractEntity> implements IGenericDao<T> {

	private Class<T>	clazz;

	@Autowired
	SessionFactory		sessionFactory;

	public final void setClazz(Class<T> clazzToSet) {
		this.clazz = clazzToSet;
	}

	protected final Session getCurrentSession() {
		return sessionFactory.getCurrentSession();
	}

	public AbstractHibernateDao() {
		SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
	}

	public T getById(final Long id) throws MyWebException {
		try {
			return (T) this.getCurrentSession().get(this.clazz, id);
		} catch (IllegalArgumentException e) {
			throw new MyWebException(e);
		}
	}

	public T getById(final String id) throws MyWebException {
		try {
			return (T) this.getCurrentSession().get(this.clazz, id);
		} catch (IllegalArgumentException e) {
			throw new MyWebException(e);
		}
	}

	public void delete(T entity) throws MyWebException {
		try {
			getCurrentSession().clear();
			validatePreTransaction(entity);
			getCurrentSession().delete(entity);
		} catch (MyWebException e) {
			throw new MyWebException(e);
		}
	}

	public void deleteById(final Long entityId) throws MyWebException {
		try {
			final T entity = this.getById(entityId);
			this.delete(entity);
		} catch (MyWebException e) {
			throw new MyWebException(e);
		}
	}

	public void deleteById(final String entityId) throws MyWebException {

		try {
			final T entity = this.getById(entityId);
			this.delete(entity);

		} catch (MyWebException e) {
			throw new MyWebException(e);
		}

	}

	public void delete(List<IdsDelete> lstIds) throws MyWebException {
		T entity;
		for ( int i = 0; i < lstIds.size(); i++ ) {
			entity = getById(lstIds.get(i).getId());
			this.delete(entity);
		}
	}

	public void update(T entity) throws MyWebException {
		try {
			validatePreTransaction(entity);
			getCurrentSession().saveOrUpdate(entity);
		} catch (MyWebException e) {
			throw new MyWebException(e);
		}
	}

	public void merge(T entity) throws MyWebException {
		try {
			validatePreTransaction(entity);
			getCurrentSession().merge(entity);
		} catch (MyWebException e) {
			throw new MyWebException(e);
		}
	}

	public void create(T entity) throws MyWebException {
		try {
			validatePreTransaction(entity);
			getCurrentSession().save(entity);
		} catch (MyWebException e) {
			throw new MyWebException(e);
		}
	}

	public long count() {
		long count;
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<T> criteria = builder.createQuery(clazz);
		criteria.from(clazz);
		count = getCurrentSession().createQuery(criteria).getResultList().size();

		return count;
	}

	public T findOne(final Long id) throws MyWebException {
		try {
			return (T) getCurrentSession().get(clazz, id);
		} catch (IllegalArgumentException e) {
			throw new MyWebException(e);
		}
	}

	public T find(final Object primaryKey) throws MyWebException {
		try {
			return (T) getCurrentSession().find(clazz, primaryKey);
		} catch (IllegalArgumentException e) {
			throw new MyWebException(e);
		}
	}

	public T findOne(final String id) throws MyWebException {
		try {
			return (T) getCurrentSession().get(clazz, id);
		} catch (IllegalArgumentException e) {
			throw new MyWebException(e);
		}
	}

	public List<T> findAll() {
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<T> criteria = builder.createQuery(clazz);
		criteria.from(clazz);
		return getCurrentSession().createQuery(criteria).getResultList();
	}

	public GenericObject<T> findSubset(UTI1002 gp) {
		int fromIndex, toIndex;
		long totalRecords;
		List<T> lst = new ArrayList<T>();

		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<T> criteria = builder.createQuery(clazz);
		Root<T> root = criteria.from(clazz);

		fromIndex = gp.getPage();
		toIndex = gp.getPageSize();

		criteria.select(root);

		EntityType<T> et = root.getModel();
		StringBuilder startWithBldr = new StringBuilder();

		UTI1003 orders = null;
		List<Order> ordering = new LinkedList<Order>();

		Set<UTI1003> lstO = gp.getOrders();

		Iterator<UTI1003> iterator = lstO.iterator();
		while ( iterator.hasNext() ) {
			orders = (UTI1003) iterator.next();
			if ( orders.getTypeSorting().equals("asc") ) {
				ordering.add(builder.asc(root.get(et.getSingularAttribute(orders.getName()))));
			} else {
				ordering.add(builder.desc(root.get(et.getSingularAttribute(orders.getName()))));
			}
		}

		criteria.orderBy(ordering);

		Predicate pred = null;
		SingularAttribute<? super T, ?> s;
		Set<String> lstS = gp.getSearch_fields();

		if ( null == gp.getText_find() ) {
			gp.setText_find("");
		}

		startWithBldr.append("%");
		startWithBldr.append(gp.getText_find());
		startWithBldr.append("%");

		String str;
		int i = 0;
		Iterator<String> iterator2 = lstS.iterator();
		while ( iterator2.hasNext() ) {
			str = (String) iterator2.next();
			s = et.getSingularAttribute(str);

			Expression<String> expr = root.get(s).as(String.class);

			if ( i == 0 ) {
				pred = builder.like(expr, startWithBldr.toString());
			} else {
				pred = builder.or(pred, builder.like(expr, startWithBldr.toString()));
			}
			i++;
		}

		criteria.where(pred);

		totalRecords = getCurrentSession().createQuery(criteria).getResultList().size();
		lst = getCurrentSession().createQuery(criteria).setFirstResult((fromIndex - 1) * toIndex).setMaxResults(toIndex)
				.getResultList();
		GenericObject<T> objectGen = new GenericObject<T>(totalRecords, lst);

		return objectGen;
	}

	public GenericObject<T> findSubsetSimple(UTI1002 gp) {
		int fromIndex, toIndex;
		long totalRecords;
		List<T> lst = new ArrayList<T>();
		GenericObject<T> objectGen;

		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<T> criteria = builder.createQuery(clazz);
		Root<T> root = criteria.from(clazz);

		StringBuilder startWithBldr = new StringBuilder();
		EntityType<T> et = root.getModel();

		criteria.select(root).distinct(true);
		Predicate pred = null;
		SingularAttribute<? super T, ?> s;
		Set<String> lstS = gp.getSearch_fields();

		if ( null == gp.getText_find() ) {
			gp.setText_find("");
		}

		startWithBldr.append("%");
		startWithBldr.append(gp.getText_find());
		startWithBldr.append("%");

		String str;
		int i = 0;
		Iterator<String> iterator2 = lstS.iterator();
		while ( iterator2.hasNext() ) {
			str = (String) iterator2.next();
			s = et.getSingularAttribute(str);

			Expression<String> expr = root.get(s).as(String.class);

			if ( i == 0 ) {
				pred = builder.like(expr, startWithBldr.toString());
			} else {
				pred = builder.or(pred, builder.like(expr, startWithBldr.toString()));
			}
			i++;
		}

		if ( pred != null ) {
			criteria.where(pred);
		}

		if( gp.getPage() > 0 ) {
			fromIndex = gp.getPage();
			toIndex = gp.getPageSize();
			totalRecords = getCurrentSession().createQuery(criteria).getResultList().size();
			lst = getCurrentSession().createQuery(criteria).setFirstResult((fromIndex - 1) * toIndex).setMaxResults(toIndex)
					.getResultList();
			objectGen = new GenericObject<T>(totalRecords, lst);
		}else{
			lst = getCurrentSession().createQuery(criteria).getResultList();
			objectGen = new GenericObject<T>(0, lst);
		}

		return objectGen;
	}

	public boolean validatePreTransaction(T entity) throws MyWebException {
		try {

		} catch (Exception e) {
			throw new MyWebException("Element is Null", e);
		}
		return true;
	}

	@SuppressWarnings("unchecked")
	public T findOne(Criteria crt) throws MyWebException {
		try {
			return (T) crt.uniqueResult();
		} catch (IllegalArgumentException e) {
			throw new MyWebException(e);
		}
	}

	public void refresh(T entity) {
		getCurrentSession().refresh(entity);
	}
}
