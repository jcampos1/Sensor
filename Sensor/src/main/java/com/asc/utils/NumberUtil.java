package com.asc.utils;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class NumberUtil {
	
	//Obtiene la representaci�n de un double con un numero especifico de decimales
	public static Double fixedPrecision( Integer decimals, Double num, RoundingMode modeRedondeo ) {
		BigDecimal bd = new BigDecimal(num);
		bd = bd.setScale(decimals, modeRedondeo);
		return bd.doubleValue();
	}
}
