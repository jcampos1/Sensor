package com.asc.service.interfaces.generic;

import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;

import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.UTI1004;
import com.asc.controller.abstracts.Configuration;
import com.asc.dao.interfaces.IEmail_MessDAO;
import com.asc.dao.interfaces.IUserDAO;
import com.asc.exceptions.MyWebException;
import com.iss.enums.MailType;

public class AbstractService {

	@Value("${db_datePattern}")
	private String defaultPattern;

	@Autowired
	protected MessageSource messages;
	
	@Autowired
	private IEmail_MessDAO emailDAO;
	
	@Autowired
	private IUserDAO userDAO;
	
	@Value("${app.url}")
	String appUrl;

	protected String getMess(String key) {
		return getMess(key, null);
	}

	protected String getMess(String key, Object[] args) {
		return getMess(key, args, null);
	}

	protected String getMess(String key, Object[] args, Locale locale) {
		String ret = "";
		try {
			ret = messages.getMessage(key, args, locale);
		} catch (Exception e) {
			ret = key;
		}
		return ret;
	}
	
	protected void stationOutService(MAE1001 entity, String namest, Integer minutes) {
		String body = getMess("P1.st.inactive",
				new Object[] { entity.getFrst_name(), namest, minutes });
		pushMail(entity, entity.getUser_mail(), MailType.STATION_INACTIVE, body);
	}
	
	protected void notifyToUserSigned(MAE1001 entity) {
		String link = getMess("P1.link",
				new Object[] { appUrl, Configuration.ACTIVATE, entity.getUser_mail(), entity.getValk() });
		String body = getMess("P1.mail.mess",
				new Object[] { entity.getFrst_name(), entity.getUser_mail(), entity.getUser_pass(), link });
		pushMail(entity, entity.getUser_mail(), MailType.SIGNEDUP, body);
	}
	
	protected void notifyToAdminsSigned(MAE1001 entity) throws MyWebException {
		List<MAE1001> lst = userDAO.findAdministrators();
		if( lst != null ) {
			String body = getMess("P1.mail.admns",
					new Object[] { entity.getUser_mail()});
			for (MAE1001 admn : lst) {
				pushMail(admn, admn.getUser_mail(), MailType.NOTI_ADMIN_SIGNED, body);
			}
		}
	}

	protected void pushMail(MAE1001 entity, String send_to, MailType type, String body) {
		try {
			UTI1004 mess = new UTI1004();
			mess.setUser(entity);
			mess.setSend_to(send_to);
			mess.setType_mess(type);
			mess.setMail_mess(body);
			this.emailDAO.create(mess);
		} catch (MyWebException e) {
			e.printStackTrace();
		}
	}

	public void setPrivateName(String param) {
		defaultPattern = param;
	}

	public String getDefaultPattern() {
		return defaultPattern;
	}
}
