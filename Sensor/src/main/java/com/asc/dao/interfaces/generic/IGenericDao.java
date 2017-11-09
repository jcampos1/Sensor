package com.asc.dao.interfaces.generic;

import java.util.List;

import org.hibernate.Criteria;

import com.asc.commons.entities.UTI1002;
import com.asc.commons.entities.IdsDelete;
import com.asc.entities.abstracts.AbstractEntity;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;

public interface IGenericDao<T extends AbstractEntity> {

	T findOne(final Long id) throws MyWebException;

	T findOne(Criteria crt) throws MyWebException;

	T findOne(final String id) throws MyWebException;
	
	T find(final Object primaryKey) throws MyWebException;
	
	GenericObject<T> findSubset(UTI1002 gp);
	
	GenericObject<T> findSubsetSimple(UTI1002 gp);

	List<T> findAll();

	void create(T entity) throws MyWebException;

	void update(final T entity) throws MyWebException;

	void merge(final T entity) throws MyWebException;
	
	void delete(final T entity) throws MyWebException;

	void deleteById(final Long id) throws MyWebException;

	void deleteById(final String id) throws MyWebException;
	
	void delete(List<IdsDelete> lstIds) throws MyWebException;

	long count();

	boolean validatePreTransaction(final T entity) throws MyWebException;

	public void refresh(T entity);
}
