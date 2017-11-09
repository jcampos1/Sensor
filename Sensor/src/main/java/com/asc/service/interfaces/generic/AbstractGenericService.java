package com.asc.service.interfaces.generic;

import java.util.List;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.asc.commons.entities.UTI1002;
import com.asc.commons.entities.IdsDelete;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.AbstractEntity;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;

public abstract class AbstractGenericService<T extends AbstractEntity> extends AbstractService
		implements IGenericService<T> {

	private IGenericDao<T> genericDao;

	public AbstractGenericService(IGenericDao<T> genericDao) {
		this.genericDao = genericDao;
	}

	public AbstractGenericService() {
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = MyWebException.class)
	public void add(T entity) throws MyWebException {
		genericDao.create(entity);
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = MyWebException.class)
	public void update(T entity) throws MyWebException {
		genericDao.update(entity);
	}

	@Transactional(readOnly = true)
	public List<T> list() {
		return genericDao.findAll();
	}
	
	@Transactional(readOnly = true)
	public GenericObject<T> listSubset(UTI1002 gp) {
		return genericDao.findSubset(gp);
	}
	
	@Transactional(readOnly = true)
	public GenericObject<T> listSubsetSimple(UTI1002 gp) {
		return genericDao.findSubsetSimple(gp);
	}

	@Transactional(readOnly = true)
	public T getById(Long id) throws MyWebException {
		return genericDao.findOne(id);
	}

	@Transactional(readOnly = true)
	public T getById(String id) throws MyWebException {
		return genericDao.findOne(id);
	}
	
	@Transactional(readOnly = true)
	public T getById(Object primaryKey) throws MyWebException {
		return genericDao.find(primaryKey);
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = MyWebException.class)
	public void removeById(Long id) throws MyWebException {
		genericDao.deleteById(id);
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = MyWebException.class)
	public void removeById(String id) throws MyWebException {
		genericDao.deleteById(id);
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = MyWebException.class)
	public void remove(T entity) throws MyWebException {
		genericDao.delete(entity);
	}
	
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = MyWebException.class)
	public void remove(List<IdsDelete> lstIds) throws MyWebException {
		genericDao.delete(lstIds);
	}

	@Transactional(readOnly = true)
	public long countRegs() {
		return genericDao.count();
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = MyWebException.class)
	public void merge(T entity) throws MyWebException {
		genericDao.merge(entity);
	}
}
