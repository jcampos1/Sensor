package com.asc.controller.scheduled;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.asc.commons.entities.MAE1001;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.Reading;
import com.asc.process.entities.Station;
import com.asc.service.interfaces.IReadingService;
import com.asc.service.interfaces.IStationService;
import com.asc.service.interfaces.IUserService;
import com.asc.service.interfaces.generic.AbstractService;

@Component
@EnableScheduling
public class StationScheduled extends AbstractService {

	@Autowired
	private IStationService stationServ;

	@Autowired
	private IReadingService readingServ;
	
	@Autowired
	private IUserService userServ;

	static Logger log = LogManager.getLogger(StationScheduled.class.getName());

	@Transactional
	@Scheduled(cron = "${station.sch}")
	public void verifyStations() {
		try {
			Reading reading;
			Integer dif;
			List<MAE1001> admins;
			List<Station> stations = stationServ.findActive();

			for (Station station : stations) {
				reading = readingServ.findLastReadingOfStation(station.getNamest());
				if( reading instanceof Reading) {
					if( (dif = mindif(reading.getFeread())) > 2 ){
						if(station.getStatus()){
							station.setStatus(Boolean.FALSE);
							System.out.println("SE ENVIA CORREO");
							admins = userServ.findAdministrators();
							for (MAE1001 admin : admins) {
								stationOutService(admin, station.getNamest(), dif);
							}
						}
					}else{
						if( !station.getStatus()) {
							station.setStatus(Boolean.TRUE);
						}
					}
				}else{
					if(station.getStatus()) {
						station.setStatus(Boolean.FALSE);
						stationServ.update(station);
					}
				}
			}
		} catch (MyWebException e) {
			log.error(getMess("error.general"), e);
		}
	}

	// Diferencia entre la fecha actual y la fecha extraida de la lectura
	public static Integer mindif(LocalDateTime dt) {
		return (int) Duration.between(dt, LocalDateTime.now()).toMinutes();
	}
}