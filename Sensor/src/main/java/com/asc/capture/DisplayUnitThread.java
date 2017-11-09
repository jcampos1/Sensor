package com.asc.capture;

import java.io.IOException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.asc.controller.abstracts.Configuration;
import com.asc.process.entities.MAE1007;

public class DisplayUnitThread extends Configuration implements Runnable {

	static Logger log = LogManager.getLogger(DisplayUnitThread.class);

	private Process proc;
	private MAE1007 mae1007;

	public DisplayUnitThread(MAE1007 mae1007) {
		this.mae1007 = mae1007;
	}

	@Override
	public void run() {
		// TODO Auto-generated method stub
		execute();
	}

	private void execute() {
		try {
			String str = getParameterDisplay(mae1007);
			proc = Runtime.getRuntime().exec(str);
		} catch (IOException e) {
			log.error(
					"Error en la apertura de la aplicación WeighBridgeLite4Baan. Método execute (DisplayUnitThread.java). Detalles: ",
					e);
		}
	}

	public MAE1007 getMae1007() {
		return mae1007;
	}

	public void setMae1007(MAE1007 mae1007) {
		this.mae1007 = mae1007;
	}

	public Process getProc() {
		return proc;
	}

	public void setProc(Process proc) {
		this.proc = proc;
	}
}
