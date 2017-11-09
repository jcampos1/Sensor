package com.asc.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asc.dao.interfaces.IMAE1007DAO;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.MAE1007;
import com.asc.service.interfaces.IMAE1007Service;
import com.asc.service.interfaces.generic.AbstractGenericService;

// IMPLEMENTACION DE INTERFAZ UNIDAD DE DISPLAY

@Service
public class MAE1007ServiceImpl extends AbstractGenericService<MAE1007> implements IMAE1007Service {

	private IMAE1007DAO myDao;

	public MAE1007ServiceImpl() {

	}

	@Autowired
	public MAE1007ServiceImpl(IGenericDao<MAE1007> genericDao) {
		super(genericDao);
		this.myDao = (IMAE1007DAO) genericDao;
	}

	@Override
	public void myOwnAdd(MAE1007 entity) throws MyWebException {
		MAE1007 byDefa;
		entity.setNmax_slep(entity.getNmax_slep() * 1000);
		entity.setIngr_date(LocalDateTime.now());
		if ( entity.getDefaul() ) {
			if ( (byDefa = myDao.findDisplayByDefault(true)) != null ) {
				byDefa.setDefaul(false);
				myDao.update(byDefa);
			}
		}

		myDao.merge(entity);
	}

	@Override
	@Transactional(readOnly = true)
	public MAE1007 findDisplayByDefault(Boolean defaul) {
		return myDao.findDisplayByDefault(defaul);
	}

	@Override
	@Transactional(readOnly = true)
	public List<MAE1007> findDisplayByUsed(Boolean isused) {
		return myDao.findDisplayByUsed(isused);
	}
}
