package com.asc.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Service;

import com.asc.exceptions.MaxAttempsException;

@Service("customauthenticationfailurehandler")
public class CustomAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

	public CustomAuthenticationFailureHandler() {
		super();
	}

	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		if (exception.getClass().isAssignableFrom(MaxAttempsException.class)) {
		}
		
		super.onAuthenticationFailure(request, response, exception);
	}
}
