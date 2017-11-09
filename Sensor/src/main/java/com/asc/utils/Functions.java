package com.asc.utils;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.asc.process.entities.MAE1014;
import com.asc.process.entities.MAE1015;
import com.asc.process.entities.UTI1008;
import com.asc.process.entities.UTI1010;
import com.asc.process.entities.UTI1011;

@Component
public class Functions {
	
	/*Artículos retornables utilizados, peso tara por articulos y peso tara general*/
	public static UTI1011<UTI1010> getReturnables(List<MAE1014> lines) {
		MAE1014 mae1014;
		MAE1015 mae1015;
		UTI1008 uti1008;
		Double tara = 0.0;
		UTI1011<UTI1010> uti1011 = new UTI1011<UTI1010>();
		List<UTI1010> conten = new ArrayList<UTI1010>(0);
		
		for ( Iterator<MAE1014> iterator = lines.iterator(); iterator.hasNext(); ) {
			mae1014 = (MAE1014) iterator.next();
			for ( Iterator<MAE1015> iterator2 = mae1014.getPesxli().iterator(); iterator2.hasNext(); ) {
				mae1015 = (MAE1015) iterator2.next();
				for ( Iterator<UTI1008> iterator3 = mae1015.getLstcon().iterator(); iterator3.hasNext(); ) {
					uti1008 = (UTI1008) iterator3.next();
					if ( uti1008.getConten().getReto() ) {
						tara += uti1008.getNconte()*uti1008.getConten().getPest();
						findConten(conten, uti1008);
					}
				}
			}
		}
		
		uti1011.setLstcon(conten);
		uti1011.setPestar(tara);
		
		return uti1011;
	}
	
	public static Boolean findConten( List<UTI1010> lstcon, UTI1008 uti1008) {
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
