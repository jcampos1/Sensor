package com.asc.dao.interfaces;

import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.Typesensor;

public interface ITypesensorDao extends IGenericDao<Typesensor> {

	GenericObject<Typesensor> findSubsetSimpleTypesensor(UTI1002 gp);

}
