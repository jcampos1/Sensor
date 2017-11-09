package com.asc.service.interfaces;

import com.asc.commons.entities.UTI1003;
import com.asc.exceptions.MyWebException;
import com.asc.service.interfaces.generic.IGenericService;

public interface IOrdersService extends IGenericService<UTI1003> {
	void removeByGrid(Long id) throws MyWebException;
}
