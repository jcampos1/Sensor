package com.asc.service.interfaces;

import com.asc.commons.entities.UTI1002;
import com.asc.service.interfaces.generic.IGenericService;

public interface IGridParametersService extends IGenericService<UTI1002> {
	UTI1002 getByUserId(Long id);
}
