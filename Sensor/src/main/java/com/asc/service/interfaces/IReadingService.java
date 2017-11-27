package com.asc.service.interfaces;

import com.asc.process.entities.Reading;
import com.asc.service.interfaces.generic.IGenericService;

public interface IReadingService extends IGenericService<Reading> {

	Reading findLastReadingOfStation(String namest);
}
