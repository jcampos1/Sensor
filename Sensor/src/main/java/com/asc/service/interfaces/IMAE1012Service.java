package com.asc.service.interfaces;

import com.asc.commons.entities.UTI1002;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.MAE1012;
import com.asc.service.interfaces.generic.IGenericService;

public interface IMAE1012Service extends IGenericService<MAE1012> {
	public GenericObject<MAE1012> findSubsetSimpleMotr(UTI1002 gp);
}