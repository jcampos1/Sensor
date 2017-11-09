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

import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.UTI1002;
import com.asc.commons.entities.UTI1003;
import com.asc.dao.interfaces.IPAR1001DAO;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.PAR1001;
import com.asc.process.entities.PAR1001_;

@Repository
public class PAR1001DAOImpl extends AbstractHibernateDao<PAR1001> implements IPAR1001DAO {
	public PAR1001DAOImpl() {
		setClazz(PAR1001.class);
	}

	@Override
	public PAR1001 getParameterCurrent() {
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<PAR1001> criteria = builder.createQuery(PAR1001.class);
		Root<PAR1001> root = criteria.from(PAR1001.class);

		criteria.select(root);
		Predicate pred = builder.equal(root.get(PAR1001_.active), true);
		criteria.where(pred);
		try {
			return getCurrentSession().createQuery(criteria).setFirstResult(0).setMaxResults(1).getSingleResult();
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public GenericObject<PAR1001> findSubsetParameters(UTI1002 gp, MAE1001 user) {
		int fromIndex, toIndex;
		long totalRecords;
		List<PAR1001> lst = new ArrayList<PAR1001>();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDateTime time;

		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<PAR1001> criteria = builder.createQuery(PAR1001.class);
		Root<PAR1001> root = criteria.from(PAR1001.class);

		fromIndex = gp.getPage();
		toIndex = gp.getPageSize();

		EntityType<PAR1001> et = root.getModel();
		StringBuilder startWithBldr = new StringBuilder();

		UTI1003 orders = null;
		List<Order> ordering = new LinkedList<Order>();
		Set<UTI1003> lstO = gp.getOrders();
		Iterator<UTI1003> iterator = lstO.iterator();
		while (iterator.hasNext()) {
			orders = (UTI1003) iterator.next();
			if (orders.getTypeSorting().equals("asc")) {
				ordering.add(builder.asc(root.get(et.getSingularAttribute(orders.getName()))));
			} else {
				ordering.add(builder.desc(root.get(et.getSingularAttribute(orders.getName()))));
			}
		}
		criteria.orderBy(ordering);

		Predicate pred = null;
		SingularAttribute<? super PAR1001, ?> s = null;
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
			pred = builder.and(pred, builder.equal(root.get(PAR1001_.active), false));
		} else {
			pred = builder.equal(root.get(PAR1001_.active), false);
		}

		criteria.select(root).distinct(true);
		criteria.where(pred);

		totalRecords = getCurrentSession().createQuery(criteria).getResultList().size();
		lst = getCurrentSession().createQuery(criteria).setFirstResult((fromIndex - 1) * toIndex).setMaxResults(toIndex)
				.getResultList();
		GenericObject<PAR1001> objectGen = new GenericObject<PAR1001>(totalRecords, lst);

		return objectGen;
	}

	@Override
	public PAR1001 searchLastRecord() {
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<PAR1001> criteria = builder.createQuery(PAR1001.class);
		Root<PAR1001> root = criteria.from(PAR1001.class);
		
		criteria.select(root);
		criteria.orderBy(builder.desc(root.get(PAR1001_.fech)));
		Predicate pred = builder.equal(root.get(PAR1001_.active), true);
		criteria.where(pred);
		try {
			return getCurrentSession().createQuery(criteria).setFirstResult(0).setMaxResults(1).getSingleResult();
		} catch (Exception e) {
			return null;
		}
	}
}