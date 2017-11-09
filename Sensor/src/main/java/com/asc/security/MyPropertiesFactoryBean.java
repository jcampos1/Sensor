package com.asc.security;

import java.io.IOException;
import java.util.Enumeration;
import java.util.Properties;

import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;

import com.asc.utils.Constants;
import com.iss.Convert;

public class MyPropertiesFactoryBean extends PropertyPlaceholderConfigurer {

	@Override
	protected void loadProperties(Properties props) throws IOException {
		super.loadProperties(props);
		findAndReplateEncrypData(props);
	}

	public MyPropertiesFactoryBean() {
		super();
	}

	public static void findAndReplateEncrypData(Properties props) {
		@SuppressWarnings("rawtypes")
		Enumeration propertyNames = props.propertyNames();
		while (propertyNames.hasMoreElements()) {
			String propertyName = (String) propertyNames.nextElement();
			String propertyValue = props.getProperty(propertyName);
			String convertedValue = "";
			if (propertyName.endsWith(Constants.ENCRYPTED_SUFIX)) {
				propertyName = propertyName.substring(0, propertyName.indexOf(Constants.ENCRYPTED_SUFIX));
				try {
					convertedValue = Convert.decrypt(propertyValue);
				} catch (Exception e) {
					convertedValue = propertyValue;
				}
				props.setProperty(propertyName, convertedValue);
			}
		}
	}
}