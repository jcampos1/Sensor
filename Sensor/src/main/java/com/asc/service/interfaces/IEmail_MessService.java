package com.asc.service.interfaces;

import java.util.List;

import com.asc.commons.entities.UTI1004;
import com.asc.exceptions.MyWebException;
import com.asc.service.interfaces.generic.IGenericService;


public interface IEmail_MessService extends IGenericService<UTI1004> {

	List<UTI1004> findPending();

	void processEmails(List<UTI1004> emails) throws MyWebException;
}
