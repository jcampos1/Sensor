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
import com.asc.dao.interfaces.IStationDao;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.Station;
import com.asc.process.entities.Station_;

//DAO: Estación de trabajo
@Repository
public class StationDaoImpl extends AbstractHibernateDao<Station> implements IStationDao {
	
	static Logger log = LogManager.getLogger(StationDaoImpl.class);
	
	public StationDaoImpl() {
		setClazz(Station.class);
	}
	
	@Override
	public List<Station> findActive() {
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<Station> criteria = builder.createQuery(Station.class);
		Root<Station> root = criteria.from(Station.class);

		criteria.select(root);
		Predicate pred = builder.equal(root.get( Station_.active), true);
		criteria.where(pred);

		return getCurrentSession().createQuery(criteria).getResultList();
	}
	
	@Override
	public GenericObject<Station> findSubsetSimpleStation(UTI1002 gp) {
		int fromIndex, toIndex;
		long totalRecords;
		List<Station> lst = new ArrayList<Station>();

		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<Station> criteria = builder.createQuery(Station.class);
		Root<Station> root = criteria.from(Station.class);

		fromIndex = gp.getPage();
		toIndex = gp.getPageSize();

		criteria.select(root).distinct(true);
		Predicate pred = builder.equal(root.get(Station_.active), true);
		
		
		criteria.where(pred);

		totalRecords = getCurrentSession().createQuery(criteria).getResultList().size();
		lst = getCurrentSession().createQuery(criteria).setFirstResult((fromIndex - 1) * toIndex).setMaxResults(toIndex)
				.getResultList();
		GenericObject<Station> objectGen = new GenericObject<Station>(totalRecords, lst);

		return objectGen;
	}
}