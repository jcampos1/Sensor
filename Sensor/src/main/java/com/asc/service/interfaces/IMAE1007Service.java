package com.asc.service.interfaces;

import java.util.List;

import com.asc.exceptions.MyWebException;
import com.asc.process.entities.MAE1007;
import com.asc.service.interfaces.generic.IGenericService;

//INTERFAZ: UNIDAD DE DISPLAY
public interface IMAE1007Service extends IGenericService<MAE1007> {
	void myOwnAdd(MAE1007 entity) throws MyWebException;
	MAE1007 findDisplayByDefault(Boolean defaul);
	List<MAE1007> findDisplayByUsed(Boolean isused);
}
