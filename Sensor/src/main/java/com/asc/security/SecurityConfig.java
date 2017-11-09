package com.asc.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import com.asc.controller.LoginControllerMVC;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	AuthenticationProvider customauthentication;

	@Autowired
	AuthenticationFailureHandler customauthenticationfailurehandler;

	@Autowired
	public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(customauthentication);
	}

	protected void configure(HttpSecurity http) throws Exception {
		// TODO luego quitar testN400 y "addAddress"
		http.authorizeRequests()
				.antMatchers("/signedUp", "C:/Sensor/data/**", "/user/checkUser", "/user/create",
						"/index", "/language/**", "/resources/**", "/WEB-INF/views/**",
						"/entity", "/page1/**", "/entity/**", "/" + LoginControllerMVC.FORGOT, "/" + LoginControllerMVC.CHANGE_PWD )
				.permitAll()
				.antMatchers("/MAE1008/create","/MAE1008/update", "/MAE1008/checkMAE1008").access("hasRole('ROLE_ADMIN')").anyRequest().fullyAuthenticated().and()
				.formLogin().loginPage(LoginControllerMVC.LOGIN).failureUrl(LoginControllerMVC.LOGIN + "?error")
				.usernameParameter("login").passwordParameter("passwd").permitAll().and().csrf().disable();
	}
}