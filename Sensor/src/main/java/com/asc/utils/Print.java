package com.asc.utils;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.asc.controller.abstracts.Configuration;
import com.asc.exceptions.MyWebException;
import com.asc.process.entities.MAE1013;
import com.asc.process.entities.MAE1014;
import com.asc.process.entities.MAE1015;
import com.asc.process.entities.PAR1001;
import com.asc.process.entities.UTI1008;
import com.asc.process.entities.UTI1009;
import com.asc.process.entities.UTI1010;
import com.asc.service.interfaces.IMAE1014Service;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.xml.JRXmlLoader;

@Service
public class Print {

	@Value("{route.pdf}")
	String routePdf;
	
	
	@Qualifier("IMAE1014Service")
	private IMAE1014Service	lineServ;
	
	static Logger log = LogManager.getLogger(Print.class.getName());
	
	
	@Autowired
	public Print(IMAE1014Service	lineServ) {
		this.lineServ = lineServ;
	}
	
	public Print() {
		
	}

	public void generatePDF( MAE1013 header, List<MAE1014> lines, PAR1001 param ) throws JRException, MyWebException {
		List<MAE1015> pesos;
		List<UTI1010> conten = new ArrayList<UTI1010>(0);
		List<UTI1008> lstcon = new ArrayList<UTI1008>(0);
		
		final Map<String, Object> parameters = new HashMap<String, Object>();
		MAE1014 mae1014;
		MAE1015 mae1015;
		UTI1008 uti1008;
		UTI1009 dataReport = new UTI1009();
		Double tar_to, bru_to, tar_li, bru_li;
		
		tar_to = bru_to = 0.0;
		for ( int i = 0; i < lines.size(); i++ ) {
			mae1014 = lines.get(i);
			tar_li = bru_li = 0.0;
			pesos = mae1014.getPesxli();
			for ( int j = 0; j < pesos.size(); j++ ) {
				mae1015 = pesos.get(j);
				tar_li += mae1015.getPestar();
				bru_li += mae1015.getPesbru();
				
				lstcon = mae1015.getLstcon();
				for ( Iterator<UTI1008> iterator = lstcon.iterator(); iterator.hasNext(); ) {
					uti1008 = (UTI1008) iterator.next();
					Functions.findConten(conten, uti1008);
//					findConten(conten, uti1008);
				}
			}
			
			lines.get(i).setPestar(tar_li);
			lines.get(i).setPesbru(bru_li);
			tar_to+=tar_li;
			bru_to+=bru_li;
		}
		
		header.setFechstr(header.getFech().toLocalDate().toString());
		header.setFech_despstr(header.getFech_desp().toLocalDate().toString());
		header.setFech_cargstr(header.getFech_carg().toLocalDate().toString());
		header.setTar_to(tar_to);
		header.setBru_to(bru_to);
		
		dataReport.setHeader(header);
		dataReport.setLines(lines);
		dataReport.setConten(conten);
		
		try {
			final File fl = new ClassPathResource("/com/asc/reports/pesaje.jrxml").getFile();
			final JasperDesign jd = JRXmlLoader.load(fl);
			ArrayList<Object> tmpLst = new ArrayList<>();
			tmpLst.add(dataReport);
			final JRBeanCollectionDataSource datosReport = new JRBeanCollectionDataSource(tmpLst);
			final JasperReport report = JasperCompileManager.compileReport(jd);
			final JasperPrint print = JasperFillManager.fillReport(report, parameters, datosReport);
			JasperExportManager.exportReportToPdfFile(print, Configuration.routeToPdf(header.getOrno()));
			// pdfName = destFile;

		} catch (IOException e) {
			log.error("Error en método generatePDF (Print.java). Detalles: ", e);
		}
	}
	
	private static Boolean findConten( List<UTI1010> lstcon, UTI1008 uti1008) {
		Boolean find = false;
		if ( lstcon.parallelStream().anyMatch(t -> t.getConten().getItem().equals(uti1008.getConten().getItem())) ) {
			find = true;
			lstcon = lstcon.stream().map(t -> { 
				if( t.getConten().getItem().equals(uti1008.getConten().getItem()) ) {
					t.setCant(uti1008.getNconte()+t.getCant());
					t.setPestar(t.getCant()*t.getConten().getPest());
				}
			return t; }).collect(Collectors.toList());;
		}else{
			UTI1010 uti1010 = new UTI1010();
			uti1010.setConten(uti1008.getConten());
			uti1010.setCant(uti1008.getNconte());
			uti1010.setPestar(uti1008.getNconte()*uti1008.getConten().getPest());
			lstcon.add(uti1010);
		}
		return find;
	}
}
