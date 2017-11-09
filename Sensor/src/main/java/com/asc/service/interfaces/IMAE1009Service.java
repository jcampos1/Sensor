package com.asc.service.interfaces;

import com.asc.commons.entities.UTI1002;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.MAE1009;
import com.asc.service.interfaces.generic.IGenericService;

public interface IMAE1009Service extends IGenericService<MAE1009> {
	public GenericObject<MAE1009> findSubsetSimple(UTI1002 gp);
}