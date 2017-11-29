package com.asc.controller;

import gnu.io.SerialPort;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandler;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import com.asc.capture.Readport;
import com.asc.controller.abstracts.MyStompSessionHandler;
import com.asc.process.entities.Micro;
import com.asc.service.interfaces.IMicroService;
import com.asc.utils.JsonResponse;
import com.asc.validators.MicroValidator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.iss.enums.Parity;

//CONTROLADOR MICROCONTROLADOR

@RestController()
@RequestMapping("/Micro")
public class MicroController extends Base<Micro> {

	@Autowired
	private IMicroService microService;

	@Autowired
	private MicroValidator validator;
	
	@Autowired
	private Readport reading;
	
	private ObjectMapper mapper = new ObjectMapper();
	
	private SimpMessagingTemplate template;

	@Autowired
	public MicroController(IMicroService microService, SimpMessagingTemplate template) {
		super(microService);
		mapper.enable(SerializationFeature.INDENT_OUTPUT);
		this.template = template;
	}
	
	@RequestMapping(value = "/find", method = RequestMethod.GET)
	public ResponseEntity<Micro> find()
			throws Exception {
		return new ResponseEntity<Micro>(microService.list().get(0), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/check", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public JsonResponse check(@RequestBody Micro entity, BindingResult result) {
		validator.validate(entity, result);
		JsonResponse jr = converErrorsToJson(result);
		return jr;
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public ResponseEntity<Micro> edit(@RequestBody Micro entity, BindingResult result, ModelMap modelMap)
			throws Exception {
		if (entity.getId() == null || service.getById(entity.getId()) == null) {
			throw new Exception("microcontroller not found");
		}

		microService.merge(entity);
		return new ResponseEntity<Micro>(entity, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/runMicro", method = RequestMethod.POST)
	public ResponseEntity<Void> runMicro(@RequestBody Micro entity, BindingResult result, ModelMap modelMap)
			throws Exception {
		if (entity.getId() == null || service.getById(entity.getId()) == null) {
			throw new Exception("microcontroller not found");
		}
		
		if( reading.serialport instanceof SerialPort ){
			reading.closePort();
			reading.join();
			System.out.println(reading.isAlive());
		}
		
//		RestTemplate restTemplate = new RestTemplate();
//        URI uri = restTemplate.postForLocation(Configuration.REST_SERVICE_URI_TRY+"/tryReading/", "CMTXSPoouuhST,GS,8900KG", String.class);
        
		reading.initialize(entity);
		
		Thread thread = new Thread(reading);
		thread.start();
		
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/lstBaud", method = RequestMethod.POST)
	public ResponseEntity<List<Integer>> lstBaud()
			throws Exception {
		return new ResponseEntity<List<Integer>>(getListBaud(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/lstTolein", method = RequestMethod.POST)
	public ResponseEntity<List<Integer>> lstTolein()
			throws Exception {
		return new ResponseEntity<List<Integer>>(getListInteger(2, 70, 2), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/lstPrty", method = RequestMethod.POST)
	public ResponseEntity<String> lstPrty()
			throws Exception {
		return new ResponseEntity<String>(mapper.writeValueAsString(getListOptions(Parity.class)), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/lstBits_stop", method = RequestMethod.POST)
	public ResponseEntity<List<Integer>> lstBits_stop()
			throws Exception {
		return new ResponseEntity<List<Integer>>(getListInteger(1, 3, 1), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/lstBits_char", method = RequestMethod.POST)
	public ResponseEntity<List<Integer>> lstBits_char()
			throws Exception {
		return new ResponseEntity<List<Integer>>(getListInteger(5, 8, 1), HttpStatus.OK);
	}
}