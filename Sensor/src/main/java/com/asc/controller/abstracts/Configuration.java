package com.asc.controller.abstracts;

import java.text.DecimalFormatSymbols;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import com.asc.capture.Reading;
import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.Options;
import com.asc.commons.entities.Role;
import com.asc.commons.entities.UTI1003;
import com.asc.commons.entities.UTI1004;
import com.asc.commons.entities.UTI1007;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.MAE1007;
import com.asc.service.interfaces.IMAE1013Service;
import com.asc.service.interfaces.IMAE1014Service;
import com.asc.service.interfaces.IPAR1001Service;
import com.asc.service.interfaces.IUserService;
import com.asc.utils.JsonResponse;
import com.asc.utils.StringUtil;
import com.fasterxml.jackson.core.JsonProcessingException;

public class Configuration {

	@Autowired
	protected MessageSource messages;

	@Autowired
	private MailSender mailSender;

	@Autowired
	protected IUserService userServ;
	
	@Autowired
	public IMAE1013Service headerServ;
	
	@Autowired
	public IMAE1014Service itemServ;
	
	@Autowired
	private IPAR1001Service paramServ;
	
	static NumberFormat numberFormatter;

	public final static String BUNDLE = "bundle";
	public final static String ACTIVATE = "activateAcc";
	public final static String SIGNEDUP = "signedUp";
	public final static String HOME = "homePage";
	public final static String FORGOT = "/forgotPasswd";

	public final static String LOCALHOST = "localhost";
	public final static String GENERATE_OUTPUT = "2";
	public final static String GENERATE_OUTPUT_NO_ZERO = "3";
	public final static String CLOSE_APP = "4";

	public final static String HEAD_TITLE = "headTitle";
	public final static String MESSAGE = "message";
	public final static String NEXT_FORM = "nextForm";
	public final static String CONTINUE_PROC = "commons/continueProc";

	public final static String WBL4B = "C:/weighbridge/bin/WeighBridgeLite4Baan.exe";
	public final static String ROUTE_PDF = "C:\\Sensor\\data\\";
	public final static String FILENAME_PESAJE = "pesaje_";
	public final static String PESAJE_EXT = ".pdf";
	
	public final static String DESTFILE = "C:/Sensor/data/pesaje.pdf";
	
	public final static String FILE_OUT = "\"salida.txt\"";
	public final static String PRINT_LOG = "\"1\"";
	public final static String OPER = "\"2\"";
	public final static String STR = "\"texto\"";

	public final static String SEPA_PROJ = "/";
	public final static String CHAR_SPLI = "\\|";
	public final static String SPACE = " ";

	public static final int SIZE_FIVE_THOUSAND = 5000;

	public final static int SIZE_ZERO = 0;
	public final static Integer VALUE_RESET = 0;
	public final static int SIZE_MINIMUM = 1;
	public final static int SIZE_TWO = 2;
	public final static int SIZE_3 = 3;
	public final static int SIZE_6 = 6;
	public final static int SERI = 8;
	public final static int ORNO = 9;
	public final static int REGN = 15;
	public final static int SIZE_PHON = 20;
	public final static int SIZE_NOMENC = 20;
	public final static int SIZE_RANGO = 100;
	public final static int SIZE_16 = 16;
	public final static int SIZE_EIGHTEEN = 18;
	public final static int SIZE_THIRTY = 30;
	public final static int SIZE_FIFTY_FOUR = 54;
	public final static int SIZE_99 = 99;
	public final static int SIZE_HUNDRED = 100;

	public final static int ZERO = 0;
	public final static int SIZE_ONE = 1;
	public final static int SIZE_2 = 2;
	public final static int SIZE_THREE = 3;
	public final static int SIZE_FIVE = 5;
	public final static int SIZE_EIGHT = 8;
	public final static int SIZE_NINE = 9;
	public final static int SIZE_TEN = 10;
	public final static int SIZE_12 = 12;
	public final static int SIZE_15 = 15;
	public final static int SIZE_29 = 29;
	public final static int SIZE_30 = 30;
	public final static int SIZE_35 = 35;
	public final static int SIZE_40 = 40;
	public final static int SIZE_47 = 47;
	public final static int SIZE_50 = 50;
	public final static int SIZE_DESC = 70;
	public final static int SIZE_DESC_SHORT = 35;
	public final static int SIZE_100 = 100;
	public final static int SIZE_150 = 150;
	public final static int SIZE_365 = 365;
	public final static int MAX_BAUD = 921600;
	public final static int NCOL_990 = 17;
	
	public final static int MIN_COMPANY = 0;
	public final static int MAX_COMPANY = 999;

	public final static int MIN_SRVR_PORT = 1024;

	public final static int STAT_PROJ = 0;
	public final static int PROJS = 0;

	public final static int BEFORE_OPEN_PORT = 2000;
	public final static int STAB = 1;
	public final static int UNST_OR_DISC = 0;

	public final static String WEIG_STAB = "DDDDDDDDDD";
	public final static String WEIG_UNST = "OOOOOOOOOO";
	public final static String STAT_BARR = "SSSSSSSSSS";
	public final static String DOWN_BARR = "AAAAAAAAAA";
	public final static String DEFA_CHAR_STAB = "";

	public static String FORMAT_DATATIME = "dd/MM/yyyy HH:mm:ss";

	public final static String OK = "ok";
	public final static String ERROR = "error";
	
	//MEDIO DE TRANSPORTE
	public final static int DSCA_MT = 100;
	public final static int MOTR_MT = DSCA_MT;

	@Value("${db_datePattern}")
	private String defaultPattern;

	public Configuration() {

	}

	public String getMess(String key) {
		return getMess(key, null);
	}

	public String getMess(String key, Object[] args) {
		return getMess(key, args, null);
	}

	public String getMess(String key, Object[] args, Locale locale) {
		String ret = "";
		try {
			ret = messages.getMessage(key, args, LocaleContextHolder.getLocale());
		} catch (Exception e) {
			ret = key;
		}
		return ret;
	}

	public MAE1001 getClassCurrentUserByLogin() throws MyWebException {
		return getCurrentUserByLogin();
	}

	protected MAE1001 getCurrentUserByLogin() throws MyWebException {
		return getCurrentUserByLogin(false);
	}

	protected MAE1001 getCurrentUserByLogin(boolean load_UF) throws MyWebException {
		MAE1001 f = null;
		try {
			String str = getLogin();
			f = userServ.findbyEmail(str);
		} catch (Exception e) {
			throw new MyWebException(getMess("error.no.user"));
		}
		return f;
	}

	public Boolean hasRole(String role_name) throws MyWebException {
		Boolean band = Boolean.FALSE;
		MAE1001 user = getClassCurrentUserByLogin();
		Iterator<Role> it = user.getRoles().iterator();
		Role rol = null;
		while (it.hasNext() && band.equals(Boolean.FALSE)) {
			rol = (Role) it.next();
			if (rol.getName().equals(role_name)) {
				band = Boolean.TRUE;
			}
		}
		return band;
	}

	public String getLogin() {
		String userName = "";
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if (principal instanceof UserDetails) {
			userName = ((UserDetails) principal).getUsername();
		} else {
			userName = principal.toString();
		}
		return userName;
	}

	public String getDefaultPattern() {
		return defaultPattern;
	}

	public void setDefaultPattern(String defaultPattern) {
		this.defaultPattern = defaultPattern;
	}

	public ArrayList<String> getListFromBundles(String key) {
		ArrayList<String> str = new ArrayList<String>();
		int i = 1;
		while (!getMess(key + i).equalsIgnoreCase(key + i) && !StringUtil.isEmpty(getMess(key + i))) {
			str.add(getMess(key + i));
			i++;
		}
		return str;
	}

	protected String alternativeLBL(String str1, String str2) {
		if (!StringUtil.isEmptyOrNullValue(str1)) {
			return str1;
		} else {
			return getMess(str2);
		}
	}

	public void sendMailActivation(String toAddress) {
		SimpleMailMessage email = new SimpleMailMessage();
		email.setTo(toAddress);
		email.setSubject("Prueba");
		email.setText(
				"Debe esperar a que el administrador acepte su solicitud.  Se le mantendra informado al correo que indico en el formulario.");
		mailSender.send(email);
	}

	public static String getParameterDisplay(MAE1007 mae1007) {
		StringBuilder stb = new StringBuilder();
		StringBuilder strConec = new StringBuilder();
		stb.append("cmd.exe /K");
		stb.append(SPACE);
		stb.append(WBL4B);
		stb.append(SPACE);
		stb.append("\"" + ((mae1007.getTraced()) ? 1 : 0) + "\"");
		stb.append(SPACE);
		stb.append(FILE_OUT);
		stb.append(SPACE);

		strConec.append("\"");
		strConec.append(mae1007.getChar_sepa().getDsca() + "|");
		strConec.append(mae1007.getChar_stab() + "|");
		strConec.append(mae1007.getChar_unit() + "|");
		strConec.append(mae1007.getNmax_stab() + "|");
		strConec.append(mae1007.getNmax_unst() + "|");
		strConec.append(mae1007.getPosi_stab() + "|");
		strConec.append(mae1007.getPosi_weig() + "|");
		strConec.append(mae1007.getPort().getBaud() + "|");
		strConec.append(mae1007.getPort().getBits_char() + "|");
		strConec.append(mae1007.getPort().getBits_stop() + "|");
		strConec.append(mae1007.getPort().getPort_name() + "|");
		strConec.append(mae1007.getPort().getPrty().getId() + "|");
		strConec.append((mae1007.getPort().getTout_read() * 1000) + "|");
		strConec.append(mae1007.getSrvrpo() + "|");
		strConec.append(mae1007.getVal_min().intValue() + "|");
		strConec.append(mae1007.getVal_max().intValue() + "|");
		strConec.append("0" + "|");
		strConec.append("1" + "|");
		strConec.append("\"");

		stb.append(strConec.toString());
		stb.append(SPACE);
		stb.append(OPER);
		stb.append(SPACE);
		stb.append(STR);

		return stb.toString();
	}

	public void sendMailChanPasswd(UTI1004 mess) {
		SimpleMailMessage email = new SimpleMailMessage();
		email.setTo(mess.getSend_to());
		email.setSubject(mess.getMess_subj());
		email.setText(mess.getMail_mess());
		mailSender.send(email);
	}
	
	//Para dar formato a números con el locale actual
	public static NumberFormat getNumberFormat( ) {
		numberFormatter = NumberFormat.getNumberInstance(LocaleContextHolder.getLocale());
		return numberFormatter;
	}
	
	public static UTI1007 getSeparators( ) {
		DecimalFormatSymbols symbols = new DecimalFormatSymbols(LocaleContextHolder.getLocale());
//		return new UTI1007(null, "", symbols.getGroupingSeparator(), symbols.getDecimalSeparator());
		return new UTI1007(null, "", ',', '.');
	}

	public JsonResponse converErrorsToJson(BindingResult result) {
		return converErrorsToJson("", result);
	}
	
	public static String routeToPdf( String nord ) {
		return Configuration.ROUTE_PDF+Configuration.FILENAME_PESAJE+nord+Configuration.PESAJE_EXT;
	}
	
	public static String filenamePdf( String nord ) {
		return Configuration.FILENAME_PESAJE+nord+Configuration.PESAJE_EXT;
	}

	public JsonResponse converErrorsToJson(String fldPre, BindingResult result) {
		String status = OK, mess = "";
		HashMap<String, String> flds = new HashMap<String, String>();
		if (result.hasErrors()) {
			for (Object object : result.getAllErrors()) {
				if (object instanceof FieldError) {
					FieldError fieldError = (FieldError) object;
					if (StringUtil.isEmptyOrNullValue(mess)) {
						mess = fieldError.getDefaultMessage();
					} else {
						mess = mess + ", " + fieldError.getDefaultMessage();
					}
					flds.put(fldPre + fieldError.getField(), fieldError.getDefaultMessage());
				} else if (object instanceof ObjectError) {
					ObjectError objectError = (ObjectError) object;
					if (StringUtil.isEmptyOrNullValue(mess)) {
						mess = objectError.getDefaultMessage();
					} else {
						mess = mess + ", " + objectError.getDefaultMessage();
					}
					flds.put(fldPre + objectError.getCodes()[1], objectError.getDefaultMessage());
				}
			}
			status = ERROR;
		}
		return new JsonResponse(status, mess, flds);
	}

	public Set<UTI1003> resetOrders(Set<UTI1003> lst) {
		Set<UTI1003> lst2 = new HashSet<UTI1003>();
		UTI1003 ord = null;
		Iterator<UTI1003> it = lst.iterator();
		while (it.hasNext()) {
			ord = new UTI1003();
			ord = (UTI1003) it.next();
			ord.setId(null);
			lst2.add(ord);
		}
		return lst2;
	}

	public List<Options> getOptionsList(int opc) {
		List<Options> lst = new ArrayList<Options>(0);
		Options se;
		int i = 0;
		switch (opc) {
		case STAT_PROJ:
			// for (StatusEnum st : StatusEnum.values()) {
			// se = new Options();
			// se.setId(i);
			// se.setDsca(getMess(st.toString()));
			// lst.add(se);
			// i++;
			// }
			break;
		default:
			break;

		}
		return lst;
	}

	public List<Integer> getListBaud() {
		List<Integer> lst = new ArrayList<Integer>(0);
		lst.add(110);
		lst.add(300);
		lst.add(1200);
		lst.add(2400);
		lst.add(4800);
		lst.add(9600);
		lst.add(14400);
		lst.add(19200);
		lst.add(28800);
		lst.add(38400);
		lst.add(57600);
		lst.add(115200);
		lst.add(128000);
		lst.add(153600);
		lst.add(230400);
		lst.add(460800);
		lst.add(921600);
		return lst;
	}

	public static List<Integer> getListPosiChar() {
		List<Integer> lst = new ArrayList<Integer>(0);
		for (Integer i = 1; i <= 10; i++) {
			lst.add(i);
		}
		return lst;
	}

	public static List<Integer> getListInteger(Integer from, Integer to, Integer inc) {
		List<Integer> lst = new ArrayList<Integer>(0);
		for (Integer i = from; i <= to; i = i + inc) {
			lst.add(i);
		}
		return lst;
	}

	public <T extends Enum<T>> List<Options> getListOptions(Class<T> en) throws JsonProcessingException {
		List<Options> lst = new ArrayList<Options>();
		for (T c : en.getEnumConstants()) {
			Options opt = new Options();
			opt.setDsca(getMess(c.name()));
			opt.setId(c.ordinal());
			lst.add(opt);
		}

		return lst;
	}

	public final static String getNumZero(int lenght) {
		String numZero;

		switch (lenght) {
		case Configuration.SIZE_MINIMUM:
			numZero = "%08d";
			break;

		case Configuration.SIZE_TWO:
			numZero = "%07d";
			break;

		default:
			numZero = "%06d";
			break;
		}
		return numZero;

	}
}
