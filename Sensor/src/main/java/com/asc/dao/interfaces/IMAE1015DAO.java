package com.asc.dao.interfaces;

import java.util.List;

import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.MAE1014.PKMAE1014;
import com.asc.process.entities.MAE1015;

public interface IMAE1015DAO extends IGenericDao<MAE1015> {

	GenericObject<MAE1015> findSubsetSimple(UTI1002 gp, PKMAE1014 pk_line);

	List<MAE1015> findByStatus(PKMAE1014 pk_line, Boolean active);
}
