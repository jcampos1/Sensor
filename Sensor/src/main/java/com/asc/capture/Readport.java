package com.asc.capture;

import gnu.io.CommPortIdentifier;
import gnu.io.SerialPort;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Enumeration;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.asc.controller.abstracts.Configuration;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.Medition;
import com.asc.process.entities.Micro;
import com.asc.process.entities.Reading;
import com.asc.process.entities.Sensor;
import com.asc.process.entities.Station;
import com.asc.service.interfaces.IMicroService;
import com.asc.service.interfaces.IReadingService;
import com.asc.service.interfaces.ISensorService;
import com.asc.service.interfaces.IStationService;

@Component
public class Readport extends Thread {
	static Logger log = LogManager.getLogger(Readport.class);

	private Micro params;
	public static SerialPort serialport;
	private static Boolean follow;

	@Autowired
	private IMicroService microServ;
	
	@Autowired
	public IStationService stationServ;
	
	@Autowired
	public ISensorService sensorServ;
	
	@Autowired
	public IReadingService readingServ;
	
	private List<SseEmitter> emitters = new CopyOnWriteArrayList<SseEmitter>();

	public Readport() {
		loadRxtx();
	}

	// Inicializa parametros del proceso de lectura
	public void initialize(Micro micro) {
		this.params = micro;
		follow = Boolean.TRUE;
	}

	@Override
	public synchronized void run() {
		CommPortIdentifier portId = null;

		try {
			portId = findPort();
			serialport = openPort(portId);
			if (null != serialport) {
				readPort();
			}
		} catch (Exception e) {
			log.error("Error en mètodo run (Readport.java). Detalles: " + e);
		}
	}

	// Carga de libreria para el manejo de puerto
	private void loadRxtx() {
		try {
			if (ClassLoader.getSystemResource("rxtxSerial") == null) {
				System.loadLibrary("rxtxSerial");
			}
		} catch (UnsatisfiedLinkError u) {
			log.error("No se pudo cargar la libreria RXTX. Error en método loadRxtx (Reading.java). Detalle: " + u);
		}
	}

	// Localizacion del puerto
	@SuppressWarnings("rawtypes")
	private synchronized CommPortIdentifier findPort() {
		boolean find = false;
		Enumeration ports;
		ports = CommPortIdentifier.getPortIdentifiers();
		CommPortIdentifier portId = null;
		while (ports.hasMoreElements() && find == false) {
			portId = (CommPortIdentifier) ports.nextElement();

			if (portId.getName().equalsIgnoreCase(params.getPort_name())) {
				find = true;
				System.out.println("isCurrentlyOwned: " + portId.isCurrentlyOwned());
				System.out.println("Propietario: " + portId.getCurrentOwner());
			}
		}
		return portId;
	}

	// Apertura del puerto serial
	private synchronized SerialPort openPort(CommPortIdentifier portId) {
		serialport = null;
		try {
			serialport = (SerialPort) portId.open(params.getPort_name(), params.getTout_read());
			serialport.setSerialPortParams(params.getBaud(), params.getBits_char(), params.getBits_stop(),
					params.getPrty().ordinal());
		} catch (Exception e) {
			log.error("Error al abrir puerto serial. Método openPort (Reading.java). Detalle: " + e);
		}
		return serialport;
	}

	// Cierre del puerto serial
	public synchronized static void closePort() throws IOException {
		try {
			follow = Boolean.FALSE;
			serialport.close();
			serialport = null;
			Thread.sleep(1000);
			log.debug("Puerto cerrado. Método run (Reading.java).");
		} catch (Exception e) {
			log.error("Error al cerrar puerto serial. Método closePort (Reading.java). Detalle: " + e);
		}
	}

	// Proceso de lectura del puerto
	private void readPort() {
		try {
			InputStream in = null;
			String chain = "";
			int len = 0, data;
			byte[] buffer = new byte[1024];
			Reading reading;

			in = serialport.getInputStream();
			
			StompSession session = Configuration.prepareSend();
			do {
				while ((data = in.read()) != '@') {
					if (data == -1) {
						break;
					} else {
						System.out.println("entro");
						buffer[len++] = (byte) data;
					}
				}
				chain = new String(buffer, 0, len);
				chain = chain.trim();
				reading = new Reading();
				if( aceptable(chain, reading)) {
					readingServ.add(reading);
					session.send("/topic/tryReading", chain);
					if( !reading.getStation().getStatus()) {
						reading.getStation().setStatus(Boolean.TRUE);
						stationServ.merge(reading.getStation());
					}
				}
				len = 0;
				System.out.println(chain);
			} while (follow);
		} catch (Exception e) {
			log.error("Error en la lectura del puerto. Método readPort (Reading.java). Detalle: " + e);
		}
	}

	// Verifica si el string leido por el puerto es aceptable
	public Boolean aceptable(String string, Reading reading) throws MyWebException {
		String[] parts = null;
		List<Sensor> sensorOfSt;
		Medition medition;
		Optional<Sensor> opSensor;
		Boolean acept = Boolean.FALSE;
		Pattern pattern = Pattern.compile(Configuration.REGEX);
		Matcher matcher = pattern.matcher(string.replaceAll("\\s|\\n|\\r|@", ""));

		if (matcher.matches()) {
			reading.setStation(stationServ.getById(matcher.group(Configuration.STATION)));
			if (reading.getStation() instanceof Station) {
				acept = Boolean.TRUE;
				// Se construye el objeto de lectura
				reading.setFecemi(LocalDateTime.parse(matcher.group(Configuration.FEC).replaceAll("'|\"", ""),
						DateTimeFormatter.ofPattern(Configuration.PATTERN_FECREAD)));
				reading.setFeread(LocalDateTime.now());
				reading.setPhone(matcher.group(Configuration.TLF).replaceAll("'|\"", ""));

				parts = matcher.group(Configuration.MEDITIONS).replaceAll("-", ",").replaceAll(",,", ",-").split(",");

				sensorOfSt = sensorServ.getByStation(reading.getStation().getNamest());
				for (int i = 0; i < parts.length; i = i + 2) {
					String nomenclature = parts[i];
					opSensor = sensorOfSt.stream().filter(s -> s.getNomenc().equals(nomenclature)).findFirst();

					if (opSensor.isPresent()) {
						medition = new Medition();
						medition.setReading(reading);
						medition.setSensor(opSensor.get());
						medition.setValue(Double.valueOf(parts[i + 1]));
						reading.getMeditions().add(medition);
					}
					System.out.println("Sensor: " + parts[i] + ", medicion: " + Double.valueOf(parts[i + 1]));
				}
			}
		} else {
			System.out.println("Formato de cadena de lectura no coincide con expresión regular.");
		}

		return acept;
	}
}