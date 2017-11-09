package com.asc.service;

import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.List;
import java.util.function.ToIntFunction;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asc.commons.entities.MAE1001;
import com.asc.commons.entities.UTI1002;
import com.asc.controller.abstracts.Configuration;
import com.asc.dao.interfaces.IMAE1015DAO;
import com.asc.dao.interfaces.generic.IGenericDao;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.MAE1013;
import com.asc.process.entities.MAE1014;
import com.asc.process.entities.MAE1014.PKMAE1014;
import com.asc.process.entities.MAE1015;
import com.asc.process.entities.MAE1015.PKMAE1015;
import com.asc.process.entities.REL1002;
import com.asc.process.entities.UTI1006;
import com.asc.process.entities.UTI1008;
import com.asc.service.interfaces.IMAE1013Service;
import com.asc.service.interfaces.IMAE1014Service;
import com.asc.service.interfaces.IMAE1015Service;
import com.asc.service.interfaces.generic.AbstractGenericService;
import com.asc.utils.NumberUtil;
import com.bea.xml.stream.samples.Parse;
import com.iss.enums.TypeContentEnum;

@Service
public class MAE1015ServiceImpl extends AbstractGenericService<MAE1015> implements IMAE1015Service {

	private IMAE1015DAO		myDao;

	@Autowired
	private IMAE1014Service	lineServ;

	@Autowired
	private IMAE1013Service	headerServ;

	static Logger			log	= LogManager.getLogger(MAE1015ServiceImpl.class.getName());

	public MAE1015ServiceImpl() {

	}

	@Autowired
	public MAE1015ServiceImpl(IGenericDao<MAE1015> genericDao) {
		super(genericDao);
		this.myDao = (IMAE1015DAO) genericDao;
	}

	@Transactional
	@Override
	public MAE1015 myOwnerAdd(MAE1015 pes) throws MyWebException {
		Integer max = 0;
		UTI1008 uti1008;
		MAE1014 entity = lineServ.getById(pes.getLine().getPk());
		Double percent, difere, difecu;

		List<MAE1015> lst = entity.getPesxli();

		if ( !lst.isEmpty() ) {
			max = entity.getPesxli().stream().mapToInt(t -> t.getPk().getSecu()).max().getAsInt();
		}
		PKMAE1015 pk = new PKMAE1015();
		pk.setOrno(pes.getLine().getPk().getOrno());
		pk.setPono(pes.getLine().getPk().getPono());
		pk.setSecu(max + 1);
		pes.setPk(pk);

		pes.setLstcon(pes.getLstcon().stream().map(t -> {
			t.setCopest(t.getConten().getPest());
			return t;
		}).collect(Collectors.toList()));
		
		pes.setActive(true);
		pes.setConfir(true);
		pes.setFechpe(LocalDateTime.now());
		pes.setFeconf(LocalDateTime.now());
		myDao.create(pes);

		// -------------Actualización del peso----------------------//
		if( entity.getItem().getIscont() ) {
			for ( Iterator<?> iterator = pes.getLstcon().iterator(); iterator.hasNext(); ) {
				uti1008 = (UTI1008) iterator.next();
				if ( uti1008.getConten().getType().ordinal() == TypeContentEnum.CAJA.ordinal() ) { 
					entity.setCant_d(Double.valueOf(entity.getCant_d()+uti1008.getNconte()));
				}
			}
		}else{
			entity.setCant_d(entity.getCant_d() + pes.getPesnet());
		}
		entity.setCantdcu(entity.getCantdcu() + pes.getPesnet());

		// Procentaje de diferencia
		percent = Math.abs(100 - (entity.getCant_d() / entity.getCant_p()) * 100);
		difere = entity.getCant_d() - entity.getCant_p();

		entity.setPercen(NumberUtil.fixedPrecision(Configuration.SIZE_2,
				Math.abs(100 - (entity.getCant_d() / entity.getCant_p()) * 100), RoundingMode.HALF_UP));
		entity.setDifere(NumberUtil.fixedPrecision(Configuration.SIZE_2, entity.getCant_d() - entity.getCant_p(),
				RoundingMode.HALF_UP));

		if ( entity.getItem().getIscont() ) {
			difecu = (entity.getCant_d() * entity.getItem().getPeso()
					- entity.getCant_p() * entity.getItem().getPeso());
			entity.setDifecu(NumberUtil.fixedPrecision(Configuration.SIZE_2, difecu, RoundingMode.HALF_UP));
		} else {
			entity.setDifecu(NumberUtil.fixedPrecision(Configuration.SIZE_2, difere, RoundingMode.HALF_UP));
		}

		lineServ.update(entity);
		// --------------------------------------------------------//

		// -------------Actualización de la fecha de carga en la cabecera de
		// orden ----------------------//
		if ( entity.getHeader().getFech_carg() == null ) {
			MAE1013 header = entity.getHeader();
			header.setFech_carg(LocalDateTime.now());
			headerServ.update(header);
		}
		// --------------------------------------------------------//

		return pes;
	}

	// Eliminar pesaje de linea
	@Transactional
	@Override
	public void inactivateWithMotivo(PKMAE1015 pk, UTI1006 moti, MAE1001 userna) throws MyWebException {
		try {
			REL1002 rel1002 = new REL1002();

			MAE1015 mae1015 = myDao.find(pk);

			mae1015.setActive(false);
			rel1002.setFecha_(LocalDateTime.now());
			rel1002.setMotivo(moti);
			rel1002.setUserna(userna);
			mae1015.setEvento(rel1002);

			myDao.update(mae1015);

			// -------------Actualización del peso----------------------//
			MAE1014 entity = lineServ.getById(mae1015.getLine().getPk());
			entity.setCant_d(entity.getCant_d() - mae1015.getPesnet());
			Double percent = Math.abs(100 - (entity.getCant_d() / entity.getCant_p()) * 100);
			Double difere = entity.getCant_d() - entity.getCant_p();
			entity.setPercen(NumberUtil.fixedPrecision(Configuration.SIZE_2, percent, RoundingMode.HALF_UP));
			entity.setDifere(NumberUtil.fixedPrecision(Configuration.SIZE_2, difere, RoundingMode.HALF_UP));

			lineServ.update(entity);
			// --------------------------------------------------------//
		} catch (Exception e) {
			log.error("Error en método inactivateWithMotivo (MAE1015ServiceImpl.java). Detalles: ", e);
		}
	}

	@Transactional(readOnly = true)
	@Override
	public GenericObject<MAE1015> listSubsetSimple(UTI1002 gp, PKMAE1014 pk_line) {
		return myDao.findSubsetSimple(gp, pk_line);
	}

	@Transactional(readOnly = true)
	@Override
	public List<MAE1015> findByStatus(PKMAE1014 pk_line, Boolean active) {
		return myDao.findByStatus(pk_line, active);
	}
}
