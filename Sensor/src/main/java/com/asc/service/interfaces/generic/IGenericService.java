package com.asc.service.interfaces.generic;

import java.util.List;

import com.asc.commons.entities.UTI1002;
import com.asc.commons.entities.IdsDelete;
import com.asc.entities.abstracts.AbstractEntity;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;

public interface IGenericService<T extends AbstractEntity> {

	public void add(T entity) throws MyWebException;

	public void update(T entity) throws MyWebException;

	public List<T> list();
	
	public GenericObject<T> listSubset(UTI1002 gp);
	
	public GenericObject<T> listSubsetSimple(UTI1002 gp);

	public T getById(Long id) throws MyWebException;

	public T getById(String id) throws MyWebException;
	
	public T getById(Object primaryKey) throws MyWebException;

	public void removeById(Long id) throws MyWebException;

	public void removeById(String id) throws MyWebException;

	public void remove(T entity) throws MyWebException;
	
	void remove(List<IdsDelete> lstIds) throws MyWebException;

	public long countRegs();

	void merge(T entity) throws MyWebException;
}
