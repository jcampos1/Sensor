package com.asc.dao.interfaces;

import com.asc.commons.entities.UTI1002;
import com.asc.commons.entities.UTI1001;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.exceptions.MyWebException;
import com.iss.enums.MasterEnum;

public interface IMasterDAO extends IGenericDao<UTI1001> {
	UTI1002 getByAppConfigUserId(Long id, MasterEnum mstr) throws MyWebException;
	UTI1001 getByMasterUserId(Long id, MasterEnum mstr) throws MyWebException;
}
