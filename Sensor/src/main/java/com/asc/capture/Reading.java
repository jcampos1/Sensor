package com.asc.capture;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ThreadLocalRandom;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandler;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import com.asc.process.entities.Micro;
import com.asc.service.interfaces.IMicroService;

import gnu.io.CommPortIdentifier;
import gnu.io.SerialPort;

@Component
public class Reading extends Thread {
	static Logger log = LogManager.getLogger(Reading.class);

	private Micro params;
	public static SerialPort serialport;
	private static Boolean follow;

	@Autowired
	private IMicroService microServ;

	public Reading() {
		loadRxtx();
	}

	static public class MyStompSessionHandler extends StompSessionHandlerAdapter {
		private String userId;

		public MyStompSessionHandler(String userId) {
			this.userId = userId;
		}

		private void showHeaders(StompHeaders headers) {
			for (Map.Entry<String, List<String>> e : headers.entrySet()) {
				System.err.print("  " + e.getKey() + ": ");
				boolean first = true;
				for (String v : e.getValue()) {
					if (!first)
						System.err.print(", ");
					System.err.print(v);
					first = false;
				}
				System.err.println();
			}
		}

		private void sendJsonMessage(StompSession session) {
			session.send("/app/chat/java", "Un mensaje cualquiera");
		}

		private void subscribeTopic(String topic, StompSession session) {
			session.subscribe(topic, new StompFrameHandler() {

				@Override
				public Type getPayloadType(StompHeaders headers) {
					return String.class;
				}

				@Override
				public void handleFrame(StompHeaders headers, Object payload) {
					System.err.println(payload.toString());
				}
			});
		}

		@Override
		public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
			System.err.println("Connected! Headers:");
			showHeaders(connectedHeaders);

			subscribeTopic("/topic/messages", session);
			sendJsonMessage(session);
		}
	}

	// Inicializa parametros del proceso de lectura
	public void initialize(Micro micro) {
		this.params = micro;
		follow = Boolean.TRUE;
	}

	@Override
	public synchronized void run() {
		CommPortIdentifier portId = null;

		String url = "ws://localhost:8080/Sensor/gs-guide-websocket";
		
		WebSocketClient simpleWebSocketClient =
			    new StandardWebSocketClient();
			List<Transport> transports = new ArrayList<>(1);
			transports.add(new WebSocketTransport(simpleWebSocketClient));

			SockJsClient sockJsClient = new SockJsClient(transports);
			WebSocketStompClient stompClient =
			    new WebSocketStompClient(sockJsClient);
			stompClient.setMessageConverter(new MappingJackson2MessageConverter());

			String userId = "spring-" +
			    ThreadLocalRandom.current().nextInt(1, 99);
			StompSessionHandler sessionHandler = new MyStompSessionHandler(userId);
			StompSession session;
			try {
				session = stompClient.connect(url, sessionHandler)
				    .get();
				
				BufferedReader in =
					    new BufferedReader(new InputStreamReader(System.in));
					for (;;) {
					    System.out.print(userId + " >> ");
					    System.out.flush();
					    String line;
						try {
							line = in.readLine();
							if ( line == null ) break;
						    if ( line.length() == 0 ) continue;
						    session.send("/app/chat/java", "ESTE ES MI MENSAJE");
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					    
					}
					
			} catch (InterruptedException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} catch (ExecutionException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			
			

		try {
			portId = findPort();
			serialport = openPort(portId);
			if (null != serialport) {
				readPort();
			}
		} catch (Exception e) {
			log.error("Error Run: " + e);
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
