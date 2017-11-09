package com.asc.service.interfaces;

import java.util.List;

import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.UTI1002;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.MAE1014;
import com.asc.process.entities.MAE1014.PKMAE1014;
import com.asc.process.entities.UTI1006;
import com.asc.service.interfaces.generic.IGenericService;

public interface IMAE1014Service extends IGenericService<MAE1014> {
	MAE1014 myOwnerAdd(String orno, MAE1014 item) throws MyWebException;
	GenericObject<MAE1014> listSubsetSimple(UTI1002 gp,String str);
	MAE1014 myOwnerUpdate(MAE1014 item) throws MyWebException;
	MAE1014 confirmNoDesp(MAE1014 item, UTI1006 motivo, MAE1001 user) throws MyWebException;
	MAE1014 confirmDesp(MAE1014 item) throws MyWebException;
	void inactivateWithMotivo(PKMAE1014 pk, UTI1006 moti, MAE1001 userna) throws MyWebException;
	List<MAE1014> findByStatus(String orno, Boolean active);
	List<MAE1014> getLinesByStatus(String nord, Boolean active);
	List<MAE1014> getLinesByWeigh(String nord, Boolean active);
}