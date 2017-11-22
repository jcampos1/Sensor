package com.asc.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class SocketController {

	@MessageMapping("/tryReading")
    @SendTo("/topic/tryReading")
    public String tryReading(String data) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new String(data);
    }
} 