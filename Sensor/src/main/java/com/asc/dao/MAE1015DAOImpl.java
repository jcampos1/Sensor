package com.asc.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Repository;

import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.IMAE1015DAO;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.MAE1014;
import com.asc.process.entities.MAE1014.PKMAE1014;
import com.asc.process.entities.MAE1014_;
import com.asc.process.entities.MAE1015;
import com.asc.process.entities.MAE1015_;

@Repository
public class MAE1015DAOImpl extends AbstractHibernateDao<MAE1015> implements IMAE1015DAO {
	public MAE1015DAOImpl() {
		setClazz(MAE1015.class);
	}
	
	@Override
	public GenericObject<MAE1015> findSubsetSimple(UTI1002 gp, PKMAE1014 pk_line) {
		int fromIndex, toIndex;
		long totalRecords;
		List<MAE1015> lst = new ArrayList<MAE1015>();
		Predicate pred;
		
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<MAE1015> criteria = builder.createQuery(MAE1015.class);
		Root<MAE1015> root = criteria.from(MAE1015.class);

		fromIndex = gp.getPage();
		toIndex = gp.getPageSize();

		// Pesaje.linea is a @ManyToOne
		Join<MAE1015, MAE1014> line = root.join( MAE1015_.line );
		pred = builder.equal(line.get( MAE1014_.pk ), pk_line);
		pred = builder.and(pred, builder.equal(root.get( MAE1015_.active ), true));
		
		criteria.select(root).distinct(true);
		criteria.where(pred);

		totalRecords = getCurrentSession().createQuery(criteria).getResultList().size();
		lst = getCurrentSession().createQuery(criteria).setFirstResult((fromIndex - 1) * toIndex).setMaxResults(toIndex)
				.getResultList();
		GenericObject<MAE1015> objectGen = new GenericObject<MAE1015>(totalRecords, lst);

		return objectGen;
	}
	
	@Override
	public List<MAE1015> findByStatus(PKMAE1014 pk_line, Boolean active) {
		List<MAE1015> lst = new ArrayList<MAE1015>();
		Predicate pred;
		
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<MAE1015> criteria = builder.createQuery(MAE1015.class);
		Root<MAE1015> root = criteria.from(MAE1015.class);

		// Pesaje.linea is a @ManyToOne
		Join<MAE1015, MAE1014> line = root.join( MAE1015_.line );
		pred = builder.equal(line.get( MAE1014_.pk ), pk_line);
		pred = builder.and(pred, builder.equal(root.get( MAE1015_.active ), active));
		
		criteria.select(root).distinct(true);
		criteria.where(pred);

		lst = getCurrentSession().createQuery(criteria).getResultList();

		return lst;
	}
}
