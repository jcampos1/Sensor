package com.asc.controller;

import java.time.LocalDateTime;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.ModelAndView;

import com.asc.commons.entities.UTI1005;
import com.asc.commons.entities.MAE1001;
import com.asc.controller.abstracts.Configuration;
import com.asc.controller.forms.entities.Ask4Mail;
import com.asc.controller.forms.entities.ChangePWD;
import com.asc.exceptions.LockedCredentialsException;
import com.asc.exceptions.LoginAndPasswordCredentialsException;
import com.asc.exceptions.MaxAttempsException;
import com.asc.exceptions.MyWebException;
import com.asc.service.interfaces.ILogged_InService;
import com.asc.utils.Constants;
import com.asc.utils.MD5Encrypter;
import com.asc.utils.StringUtil;
import com.asc.validators.PasswordFormValidator;
import com.asc.validatos.levels.OrderedChecksMail;

@Controller
@SessionAttributes("cUser")
public class LoginControllerMVC extends Configuration {

	public final static String CHANGE_PWD = "changePWD";
	static Logger log = LogManager.getLogger(LoginControllerMVC.class.getName());
	
	public final static String LOGIN = "/login";
	
	@Autowired
	private ILogged_InService logServ;
	
	@RequestMapping(value = { HOME }, method = RequestMethod.GET)
	public ModelAndView homePage(@RequestParam(required = false) Integer opt) {
		ModelAndView model = new ModelAndView();
		
		try {
			MAE1001 sf = getCurrentUserByLogin();
			UTI1005 li = new UTI1005();
			li.setLogi_date(LocalDateTime.now());
			li.setUser(sf);
			logServ.add(li);
			
			model.addObject("cUser", sf);
			model.setViewName(HOME);
			
		} catch (Exception e) {
			log.error(e);
		}
		
		return model;
	}
	
	@RequestMapping(value = LOGIN, method = RequestMethod.GET)
	public ModelAndView loginPage(@RequestParam(value = "error", required = false) String error,
			@RequestParam(value = "logout", required = false) String logout, HttpServletRequest request) {

		ModelAndView model = new ModelAndView();

		if (error != null) {
			setErrorMessage(model, request, "SPRING_SECURITY_LAST_EXCEPTION");
			if (isMaxAttemps(request, "SPRING_SECURITY_LAST_EXCEPTION")) {
				model.addObject("forgot", "1");
			}
		}

		if (logout != null) {

		}
		
		model.setViewName("login/login");
		model.addObject("page_title", getMess("page.login"));
		return model;
	}
	
	@RequestMapping(value = { FORGOT }, method = RequestMethod.GET)
	public ModelAndView forgotPass(@ModelAttribute("email") final String email) {
		ModelAndView model = new ModelAndView();
		Ask4Mail mail = new Ask4Mail();
		model.addObject("email", mail);
		model.setViewName("/login/forgotPasswd");
		model.addObject("page_title", getMess("page.forgot"));
		return model;
	}
	
	@RequestMapping(value = { FORGOT }, method = RequestMethod.POST)
	public String sendLink(@ModelAttribute("email") @Validated(OrderedChecksMail.class) Ask4Mail mail,
			BindingResult result, ModelMap model) {
		if (result.hasErrors()) {
			model.addAttribute(ERROR, 1);
			return "/login/forgotPasswd";
		} else {
			try {
				MAE1001 sf = userServ.findbyEmail(mail.getLogin());
				if (null != sf) {
					userServ.sendChangePass(sf);
				} else {
					model.addAttribute(HEAD_TITLE, getMess("P3.title.error"));
					model.addAttribute(MESSAGE, getMess("P3.erro.mess.1"));
					model.addAttribute(NEXT_FORM, SIGNEDUP);
				}
			} catch (MyWebException e) {
				model.addAttribute(HEAD_TITLE, getMess("P3.title.error"));
				model.addAttribute(MESSAGE, "");
				model.addAttribute(NEXT_FORM, SIGNEDUP);
			}
		}
		model.addAttribute(HEAD_TITLE, getMess("forgot"));
		model.addAttribute(MESSAGE, getMess("P3.mail.mess"));
		model.addAttribute(NEXT_FORM, "login");
		model.addAttribute("page_title", getMess("page.continue"));
		return CONTINUE_PROC;
	}

	@RequestMapping(value = CHANGE_PWD, method = RequestMethod.GET)
	public ModelAndView changePWD(@RequestParam(value = "email", required = true) String email,
			@RequestParam(value = "key", required = true) String genKey) {
		ModelAndView model = new ModelAndView();
		try {
			MAE1001 sf = userServ.findbyEmail(email);
			if ((null != sf) && (sf.getValk().equals(genKey))) {
				ChangePWD pwd = new ChangePWD();
				pwd.setLogin(email);
				model.addObject("changePass", pwd);
				model.setViewName("login/changePWD");
			} else {
				model.addObject(HEAD_TITLE, getMess("P3.title.error"));
				model.addObject(MESSAGE, getMess("P2.erro.mess.1"));
				model.addObject(NEXT_FORM, SIGNEDUP);
				model.setViewName(LOGIN);
			}
		} catch (MyWebException e) {
			model.addObject(HEAD_TITLE, getMess("P3.title.error"));
			model.addObject(MESSAGE, "");
			model.setViewName(LOGIN);
		}

		return model;
	}
	
	@RequestMapping(value = CHANGE_PWD, method = RequestMethod.POST)
	public String changePWD(@ModelAttribute("changePass") @Validated(OrderedChecksMail.class) ChangePWD pwd,
			BindingResult result, ModelMap model) {
		String username = pwd.getLogin();
		new PasswordFormValidator().validate(pwd, result);
		if (result.hasErrors()) {
			model.addAttribute(ERROR, getMess("info.missing"));
			return "login/changePWD";
		}
		try {
			MAE1001 sf = userServ.findbyEmail(pwd.getLogin());
			sf.setUser_pass(MD5Encrypter.encrypt(pwd.getPass()));
			sf.setUser_bloq(false);
			sf.setValk(StringUtil.getGenKey());
			username = sf.getFrst_name();
			userServ.update(sf);
		} catch (Exception e) {
			result.addError(new ObjectError("user_pass", "Error on DB Insert: " + e.getMessage()));
			return "login/changePWD";
		}
		model.addAttribute(HEAD_TITLE, getMess("P3.change.title", new Object[] { username }));
		model.addAttribute(MESSAGE, getMess("P3.change.mess"));
		model.addAttribute(NEXT_FORM, "login");
		
		return CONTINUE_PROC;
	}
	
	private void setErrorMessage(ModelAndView model, HttpServletRequest request, String key) {
		String error = "";
		Exception exception = (Exception) request.getSession().getAttribute(key);
		if (exception instanceof LoginAndPasswordCredentialsException) {
			LoginAndPasswordCredentialsException lpce = (LoginAndPasswordCredentialsException) request.getSession()
					.getAttribute(key);
			try {
				error = lpce.getMessage();
			} catch (Exception e) {
				error = getMess(Constants.NOLOGIN);
			}
			if (lpce.isNoLogin()) {
				model.addObject("nologin", lpce.getNoLogin());
			}
			if (lpce.isNoPasswd()) {
				model.addObject("nopasswd", lpce.getNoPasswd());
			}
		} else {
			try {
				error = exception.getMessage();
			} catch (Exception e) {
				error = getMess(Constants.NOLOGIN);
			}
		}
		model.addObject(ERROR, error);
	}

	private boolean isMaxAttemps(HttpServletRequest request, String key) {
		Exception exception = (Exception) request.getSession().getAttribute(key);
		return ((exception instanceof MaxAttempsException) || (exception instanceof LockedCredentialsException));
	}
}
