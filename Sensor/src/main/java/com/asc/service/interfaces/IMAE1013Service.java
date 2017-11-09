package com.asc.service.interfaces;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.UTI1002;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.MAE1013;
import com.asc.process.entities.UTI1006;
import com.asc.service.interfaces.generic.IGenericService;
import com.iss.enums.StatusOrpEnum;
import com.iss.enums.TipmEnum;

public interface IMAE1013Service extends IGenericService<MAE1013> {
	public void addOwner(MAE1013 entity, MAE1001 user) throws MyWebException;
	public void updtOwner(MAE1013 entity) throws MyWebException;
	public GenericObject<MAE1013> findSubsetOrderByStatus(UTI1002 gp, StatusOrpEnum st);
	public MAE1013 findLastOrderByTipm(TipmEnum tipm);
	public Integer countOrderByStatus(StatusOrpEnum st);
	public ResponseEntity<HttpStatus> assignSealsToOrder(String orno, String prec);
	public void inactivateWithMotivo(String orno, UTI1006 moti, MAE1001 userna) throws MyWebException;
	Boolean finishedLines(String orno) throws MyWebException;
	Boolean hasLines(String orno) throws MyWebException;
	Boolean AllDispatched(String orno) throws MyWebException;
	void closeOrder(String orno) throws MyWebException;
	void updateImpres(String nord) throws MyWebException;
	void suspOrRetu(String orno, UTI1006 moti, MAE1001 userna) throws MyWebException;
	void confirmPe(MAE1013 mae1013) throws MyWebException;
}