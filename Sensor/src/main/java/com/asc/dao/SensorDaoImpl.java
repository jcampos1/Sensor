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
import com.asc.dao.interfaces.ISensorDao;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.Sensor;
import com.asc.process.entities.Sensor_;

//DAO: Sensor
@Repository
public class SensorDaoImpl extends AbstractHibernateDao<Sensor> implements ISensorDao {
	
	static Logger log = LogManager.getLogger(SensorDaoImpl.class);
	
	public SensorDaoImpl() {
		setClazz(Sensor.class);
	}
	
	@Override
	public List<Sensor> findActive() {
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<Sensor> criteria = builder.createQuery(Sensor.class);
		Root<Sensor> root = criteria.from(Sensor.class);

		criteria.select(root);
		Predicate pred = builder.equal(root.get( Sensor_.active), true);
		criteria.where(pred);

		return getCurrentSession().createQuery(criteria).getResultList();
	}
	
	@Override
	public GenericObject<Sensor> findSubsetSimpleSensor(UTI1002 gp) {
		int fromIndex, toIndex;
		long totalRecords;
		List<Sensor> lst = new ArrayList<Sensor>();

		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<Sensor> criteria = builder.createQuery(Sensor.class);
		Root<Sensor> root = criteria.from(Sensor.class);

		fromIndex = gp.getPage();
		toIndex = gp.getPageSize();

		criteria.select(root).distinct(true);
		Predicate pred = builder.equal(root.get(Sensor_.active), true);
		
		
		criteria.where(pred);

		totalRecords = getCurrentSession().createQuery(criteria).getResultList().size();
		lst = getCurrentSession().createQuery(criteria).setFirstResult((fromIndex - 1) * toIndex).setMaxResults(toIndex)
				.getResultList();
		GenericObject<Sensor> objectGen = new GenericObject<Sensor>(totalRecords, lst);

		return objectGen;
	}
}