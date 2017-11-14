package com.asc.service.interfaces;

import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.UTI1002;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.Typesensor;
import com.asc.process.entities.UTI1006;
import com.asc.service.interfaces.generic.IGenericService;

public interface ITypesensorService extends IGenericService<Typesensor> {
	public void inactivateWithMotivo(Typesensor typesensor, UTI1006 moti, MAE1001 userna) throws MyWebException;

	void myOwnerAdd(Typesensor typesensor) throws MyWebException;

	GenericObject<Typesensor> findSubsetSimpleTypesensor(UTI1002 gp);
}
