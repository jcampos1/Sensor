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
import com.asc.dao.interfaces.ITypesensorDao;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.Typesensor;
import com.asc.process.entities.Typesensor_;

//DAO: Tipo de sensor
@Repository
public class TypesensorDaoImpl extends AbstractHibernateDao<Typesensor> implements ITypesensorDao {
	
	static Logger log = LogManager.getLogger(TypesensorDaoImpl.class);
	
	public TypesensorDaoImpl() {
		setClazz(Typesensor.class);
	}
	
	@Override
	public GenericObject<Typesensor> findSubsetSimpleTypesensor(UTI1002 gp) {
		int fromIndex, toIndex;
		long totalRecords;
		List<Typesensor> lst = new ArrayList<Typesensor>();

		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<Typesensor> criteria = builder.createQuery(Typesensor.class);
		Root<Typesensor> root = criteria.from(Typesensor.class);

		fromIndex = gp.getPage();
		toIndex = gp.getPageSize();

		criteria.select(root).distinct(true);
		Predicate pred = builder.equal(root.get(Typesensor_.active), true);
		
		
		criteria.where(pred);

		totalRecords = getCurrentSession().createQuery(criteria).getResultList().size();
		lst = getCurrentSession().createQuery(criteria).setFirstResult((fromIndex - 1) * toIndex).setMaxResults(toIndex)
				.getResultList();
		GenericObject<Typesensor> objectGen = new GenericObject<Typesensor>(totalRecords, lst);

		return objectGen;
	}
}