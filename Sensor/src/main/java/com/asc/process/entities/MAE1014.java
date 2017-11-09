package com.asc.process.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.asc.controller.abstracts.Configuration;
import com.asc.entities.abstracts.AbstractEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

//ENTIDAD: LINEA DE PESAJE

@Entity
@Table(name = "mae1014")
//@Interceptors({MyInterceptor.class})
public class MAE1014 extends AbstractEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private MAE1009 item;
    private PKMAE1014 pk;
    private MAE1013 header;
	private Boolean despac;
	private REL1002 evento;
	//Cantidad pedida (En unidad de almacenamiento)
	private Double cant_p;
	//Cantidad pedida (En unidad de presentación)
	private Double cantpcu;
	//Cantidad despacha (En unidad de almacenamiento)
	private Double cant_d;
	//Cantidad despacha (En unidad de presentación)
	private Double cantdcu;
	
	private Double pestar;
    private Double pesbru;
    
	//Diferencia entre lo pedido y despachado (En unidad de almacenamiento)
	private Double difere;
	//Diferencia entre lo pedido y despachado (En unidad de presentación)
	private Double difecu;
	//Porcentaje de diferencia entre lo pedido y despachado (En unidad de almacenamiento)
	private Double percen;
	//Porcentaje de diferencia entre lo pedido y despachado (En unidad de presentación)
	private Double perccu;
	//Diferencia entre el peso bruto y teorico
	private Double dibrte;
	//Porcentaje que representa el peso bruto con respecto al peso teorico
	private Double pobrte;
	
	/*Unidades de presentación/almacenamiento del articulo*/
	private String arcuni;
	private String arstuw;
	private Double arpeso;
    
	private List<MAE1015> pesxli = new ArrayList<MAE1015>(0);
	
    @Embeddable
    public static class PKMAE1014 implements Serializable {

        /**
		 * 
		 */
		private static final long serialVersionUID = 1L;
		
	    private String orno;
		
		private Integer pono;
		
		public PKMAE1014() {
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
			PKMAE1014 other = (PKMAE1014) obj;
			if(pono == other.getPono() && orno == other.getOrno()) {
				return true;
			}else{
				return false; 
			}
		}
		
		@Override
		public int hashCode() {
	        return (int) orno.hashCode() + pono;
	    }
		
		@Column(name = "pono")
		@Min(Configuration.SIZE_ONE)
		public Integer getPono() {
			return pono;
		}

		public void setPono(Integer pono) {
			this.pono = pono;
		}

		@Column(name = "orno")
		public String getOrno() {
			return orno;
		}

		public void setOrno(String orno) {
			this.orno = orno;
		}
    }
	
	public MAE1014() {
	}
	
	@ManyToOne
    @JoinColumn(name = "orno", insertable = false, updatable = false)
	@JsonBackReference
	public MAE1013 getHeader() {
		return header;
	}

	public void setHeader(MAE1013 header) {
		this.header = header;
	}

	@NotNull
	@ManyToOne
	public MAE1009 getItem() {
		return item;
	}

	public void setItem(MAE1009 item) {
		this.item = item;
	}

	@Min(0)
	@Column(name = "cant_p", nullable = false)
	public Double getCant_p() {
		return cant_p;
	}

	public void setCant_p(Double cant_p) {
		this.cant_p = cant_p;
	}

	@Min(0)
	@Column(name = "cantpcu", nullable = false)
	public Double getCantpcu() {
		return cantpcu;
	}

	public void setCantpcu(Double cantpcu) {
		this.cantpcu = cantpcu;
	}

	@Min(0)
	@Column(name = "cant_d", nullable = false)
	public Double getCant_d() {
		return cant_d;
	}

	public void setCant_d(Double cant_d) {
		this.cant_d = cant_d;
	}
	
	@Min(0)
	@Column(name = "cantdcu", nullable = false)
	public Double getCantdcu() {
		return cantdcu;
	}

	public void setCantdcu(Double cantdcu) {
		this.cantdcu = cantdcu;
	}

	@Column(name = "percen", nullable = false)
	public Double getPercen() {
		return percen;
	}

	public void setPercen(Double percen) {
		this.percen = percen;
	}

	@Column(name = "difere", nullable = false)
	public Double getDifere() {
		return difere;
	}

	public void setDifere(Double difere) {
		this.difere = difere;
	}

	@Column(name = "difecu", nullable = false)
	public Double getDifecu() {
		return difecu;
	}

	public void setDifecu(Double difecu) {
		this.difecu = difecu;
	}

	@Column(name = "perccu", nullable = false)
	public Double getPerccu() {
		return perccu;
	}

	public void setPerccu(Double perccu) {
		this.perccu = perccu;
	}

	@Column(name = "dibrte", nullable = true)
	public Double getDibrte() {
		return dibrte;
	}

	public void setDibrte(Double dibrte) {
		this.dibrte = dibrte;
	}

	@Column(name = "pobrte", nullable = true)
	public Double getPobrte() {
		return pobrte;
	}

	public void setPobrte(Double pobrte) {
		this.pobrte = pobrte;
	}

	@Transient
	public Double getPestar() {
		return pestar;
	}

	public void setPestar(Double pestar) {
		this.pestar = pestar;
	}

	@Transient
	public Double getPesbru() {
		return pesbru;
	}

	public void setPesbru(Double pesbru) {
		this.pesbru = pesbru;
	}

	@Column(name = "despac", nullable = false, columnDefinition = "boolean default true")
	public Boolean getDespac() {
		return despac;
	}

	public void setDespac(Boolean despac) {
		this.despac = despac;
	}

	@ManyToOne(cascade= CascadeType.ALL)
	public REL1002 getEvento() {
		return evento;
	}

	public void setEvento(REL1002 evento) {
		this.evento = evento;
	}

	@EmbeddedId
	public PKMAE1014 getPk() {
		return pk;
	}

	public void setPk(PKMAE1014 pk) {
		this.pk = pk;
	}
	
	@Column(name = "active", nullable = true, columnDefinition = "boolean default true")
	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}
	
	@Column(name = "arcuni", nullable = false)
	public String getArcuni() {
		return arcuni;
	}

	public void setArcuni(String arcuni) {
		this.arcuni = arcuni;
	}

	@Column(name = "arstuw", nullable = false)
	public String getArstuw() {
		return arstuw;
	}

	public void setArstuw(String arstuw) {
		this.arstuw = arstuw;
	}

	@Min(0)
	@Column(name = "arpeso", nullable = false)
	public Double getArpeso() {
		return arpeso;
	}

	public void setArpeso(Double arpeso) {
		this.arpeso = arpeso;
	}

	@OneToMany(cascade= CascadeType.ALL, mappedBy = "line")
	@JsonManagedReference
	public List<MAE1015> getPesxli() {
		return pesxli;
	}

	public void setPesxli(List<MAE1015> pesxli) {
		this.pesxli = pesxli;
	}
}
