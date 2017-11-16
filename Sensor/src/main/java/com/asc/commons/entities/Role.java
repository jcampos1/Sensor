package com.asc.commons.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import com.asc.controller.abstracts.Configuration;
import com.asc.entities.abstracts.AbstractEntityID;
import com.asc.process.entities.REL1002;
import com.asc.process.entities.Station;
import com.fasterxml.jackson.annotation.JsonBackReference;

/**
 * ROLES
 */

@Entity
@Table(name = "role")
public class Role extends AbstractEntityID {

	private static final long serialVersionUID = 1L;

	
	private String name;
	private REL1002 evento;
	private Set<MAE1001> users = new HashSet<MAE1001>(0);
	private Set<Station> stations = new HashSet<Station>();

	public Role() {

	}

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "idrl", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	@NotNull
	@NotBlank
	@Length(min = Configuration.SIZE_MINIMUM, max = Configuration.SIZE_50)
	@Column(name = "name", nullable = false, length = Configuration.SIZE_50)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	@ManyToOne(cascade= CascadeType.ALL)
	public REL1002 getEvento() {
		return evento;
	}

	public void setEvento(REL1002 evento) {
		this.evento = evento;
	}
	
	@Column(name = "active", nullable = true, columnDefinition = "boolean default true")
	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}
	
	@ManyToMany(fetch = FetchType.EAGER, mappedBy = "roles")
	@JsonBackReference
	public Set<MAE1001> getUsers() {
		return users;
	}

	public void setUsers(Set<MAE1001> users) {
		this.users = users;
	}

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name="role_station", joinColumns={@JoinColumn(name="idrl")}, inverseJoinColumns={@JoinColumn(name="idst")})
	public Set<Station> getStations() {
		return stations;
	}

	public void setStations(Set<Station> stations) {
		this.stations = stations;
	}

	public String toString() {
		return "Role [name=" + name + "]";
	}
}