package com.asc.process.entities;

import java.util.ArrayList;
import java.util.List;

/**
 * DATOS PARA EL DOCUMENTO DE PESAJE
 */

public class UTI1009{


	private MAE1013 header;
	
	private List<MAE1014> lines = new ArrayList<MAE1014>(0);
	
	private List<UTI1010> conten = new ArrayList<UTI1010>(0);
	
	public UTI1009() {

	}

	public MAE1013 getHeader() {
		return header;
	}

	public void setHeader(MAE1013 header) {
		this.header = header;
	}

	public List<MAE1014> getLines() {
		return lines;
	}

	public void setLines(List<MAE1014> lines) {
		this.lines = lines;
	}

	public List<UTI1010> getConten() {
		return conten;
	}

	public void setConten(List<UTI1010> conten) {
		this.conten = conten;
	}
}