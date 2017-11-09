package com.asc.service;

import java.time.LocalDateTime;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asc.commons.entities.UTI1004;
import com.asc.dao.interfaces.IEmail_MessDAO;
import com.asc.exceptions.MyWebException;
import com.asc.service.interfaces.IEmail_MessService;
import com.asc.service.interfaces.generic.AbstractGenericService;
import com.asc.utils.StringUtil;

@Service
public class Email_MessServiceImpl extends AbstractGenericService<UTI1004> implements IEmail_MessService {

	@Autowired
	private IEmail_MessDAO emailDAO;
	
	@Autowired
	MailService mailServ;

	static Logger log = LogManager.getLogger(Email_MessServiceImpl.class.getName());

	@Transactional(rollbackFor = MyWebException.class)
	public void add(UTI1004 entity) throws MyWebException {
		this.emailDAO.create(entity);
	}

	@Override
	@Transactional(rollbackFor = MyWebException.class)
	public void update(UTI1004 entity) throws MyWebException {
		this.emailDAO.update(entity);
	}

	@Override
	public List<UTI1004> list() {
		return this.emailDAO.findAll();
	}

	@Override
	public UTI1004 getById(Long id) throws MyWebException {
		return this.emailDAO.findOne(id);
	}

	@Override
	public UTI1004 getById(String id) throws MyWebException {
		return this.emailDAO.findOne(id);
	}

	@Override
	@Transactional(rollbackFor = MyWebException.class)
	public void removeById(Long id) throws MyWebException {
		this.emailDAO.deleteById(id);
	}

	@Override
	@Transactional(rollbackFor = MyWebException.class)
	public void removeById(String id) throws MyWebException {
		this.emailDAO.deleteById(id);
	}

	@Override
	@Transactional(rollbackFor = MyWebException.class)
	public void remove(UTI1004 entity) throws MyWebException {
		this.emailDAO.delete(entity);
	}

	@Override
	public long countRegs() {
		return 0;
	}

	@Transactional(readOnly = true)
	public List<UTI1004> findPending() {
		return this.emailDAO.findPending();
	}

	public void processEmails(List<UTI1004> emails) throws MyWebException {
		String subject;
		boolean clear_pass = false;
		for (UTI1004 mess : emails) {
			if (StringUtil.isEmptyOrNullValue(mess.getMess_subj()) && !mess.getProc_flag()) {
				switch (mess.getType_mess()) {
				case ATTORNEY2USER:
					subject = "ATTORNEY2USER";
					break;
				case SIGNEDUP:
					subject = getMess("P1.mail.subj");
					clear_pass = true;
					break;
				case USER2ATTORNEY:
					subject = "USER2ATTORNEY";
					break;
				case FORGOTYOURPASS:
					subject = getMess("P3.reset");
					break;
				case ACTIVATE:
					subject = getMess("P3.activate");
					break;
				default:
					subject = "unknown";
					break;
				}
			} else {
				subject = mess.getMess_subj();
			}

			if (mailServ.sendMailWithHTMLContent(mess.getUser().getUser_mail(), mess.getSend_to(), subject,
					mess.getMail_mess(), mess.getMess_adtf())) {
				if (clear_pass) {
					try {
						String begin = getMess("P1.pass.begin");
						String end = getMess("P1.pass.end");
						String body = mess.getMail_mess();
						String tmp1 = body.substring(body.lastIndexOf(begin));
						String tmp2 = tmp1.substring(0, tmp1.indexOf(end));
						body = body.replace(tmp2, "****");
						mess.setMail_mess(body);
					} catch (Exception e) {

					}
				}
				mess.setProc_flag(true);
				mess.setSend_date(LocalDateTime.now());
				try {
					this.emailDAO.update(mess);
				} catch (Exception e) {
					log.error(getMess("general.error"), e);
				}
			} else {
				// TODO preguntar por politica en caso de no envíos
			}
		}

	}

	@Override
	public void merge(UTI1004 entity) throws MyWebException {
		this.emailDAO.merge(entity);
	}
}
