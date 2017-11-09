package com.asc.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.ListJoin;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Repository;

import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.IMAE1014DAO;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.MAE1013;
import com.asc.process.entities.MAE1013_;
import com.asc.process.entities.MAE1014;
import com.asc.process.entities.MAE1014_;
import com.asc.process.entities.MAE1015;
import com.asc.process.entities.MAE1015_;

@Repository
public class MAE1014DAOImpl extends AbstractHibernateDao<MAE1014> implements IMAE1014DAO {
	public MAE1014DAOImpl() {
		setClazz(MAE1014.class);
	}
	
	@Override
	public GenericObject<MAE1014> findSubsetSimple(UTI1002 gp, String orno) {
		int fromIndex, toIndex;
		long totalRecords;
		List<MAE1014> lst = new ArrayList<MAE1014>();
		Predicate pred;
		
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<MAE1014> criteria = builder.createQuery(MAE1014.class);
		Root<MAE1014> root = criteria.from(MAE1014.class);

		fromIndex = gp.getPage();
		toIndex = gp.getPageSize();

		// Linea.cabecera is a @ManyToOne
		Join<MAE1014, MAE1013> header = root.join( MAE1014_.header );
		pred = builder.equal(header.get( MAE1013_.orno ), orno);
		
		pred = builder.and(pred, builder.equal(root.get( MAE1014_.active ), true));
		
		criteria.select(root).distinct(true);
		criteria.where(pred);

		totalRecords = getCurrentSession().createQuery(criteria).getResultList().size();
		lst = getCurrentSession().createQuery(criteria).setFirstResult((fromIndex - 1) * toIndex).setMaxResults(toIndex)
				.getResultList();
		GenericObject<MAE1014> objectGen = new GenericObject<MAE1014>(totalRecords, lst);

		return objectGen;
	}
	
	@Override
	public List<MAE1014> getLinesByStatus(String nord, Boolean active) {
		List<MAE1014> lst = new ArrayList<MAE1014>();
		Predicate pred;
		
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<MAE1014> criteria = builder.createQuery(MAE1014.class);
		Root<MAE1014> root = criteria.from(MAE1014.class);

		// Linea.cabecera is a @ManyToOne
		Join<MAE1014, MAE1013> header = root.join( MAE1014_.header );
		pred = builder.equal(header.get( MAE1013_.orno ), nord);
		pred = builder.and(pred, builder.equal(root.get( MAE1014_.active ), active));
		pred = builder.and(pred, builder.equal(root.get( MAE1014_.despac ), true));
		
		criteria.select(root).distinct(true);
		criteria.where(pred);

		lst = getCurrentSession().createQuery(criteria).getResultList();

		return ( lst );
	}
	
	@Override
	public List<MAE1014> getLinesByWeigh(String nord, Boolean active) {
		List<MAE1014> lst = new ArrayList<MAE1014>();
		Predicate pred;
		
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<MAE1014> criteria = builder.createQuery(MAE1014.class);
		Root<MAE1014> root = criteria.from(MAE1014.class);

		// Linea.cabecera is a @ManyToOne
		Join<MAE1014, MAE1013> header = root.join( MAE1014_.header );
		pred = builder.equal(header.get( MAE1013_.orno ), nord);
		pred = builder.and(pred, builder.equal(root.get( MAE1014_.active ), active));
		pred = builder.and(pred, builder.equal(root.get( MAE1014_.despac ), true));
		
		ListJoin<MAE1014, MAE1015> pesos = root.joinList( "pesxli" );
		
		root.fetch("pesxli");
		pred = builder.and(pred,builder.equal(pesos.get(MAE1015_.active), true));
		
		
		criteria.select(root).distinct(true);
		criteria.where(pred);

		lst = getCurrentSession().createQuery(criteria).getResultList();

		return ( lst );
	}
	
	@Override
	public List<MAE1014> findByStatus(String orno, Boolean active) {
		List<MAE1014> lst = new ArrayList<MAE1014>();
		Predicate pred;
		
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<MAE1014> criteria = builder.createQuery(MAE1014.class);
		Root<MAE1014> root = criteria.from(MAE1014.class);

		// Linea.cabecera is a @ManyToOne
		Join<MAE1014, MAE1013> header = root.join( MAE1014_.header );
		pred = builder.equal(header.get( MAE1013_.orno ), orno);
		
		pred = builder.and(pred, builder.equal(root.get( MAE1014_.active ), active));
		
		criteria.select(root).distinct(true);
		criteria.where(pred);

		lst = getCurrentSession().createQuery(criteria).getResultList();
		return lst;
	}
}
