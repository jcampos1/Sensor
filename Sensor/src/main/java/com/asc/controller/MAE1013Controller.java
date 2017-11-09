package com.asc.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.asc.commons.entities.Options;
import com.asc.commons.entities.UTI1001;
import com.asc.controller.abstracts.Configuration;
import com.asc.entities.abstracts.GenericObject;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.MAE1013;
import com.asc.process.entities.MAE1014;
import com.asc.process.entities.PAR1001;
import com.asc.process.entities.UTI1006;
import com.asc.process.entities.UTI1010;
import com.asc.process.entities.UTI1011;
import com.asc.service.interfaces.IMAE1013Service;
import com.asc.service.interfaces.IMasterService;
import com.asc.service.interfaces.IPAR1001Service;
import com.asc.utils.Functions;
import com.asc.utils.JsonResponse;
import com.asc.utils.Print;
import com.asc.utils.StringUtil;
import com.asc.validators.MAE1013Validator;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iss.enums.SourceEnum;
import com.iss.enums.StatusOrpEnum;
import com.iss.enums.TipmEnum;

import net.sf.jasperreports.engine.JRException;

// CONTROLADOR CABECERA ORDEN DE PESAJE

@RestController()
@RequestMapping("/MAE1013")
public class MAE1013Controller extends Base<MAE1013> {

	@Autowired
	private IMAE1013Service				headerServ;

	@Autowired
	private IPAR1001Service				paramServ;

	@Autowired
	private MAE1013Validator			validator;

	@Autowired
	private IMasterService				masterService;

	private static final ObjectMapper	JSON_MAPPER	= new ObjectMapper();

	@Autowired
	public MAE1013Controller(IMAE1013Service headerServ) {
		super(headerServ);
	}

	@RequestMapping(value = { "/tipm" }, method = RequestMethod.POST)
	public ResponseEntity<List<Options>> tipm() throws MyWebException, JsonProcessingException {
		List<Options> lst = getListOptions(TipmEnum.class);
		return new ResponseEntity<List<Options>>(lst, HttpStatus.OK);
	}
	
	@RequestMapping(value = { "/source" }, method = RequestMethod.POST)
	public ResponseEntity<List<Options>> source() throws MyWebException, JsonProcessingException {
		List<Options> lst = getListOptions(SourceEnum.class);
		return new ResponseEntity<List<Options>>(lst, HttpStatus.OK);
	}

	@RequestMapping(value = { "/asignPrec" }, method = RequestMethod.POST)
	public ResponseEntity<HttpStatus> asignPrec(@RequestParam("nord") String orno, @RequestParam("prec") String prec)
			throws MyWebException {
		return headerServ.assignSealsToOrder(orno, prec);
	}

	@RequestMapping(value = { "/statusOrp" }, method = RequestMethod.POST)
	public ResponseEntity<List<Options>> statusOrp() throws MyWebException, JsonProcessingException {
		List<Options> lst = getListOptions(StatusOrpEnum.class);
		return new ResponseEntity<List<Options>>(lst, HttpStatus.OK);
	}

	@RequestMapping(value = { "/cddp" }, method = RequestMethod.POST)
	public ResponseEntity<PAR1001> cddp() throws MyWebException {
		return new ResponseEntity<PAR1001>(paramServ.getParameterCurrent(), HttpStatus.OK);
	}

	@RequestMapping(value = "/checkMAE1013", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public JsonResponse checkMAE1013(@RequestBody MAE1013 entity, BindingResult result) {
		validator.validate(entity, result);
		JsonResponse jr = converErrorsToJson(result);
		return jr;
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public ResponseEntity<MAE1013> editMAE1013(@RequestBody MAE1013 entity, BindingResult result, ModelMap modelMap)
			throws Exception {
		if ( !StringUtil.isEmptyOrNullValue(entity.getOrno()) ) {
			if ( service.getById(entity.getOrno()) == null ) { throw new Exception("parameter not found"); }
		}

		headerServ.merge(entity);
		return new ResponseEntity<MAE1013>(entity, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/cantOrdersByStatus", method = RequestMethod.POST)
	public ResponseEntity<List<Integer>> cantOrdersByStatus()
			throws Exception {
		List<Integer> lst = new ArrayList<>();
		
		lst.add(headerServ.countOrderByStatus(StatusOrpEnum.CREA));
		lst.add(headerServ.countOrderByStatus(StatusOrpEnum.PROC));
		lst.add(headerServ.countOrderByStatus(StatusOrpEnum.SUSPE));
		lst.add(headerServ.countOrderByStatus(StatusOrpEnum.CLOS));
		lst.add(headerServ.countOrderByStatus(StatusOrpEnum.EXPO));
		lst.add(headerServ.countOrderByStatus(StatusOrpEnum.ELIMI));
		
		return new ResponseEntity<List<Integer>>(lst, HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<MAE1013> createMAE1013(@RequestBody MAE1013 entity, BindingResult result, ModelMap modelMap)
			throws Exception {
		headerServ.addOwner(entity, getClassCurrentUserByLogin());

		return new ResponseEntity<MAE1013>(entity, HttpStatus.OK);
	}

	@RequestMapping(value = "/inactivate", method = RequestMethod.DELETE, produces = "application/json; charset=UTF-8")
	public ResponseEntity<MAE1013> delete(@RequestParam("orno") String orno, @RequestParam("uti1006") String moti)
			throws MyWebException, JsonParseException, JsonMappingException, IOException {
		UTI1006 entity = JSON_MAPPER.readValue(moti, UTI1006.class);

		headerServ.inactivateWithMotivo(orno, entity, getClassCurrentUserByLogin());

		return new ResponseEntity<MAE1013>(HttpStatus.NO_CONTENT);
	}
	
	@RequestMapping(value = "/confirmPe", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public ResponseEntity<MAE1013> confirmPe(@RequestParam("nord") String nord)
			throws MyWebException, JsonParseException, JsonMappingException, IOException {
		MAE1013 mae1013 = null;
		if( (mae1013 = headerServ.getById(nord)) == null ) {
			return new ResponseEntity<MAE1013>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		headerServ.confirmPe(mae1013);

		return new ResponseEntity<MAE1013>(mae1013, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/suspOrRetu", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public ResponseEntity<MAE1013> suspOrRetu(@RequestParam("orno") String orno, @RequestParam(value="moti", required=false) String moti)
			throws MyWebException, JsonParseException, JsonMappingException, IOException {
		UTI1006 entity = null;
		if( moti != null ) {
			entity = JSON_MAPPER.readValue(moti, UTI1006.class);
		}

		headerServ.suspOrRetu(orno, entity, getClassCurrentUserByLogin());

		return new ResponseEntity<MAE1013>(HttpStatus.NO_CONTENT);
	}

	@RequestMapping(value = "/finishedLines", method = RequestMethod.POST)
	public ResponseEntity<Boolean> finishedLines(@RequestParam("nord") String nord) throws Exception {
		return new ResponseEntity<Boolean>(headerServ.finishedLines(nord), HttpStatus.OK);
	}

	@RequestMapping(value = "/hasLinesUndispatched", method = RequestMethod.POST)
	public ResponseEntity<Boolean> hasLinesUndispatched(@RequestParam("nord") String nord) throws Exception {
		return new ResponseEntity<Boolean>(headerServ.AllDispatched(nord), HttpStatus.OK);
	}

	@RequestMapping(value = "/hasLines", method = RequestMethod.POST)
	public ResponseEntity<Boolean> hasLines(@RequestParam("nord") String nord) throws Exception {
		return new ResponseEntity<Boolean>(headerServ.hasLines(nord), HttpStatus.OK);
	}

	@RequestMapping(value = "/closeOrder", method = RequestMethod.POST)
	public ResponseEntity<Void> closeOrder(@RequestParam("nord") String nord) throws MyWebException {
		headerServ.closeOrder(nord);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@RequestMapping(value = "/toClose", method = RequestMethod.POST)
	public ResponseEntity<Boolean> toClose(@RequestParam("nord") String nord) throws MyWebException {
		if ( headerServ.getById(nord).getStat()
				.equals(StatusOrpEnum.PROC) ) { return new ResponseEntity<Boolean>(true, HttpStatus.OK); }
		return new ResponseEntity<Boolean>(false, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getByOrno", method = RequestMethod.POST)
	public ResponseEntity<MAE1013> getByOrno(@RequestParam("nord") String nord) throws MyWebException {
		MAE1013 mae1013 = null;
		if ( (mae1013 = headerServ.getById(nord)) == null ) { return new ResponseEntity<MAE1013>(HttpStatus.INTERNAL_SERVER_ERROR); }
		return new ResponseEntity<MAE1013>(mae1013, HttpStatus.OK);
	}

	@RequestMapping(value = "/generatePDF", method = RequestMethod.POST)
	public ResponseEntity<Void> generatePDF(HttpServletResponse response, @RequestParam("nord") String nord)
			throws MyWebException, JRException, IOException {

		if ( headerServ.getById(nord).getStat().equals(StatusOrpEnum.CLOS) ) {
			new Print().generatePDF(headerServ.getById(nord), itemServ.getLinesByWeigh(nord, true),
					paramServ.getParameterCurrent());
			return new ResponseEntity<Void>(HttpStatus.OK);
		}
		return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@RequestMapping(value = "/returnable", method = RequestMethod.POST)
	public ResponseEntity<String> returnable(HttpServletResponse response, @RequestParam("nord") String nord)
			throws MyWebException, JRException, IOException {
		
		if ( headerServ.getById(nord) != null ) {
			List<MAE1014> lst = itemServ.getLinesByWeigh(nord, true);
			UTI1011<UTI1010> entity = Functions.getReturnables(lst);
			return new ResponseEntity<String>(JSON_MAPPER.writeValueAsString(entity), HttpStatus.OK);
		}
		return new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@RequestMapping(value = "/printOrder", method = RequestMethod.GET)
	public ResponseEntity<byte[]> printOrder(@RequestParam("nord") String nord)
			throws IOException, MyWebException, JRException {

		byte[] pdf1Bytes = null;
		MAE1013 mae1013 = headerServ.getById(nord);

		if ( mae1013.getStat().equals(StatusOrpEnum.CLOS) ) {
			headerServ.updateImpres(nord);
			new Print().generatePDF(headerServ.getById(nord), itemServ.getLinesByWeigh(nord, true),
					paramServ.getParameterCurrent());

			HttpHeaders headers = new HttpHeaders();

			Path pdfPath = Paths.get(Configuration.routeToPdf(nord));
			pdf1Bytes = Files.readAllBytes(pdfPath);

			headers.setContentType(MediaType.parseMediaType("application/pdf"));

			headers.add("content-disposition", "inline;filename=" + Configuration.filenamePdf(nord));

			headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
			ResponseEntity<byte[]> response = new ResponseEntity<byte[]>(pdf1Bytes, headers, HttpStatus.OK);
			return response;
		}

		return new ResponseEntity<byte[]>(pdf1Bytes, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@RequestMapping(value = "/findOrdersByStatus", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> findOrdersByStatus(@RequestParam("obj1") String obj1, @RequestParam("obj2") String obj2) throws IOException, MyWebException {

		GenericObject<MAE1013> objectGen;
		
		UTI1001 grid = JSON_MAPPER.readValue(obj1, UTI1001.class);
		StatusOrpEnum st = JSON_MAPPER.readValue(obj2, StatusOrpEnum.class);
		
		objectGen = headerServ.findSubsetOrderByStatus(grid.getGrid(), st);
		
		if ( objectGen.getListData()
				.isEmpty() ) { return new ResponseEntity<String>(JSON_MAPPER.writeValueAsString(objectGen),
						HttpStatus.NO_CONTENT); }

		return new ResponseEntity<String>(JSON_MAPPER.writeValueAsString(objectGen), HttpStatus.OK);
	}
}