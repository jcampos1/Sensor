package com.asc.service.interfaces;

import com.asc.commons.entities.UTI1005;
import com.asc.exceptions.MyWebException;
import com.asc.service.interfaces.generic.IGenericService;

public interface ILogged_InService extends IGenericService<UTI1005> {

	void myOwnAdd(UTI1005 entity) throws MyWebException;

	void otherMetod(UTI1005 entity) throws MyWebException;

}
