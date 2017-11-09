package com.asc.commons.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.asc.entities.abstracts.AbstractEntityID;

@Entity
@DynamicInsert(true)
@DynamicUpdate(true)
@Table(name = "tasc_ulog")
public class UTI1005 extends AbstractEntityID {

	private static final long serialVersionUID = 1L;

	@Column(name = "user", nullable = false)
	private MAE1001 user;
	
	@Column(name = "logi_date", nullable = false)
	private LocalDateTime logi_date;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idlg", unique = true)
	public Long getId() {
		return this.id;
	}

	public LocalDateTime getLogi_date() {
		return logi_date;
	}

	public void setLogi_date(LocalDateTime logi_date) {
		this.logi_date = logi_date;
	}
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "idus")
	public MAE1001 getUser() {
		return user;
	}

	public void setUser(MAE1001 user) {
		this.user = user;
	}
}
