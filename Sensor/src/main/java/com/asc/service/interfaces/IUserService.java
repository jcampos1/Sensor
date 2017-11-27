package com.asc.service.interfaces;

import java.util.List;

import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.UTI1002;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.UTI1006;
import com.asc.service.interfaces.generic.IGenericService;

public interface IUserService extends IGenericService<MAE1001> {
	
	public List<MAE1001> listSubsetActive(int fromIndex, int toIndex);
	
	public long countRegsActive();
	
	MAE1001 findbyEmail(String mail) throws MyWebException;
	
	void addClient(MAE1001 entity) throws MyWebException;
	
	void updateClient(MAE1001 entity) throws MyWebException;
	
	void sendChangePass(MAE1001 entity) throws MyWebException;
	
	public List<MAE1001> getUsersPendings();
	
	List<MAE1001> getUsersActive();

	void inactivateWithMotivo(MAE1001 user, UTI1006 moti, MAE1001 userna)
			throws MyWebException;

	GenericObject<MAE1001> findSubsetSimpleMAE1001(UTI1002 gp);

	List<MAE1001> findAdministrators() throws MyWebException;
}