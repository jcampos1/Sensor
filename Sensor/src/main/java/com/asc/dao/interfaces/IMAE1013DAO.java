package com.asc.dao.interfaces;

import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.process.entities.MAE1013;
import com.iss.enums.StatusOrpEnum;
import com.iss.enums.TipmEnum;

public interface IMAE1013DAO extends IGenericDao<MAE1013> {
	public GenericObject<MAE1013> findSubsetOrderByStatus(UTI1002 gp, StatusOrpEnum st);
	public Integer countOrderByStatus(StatusOrpEnum st);
	public MAE1013 findLastOrderByTipm(TipmEnum tipm);
}
