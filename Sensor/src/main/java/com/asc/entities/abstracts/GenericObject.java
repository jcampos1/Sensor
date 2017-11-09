package com.asc.entities.abstracts;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class GenericObject<T> implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private long totalActive;

	private List<T> listData;
	
	public GenericObject() {
		listData = new ArrayList<T>();
	}

	public GenericObject(long totalActive, List<T> listData) {
		this.listData = listData;
		this.totalActive = totalActive;
	}

	public List<T> getListData() {
		return listData;
	}

	public void setListData(List<T> aData) {
		this.listData = aData;
	}

	public long getTotalActive() {
		return totalActive;
	}

	public void setTotalActive(long totalActive) {
		this.totalActive = totalActive;
	}
}
