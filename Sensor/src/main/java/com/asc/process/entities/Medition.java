package com.asc.process.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.asc.entities.abstracts.AbstractEntityID;

//ENTIDAD: MEDICION ( TS1 24.5)

@Entity
@Table(name = "medition")
public class Medition extends AbstractEntityID implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Sensor sensor;
	private Double value;
	private Reading reading;
		
	public Medition() {
		
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idme", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	@NotNull
	@ManyToOne
	public Sensor getSensor() {
		return sensor;
	}

	public void setSensor(Sensor sensor) {
		this.sensor = sensor;
	}

	@Min(0)
	@Column(name = "value", nullable = false)
	public Double getValue() {
		return value;
	}

	public void setValue(Double value) {
		this.value = value;
	}

	@ManyToOne
	@JoinColumn(name="idre")
	public Reading getReading() {
		return reading;
	}

	public void setReading(Reading reading) {
		this.reading = reading;
	}
	
	@Override
    public boolean equals(Object o) {
        if ( this == o ) {
            return true;
        }
        if ( o == null || getClass() != o.getClass() ) {
            return false;
        }
        Medition medition = (Medition) o;
        return Objects.equals( sensor.getId(), medition.getSensor().getId() );
    }

    @Override
    public int hashCode() {
        return Objects.hash( getId() );
    }
    
}
