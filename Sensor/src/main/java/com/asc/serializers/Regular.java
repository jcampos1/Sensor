package com.asc.serializers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Regular {

	private static final String REGEX = ".*:(\"{1}\\d{10}\"{1}),\"{1}\"{1},(\"{1}\\d{2}/\\d{2}/\\d{2},\\d{2}:\\d{2}:\\d{2}-\\d{2}\"{1})(EST-\\d{1,3})-(.*)";
	private static final String DEFAULT_STRING = "+CMT:   \"6161135064\",\"\",\"17/10/15,15:29:10-20\"EST-1-TS-24.9-T1-24.1@";

	public static void main(String[] args) {

		/*
		 * SimpleDateFormat formatoDelTexto = new
		 * SimpleDateFormat("yy/MM/dd,hh:mm:ss-SS"); String strFecha =
		 * "17/04/18,22:45:46-20"; Date fecha = null; try {
		 * 
		 * fecha = formatoDelTexto.parse(strFecha); System.out.println(fecha);
		 * System.out.println();
		 * 
		 * } catch (ParseException ex) {
		 * 
		 * ex.printStackTrace();
		 * 
		 * }
		 */

		System.out.println("Minutos de diferencia: " + mindif("17/11/24,09:41:00-80"));
		extractData(DEFAULT_STRING);
	}

	// Diferencia entre la fecha actual y la fecha extraida de la lectura
	public static Integer mindif(String dt) {
		// Formateadores fecha actual y fecha de emision
		SimpleDateFormat currentFormat = new SimpleDateFormat("yy/MM/dd,hh:mm:ss");
		SimpleDateFormat readingFormat = new SimpleDateFormat("yy/MM/dd,hh:mm:ss-SS");
		Integer dif = 0;

		Date d1, d2;
		try {
			d1 = currentFormat.parse(currentFormat.format(new Date()));
			d2 = readingFormat.parse(dt);
			// Diferencia en segundos
			dif = (int) ((d1.getTime() - d2.getTime()) / 1000);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return dif / 60;
	}

	public static String[] extractData(String string) {
		String[] parts = null;
		Pattern pattern = Pattern.compile(REGEX);
		System.out.println(string);
		System.out.println(string.replaceAll("\\s|\\n|\\r|@", ""));
		Matcher matcher = pattern.matcher(string.replaceAll("\\s|\\n|\\r|@", ""));
		
		if (matcher.matches()) {
			System.out.println("Group count: {} " + matcher.groupCount());
			System.out.println("Group #1: {} " + matcher.group(1));
			System.out.println("Group #2: {} " + matcher.group(2));
			System.out.println("Group #3: {} " + matcher.group(3));
			System.out.println("Group #4: {} " + matcher.group(4));

			String meditions = matcher.group(4);

			parts = meditions.split("-");
			for (int i = 0; i < parts.length; i = i + 2) {
				System.out.println("Sensor: " + parts[i] + ", medicion: " + Double.valueOf(parts[i + 1]));
			}
		} else {
			System.out.println("Formato de cadena de lectura no coincide con expresión regular.");
		}
		
		return parts;
	}
}
