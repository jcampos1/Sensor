package com.asc.validatos.levels;

import javax.validation.GroupSequence;

import com.asc.validatos.levels.OrderedChecksMail.lengthMail;
import com.asc.validatos.levels.OrderedChecksMail.patterMail;
import com.asc.validatos.levels.OrderedChecksMail.requiredMail;

@GroupSequence({ requiredMail.class, patterMail.class, lengthMail.class })
public interface OrderedChecksMail {

	public interface requiredMail {

	}

	public interface patterMail {

	}

	public interface lengthMail {

	}
}