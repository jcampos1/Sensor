package com.asc.process.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import com.asc.controller.abstracts.Configuration;
import com.asc.entities.abstracts.AbstractEntityID;
import com.iss.enums.ReasonType;

/**
 * ENTIDAD RELACIONADA EN BAAN whint612
 * TABLA DE MOTIVOS
 */

@Entity
@DynamicInsert(true)
@DynamicUpdate(true)
@Table(name = "uti1006")
public class UTI1006 extends AbstractEntityID {

	private static final long serialVersionUID = 1L;

	private String code_m;
	private String dsca_m;
	private ReasonType type_m;

	public UTI1006() {

	}

	@Id
	@GeneratedValue
	@Column(name = "idmo", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	@NotNull
	@NotBlank
	@Length(min = Configuration.SIZE_MINIMUM, max = Configuration.SIZE_6)
	@Column(name = "code_m", nullable = false, length = Configuration.SIZE_6)
	public String getCode_m() {
		return code_m;
	}

	public void setCode_m(String code_m) {
		this.code_m = code_m;
	}

	@NotNull
	@NotBlank
	@Length(min = Configuration.SIZE_MINIMUM, max = Configuration.SIZE_THIRTY)
	@Column(name = "dsca_m", nullable = false, length = Configuration.SIZE_THIRTY)
	public String getDsca_m() {
		return dsca_m;
	}

	public void setDsca_m(String dsca_m) {
		this.dsca_m = dsca_m;
	}

	@NotNull
	@Enumerated(EnumType.ORDINAL)
	public ReasonType getType_m() {
		return type_m;
	}

	public void setType_m(ReasonType type_m) {
		this.type_m = type_m;
	}
	
	@Column(name = "active", nullable = true, columnDefinition = "boolean default true")
	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}
}