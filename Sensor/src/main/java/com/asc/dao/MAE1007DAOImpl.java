package com.asc.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Repository;

import com.asc.dao.interfaces.IMAE1007DAO;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.process.entities.MAE1007;
import com.asc.process.entities.MAE1007_;

//DAO: IMPLEMENTACION UNIDAD DE DISPLAY
@Repository
public class MAE1007DAOImpl extends AbstractHibernateDao<MAE1007> implements IMAE1007DAO {
	
	static Logger log = LogManager.getLogger(MAE1007DAOImpl.class);
	
	public MAE1007DAOImpl() {
		setClazz(MAE1007.class);
	}

	@Override
	public List<MAE1007> findDisplayByUsed(Boolean isused) {
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<MAE1007> criteria = builder.createQuery(MAE1007.class);
		Root<MAE1007> root = criteria.from(MAE1007.class);
		List<MAE1007> lst = new ArrayList<MAE1007>();
		criteria.select(root);
		Predicate pred = builder.equal(root.get(MAE1007_.isused), isused);
		criteria.orderBy(builder.desc(root.get(MAE1007_.defaul)));
		criteria.where(pred);
		try {
			lst = getCurrentSession().createQuery(criteria).getResultList();
		} catch (Exception e) {
			log.error("Error en método findDisplayByUsed (MAE1007DAOImpl.java). Detalles: ", e);
		}
		return lst;
	}
	
	@Override
	public MAE1007 findDisplayByDefault(Boolean defaul) {
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<MAE1007> criteria = builder.createQuery(MAE1007.class);
		Root<MAE1007> root = criteria.from(MAE1007.class);
		MAE1007 entity = null;
		criteria.select(root);
		Predicate pred = builder.equal(root.get(MAE1007_.defaul), defaul);
		criteria.where(pred);
		try {
			entity = getCurrentSession().createQuery(criteria).setFirstResult(0).setMaxResults(1).getSingleResult();
		} catch (Exception e) {
			log.error("Error en método findDisplayByDefault (MAE1007DAOImpl.java). Detalles: ", e);
		}
		return entity;
	}
}