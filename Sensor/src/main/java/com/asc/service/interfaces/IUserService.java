package com.asc.service.interfaces;

import java.util.List;

import com.asc.commons.entities.IdsDelete;
import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.UTI1002;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.service.interfaces.generic.IGenericService;

public interface IUserService extends IGenericService<MAE1001> {
	
	public List<MAE1001> listSubsetActive(int fromIndex, int toIndex);
	
	public void inactivateUser(List<IdsDelete> idUsers) throws MyWebException;
	
	public long countRegsActive();
	
	MAE1001 findbyEmail(String mail) throws MyWebException;
	
	void addClient(MAE1001 entity) throws MyWebException;
	
	void updateClient(MAE1001 entity) throws MyWebException;
	
	void sendChangePass(MAE1001 entity) throws MyWebException;
	
	public List<MAE1001> getUsersPendings();
	
	GenericObject<MAE1001> listSubsetUser(UTI1002 gp);

	List<MAE1001> getUsersActive();
}