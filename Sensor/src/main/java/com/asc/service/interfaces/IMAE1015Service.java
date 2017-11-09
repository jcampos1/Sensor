package com.asc.service.interfaces;

import java.util.List;

import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.UTI1002;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.MAE1014.PKMAE1014;
import com.asc.process.entities.MAE1015;
import com.asc.process.entities.MAE1015.PKMAE1015;
import com.asc.process.entities.UTI1006;
import com.asc.service.interfaces.generic.IGenericService;

public interface IMAE1015Service extends IGenericService<MAE1015> {
	GenericObject<MAE1015> listSubsetSimple(UTI1002 gp, PKMAE1014 pk_line);

	void inactivateWithMotivo(PKMAE1015 pk, UTI1006 moti, MAE1001 userna) throws MyWebException;

	MAE1015 myOwnerAdd(MAE1015 pes) throws MyWebException;

	List<MAE1015> findByStatus(PKMAE1014 pk_line, Boolean active);
}