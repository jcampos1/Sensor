package com.asc.dao;

import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Repository;

import com.asc.dao.interfaces.IStationDao;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
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
}