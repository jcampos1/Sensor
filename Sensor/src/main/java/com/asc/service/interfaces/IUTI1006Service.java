package com.asc.service.interfaces;

import java.util.List;

import com.asc.commons.entities.IdsDelete;
import com.asc.commons.entities.UTI1002;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.UTI1006;
import com.asc.service.interfaces.generic.IGenericService;
import com.iss.enums.ReasonType;

public interface IUTI1006Service extends IGenericService<UTI1006> {
	public Boolean existCode(String code_m);
	public List<UTI1006> motiByType(ReasonType type_m);
	public void enabled(List<IdsDelete> lst, Boolean enabled) throws MyWebException;
	public GenericObject<UTI1006> findSubsetSimpleMoti(UTI1002 gp, ReasonType type_m);
}