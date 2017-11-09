package com.asc.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asc.commons.entities.CNF1002;
import com.asc.commons.entities.IdsDelete;
import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.UTI1002;
import com.asc.commons.entities.UTI1004;
import com.asc.controller.LoginControllerMVC;
import com.asc.controller.abstracts.Configuration;
import com.asc.dao.interfaces.IEmail_MessDAO;
import com.asc.dao.interfaces.IRolesDAO;
import com.asc.dao.interfaces.IUserDAO;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.service.interfaces.IUserService;
import com.asc.service.interfaces.generic.AbstractGenericService;
import com.asc.utils.Constants;
import com.asc.utils.MD5Encrypter;
import com.asc.utils.StringUtil;
import com.iss.enums.MailType;

@Service
public class UserServiceImpl extends AbstractGenericService<MAE1001> implements IUserService {
	
	private IUserDAO myDao;
	
	@Autowired
	private IEmail_MessDAO emailDAO;
	
	@Autowired
	private IRolesDAO rolesDao;
	
	@Value("${app.url}")
	String appUrl;
	
	public UserServiceImpl() {

	}
	
	@Autowired
	public UserServiceImpl(IGenericDao<MAE1001> genericDao) {
		super(genericDao);
		this.myDao = (IUserDAO) genericDao;
	}

	@Transactional(readOnly = true)
	public List<MAE1001> listSubsetActive(int fromIndex, int toIndex) {
		return myDao.listSubsetActive(fromIndex, toIndex);
	}

	@Transactional
	public void inactivateUser(List<IdsDelete> idUsers) throws MyWebException {
		myDao.inactivateUser(idUsers);
	}
	
	@Transactional(readOnly = true)
	public long countRegsActive()
	{
		return myDao.countActive();
	}

	@Transactional(readOnly = true)
	public MAE1001 findbyEmail(String mail) throws MyWebException {
		return myDao.findbyEmail(mail);
	}
	
	@Transactional(rollbackFor = MyWebException.class)
	public void addClient(MAE1001 entity) throws MyWebException {
		try {
			entity.setActive(false);
			entity.setUser_bloq(false);
			entity.setUser_dltd(false);
			entity.setAtmt(Configuration.SIZE_ZERO);
			entity.setCrte_date(LocalDateTime.now());
			entity.setValk(StringUtil.getGenKey());
			entity.setUser_pass(MD5Encrypter.encrypt(entity.getConf_pass()));
			List<CNF1002> roles = new ArrayList<CNF1002>(0);
			roles.add(rolesDao.findbyRol(Constants.ROLE_USER));
			entity.setRoles(roles);
			
			this.myDao.create(entity);

			notifyToUserSigned(entity);
			notifyToAdminsSigned(entity);
			
		} catch (Exception e) {
			throw new MyWebException(e);
		}
	}
	
	@Transactional(rollbackFor = MyWebException.class)
	public void updateClient(MAE1001 entity) throws MyWebException {
		try {
			List<CNF1002> roles = new ArrayList<CNF1002>(0);
			for (CNF1002 rol : entity.getRoles()) {
				roles.add(rolesDao.findbyRol(rol.getRole_name()));
			}
			
			entity.setRoles(roles);
			
			MAE1001 us = myDao.findOne(entity.getId());
			if(us.getActive().equals(Boolean.FALSE) && !us.getActive().equals(entity.getActive())) {
				UTI1004 mess = new UTI1004();
				mess.setUser(entity);
				mess.setSend_to(entity.getUser_mail());
				mess.setType_mess(MailType.ACTIVATE);

				String link = getMess("P1.link",
						new Object[] { appUrl, Configuration.ACTIVATE, entity.getUser_mail(), entity.getValk() });

				String body = getMess("P1.mail.acti",
						new Object[] { entity.getFrst_name(), entity.getUser_mail(), entity.getConf_pass(), link });

				mess.setMail_mess(body);
				this.emailDAO.create(mess);
			}
			
			myDao.merge(entity);
		} catch (Exception e) {
			throw new MyWebException(e);
		}
	}

	@Transactional
	public void sendChangePass(MAE1001 entity) throws MyWebException {
		try {
			entity.setValk(StringUtil.getGenKey());
			entity.setUser_pass(MD5Encrypter.encrypt(entity.getValk()));
			this.myDao.update(entity);

			UTI1004 mess = new UTI1004();
			mess.setUser(entity);
			mess.setSend_to(entity.getUser_mail());
			mess.setType_mess(MailType.FORGOTYOURPASS);

			String link = getMess("P3.link",
					new Object[] { appUrl, LoginControllerMVC.CHANGE_PWD, entity.getUser_mail(), entity.getValk() });

			String body = getMess("P3.mess.mail", new Object[] { entity.getFrst_name(), entity.getUser_mail(), link });

			mess.setMail_mess(body);
			
			this.emailDAO.create(mess);
		} catch (Exception e) {
			throw new MyWebException(e);
		}
	}
	
	@Transactional(readOnly = true)
	public List<MAE1001> getUsersPendings() {
		return this.myDao.getUsersPendings();
	}
	
	@Transactional(readOnly = true)
	public GenericObject<MAE1001> listSubsetUser(UTI1002 gp) {
		return myDao.findSubsetUser(gp);
	}
	
	@Transactional(readOnly = true)
	@Override
	public List<MAE1001> getUsersActive() {
		return myDao.getUsersActive();
	}
}
