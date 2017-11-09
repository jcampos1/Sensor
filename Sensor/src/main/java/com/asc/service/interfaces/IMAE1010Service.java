package com.asc.service.interfaces;

import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.MAE1010;
import com.asc.service.interfaces.generic.IGenericService;
import com.iss.enums.TypeContentEnum;

public interface IMAE1010Service extends IGenericService<MAE1010> {
	public GenericObject<MAE1010> findSubsetSimple(TypeContentEnum type);
}