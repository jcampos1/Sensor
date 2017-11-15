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
import javax.persistence.criteria.ListJoin;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.SingularAttribute;

import org.springframework.stereotype.Repository;

import com.asc.commons.entities.IdsDelete;
import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.Role;
import com.asc.commons.entities.Role_;
import com.asc.commons.entities.UTI1002;
import com.asc.commons.entities.UTI1003;
import com.asc.dao.interfaces.IUserDAO;
import com.asc.dao.interfaces.generic.AbstractHibernateDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;

@Repository
public class UserDAOImpl extends AbstractHibernateDao<MAE1001> implements IUserDAO {
	public UserDAOImpl() {
		setClazz(MAE1001.class);
	}

	public List<MAE1001> listSubsetActive(int fromIndex, int toIndex){
		
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<MAE1001> criteria = builder.createQuery(MAE1001.class);
		Root<MAE1001> root = criteria.from(MAE1001.class);
		
		criteria.select(root);
		criteria.where(builder.equal(root.get("active"),true));

		return getCurrentSession().createQuery(criteria).setFirstResult((fromIndex - 1) * toIndex)
				.setMaxResults(toIndex).getResultList();
	}
	
	public void inactivateUser(List<IdsDelete> idUsers) throws MyWebException{
		MAE1001 userID;
		for (int i = 0; i < idUsers.size(); i++) {
			userID = (MAE1001) getById(idUsers.get(i).getId());
			userID.setUser_dltd(true);
			userID.setActive(false);
			userID.setUser_bloq(true);
			update(userID);
		}
	}
	
	public long countActive() {
		long count;
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<MAE1001> criteria = builder.createQuery(MAE1001.class);
		Root<MAE1001> root = criteria.from(MAE1001.class);
		
		criteria.select(root);
		criteria.where(builder.equal(root.get("active"),true));
		
		count = getCurrentSession().createQuery(criteria).getResultList().size();

		return count;
	}
	
	public MAE1001 findbyEmail(String mail) {
		MAE1001 sf;
		try {
			CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
			CriteriaQuery<MAE1001> criteria = builder.createQuery(MAE1001.class);
			Root<MAE1001> root = criteria.from(MAE1001.class);
			
			criteria.select(root);
			criteria.where(builder.equal(root.get("user_mail"), mail));
			sf = getCurrentSession().createQuery(criteria).getSingleResult();
		} catch(Exception e) {
			System.out.println("findByEmail Excep: " + e.toString());
			sf = null;
		}
		return sf;
	}
	
	public List<MAE1001> findAdministrators() throws MyWebException {
		List<MAE1001> lst;
		try {
			CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
			CriteriaQuery<MAE1001> criteria = builder.createQuery(MAE1001.class);
			Root<MAE1001> root = criteria.from(MAE1001.class);
			
			/*Se define la busqueda en la lista de usuarios por roles*/
			ListJoin<MAE1001, Role> rol = root.joinList("roles");
			root.fetch("roles");
			Predicate pred = builder.equal(rol.get(Role_.name).as(String.class), "ROLE_ADMIN");
			
			criteria.select(root).distinct(true);
			criteria.where(pred);
			lst = getCurrentSession().createQuery(criteria).getResultList();
		} catch(Exception e) {
			lst = null;
		}
		return lst;
	}
	
	public GenericObject<MAE1001> findSubsetUser(UTI1002 gp) {
		int fromIndex, toIndex;
		long totalRecords;
		List<MAE1001> lst = new ArrayList<MAE1001>();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDateTime time;
		
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<MAE1001> criteria = builder.createQuery(MAE1001.class);
		Root<MAE1001> root = criteria.from(MAE1001.class);
		
		fromIndex = gp.getPage();
		toIndex = gp.getPageSize();
		
		EntityType<MAE1001> et = root.getModel();
		StringBuilder startWithBldr = new StringBuilder();
		
		UTI1003 orders = null;
		List<Order> ordering = new LinkedList<Order>(); 
		
		Set<UTI1003> lstO = gp.getOrders();
		
		Iterator<UTI1003> iterator = lstO.iterator();
		while(iterator.hasNext()){
			orders = (UTI1003) iterator.next();
			if (orders.getTypeSorting().equals("asc")) {
				ordering.add(builder.asc(root.get(et.getSingularAttribute(orders.getName())))); 
			} else {
				ordering.add(builder.desc(root.get(et.getSingularAttribute(orders.getName())))); 
			}
		}
		
		criteria.orderBy(ordering);
		
		Predicate pred = null;
		SingularAttribute<? super MAE1001, ?> s = null;
		Set<String> lstS = gp.getSearch_fields();
		
		if(null == gp.getText_find()) {
			gp.setText_find("");
		}
		
		startWithBldr.append("%");
		startWithBldr.append(gp.getText_find());
		startWithBldr.append("%");
		
		String str;
		int i= 0;
		Iterator<String> iterator2 = lstS.iterator();
		
		while(iterator2.hasNext()){
			str = (String) iterator2.next();
			s = et.getSingularAttribute(str);
			
			Expression<String> expr = root.get(s).as(String.class);
			
			if(!gp.getText_find().isEmpty() && s.getType().getJavaType().getName().equals("java.time.LocalDateTime")) {
				try {
					time = LocalDateTime.from(LocalDate.parse(gp.getText_find(), formatter).atStartOfDay());
					StringBuilder sb = new StringBuilder();
					sb.append("%");
					sb.append(time.format(formatter));
					sb.append("%");
					if( i == 0) {
						pred = builder.like(expr,
								sb.toString());
					}else {
						pred = builder.or(pred, builder.like(expr,
								sb.toString()));
						
						pred = builder.or(pred, builder.like(expr,
								sb.toString()));
					}
				} catch (Exception e) {
					
				}
			}else{
				if( i == 0) {
					pred = builder.like(expr,
							startWithBldr.toString());
				}else {
					pred = builder.or(pred, builder.like(expr,
							startWithBldr.toString()));
					
					pred = builder.or(pred, builder.like(expr,
							startWithBldr.toString()));
				}
			}
			
			i++;
		}
		
		if(null != pred) {
			pred = builder.and(pred, builder.equal(root.get("active"), true) );
			pred = builder.and(pred, builder.equal(root.get("user_dltd"), false) );
		}else{
			pred = builder.equal(root.get("user_dltd"), false);
			pred = builder.and(pred, builder.equal(root.get("active"), true) );
		}
		
		criteria.select(root);
		criteria.where(pred);
		
		totalRecords = getCurrentSession().createQuery(criteria).getResultList().size();
		lst = getCurrentSession().createQuery(criteria).setFirstResult((fromIndex - 1) * toIndex)
				.setMaxResults(toIndex).getResultList();
		GenericObject<MAE1001> objectGen = new GenericObject<MAE1001>(totalRecords, lst);
		
		return objectGen;
	}
	
	
	public List<MAE1001> getUsersPendings() {
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<MAE1001> criteria = builder.createQuery(MAE1001.class);
		Root<MAE1001> root = criteria.from(MAE1001.class);
		
		criteria.select(root);
		
		Predicate pred = builder.equal(root.get("active"),false);
		pred = builder.and(pred, builder.equal(root.get("user_dltd"),false));
		
		criteria.where(pred);
		
		return getCurrentSession().createQuery(criteria).getResultList();
	}
	
	@Override
	public List<MAE1001> getUsersActive() {
		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<MAE1001> criteria = builder.createQuery(MAE1001.class);
		Root<MAE1001> root = criteria.from(MAE1001.class);
		
		criteria.select(root);
		criteria.where(builder.equal(root.get("active"),true));

		return getCurrentSession().createQuery(criteria).getResultList();
	}
}
