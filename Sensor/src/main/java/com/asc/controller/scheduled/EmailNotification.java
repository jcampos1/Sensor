package com.asc.controller.scheduled;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asc.commons.entities.UTI1004;
import com.asc.exceptions.MyWebException;
import com.asc.service.interfaces.IEmail_MessService;
import com.asc.service.interfaces.generic.AbstractService;

@Component
@EnableScheduling
public class EmailNotification extends AbstractService {

	@Autowired
	private IEmail_MessService serv;

	static Logger log = LogManager.getLogger(EmailNotification.class.getName());

	@Transactional
	@Scheduled(cron = "${email.cron}")
	public void readAndSendEmail() {
		try {
			List<UTI1004> emails = serv.findPending();

			// TODO grabar al log la cantidad de mensajes pendientes
			log.info(getMess("pendings") + emails.size());
			if ((null != emails) && (emails.size() > 0)) {
				serv.processEmails(emails);
			}
		} catch (MyWebException e) {
			log.error(getMess("error.general"), e);
		}
	}

}
