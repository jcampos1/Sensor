package com.asc.process.entities;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import com.asc.controller.abstracts.Configuration;
import com.asc.entities.abstracts.AbstractEntityID;
import com.asc.serializers.LocalDateTimeDeserializer;
import com.asc.serializers.LocalDateTimeSerializer;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

//ENTIDAD: LECTURA DE DATOS

@Entity
@Table(name = "reading")
public class Reading extends AbstractEntityID implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String phone;
	private LocalDateTime fecemi;
	private Station station;
	private LocalDateTime feread;
	private Set<Medition> meditions = new HashSet<Medition>(0);
	
	public Reading() {
	}
	
	@Id
	@GeneratedValue
	@Column(name = "idre", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}
	
	@NotNull
	@Column(name = "phone", nullable = false, length = Configuration.SIZE_PHON)
	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	@Column(name = "fecemi", nullable = true)
	public LocalDateTime getFecemi() {
		return fecemi;
	}

	public void setFecemi(LocalDateTime fecemi) {
		this.fecemi = fecemi;
	}

	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	@Column(name = "feread", nullable = true)
	public LocalDateTime getFeread() {
		return feread;
	}

	public void setFeread(LocalDateTime feread) {
		this.feread = feread;
	}
	
	@NotNull
	@ManyToOne
	public Station getStation() {
		return station;
	}

	public void setStation(Station station) {
		this.station = station;
	}

	@OneToMany(mappedBy="reading",cascade= CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	public Set<Medition> getMeditions() {
		return meditions;
	}

	public void setMeditions(Set<Medition> meditions) {
		this.meditions = meditions;
	}
}
