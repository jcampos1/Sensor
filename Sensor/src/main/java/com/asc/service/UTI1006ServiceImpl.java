package com.asc.service;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asc.commons.entities.IdsDelete;
import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.IUTI1006DAO;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.UTI1006;
import com.asc.service.interfaces.IUTI1006Service;
import com.asc.service.interfaces.generic.AbstractGenericService;
import com.iss.enums.ReasonType;

@Service
public class UTI1006ServiceImpl extends AbstractGenericService<UTI1006> implements IUTI1006Service {

	private IUTI1006DAO myDao;

	public UTI1006ServiceImpl() {

	}

	@Autowired
	public UTI1006ServiceImpl(IGenericDao<UTI1006> genericDao) {
		super(genericDao);
		this.myDao = (IUTI1006DAO) genericDao;
	}

	@Transactional(readOnly = true)
	public Boolean existCode(String code_m) {
		return myDao.existCode(code_m);
	}

	@Transactional(readOnly = true)
	public List<UTI1006> motiByType(ReasonType type_m) {
		return myDao.motiByType(type_m);
	}

	@Transactional
	public void enabled(List<IdsDelete> lst, Boolean enabled) throws MyWebException {
		UTI1006 moti;
		IdsDelete idsDelete;
		for (Iterator<IdsDelete> iterator = lst.iterator(); iterator.hasNext();) {
			idsDelete = (IdsDelete) iterator.next();
			moti = (UTI1006) getById(idsDelete.getId());
			moti.setActive(enabled);
			update(moti);
		}
	}
	
	@Override
	@Transactional
	public void inactivate(UTI1006 obj) throws MyWebException {
		obj.setActive(false);
		update(obj);
	}
	
	@Transactional(readOnly = true)
	public GenericObject<UTI1006> findSubsetSimpleMoti(UTI1002 gp, ReasonType type_m) {
		return myDao.findSubsetSimpleMoti(gp, type_m);
	}
}
