package com.asc.serializers;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.asc.process.entities.Medition;
import com.asc.process.entities.Reading;


public class Regular {

	private static final String REGEX = ".*:(\"{1}\\d{10}\"{1}),\"{1}\"{1},(\"{1}\\d{2}/\\d{2}/\\d{2},\\d{2}:\\d{2}:\\d{2}-\\d{2}\"{1})(EST-\\d{1,3})-(.*)";
	private static final String DEFAULT_STRING = "+CMT:   \"6161135064\",\"\",\"17/11/24,21:29:10-20\"EST-1-TS-24.9-T1-24.1@";
	private static final String PATTERN_FECREAD = "yy/MM/dd,H:mm:ss-SS";
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

		Reading reading = new Reading();
		
		if( aceptable(DEFAULT_STRING, reading)){
			System.out.println(reading.getPhone());
			System.out.println(mindif(reading.getFecemi()));
		}
		
		//System.out.println("Minutos de diferencia: " + mindif("17/11/24,09:41:00-80"));
		//extractData(DEFAULT_STRING);
		
		
	}

	// Diferencia entre la fecha actual y la fecha extraida de la lectura
	public static Integer mindif(LocalDateTime dt) {
		
		return (int) Duration.between(dt, LocalDateTime.now()).toMinutes();
	}

	// Verifica si el string leido por el puerto es aceptable
	public static Boolean aceptable(String string, Reading reading) {
		String[] parts = null;
		Boolean acept = Boolean.FALSE;  
		Pattern pattern = Pattern.compile(REGEX);
		Matcher matcher = pattern.matcher(string.replaceAll("\\s|\\n|\\r|@", ""));
		
		if (matcher.matches()) {
			acept = Boolean.TRUE;
			//Se construye el objeto de lectura
			reading.setFecemi(LocalDateTime.parse(matcher.group(2).replaceAll("'|\"", ""), DateTimeFormatter.ofPattern(PATTERN_FECREAD)));
			reading.setFeread(LocalDateTime.now());
			reading.setPhone(matcher.group(1).replaceAll("'|\"", ""));
			
			parts = matcher.group(4).replaceAll("-", ",").replaceAll(",,", ",-").split(",");
			Medition medition;
			for (int i = 0; i < parts.length; i = i + 2) {
				medition = new Medition();
				medition.setValue(Double.valueOf(parts[i + 1]));
				reading.getMeditions().add(medition);
				System.out.println("Sensor: " + parts[i] + ", medicion: " + Double.valueOf(parts[i + 1]));
			}
		} else {
			System.out.println("Formato de cadena de lectura no coincide con expresión regular.");
		}
		
		return acept;
	}
}
