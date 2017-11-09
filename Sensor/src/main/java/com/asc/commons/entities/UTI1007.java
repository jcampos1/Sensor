package com.asc.commons.entities;

/*REPRESENTACION DE NUMEROS CON PARTE DECIMAL PARA LA INTERNACIONALIZACION*/
public class UTI1007 {

	private Double num;
	private String numstr;
	private char sepade;
	private char sepagr;
	
	public UTI1007 ( ) {
	}
	
	public UTI1007 ( Double num, String numstr, char sepagr, char sepade ) {
		this.num = num;
		this.numstr = numstr;
		this.sepagr = sepagr;
		this.sepade = sepade;
	}
	
	public String getNumstr() {
		return numstr;
	}

	public void setNumstr(String numstr) {
		this.numstr = numstr;
	}

	public Double getNum() {
		return num;
	}

	public void setNum(Double num) {
		this.num = num;
	}

	public char getSepade() {
		return sepade;
	}

	public void setSepade(char sepade) {
		this.sepade = sepade;
	}

	public char getSepagr() {
		return sepagr;
	}

	public void setSepagr(char sepagr) {
		this.sepagr = sepagr;
	}
}
