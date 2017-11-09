package com.asc.dao.interfaces;

import java.util.List;

import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.UTI1006;
import com.iss.enums.ReasonType;

public interface IUTI1006DAO extends IGenericDao<UTI1006> {

	Boolean existCode(String code_m);

	List<UTI1006> motiByType(ReasonType type_m);

	GenericObject<UTI1006> findSubsetSimpleMoti(UTI1002 gp, ReasonType type_m);
}
