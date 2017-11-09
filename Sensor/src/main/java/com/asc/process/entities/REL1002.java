package com.asc.process.entities;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import com.asc.commons.entities.MAE1001;
import com.asc.entities.abstracts.AbstractEntityID;
import com.asc.serializers.LocalDateTimeDeserializer;
import com.asc.serializers.LocalDateTimeSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

//ENTIDAD: EVENTO (ANULAR PEDIDO, ANULAR PESO, ELIMINAR, Y MAS)

@Entity
@Table(name = "rel1002")
public class REL1002 extends AbstractEntityID implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private MAE1001 userna;
	private UTI1006 motivo;
	private LocalDateTime fecha_;

	public REL1002() {
		
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idmo", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	@NotNull
	@ManyToOne
	public MAE1001 getUserna() {
		return userna;
	}

	public void setUserna(MAE1001 userna) {
		this.userna = userna;
	}

	@NotNull
	@ManyToOne
	public UTI1006 getMotivo() {
		return motivo;
	}

	public void setMotivo(UTI1006 motivo) {
		this.motivo = motivo;
	}

	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	@Column(name = "fecha_", nullable = false)
	public LocalDateTime getFecha_() {
		return fecha_;
	}

	public void setFecha_(LocalDateTime fecha_) {
		this.fecha_ = fecha_;
	}
}

