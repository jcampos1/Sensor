
package com.asc.service;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.mail.internet.MimeMessage;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.asc.service.interfaces.generic.AbstractService;
import com.asc.utils.StringUtil;

@Service("mailService")
public class MailService extends AbstractService {

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private SimpleMailMessage alertMailMessage;

	static Logger log = LogManager.getLogger(MailService.class.getName());

	public boolean sendMail(String from, String to, String subject, String body) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(from);
		message.setTo(to);
		message.setSubject(subject);
		message.setText(body);

		try {
			mailSender.send(message);
			return (true);
		} catch (Exception e) {
			log.error(getMess("error.general"), e);
		}
		return (false);
	}

	public boolean sendMailWithHTMLContent(String from, String to, String subject, String body, String path) {
		try {
			MimeMessage message = mailSender.createMimeMessage();
			message.setSubject(subject);
			MimeMessageHelper helper;
			helper = new MimeMessageHelper(message, true, "UTF-8");
			helper.setFrom(from);
			helper.setTo(to);
			helper.setText(body, true);
			final DefaultResourceLoader loader = new DefaultResourceLoader();
			Resource resource = loader.getResource("classpath:logo-asc.png");
			File file = resource.getFile();
			helper.addInline(file.getName(), file);

			if (!StringUtil.isEmptyOrNullValue(path)) {
				List<String> myList = new ArrayList<String>(Arrays.asList(path.split(",")));

				for (String fl_path : myList) {
					try {
						FileSystemResource fp = new FileSystemResource(fl_path);
						if (fp.exists()) {
							helper.addAttachment(fp.getFilename(), fp);
						}
					} catch (Exception e) {

					}
				}
			}
			mailSender.send(message);
			return (true);
		} catch (Exception e) {
			log.error(getMess("error.general"), e);
		}
		return (false);
	}

	public void sendAlertMail(String alert) {
		SimpleMailMessage mailMessage = new SimpleMailMessage(alertMailMessage);
		mailMessage.setText(alert);
		mailSender.send(mailMessage);
	}
}
