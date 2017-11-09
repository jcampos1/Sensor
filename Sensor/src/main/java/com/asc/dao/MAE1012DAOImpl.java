package com.asc.dao;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.SingularAttribute;

import org.springframework.stereotype.Repository;

import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.IMAE1012DAO;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.MAE1012;

@Repository
public class MAE1012DAOImpl extends AbstractHibernateDao<MAE1012> implements IMAE1012DAO {
	public MAE1012DAOImpl() {
		setClazz(MAE1012.class);
	}

	@Override
	public GenericObject<MAE1012> findSubsetSimpleMotr(UTI1002 gp) {
		int fromIndex, toIndex;
		long totalRecords;
		List<MAE1012> lst = new ArrayList<MAE1012>();
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDateTime time;
		
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<MAE1012> criteria = builder.createQuery(MAE1012.class);
		Root<MAE1012> root = criteria.from(MAE1012.class);

		fromIndex = gp.getPage();
		toIndex = gp.getPageSize();
		
		/***Busqueda***/
		EntityType<MAE1012> et = root.getModel();
		StringBuilder startWithBldr = new StringBuilder();

		Predicate pred = null;
		SingularAttribute<? super MAE1012, ?> s = null;
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
		
		/****************/
		
		criteria.select(root).distinct(true);
		criteria.where(pred);
		totalRecords = getCurrentSession().createQuery(criteria).getResultList().size();
		lst = getCurrentSession().createQuery(criteria).setFirstResult((fromIndex - 1) * toIndex).setMaxResults(toIndex)
				.getResultList();
		GenericObject<MAE1012> objectGen = new GenericObject<MAE1012>(totalRecords, lst);

		return objectGen;
	}
}
