package com.asc.capture;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketAddress;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.asc.controller.WeighSimulatorController;
import com.asc.controller.abstracts.Configuration;

public class ClientSocket {

	static Logger log = LogManager.getLogger(ClientSocket.class);
	public static Double generateOutput(int port, String operation) {
		boolean isok = false;
		Double weigh = null;
		try {
			SocketAddress sockaddr = new InetSocketAddress(Configuration.LOCALHOST, port);
			Socket echoSocket = new Socket();
			echoSocket.connect(sockaddr, 1000);
			DataOutputStream writeServidor = new DataOutputStream(echoSocket.getOutputStream());
			DataInputStream readServidor = new DataInputStream(echoSocket.getInputStream());
			writeServidor.writeBytes(operation + '\n');
			writeServidor.flush();
			String mensajeServidor;
			BufferedReader entrada = new BufferedReader(new InputStreamReader(echoSocket.getInputStream()));
			while ((mensajeServidor = entrada.readLine()) != null && !isok) {
				if (!mensajeServidor.isEmpty()) {
					isok = true;
					weigh = Double.valueOf(mensajeServidor.split(Configuration.CHAR_SPLI)[0]);
				}
			}
			writeServidor.close();
			readServidor.close();
			echoSocket.close();
		} catch (Exception e) {
			log.error("Error al obtener peso. Método generateOutput (ClientSocket.java). Detalles: ", e);
		}
		return (weigh);
	}
}
