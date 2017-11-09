package com.asc.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Component;

import com.asc.controller.abstracts.Configuration;

@Component
public class StringUtil {

	public static final int EIGHTEEN = 18;
	public static final int THREE = 3;
	public static final int FIVE = 5;
	public static final int ERROR = -1;
	public static final int YEAR = 365;
	public static final int FIFTY = 50;
	public static final int FIFTYFIVE = 55;
	public static final int SIXTYFIVE = 65;
	public static final int SEVENTYFIVE = 75;
	public static final int TWENTY = 20;
	public static final int TWENTYSIX = 26;
	public static final int FIFTEEN = 15;
	public static final String EMPTY = " ";
	public static final String USA = "USA";
	public static final int NO_TPRS = 0;

	public static boolean isEmpty(String string) {
		return string == null || string.length() < 1 || string.trim().equals("");
	}

	public static boolean like(String str1, String str2) {
		if ((isEmptyOrNullValue(str1)) || (isEmptyOrNullValue(str2))) {
			return false;
		}
		return str1.toLowerCase().contains(str2.toLowerCase());
	}

	public static boolean isNull(String string) {
		return string == null;
	}

	public static boolean isEmptyOrNullValue(String string) {
		return (StringUtil.isEmpty(string) || (string.trim().equalsIgnoreCase("null")));
	}

	public static boolean isEmptyOrNullOrNegValue(String string) {
		return ((isEmptyOrNullValue(string)) || (string.trim().equalsIgnoreCase("-1")));
	}

	public static boolean isEmptyOrNullOrNegOrZeroValue(String string) {
		return ((isEmptyOrNullOrNegValue(string)) || (string.trim().equalsIgnoreCase("0")));
	}

	public static boolean containsDigit(String s) {
		boolean containsDigit = false;

		if (s != null && !s.isEmpty()) {
			for (char c : s.toCharArray()) {
				if (containsDigit = Character.isDigit(c)) {
					break;
				}
			}
		}

		return containsDigit;
	}

	public static List<String> findInQoutes(String str) {
		List<String> ret = new ArrayList<String>();
		Pattern p = Pattern.compile("\"([^\"]*)\"");
		Matcher m = p.matcher(str);
		while (m.find()) {
			ret.add(m.group(1));
		}
		return ret;
	}

	public static String subString(String str, int maxSize) {
		if (StringUtil.isEmptyOrNullValue(str)) {
			return "";
		}
		if (str.length() > maxSize) {
			return str.substring(0, maxSize);
		}
		return str;
	}

	public static boolean patternMatch(String value, String pattern) {
		Pattern p = Pattern.compile(pattern);
		Matcher matcher = p.matcher(value);
		return (matcher.matches());
	}

	public static String splitWholeWords(String input, int size) {
		return splitWholeWords(input, size, true);
	}

	public static String splitWholeWords(String input, int size, boolean soft) {
		if (input.length() <= size)
			return input;
		int pos = input.lastIndexOf(" ", size);
		if (pos < 0) {
			if (soft) {
				return "";
			} else {
				return input.substring(0, size);
			}
		}
		return input.substring(0, pos);
	}

	public static int[] splitDays(int noOfDays) {
		int[] ret = { 0, 0, 0, 0 };

		ret[0] = noOfDays / 365;
		noOfDays = noOfDays % 365;

		ret[1] = noOfDays / 30;
		noOfDays = noOfDays % 30;

		ret[2] = noOfDays / 7;
		noOfDays = noOfDays % 7;

		ret[3] = noOfDays;
		return ret;
	}
	
	public static String getGenKey() {
		return RandomStringUtils.randomAlphabetic(Configuration.SIZE_THIRTY);
	}
}
