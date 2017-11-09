package com.asc.entities.abstracts;

import java.io.Serializable;


public abstract class AbstractEntity implements Serializable {

	/**
	 * 
	 */
	
	protected Boolean active;
	
	private static final long serialVersionUID = 1L;

	public void loadSomeValues() {

	}
	
	public interface FirstValidation {

	}
	
	public interface Insert {

	}
	
	public interface Update {

	}
}