package com.asc.process.entities;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Min;

import org.hibernate.annotations.Cascade;
import org.springframework.format.annotation.DateTimeFormat;

import com.asc.controller.abstracts.Configuration;
import com.asc.entities.abstracts.AbstractEntity;
import com.asc.serializers.LocalDateTimeDeserializer;
import com.asc.serializers.LocalDateTimeSerializer;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

//ENTIDAD: LINEA DE PESAJE

@Entity
@Table(name = "mae1015")
public class MAE1015 extends AbstractEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

    private MAE1014 line;
    private PKMAE1015 pk;
    private REL1002 evento;
    private Boolean confir;
    private Double pestar;
    private Double pesbru;
    private Double pesnet;
    private Boolean pesman;
    private LocalDateTime fechpe;
    private LocalDateTime feconf;
    private MAE1007 indica;
    private List<UTI1008> lstcon = new ArrayList<UTI1008>(0);
	
	@Embeddable
	public static class PKMAE1015 implements Serializable {

	    /**
		 * 
		 */
		private static final long serialVersionUID = 1L;
		
		private String orno;
		private Integer pono;
		private Integer secu;
		
		public PKMAE1015() {
		}
		
		@Override
		public boolean equals(Object obj) {
			if (this == obj){ 
				return true;
			}
			if (obj == null){
				return false;
			}
			if (getClass() != obj.getClass()){
				return false;
			}
			PKMAE1015 other = (PKMAE1015) obj;
			if(secu == other.getSecu() && orno.equals(other.getOrno()) && pono == other.getPono()) {
				return true;
			}else{
				return false; 
			}
		}
		
		@Override
		public int hashCode() {
	        return (int) orno.hashCode() + pono.hashCode() + secu;
	    }

		@Column(name = "secu")
		@Min(Configuration.SIZE_ONE)
		public Integer getSecu() {
			return secu;
		}

		public void setSecu(Integer secu) {
			this.secu = secu;
		}

		public String getOrno() {
			return orno;
		}

		public void setOrno(String orno) {
			this.orno = orno;
		}

		public Integer getPono() {
			return pono;
		}

		public void setPono(Integer pono) {
			this.pono = pono;
		}
	}
	
	public MAE1015() {
	}

	@ManyToOne
	@JsonBackReference
	@JoinColumns({
		  @JoinColumn(name = "orno", insertable = false, updatable = false),
		  @JoinColumn(name = "pono", insertable = false, updatable = false)
		})
	public MAE1014 getLine() {
		return line;
	}

	public void setLine(MAE1014 line) {
		this.line = line;
	}
	
	@Column(name = "active", nullable = true, columnDefinition = "boolean default true")
	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}
	
	@ManyToOne(cascade= CascadeType.ALL)
	public REL1002 getEvento() {
		return evento;
	}

	public void setEvento(REL1002 evento) {
		this.evento = evento;
	}

	@ManyToOne
	public MAE1007 getIndica() {
		return indica;
	}

	public void setIndica(MAE1007 indica) {
		this.indica = indica;
	}

	@Column(name = "confir", nullable = false, columnDefinition = "boolean default false")
	public Boolean getConfir() {
		return confir;
	}

	public void setConfir(Boolean confir) {
		this.confir = confir;
	}

	@Column(name = "pesman", nullable = false)
	public Boolean getPesman() {
		return pesman;
	}

	public void setPesman(Boolean pesman) {
		this.pesman = pesman;
	}

	@Min(0)
	@Column(name = "pestar", nullable = false)
	public Double getPestar() {
		return pestar;
	}

	public void setPestar(Double pestar) {
		this.pestar = pestar;
	}

	@Min(0)
	@Column(name = "pesbru", nullable = false)
	public Double getPesbru() {
		return pesbru;
	}

	public void setPesbru(Double pesbru) {
		this.pesbru = pesbru;
	}

	@Min(0)
	@Column(name = "pesnet", nullable = false)
	public Double getPesnet() {
		return pesnet;
	}

	public void setPesnet(Double pesnet) {
		this.pesnet = pesnet;
	}

	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	@Column(name = "fechpe", nullable = false)
	public LocalDateTime getFechpe() {
		return fechpe;
	}

	public void setFechpe(LocalDateTime fechpe) {
		this.fechpe = fechpe;
	}

	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	@Column(name = "feconf", nullable = false)
	public LocalDateTime getFeconf() {
		return feconf;
	}

	public void setFeconf(LocalDateTime feconf) {
		this.feconf = feconf;
	}

	@EmbeddedId
	public PKMAE1015 getPk() {
		return pk;
	}

	public void setPk(PKMAE1015 pk) {
		this.pk = pk;
	}

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "linepe")
	@JsonManagedReference
	public List<UTI1008> getLstcon() {
		return lstcon;
	}

	public void setLstcon(List<UTI1008> lstcon) {
		this.lstcon = lstcon;
	}
}