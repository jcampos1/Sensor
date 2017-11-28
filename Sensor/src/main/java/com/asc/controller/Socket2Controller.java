package com.asc.controller;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
public class Socket2Controller {

	private List<SseEmitter> emitters = new CopyOnWriteArrayList<SseEmitter>();
	
	@RequestMapping("/dinamicreading")
    public SseEmitter dinamicreading() throws Exception {
		SseEmitter emitter = new SseEmitter();
		emitters.add(emitter);
		
		emitter.onCompletion(() -> emitters.remove(emitter));
		
		return emitter;
    }
	
	@RequestMapping(value= "/nuevo", method = RequestMethod.GET)
    public void nuevo() throws Exception {
		for(SseEmitter emiter: emitters){
			emiter.send(SseEmitter.event().name("spring").data("+CMT (6135789)"));
			emiter.complete();
		}
    }
} 