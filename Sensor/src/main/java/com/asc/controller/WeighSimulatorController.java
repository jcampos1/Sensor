package com.asc.controller;

import java.text.DecimalFormatSymbols;
import java.text.NumberFormat;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.asc.capture.ClientSocket;
import com.asc.capture.DisplayUnitThread;
import com.asc.commons.entities.UTI1007;
import com.asc.controller.abstracts.Configuration;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.MAE1007;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController()
@RequestMapping("/indicator")
public class WeighSimulatorController {

	static Logger log = LogManager.getLogger(WeighSimulatorController.class);
	
	private static final ObjectMapper JSON_MAPPER = new ObjectMapper();
	private DisplayUnitThread du;
	
	@RequestMapping(value = { "/" }, method = RequestMethod.POST)
	public void initDisplay(@RequestBody MAE1007 entity) throws MyWebException {
		
		du = new DisplayUnitThread(entity);
		du.run();
	}
	
	@RequestMapping(value = { "/captureWeight" }, method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> captureWeight(@RequestParam ( "port" ) int port, @RequestParam ( "operation" ) String operation) throws MyWebException, JsonProcessingException {
		NumberFormat numberFormatter;
		Double weight = ClientSocket.generateOutput(port, operation);
		numberFormatter = NumberFormat.getNumberInstance(LocaleContextHolder.getLocale());
		String amountOut = numberFormatter.format(weight);
		
		DecimalFormatSymbols symbols = new DecimalFormatSymbols(LocaleContextHolder.getLocale());
		UTI1007 number = new UTI1007(weight, amountOut, symbols.getGroupingSeparator(), symbols.getDecimalSeparator());
		
		return new ResponseEntity<String>(JSON_MAPPER.writeValueAsString(number), HttpStatus.OK);
	}
	
	@RequestMapping(value = { "/getSeparator" }, method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getSeparator() throws MyWebException, JsonProcessingException {
		DecimalFormatSymbols symbols = new DecimalFormatSymbols(LocaleContextHolder.getLocale());
		UTI1007 number = new UTI1007(null, null, symbols.getGroupingSeparator(), symbols.getDecimalSeparator());
		
		return new ResponseEntity<String>(JSON_MAPPER.writeValueAsString(number), HttpStatus.OK);
	}
	
	@RequestMapping(value = { "/closeApp" }, method = RequestMethod.POST)
	public void closeApp(@RequestBody int port) throws MyWebException {
		ClientSocket.generateOutput( port, Configuration.CLOSE_APP );
	}
}
