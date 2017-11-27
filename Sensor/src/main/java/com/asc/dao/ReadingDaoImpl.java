package com.asc.dao;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Repository;

import com.asc.dao.interfaces.IReadingDao;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.process.entities.Reading;
import com.asc.process.entities.Reading_;
import com.asc.process.entities.Station;
import com.asc.process.entities.Station_;

//DAO: Reading
@Repository
public class ReadingDaoImpl extends AbstractHibernateDao<Reading> implements IReadingDao {

	static Logger log = LogManager.getLogger(ReadingDaoImpl.class);

	public ReadingDaoImpl() {
		setClazz(Reading.class);
	}

	@Override
	public Reading findLastReadingOfStation(String namest) {
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<Reading> criteria = builder.createQuery(Reading.class);
		Root<Reading> root = criteria.from(Reading.class);

		criteria.select(root);
		List<Order> ordering = new LinkedList<Order>();
		ordering.add(builder.desc(root.get(Reading_.feread)));
		criteria.orderBy(ordering);

		// Reading.station is a @ManyToOne
		Join<Reading, Station> station = root.join(Reading_.station);
		Predicate pred = builder.equal(station.get(Station_.namest), namest);

		criteria.where(pred);
		try {
			return getCurrentSession().createQuery(criteria).setFirstResult(0).setMaxResults(1).getSingleResult();
		} catch (Exception e) {
			return null;
		}
	}
}