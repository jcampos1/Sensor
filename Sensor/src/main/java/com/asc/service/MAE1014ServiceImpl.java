package com.asc.service;

import java.time.LocalDateTime;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.UTI1002;
import com.asc.dao.interfaces.IMAE1014DAO;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.MAE1013;
import com.asc.process.entities.MAE1014;
import com.asc.process.entities.MAE1014.PKMAE1014;
import com.asc.process.entities.REL1002;
import com.asc.process.entities.UTI1006;
import com.asc.service.interfaces.IMAE1013Service;
import com.asc.service.interfaces.IMAE1014Service;
import com.asc.service.interfaces.generic.AbstractGenericService;
import com.iss.enums.StatusOrpEnum;

@Service
public class MAE1014ServiceImpl extends AbstractGenericService<MAE1014> implements IMAE1014Service {

	private IMAE1014DAO myDao;

	@Autowired
	private IMAE1013Service headerServ;

	static Logger log = LogManager.getLogger(MAE1014ServiceImpl.class.getName());
	
	public MAE1014ServiceImpl() {

	}

	@Autowired
	public MAE1014ServiceImpl(IGenericDao<MAE1014> genericDao) {
		super(genericDao);
		this.myDao = (IMAE1014DAO) genericDao;
	}

	@Transactional
	@Override
	public MAE1014 myOwnerAdd(String orno, MAE1014 item) throws MyWebException {
		Integer max = 0;
		MAE1013 entity = headerServ.getById(orno);
		List<MAE1014> lst = entity.getLines();
		if (!lst.isEmpty()) {
			max = entity.getLines().stream().mapToInt(t -> t.getPk().getPono()).max().getAsInt();
		}
		PKMAE1014 pk = new PKMAE1014();
		pk.setOrno(entity.getOrno());
		pk.setPono(max + 1);
		item.setPk(pk);
		
		if( item.getItem().getIscont() ) {
			item.setCantpcu(item.getCant_p() * item.getItem().getPeso());
		}else{
			item.setCantpcu(item.getCant_p());
		}

		item.setArcuni(item.getItem().getCuni());
		item.setArstuw(item.getItem().getStuw());
		item.setArpeso(item.getItem().getPeso());
		item.setActive(true);
		item.setDespac(true);
		item.setCant_d(0.0);
		item.setCantdcu(0.0);
		item.setDifere(-item.getCant_p());
		item.setDifecu(-item.getCant_p()*item.getItem().getPeso());
		item.setPercen(100.0);
		myDao.create(item);

		if (entity.getStat().equals(StatusOrpEnum.CREA)) {
			entity.setStat(StatusOrpEnum.PROC);
			headerServ.update(entity);
		}

		return item;
	}

	// Eliminar linea de orden de pesaje
	@Transactional
	public void inactivateWithMotivo(PKMAE1014 pk, UTI1006 moti, MAE1001 userna) throws MyWebException {
		try {
			REL1002 rel1002 = new REL1002();
			
			MAE1014 mae1014 = myDao.find(pk);
			
			mae1014.setActive(false);
			rel1002.setFecha_(LocalDateTime.now());
			rel1002.setMotivo(moti);
			rel1002.setUserna(userna);
			mae1014.setEvento(rel1002);

			myDao.update(mae1014);
		} catch (Exception e) {
			log.error("Error en método inactivateWithMotivo (MAE1014ServiceImpl.java). Detalles: ", e);
		}
	}

	@Transactional
	@Override
	public MAE1014 myOwnerUpdate(MAE1014 item) throws MyWebException {
		item.setArcuni(item.getItem().getCuni());
		item.setArstuw(item.getItem().getStuw());
		item.setArpeso(item.getItem().getPeso());
		item.setDifere(-item.getCant_p());
		item.setDifecu(-item.getCant_p()*item.getItem().getPeso());
		
		if( item.getItem().getIscont() ) {
			item.setCantdcu(item.getCant_p() * item.getItem().getPeso());
		}
		
		myDao.merge(item);
		return item;
	}

	@Transactional
	@Override
	public MAE1014 confirmNoDesp(MAE1014 item, UTI1006 motivo, MAE1001 user) throws MyWebException {
		item.setDespac(false);
		REL1002 evnt = new REL1002();
		evnt.setFecha_(LocalDateTime.now());
		evnt.setMotivo(motivo);
		evnt.setUserna(user);
		item.setEvento(evnt);
		myDao.merge(item);
		return item;
	}

	@Transactional
	@Override
	public MAE1014 confirmDesp(MAE1014 item) throws MyWebException {
		item.setDespac(true);
		myDao.merge(item);
		return item;
	}

	@Transactional(readOnly = true)
	@Override
	public GenericObject<MAE1014> listSubsetSimple(UTI1002 gp, String str) {
		return myDao.findSubsetSimple(gp, str);
	}
	
	@Transactional(readOnly = true)
	@Override
	public List<MAE1014> getLinesByStatus(String nord, Boolean active) {
		return myDao.getLinesByStatus(nord, active);
	}
	
	@Transactional(readOnly = true)
	@Override
	public List<MAE1014> getLinesByWeigh(String nord, Boolean active) {
		return myDao.getLinesByWeigh(nord, active);
	}
	
	@Transactional(readOnly = true)
	@Override
	public List<MAE1014> findByStatus(String orno, Boolean active) {
		return myDao.findByStatus(orno, active);
	}
}
