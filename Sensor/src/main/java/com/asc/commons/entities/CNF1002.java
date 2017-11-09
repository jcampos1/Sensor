package com.asc.commons.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import com.asc.controller.abstracts.Configuration;
import com.asc.entities.abstracts.AbstractEntityID;
import com.fasterxml.jackson.annotation.JsonBackReference;

/**
 * ROLES
 */

@Entity
@Table(name = "cnf1002")
public class CNF1002 extends AbstractEntityID {

	private static final long serialVersionUID = 1L;

	@NotNull
	@NotBlank
	@Length(min = Configuration.SIZE_MINIMUM, max = Configuration.SIZE_THIRTY)
	@Column(name = "role_name", nullable = false, length = Configuration.SIZE_THIRTY)
	private String role_name;

	private Set<MAE1001> users = new HashSet<MAE1001>(0);

	public CNF1002() {

	}

	@Id
	@GeneratedValue
	@Column(name = "idrl", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	public String getRole_name() {
		return role_name;
	}

	public void setRole_name(String role_name) {
		this.role_name = role_name;
	}
	
	public String toString() {
		return "Role [role_name=" + role_name + "]";
	}

	@ManyToMany(fetch = FetchType.EAGER, mappedBy = "roles")
	@JsonBackReference
	public Set<MAE1001> getUsers() {
		return users;
	}

	public void setUsers(Set<MAE1001> users) {
		this.users = users;
	}
}