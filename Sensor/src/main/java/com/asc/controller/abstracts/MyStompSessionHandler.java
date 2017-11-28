package com.asc.controller.abstracts;

import java.lang.reflect.Type;

import javax.mail.Message;

import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;

public class MyStompSessionHandler extends StompSessionHandlerAdapter {


    @Override
    public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
    	System.out.println("New session established : " + session.getSessionId());
        session.subscribe("/topic/tryReading", this);
        System.out.println("Subscribed to /topic/messages");
        session.send("/app/tryReading", "+CMT 6135789 17-03-25");
        System.out.println("Message sent to websocket server");
    }

    @Override
    public void handleException(StompSession session, StompCommand command, StompHeaders headers, byte[] payload, Throwable exception) {
    	System.out.println("Got an exception: "+exception);
    }

    @Override
    public Type getPayloadType(StompHeaders headers) {
        return Message.class;
    }

    @Override
    public void handleFrame(StompHeaders headers, Object payload) {
        System.out.println("Received : " + payload.toString());
    }
}
