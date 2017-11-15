package com.asc.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.Role;
import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.IRolesDAO;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.REL1002;
import com.asc.process.entities.UTI1006;
import com.asc.service.interfaces.IRolesService;
import com.asc.service.interfaces.generic.AbstractGenericService;

@Service
public class RolesServiceImpl extends AbstractGenericService<Role> implements IRolesService {
	private IRolesDAO myDao;

	public RolesServiceImpl() {

	}

	@Autowired
	public RolesServiceImpl(IGenericDao<Role> genericDao) {
		super(genericDao);
		this.myDao = (IRolesDAO) genericDao;
	}

	public Role findbyRol(String rol) throws MyWebException {
		return myDao.findbyRol(rol);
	}
	
	@Transactional(readOnly = true)
	@Override
	public List<Role> findActive() {
		return myDao.findActive();
	}

	// Eliminacion logica del role
	@Override
	@Transactional
	public void inactivateWithMotivo(Role role, UTI1006 moti, MAE1001 userna) throws MyWebException {
		REL1002 rel1002;

		role.setActive(false);

		rel1002 = new REL1002();
		rel1002.setFecha_(LocalDateTime.now());
		rel1002.setMotivo(moti);
		rel1002.setUserna(userna);
		role.setEvento(rel1002);

		myDao.merge(role);
	}

	@Override
	@Transactional
	public void myOwnerAdd(Role role) throws MyWebException {
		role.setActive(true);
		myDao.create(role);
	}

	@Override
	@Transactional(readOnly = true)
	public GenericObject<Role> findSubsetSimpleRole(UTI1002 gp) {
		return myDao.findSubsetSimpleRole(gp);
	}
}