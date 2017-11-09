package com.asc.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Formatter;
import java.util.Iterator;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.UTI1002;
import com.asc.controller.abstracts.Configuration;
import com.asc.dao.interfaces.IMAE1013DAO;
import com.asc.dao.interfaces.IPAR1001DAO;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.MAE1013;
import com.asc.process.entities.MAE1014;
import com.asc.process.entities.MAE1014.PKMAE1014;
import com.asc.process.entities.MAE1015;
import com.asc.process.entities.PAR1001;
import com.asc.process.entities.REL1002;
import com.asc.process.entities.UTI1006;
import com.asc.service.interfaces.IMAE1013Service;
import com.asc.service.interfaces.IMAE1014Service;
import com.asc.service.interfaces.IMAE1015Service;
import com.asc.service.interfaces.generic.AbstractGenericService;
import com.iss.enums.PrintEnum;
import com.iss.enums.StatusOrpEnum;
import com.iss.enums.TipmEnum;

@Service
public class MAE1013ServiceImpl extends AbstractGenericService<MAE1013> implements IMAE1013Service {

	private IMAE1013DAO		myDao;

	@Autowired
	private IPAR1001DAO		paramDao;

	@Autowired
	private IMAE1014Service	lineServ;
	
	@Autowired
	private IMAE1015Service	pesoServ;

	static Logger			log	= LogManager.getLogger(MAE1013ServiceImpl.class.getName());

	public MAE1013ServiceImpl() {

	}

	@Autowired
	public MAE1013ServiceImpl(IGenericDao<MAE1013> genericDao) {
		super(genericDao);
		this.myDao = (IMAE1013DAO) genericDao;
	}

	@Transactional
	public void addOwner(MAE1013 entity, MAE1001 user) throws MyWebException {
		String numZero;
		Integer numOrd = null;
		PAR1001 param = new PAR1001();
		Formatter fmt = new Formatter();

		try {
			entity.setImpres(PrintEnum.INI);
			entity.setUser(user);
			entity.setFech(LocalDateTime.now());
			entity.setStat(StatusOrpEnum.CREA);
			entity.setConfpe(false);
			param = paramDao.getParameterCurrent();
			numZero = Configuration.getNumZero(param.getSeri().length());
			numOrd = generateConsecutive();
			fmt.format(numZero, numOrd);
			entity.setOrno(param.getSeri() + fmt.toString());
			myDao.create(entity);
			param.setLastor(entity.getOrno());
			param.setLastse(param.getSeri());
			paramDao.update(param);
			fmt.close();
		} catch (Exception e) {
			log.error("Error al agregar orden. Método addOwner (MAE1013ServiceImpl.java)", e);
		}
	}

	@Transactional
	public void updtOwner(MAE1013 entity) throws MyWebException {
		entity.setLines(generatePono(entity));
		myDao.update(entity);
	}

	// Anula orden
	@Transactional
	public void inactivateWithMotivo(String orno, UTI1006 moti, MAE1001 userna) throws MyWebException {
		REL1002 rel1002;

		MAE1013 mae1013 = myDao.findOne(orno);
		mae1013.setStat(StatusOrpEnum.ELIMI);

		rel1002 = new REL1002();
		rel1002.setFecha_(LocalDateTime.now());
		rel1002.setMotivo(moti);
		rel1002.setUserna(userna);
		mae1013.setEvento(rel1002);

		myDao.update(mae1013);
	}
	
	// Suspende o retoma la orden
	@Override
	@Transactional
	public void suspOrRetu(String orno, UTI1006 moti, MAE1001 userna) throws MyWebException {
		MAE1013 mae1013;
		if ( moti == null ) {
			mae1013 = myDao.findOne(orno);
			mae1013.setStat(StatusOrpEnum.PROC);
		}else{
			REL1002 rel1002;

			mae1013 = myDao.findOne(orno);
			mae1013.setStat(StatusOrpEnum.SUSPE);

			rel1002 = new REL1002();
			rel1002.setFecha_(LocalDateTime.now());
			rel1002.setMotivo(moti);
			rel1002.setUserna(userna);
			mae1013.setEvento(rel1002);
		}

		myDao.update(mae1013);
	}
	
	@Override
	@Transactional
	public void confirmPe(MAE1013 mae1013) throws MyWebException {
		mae1013.setConfpe(true);
		mae1013.setFech_confpe(LocalDateTime.now());
		myDao.merge(mae1013);
	}

	@Transactional(readOnly = true)
	public GenericObject<MAE1013> findSubsetOrderByStatus(UTI1002 gp, StatusOrpEnum st) {
		return myDao.findSubsetOrderByStatus(gp, st);
	}

	@Override
	@Transactional(readOnly = true)
	public Boolean AllDispatched(String orno) throws MyWebException {
		Boolean has = true;
		MAE1014 line;

		List<MAE1014> lst = lineServ.getLinesByStatus(orno, true);
		List<MAE1015> pesos;
		Iterator<?> it = lst.iterator();

		while ( it.hasNext() && has ) {
			line = (MAE1014) it.next();
			pesos = pesoServ.findByStatus(line.getPk(), true);
			if( pesos == null || pesos.isEmpty()) {
				has = false;
			}
		}

		return (has);
	}

	@Override
	@Transactional(readOnly = true)
	public Boolean finishedLines(String orno) throws MyWebException {
		Boolean valid = true;
		MAE1014 line;
		List<MAE1014> lst = lineServ.getLinesByWeigh(orno, true);
		Iterator<?> it = lst.iterator();

		while ( it.hasNext() && valid ) {
			line = (MAE1014) it.next();
			if ( line.getPesxli() == null || line.getPesxli().isEmpty() ) {
				valid = false;
			} else {
				if ( line.getCant_d() < line.getCant_p() ) {
					valid = false;
				}
			}
		}

		return (valid);
	}
	
	@Override
	@Transactional(readOnly = true)
	public void closeOrder(String orno) throws MyWebException {
		MAE1013 ordn = myDao.findOne(orno);
		
		ordn.setFech_desp(LocalDateTime.now());
		ordn.setStat(StatusOrpEnum.CLOS);
		myDao.update(ordn);
	}
	
	@Override
	@Transactional
	public void updateImpres(String nord) throws MyWebException {
		MAE1013 ordn = myDao.findOne(nord);
		
		switch ( ordn.getImpres() ) {
			case INI:
				ordn.setImpres(PrintEnum.IMPR);
				myDao.update(ordn);
			break;
			
			case IMPR:
				ordn.setImpres(PrintEnum.REIM);
				myDao.update(ordn);
			break;
			
			default:
			break;
		}
	}

	@Override
	@Transactional(readOnly = true)
	public Boolean hasLines(String orno) throws MyWebException {
		Boolean has = true;
		List<MAE1014> lst = lineServ.getLinesByStatus(orno, true);
		if ( lst == null || lst.isEmpty() ) {
			has = false;
		}

		return (has);
	}

	@Transactional(readOnly = true)
	public Integer countOrderByStatus(StatusOrpEnum st) {
		return myDao.countOrderByStatus(st);
	}

	@Transactional
	public ResponseEntity<HttpStatus> assignSealsToOrder(String orno, String prec) {
		MAE1013 header;
		try {
			if ( null == (header = getById(orno)) ) { return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND); }
			header.setPrec(prec);
			update(header);
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		} catch (MyWebException e1) {
			return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Transactional(readOnly = true)
	public MAE1013 findLastOrderByTipm(TipmEnum tipm) {
		myDao.findLastOrderByTipm(tipm);
		return null;
	}

	public Integer generateConsecutive() {
		Integer numOrd = null;
		PAR1001 param = paramDao.getParameterCurrent();
		if ( null != param.getLastor() ) {
			if ( param.getSeri().equals(param.getLastse()) ) {
				// Se obtiene consecutivo
				numOrd = Integer.valueOf(param.getLastor().substring(param.getSeri().length()));
				numOrd++;
			} else {
				numOrd = Configuration.VALUE_RESET;
			}
		} else {
			numOrd = Configuration.VALUE_RESET;
		}
		return numOrd;
	}

	private List<MAE1014> generatePono(MAE1013 entity) {
		Integer i = 1;
		List<MAE1014> lst = new ArrayList<MAE1014>(0);
		for ( Iterator<MAE1014> iterator = entity.getLines().iterator(); iterator.hasNext(); ) {
			MAE1014 mae1014 = (MAE1014) iterator.next();
			mae1014.setPk(new PKMAE1014());
			mae1014.getPk().setPono(i);
			mae1014.getPk().setOrno(entity.getOrno());
			lst.add(mae1014);
			i++;
		}
		return lst;
	}
}