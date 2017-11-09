package com.asc.dao;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.SingularAttribute;

import org.springframework.stereotype.Repository;

import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.IMAE1013DAO;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.MAE1013;
import com.asc.process.entities.MAE1013_;
import com.iss.enums.StatusOrpEnum;
import com.iss.enums.TipmEnum;

@Repository
public class MAE1013DAOImpl extends AbstractHibernateDao<MAE1013> implements IMAE1013DAO {
	public MAE1013DAOImpl() {
		setClazz(MAE1013.class);
	}
	
	@Override
	public GenericObject<MAE1013> findSubsetOrderByStatus(UTI1002 gp, StatusOrpEnum st) {
		int fromIndex, toIndex;
		long totalRecords;
		List<MAE1013> lst = new ArrayList<MAE1013>();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDateTime time;

		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<MAE1013> criteria = builder.createQuery(MAE1013.class);
		Root<MAE1013> root = criteria.from(MAE1013.class);

		fromIndex = gp.getPage();
		toIndex = gp.getPageSize();

		EntityType<MAE1013> et = root.getModel();
		StringBuilder startWithBldr = new StringBuilder();

		Predicate pred = null;
		SingularAttribute<? super MAE1013, ?> s = null;
		Set<String> lstS = gp.getSearch_fields();

		if (null == gp.getText_find()) {
			gp.setText_find("");
		}
		startWithBldr.append("%");
		startWithBldr.append(gp.getText_find());
		startWithBldr.append("%");

		String str;
		int i = 0;
		Iterator<String> iterator2 = lstS.iterator();

		while (iterator2.hasNext()) {
			str = (String) iterator2.next();
			s = et.getSingularAttribute(str);

			Expression<String> expr = root.get(s).as(String.class);

			if (!gp.getText_find().isEmpty() && s.getType().getJavaType().getName().equals("java.time.LocalDateTime")) {
				try {
					time = LocalDateTime.from(LocalDate.parse(gp.getText_find(), formatter).atStartOfDay());
					StringBuilder sb = new StringBuilder();
					sb.append("%");
					sb.append(time.format(formatter));
					sb.append("%");
					if (i == 0) {
						pred = builder.like(expr, sb.toString());
					} else {
						pred = builder.or(pred, builder.like(expr, sb.toString()));

						pred = builder.or(pred, builder.like(expr, sb.toString()));
					}
				} catch (Exception e) {

				}
			} else {
				if (i == 0) {
					pred = builder.like(expr, startWithBldr.toString());
				} else {
					pred = builder.or(pred, builder.like(expr, startWithBldr.toString()));

					pred = builder.or(pred, builder.like(expr, startWithBldr.toString()));
				}
			}

			i++;
		}

		if (null != pred) {
			if (null != st) {
				pred = builder.and(pred, builder.equal(root.get(MAE1013_.stat), st));
			}
		} else {
			if (null != st) {
				pred = builder.and(pred, builder.equal(root.get(MAE1013_.stat), st));
			}
		}

		criteria.select(root).distinct(true);
		criteria.where(pred);

		totalRecords = getCurrentSession().createQuery(criteria).getResultList().size();
		lst = getCurrentSession().createQuery(criteria).setFirstResult((fromIndex - 1) * toIndex).setMaxResults(toIndex)
				.getResultList();
		GenericObject<MAE1013> objectGen = new GenericObject<MAE1013>(totalRecords, lst);

		return objectGen;
	}

	@Override
	public Integer countOrderByStatus(StatusOrpEnum st) {
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<MAE1013> criteria = builder.createQuery(MAE1013.class);
		Root<MAE1013> root = criteria.from(MAE1013.class);

		criteria.select(root);
		Predicate pred = builder.equal(root.get(MAE1013_.stat), st);
		criteria.where(pred);
		try {
			return getCurrentSession().createQuery(criteria).getResultList().size();
		} catch (Exception e) {
			return null;
		}
	}
	
	@Override
	public MAE1013 findLastOrderByTipm(TipmEnum tipm) {
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<MAE1013> criteria = builder.createQuery(MAE1013.class);
		Root<MAE1013> root = criteria.from(MAE1013.class);

		criteria.select(root);
		Predicate pred = builder.equal(root.get(MAE1013_.tipm), tipm);
		List<Order> ordering = new LinkedList<Order>();
		ordering.add(builder.desc(root.get(MAE1013_.fech)));
		criteria.orderBy(ordering);

		criteria.where(pred);
		try {
			return getCurrentSession().createQuery(criteria).setFirstResult(0).setMaxResults(1).getSingleResult();
		} catch (Exception e) {
			return null;
		}
	}
}
