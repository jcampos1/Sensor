package com.asc.service.interfaces;

import com.asc.commons.entities.UTI1002;
import com.asc.commons.entities.UTI1001;
import com.asc.exceptions.MyWebException;
import com.asc.service.interfaces.generic.IGenericService;
import com.iss.enums.MasterEnum;

public interface IMasterService extends IGenericService<UTI1001> {
	UTI1002 getByAppConfigUserId(Long id, MasterEnum mstr) throws MyWebException;
	UTI1001 getByMasterUserId(Long id, MasterEnum mstr) throws MyWebException;
}
