package com.asc.commons.entities;

import java.io.Serializable;

public class IdsDelete implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private Long id;
	
	public IdsDelete() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}
