package com.asc.serializers;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.sun.org.apache.xerces.internal.impl.xpath.regex.ParseException;

public class LocalDateTimeDeserializer extends StdDeserializer<LocalDateTime> {
	 
	private static final long serialVersionUID = 1L;
	
	private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
 
    public LocalDateTimeDeserializer() {
        this(null);
    }
 
    public LocalDateTimeDeserializer(Class<?> vc) {
        super(vc);
    }
 
    @Override
    public LocalDateTime deserialize(JsonParser jsonparser, DeserializationContext context)
      throws IOException, JsonProcessingException {
        String date = jsonparser.getText();
        try {
        	LocalDateTime dateTime = LocalDateTime.parse(date, formatter);
            return dateTime;
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
}
