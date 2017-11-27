package com.asc.capture;

import gnu.io.CommPortIdentifier;
import gnu.io.SerialPort;

import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.asc.process.entities.Micro;
import com.asc.service.interfaces.IMicroService;

@Component
public class Readport extends Thread {
	static Logger log = LogManager.getLogger(Readport.class);

	private Micro params;
	public static SerialPort serialport;
	private static Boolean follow;

	@Autowired
	private IMicroService microServ;

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

			in = serialport.getInputStream();

			do {
				while ((data = in.read()) != '\n') {
					if (data == -1) {
						break;
					} else {
						System.out.println("entro");
						buffer[len++] = (byte) data;
					}
				}
				chain = new String(buffer, 0, len);
				chain = chain.trim();
				len = 0;
				System.out.println(chain);
			} while (follow);
		} catch (Exception e) {
			log.error("Error en la lectura del puerto. Método readPort (Reading.java). Detalle: " + e);
		}
	}
}
