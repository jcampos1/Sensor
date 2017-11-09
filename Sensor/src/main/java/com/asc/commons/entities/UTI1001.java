package com.asc.commons.entities;


import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.asc.entities.abstracts.AbstractEntityID;
import com.iss.enums.MasterEnum;

@Entity
@DynamicInsert(true)
@DynamicUpdate(true)
@Table(name = "uti1001")
public class UTI1001 extends AbstractEntityID {
	
	private static final long serialVersionUID = 1L;
	
	@NotNull
	@Enumerated(EnumType.ORDINAL)
	private MasterEnum mstr;
	
	UTI1002 grid;
	
	MAE1001 user;
	
	public UTI1001() {

	}
	
	@Id
	@GeneratedValue
	@Column(name = "idap", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	@OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "grid_id")
	public UTI1002 getGrid() {
		return grid;
	}

	public void setGrid(UTI1002 grid) {
		this.grid = grid;
	}

	@NotNull
	@ManyToOne(cascade= {CascadeType.REFRESH, CascadeType.PERSIST})
	public MAE1001 getUser() {
		return user;
	}

	public void setUser(MAE1001 user) {
		this.user = user;
	}

	public MasterEnum getMstr() {
		return mstr;
	}

	public void setMstr(MasterEnum mstr) {
		this.mstr = mstr;
	}
}
