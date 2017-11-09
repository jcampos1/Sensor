package com.asc.commons.entities;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import com.asc.entities.abstracts.AbstractEntityID;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "uti1002")
public class UTI1002 extends AbstractEntityID implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@NotNull
	@Column(name="page")
	private int page;
	
	@NotNull
	@Column(name="pageSize")
	private int pageSize;
	
	private String text_find;
	
	private Set<UTI1003> orders = new HashSet<UTI1003>();
	
	private Set<String> search_fields = new HashSet<String>();
	
	@Id
	@GeneratedValue
	@Column(name = "idgp", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}
	
	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	@Transient
	public String getText_find() {
		return text_find;
	}

	public void setText_find(String text_find) {
		this.text_find = text_find;
	}
	
	@OneToMany(fetch=FetchType.EAGER, cascade= CascadeType.ALL)
	@JoinColumn(name="grid")
	@JsonManagedReference
	public Set<UTI1003> getOrders() {
		return orders;
	}

	public void setOrders(Set<UTI1003> orders) {
		this.orders = orders;
	}

	@Transient
	public Set<String> getSearch_fields() {
		return search_fields;
	}

	public void setSearch_fields(Set<String> search_fields) {
		this.search_fields = search_fields;
	}
}
