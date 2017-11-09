package com.asc.commons.entities;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.GenericGenerator;

import com.asc.controller.abstracts.Configuration;
import com.asc.entities.abstracts.AbstractEntityID;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "uti1003")
public class UTI1003 extends AbstractEntityID implements Serializable, Comparable<UTI1003> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@NotNull
	@Column(name = "name", nullable = false, length = Configuration.SIZE_FIFTY_FOUR)
	private String name;

	@NotNull
	@Column(name = "typeSorting", nullable = false, length = Configuration.SIZE_FIFTY_FOUR)
	private String typeSorting;

	private UTI1002 grid;

	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@Column(name = "idor", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTypeSorting() {
		return typeSorting;
	}

	public void setTypeSorting(String typeSorting) {
		this.typeSorting = typeSorting;
	}

	@ManyToOne(cascade = CascadeType.ALL)
	@JsonBackReference
	public UTI1002 getGrid() {
		return grid;
	}

	public void setGrid(UTI1002 grid) {
		this.grid = grid;
	}

	@Override
	public String toString() {
		return "Orders [id=" + id + ", name=" + name + ", typeSorting=" + typeSorting + "]";
	}

	public int compareTo(UTI1003 arg0) {
		return 0;
	}

	public int hashCode() {
		return (int) (name.hashCode() + typeSorting.hashCode());
	}

	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}
		final UTI1003 other = (UTI1003) obj;
		if (this.name.equals(other.name) && this.typeSorting.equals(other.typeSorting)) {
			return true;
		}
		return false;
	}
}
