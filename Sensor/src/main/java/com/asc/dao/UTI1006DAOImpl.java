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

import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.IUTI1006DAO;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.UTI1006;
import com.asc.process.entities.UTI1006_;
import com.iss.enums.ReasonType;

@Repository
public class UTI1006DAOImpl extends AbstractHibernateDao<UTI1006> implements IUTI1006DAO {
	
	static Logger log = LogManager.getLogger(UTI1006DAOImpl.class.getName());
	
	public UTI1006DAOImpl() {
		setClazz(UTI1006.class);
	}
	
	@Override
	public Boolean existCode(String code_m) {
		Boolean find = false;
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<UTI1006> criteria = builder.createQuery(UTI1006.class);
		Root<UTI1006> root = criteria.from(UTI1006.class);
		
		criteria.select(root);
		Predicate pred = builder.equal(root.get(UTI1006_.code_m), code_m);
		pred = builder.and(pred, builder.equal(root.get(UTI1006_.active), true));
		criteria.where(pred);
		try {
			UTI1006 uti= getCurrentSession().createQuery(criteria).getSingleResult();
			if(uti != null) {
				find = true;
			}
		} catch (Exception e) {
			log.error("Error en Dao existCode (UTI1006DAOImpl.java):", e);
		}
		return find;
	}
	
	@Override
	public List<UTI1006> motiByType(ReasonType type_m) {
		List<UTI1006> lst = new ArrayList<UTI1006>();
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<UTI1006> criteria = builder.createQuery(UTI1006.class);
		Root<UTI1006> root = criteria.from(UTI1006.class);
		
		criteria.select(root);
		Predicate pred = builder.equal(root.get(UTI1006_.type_m), type_m);
		criteria.where(pred);
		
		try {
			lst = getCurrentSession().createQuery(criteria).getResultList();
		} catch (Exception e) {
			log.error("Error en Dao motiByType (UTI1006DAOImpl.java):", e);
		}
		return lst;
	}
	
	@Override
	public GenericObject<UTI1006> findSubsetSimpleMoti(UTI1002 gp, ReasonType type_m) {
		int fromIndex, toIndex;
		long totalRecords;
		List<UTI1006> lst = new ArrayList<UTI1006>();

		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<UTI1006> criteria = builder.createQuery(UTI1006.class);
		Root<UTI1006> root = criteria.from(UTI1006.class);

		fromIndex = gp.getPage();
		toIndex = gp.getPageSize();

		criteria.select(root).distinct(true);
		Predicate pred = builder.equal(root.get(UTI1006_.active), true);
		
		if(type_m != null){
			pred = builder.and(pred, builder.equal(root.get(UTI1006_.type_m), type_m));
		}
		
		criteria.where(pred);

		totalRecords = getCurrentSession().createQuery(criteria).getResultList().size();
		lst = getCurrentSession().createQuery(criteria).setFirstResult((fromIndex - 1) * toIndex).setMaxResults(toIndex)
				.getResultList();
		GenericObject<UTI1006> objectGen = new GenericObject<UTI1006>(totalRecords, lst);

		return objectGen;
	}
}
