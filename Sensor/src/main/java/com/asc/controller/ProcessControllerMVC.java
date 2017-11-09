package com.asc.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.asc.controller.abstracts.Configuration;
import com.asc.exceptions.MyWebException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

@Controller
public class ProcessControllerMVC extends Configuration {

	static Logger log = LogManager.getLogger(ProcessControllerMVC.class.getName());
	
	@RequestMapping(value = { "/" }, method = RequestMethod.GET)
	public ModelAndView welcomePage(@RequestParam(value="mstr",required=false) String var1) throws MyWebException, JsonProcessingException {
		ModelAndView model = new ModelAndView();
		ObjectMapper mapper = new ObjectMapper();
		//Set pretty printing of json
		mapper.enable(SerializationFeature.INDENT_OUTPUT);
		
		model.setViewName("dashboard/index");
		model.addObject("page_title", getMess("page.weighing"));
		model.addObject("currentUser", mapper.writeValueAsString(getClassCurrentUserByLogin()));
		model.addObject("separator", mapper.writeValueAsString(Configuration.getSeparators()));
		
		return model;
	}
}
