package com.asc.process.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotBlank;

import com.asc.controller.abstracts.Configuration;
import com.asc.entities.abstracts.AbstractEntityID;
import com.iss.enums.Parity;

// ENTIDAD: MICROCONTROLADOR
@Entity
@Table(name = "micro")
public class Micro extends AbstractEntityID {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String port_name;
	private String port_dsca;
	private Integer baud;
	private Parity prty;
	private Integer bits_char;
	private Integer bits_stop;
	private Integer tout_read;

	public Micro() {
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idmi", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	@NotBlank
	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_TEN)
	@Column(name = "port_name", nullable = false, unique = true)
	public String getPort_name() {
		return port_name;
	}

	public void setPort_name(String port_name) {
		this.port_name = port_name;
	}

	@NotBlank
	@Size(min = Configuration.SIZE_ONE, max = Configuration.SIZE_DESC)
	@Column(name = "port_dsca", nullable = false)
	public String getPort_dsca() {
		return port_dsca;
	}

	public void setPort_dsca(String port_dsca) {
		this.port_dsca = port_dsca;
	}

	@Min(Configuration.SIZE_ONE)
	@Column(name = "tout_read")
	public Integer getTout_read() {
		return tout_read;
	}

	public void setTout_read(Integer tout_read) {
		this.tout_read = tout_read;
	}

	@Min(5)
	@Max(8)
	@Column(name = "bits_char")
	public Integer getBits_char() {
		return bits_char;
	}

	public void setBits_char(Integer bits_char) {
		this.bits_char = bits_char;
	}

	@Min(0)
	@Max(3)
	@Column(name = "bits_stop")
	public Integer getBits_stop() {
		return bits_stop;
	}

	public void setBits_stop(Integer bits_stop) {
		this.bits_stop = bits_stop;
	}

	@Min(Configuration.ZERO)
	@Max(Configuration.MAX_BAUD)
	@Column(name = "baud", nullable = false)
	public Integer getBaud() {
		return baud;
	}

	public void setBaud(Integer baud) {
		this.baud = baud;
	}

	@Enumerated(EnumType.ORDINAL)
	public Parity getPrty() {
		return prty;
	}

	public void setPrty(Parity prty) {
		this.prty = prty;
	}
	
	@Column(name = "active", nullable = true, columnDefinition = "boolean default true")
	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}
	
	@Override
	public String toString() {
		return "ComPort [idmi=" + id + ", port_name=" + port_name + ", port_dsca=" + port_dsca + "]";
	}
}
