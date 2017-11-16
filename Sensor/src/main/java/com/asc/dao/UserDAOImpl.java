package com.asc.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.ListJoin;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Repository;

import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.MAE1001_;
import com.asc.commons.entities.Role;
import com.asc.commons.entities.Role_;
import com.asc.commons.entities.UTI1002;
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
	
	@Override
	public GenericObject<MAE1001> findSubsetSimpleMAE1001(UTI1002 gp) {
		int fromIndex, toIndex;
		long totalRecords;
		List<MAE1001> lst = new ArrayList<MAE1001>();

		CriteriaBuilder builder = getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<MAE1001> criteria = builder.createQuery(MAE1001.class);
		Root<MAE1001> root = criteria.from(MAE1001.class);

		fromIndex = gp.getPage();
		toIndex = gp.getPageSize();

		criteria.select(root).distinct(true);
		Predicate pred = builder.equal(root.get(MAE1001_.active), true);
		builder.and(pred, builder.equal(root.get(MAE1001_.user_dltd), true));
		
		criteria.where(pred);

		totalRecords = getCurrentSession().createQuery(criteria).getResultList().size();
		lst = getCurrentSession().createQuery(criteria).setFirstResult((fromIndex - 1) * toIndex).setMaxResults(toIndex)
				.getResultList();
		GenericObject<MAE1001> objectGen = new GenericObject<MAE1001>(totalRecords, lst);

		return objectGen;
	}
}
