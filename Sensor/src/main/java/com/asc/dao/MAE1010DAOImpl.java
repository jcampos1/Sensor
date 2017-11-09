package com.asc.dao;

import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Repository;

import com.asc.dao.interfaces.IMAE1010DAO;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.MAE1010;
import com.asc.process.entities.MAE1010_;
import com.iss.enums.TypeContentEnum;

@Repository
public class MAE1010DAOImpl extends AbstractHibernateDao<MAE1010> implements IMAE1010DAO {
	public MAE1010DAOImpl() {
		setClazz(MAE1010.class);
	}

	@Override
	public GenericObject<MAE1010> findSubsetSimple(TypeContentEnum type) {
		Predicate pred;
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<MAE1010> criteria = builder.createQuery(MAE1010.class);
		Root<MAE1010> root = criteria.from(MAE1010.class);

		criteria.select(root).distinct(true);
		if(type.equals(TypeContentEnum.CAJA) || type.equals(TypeContentEnum.CEST)) {
			pred = builder.equal(root.get(MAE1010_.type), TypeContentEnum.CAJA);
			pred =builder.or(pred, builder.equal(root.get(MAE1010_.type), TypeContentEnum.CEST));
		}else{
			pred = builder.equal(root.get(MAE1010_.type), type);
		}
		criteria.where(pred);
		
		List<MAE1010> lst = getCurrentSession().createQuery(criteria).getResultList();
		GenericObject<MAE1010> objectGen = new GenericObject<MAE1010>(lst.size(), lst);

		return objectGen;
	}
}
