package com.asc.capture;

import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.asc.process.entities.Micro;
import com.asc.service.interfaces.IMicroService;

import gnu.io.CommPortIdentifier;
import gnu.io.SerialPort;

public class Reading extends Thread {
	static Logger log = LogManager.getLogger(Reading.class);

	private Micro params;
	private static Reading instance;
	private SerialPort serialport;
	
	@Autowired
	private IMicroService microServ;

	private Reading(Micro micro) {
		params = micro;
	}

	public static Reading getInstance(Micro micro) {
		if (instance == null) {
			instance = new Reading(micro);
		}
		return instance;
	}

	@Override
	public synchronized void run() {
		loadRxtx();
		CommPortIdentifier portId = null;
		// En caso de que haya una instancia utilizando el puerto, se cierra la conexion
		if (serialport != null) {
			try {
				closePort();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		try {
			portId = findPort();
			serialport = openPort(portId);
			if (null != serialport) {
				readPort();
				closePort();
				log.debug("Puerto cerrado. Método run (Reading.java).");
			}
		} catch (Exception e) {
			log.error("Error Run: " + e);
		}
	}

	// Carga de libreria para el manejo de puerto
	private void loadRxtx() {
		try {
			System.loadLibrary("rxtxSerial");
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
	private synchronized void closePort() throws IOException {
		try {
			serialport.close();
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

			in = serialport.getInputStream();

			while(true) {
				System.out.println("ST,GS,7800kg");
			}
			/*do {
				while ((data = in.read()) != '\n') {
					if (data == -1) {
						break;
					} else {
						buffer[len++] = (byte) data;
					}
				}
				chain = new String(buffer, 0, len);
				chain = chain.trim();
				System.out.println(chain);
			} while (true);*/
		} catch (Exception e) {
			log.error("Error en la lectura del puerto. Método readPort (Reading.java). Detalle: " + e);
		}
	}
}
