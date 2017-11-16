angular.module('messages', [ 'pascalprecht.translate' ]);

angular.module('messages').config([ '$translateProvider',
		function($translateProvider) {
			$translateProvider.translations('en', {
				"GENE": {
					"SEARCH": 			"Search...",
					"CANCEL": 			"Cancel",
					"NEW":				"New",
					"SAVE":				"Save",
					"ACCEPT":			"Accept",
					"SPANISH":			"Spanish",
					"ENGLISH":			"English",
					"REMOVE":			"Remove",
					"DETAIL":			"Detail",
					"BTN_REG":			"Register",
					"CONT":				"Continue",
					"CHNG_PSWD" :		"Change Password",
					"REME_ME":			"Remember me",
					"CONF_DELE":		"Confirmation",
					"MESG_DELE":		"This sure to delete the selected records?",
					"SELE_AOPT":		"Select a option",
					"EDIT":				"Edition Form",
					"GENE_TAB":			"General",
					"PROJ":				"Projects",
					"ACT":				"Activities",
					"USER":				"Users",
					"PORT":				"Ports",
					"DISP":				"Displays",
					"CMPL" :			"Complete",
					"ASC":				"E & A Asesores Sistemas y Computación, C.A.",
					"ASC_SIGL":			"ASC, C.A.",
					"CONT_USER":		"User Registrations",
					"COLLA":			"Collapse",
					"REFR":				"Refresh",
					"MSTR":				"Masters",
					"ADMN":				"Administrator",
					"MAIN_NAVI":		"Main Navigation",
					"NAME_APP":			"Sensor",
					"NAME_APP_SIG":		"WBSA",
					"TO_TRNS":			"Translate to Language",
					"REG":				"Register",
					"PASS_RECO":		"Recover Password",
					"SIGN_OUT":			"Sign out",
					"TRLO":				"Trello",
					"ONLI":				"Online",
					"ACTI_PROJ":		"Active Projects",
					"CLSD_PROJ":		"Closed Projects",
					"GRAP_PROJ":		"graphic Projects",
					"WELC":				"¡Welcome to Sensor!",
					"MORE_INFO":		"More info",
					"REQ":				"Field is required",
					"RGTR_SUCS":		"The entry was successfully registered.",
					"RGTR_UPDT":		"The entry was successfully updated.",
					"RGTR_SUPR":		"The entry was successfully removed.",
					'LIST_PORT':		"Ports List",
					'TEST_CONE':		"TEST CONNECTION",
					'BTN_EDIT':			"Edit",
					'PARA':				"Parameters",
					"CAPT":				"Capture",
					"CAPT_ZERO":		"Capture (zero)",
					"WIDG_ZONE":		"Widgets",
					"PROC":				"Process",
					"WEIGHING":			"Weighing",
					"ASIG_SEAL":		"Assign seals",
					"SEALS_SAVE":		"Seals recorded satisfactorily",
					"DSCA":				"Description",
					"FECH":				"Date",
					"FECH_CREA":		"Creation date",
					"FECH_FREI":		"Freight date",
					"FECH_DESP":		"Date of dispatch",
					"PERM":				"Permissions",
					"ANUL":				"Annular",
					"MOTI":				"Reasons",
					"SECU":				"Sequence",
					"LIN_ORD":			"Order Line",
					"DESG_P":			"Weighing Breakdown",
					"HEADER":			"Order header",
					"ARTI":				"Products",
					"ORDN":				"Order",
					"PESO":				"Weight",
					"QUANT":			"Quantity",
					"PALE":				"Palettes",
					"CEST":				"Baskets and pallets",
					"CARR":				"Barrow",
					"CAJA":				"Box",
					"COND":				"Driver",
					"ERR001":			"Invalid field",
					"PES_TA":			"Tare weight",
					"PES_TA_KG":		"Peso tara in KG",
					"PES_NE":			"Net weight",
					"PES_BR":			"Gross weight",
					"CTRLPE":			"Weighing controls",
					"PES_MA":			"Manual weight",
					"CONFIR":			"Confirm",
					"CONTEN":			"Container",
					"EMBALA":			"Packaging",
					"QUANSM":			"Quant.",
					"ARTPES":			"Article to weigh",
					"ISCONT":			"Is counted?",
					"ISCONTtrue":		"Counted item",
					"ISCONTfalse":		"Heavy item",
					"PES_TEO":			"Theoretical weight",
					"ERR001":			"Line of order even with weighing breakdown",
					"ALRT001":			"Line of order without weighing breakdown",
					"NUM_LIN":			"Line number",
					"SECU_PE":			"Weighing sequence",
					"USE":				"Use",
					"START_WE":			"Start weighing",
					"START_LINE":		"go to weighing",
					"CODE":				"Code",
					"FECHPE":			"Weighing date",
					"FECONF":			"Confirmation date",
					"PERCEN":			"Difference en %",
					"DIFERE":			"Difference",
					"DIFERE2":			"Difference (Pres. unit/Storage unit)",
					"CLOSEOR":			"Close Order",
					"PRINT_ORDR":		"Print weighing order",
					"COMPANY":			"Company",
					"PLAC":				"Plaque",
					"ORIGIN":			"Origin",
					"DESTINY":			"Destiny",
					"PART":				"Partner",
					"WARE":				"Warehouse",
					"SEL_PART":			"Select partner",
					"SEL_WARE":			"select warehouse",
					"SUSP":				"Suspend",
					"RETO":				"Return",
					"SUSP_OR":			"The selected order is now in suspended state",
					"PROC_OR":			"The selected order is now in progress",
					"DIF_UNI":			"KGS",
					"BACK":				"Back",
					"QUANRE":			"Quantity requested (Pres. unit/Storage unit)",
					"DIFPES":			"Weighing difference",
					"NORESULT":			"No results found ...",
					"RETURN":			"Returnable",
					"TOTAL":			"Total",
					"SHOW_WEIG":		"See weights",
					"ARTOWE":			"Article to weigh",
					"PESOS":			"Weighing",
					"REAL_PES":			"Carry out weighing",
					"CONFPE":			"To confirm order",
					"CONFWE":			"Confirm weight",
					"false":			"No",
					"true":				"Yes",
					"ART_RETU":			"Returning articles",
					"FCREA":			"Creation",
					"DISPATCH":			"Dispatch",
					"PRINT":			"Print",
					"AS_PREC":			"Assign seals",
					"CONFIRMED":		"Confirmed",
					"ERROR":			"Error",
					"ACTIONS":			"Actions",
					"PHONE":			"Phone",
					"NAME":				"Name",
					"STATUS":			"Status",
					"STNS":				"Stations",
					"STN":				"Station",
					"ERRORSERV":		"Error processing data on the server",
					"ACTIVEfalse":		"Inactive",
					"ACTIVEtrue":		"Active",
					"ERROR01":			"You must select an item to perform this operation",
					"NOMENC":			"Nomenclature",
					"RANGO":			"Rank",
					"SENSOR":			"Sensor",
					"SENSORS":			"Sensors",
					"AST":				"(*)",
					"TYSENSOR":			"Type of sensor",
					"TYSENSORS":		"Type of sensors",
					"ROLES":			"Roles",
					"ROLE":				"Role",
				},
				
				"URL": {
					"SIGN_OUT":			"/Sensor/logout",
					"TRLO":				"https://trello.com/login?returnUrl=%2Faeasc1",
				},
				
				"LOGI": {
					"MAIL_ADDR": 		"Enter the email address with which you registered to reset your password",
				},
				
				"USER" : {
					"NEW" : 			"New User",
					"NAME" : 			"Name",
					"LAST_NAME" :		"Last Name",
					"MAIL" : 			"Email Address",
					"CONF_MAIL" :		"Email confirmation",
					"PSWD" : 			"Password",
					"CONF_PSWD" :		"Confirm Password",
					"TITLE_MSTR":		"Master Users",
					"REG":				"Registration Form",
					"PHON" : 			"Phone",
					"LOGI" :			"Login",
					"RMBR_PASS" :		"I remember my password",
					"SIGN_UP" :			"Sign up",
					"SIGN_HERE":		"Sign up here",
					"DONT_ACCO":		"Don't have an account!",
					"EXIS_ACCO":		"I already have!",
					"USER_MAIL":		"User or Email",
					"FORG_PSWD" : 		"Forgot click here",
					"RESE_PSWD" :		"Reset your password",
					"NEW_PSWD" :		"Enter a new password:",
					"ROLE_USER" :		"User",
					"ROLE_ADMIN" :		"Administrator",
					"STAT" :			"Status",
					"BLOQ" :			"Blocked",
					"CRTE_DATE":		"Creation date",
					"DATE_ACTI":		"Activation date",
					"ROLES":			"Role",
					"FOR_APROB":		"Requests pending by approval",
					"NORD":				"Create manual order",
					"INGR":				"Enter manual weights",
					"DELE":				"Remove weights",
					"APRO":				"Approve difference",
					"ANUL":				"Cancel order",
					"PESO":				"Approve refund (poor condition)",
					"GEOV":				"Generate OV return (poor condition)",
					"CODE":				"Code",
				},
				
				// unidad de display
				"MAE1007": {
					"CODE":				"Code",
					"DSCA":				"Description",
					"CHAR_SEPA":		"Sepa. char.",
					"CHAR_STAB":		"Stab. char.",
					"POSI_STAB":		"Stab. char. position",
					"CHAR_UNIT":		"Unit char.",
					"NMAX_STAB":		"Max. stab. numb.",
					"NMAX_UNST":		"Max. unst. numb.",
					"POSI_WEIG":		"Weig. char. position",
					"VAL_MIN":			"Min. value",
					"VAL_MAX":			"Max. value",
					"NREAD_TRIED":		"Numb. of readings (disconnect)",
					"NMAX_SLEP":		"Waiting time for reading",
					"DSP_DEFA":			"Default simulator",
					"CAPT_WEIG":		"Capture weight",
					"SRVR_PORT":		"Server port",
					"TRACED":			"Enable Trace",
					"SIM_WEI":			"Simulators used in weighbridge",
					
					"CHAR_SEPA_FULL":	"Separator character",
					"CHAR_STAB_FULL":	"Stability character",
					"POSI_STAB_FULL":	"Stability character position",
					"CHAR_UNIT_FULL":	"Unit character",
					"NMAX_STAB_FULL":	"Maximum number of stabilities",
					"NMAX_UNST_FULL":	"Maximum number of Instabilities",
					"POSI_WEIG_FULL":	"Position of weight character",
					"VAL_MIN_FULL":		"Zero Tolerance from",
					"VAL_MAX_FULL":		"Zero tolerance up to",
					"NREAD_TRIED_FULL":	"Previous readings to disconnect",
					"WEIGHT":			"Weight: ",
					
				},
				
				// Parametros generales
				"PAR1001": {
					"SERI":				"Series",
					"CDDP":				"Distributor code",
					"CURR_PARA":		"Current parameters",
					"FECH":				"Date",
					"REP_TE":			"Theoretical report",
					"PESCON":			"Weigh counted items",
					
				},
				
				// puerto de comunicacion
				"MAE1008": {
					"NAME":				"Port",
					"DSCA":				"Description",
					"BAUD":				"Baud",
					"PRTY":				"Parity",
					"BITS_CHAR":		"Characters",
					"BITS_STOP":		"Stop Bit",
					"TIME_OUT":			"Timeout",
				},
				
				// Articulos
				"MAE1009": {
					"ITEM":				"Item",
					"CUNI":				"Presentation unit",
					"STUW":				"Dispatch unit",
				},
				
				//Cabecera orden de pesaje
				"MAE1013": {
					"ORNO":				"Order",
					"TIPM":				"Movement type",
					"CDDP":				"Distributor code / plant",
					"MOTR":				"Transport",
					"PREC":				"Seals",
					"STAT":				"Status",
					"MESG_DELE":		"The selected order may contain associated lines. Do you still want to void it?",
				},
				
				//Motivos
				"UTI1006": {
					"TYPE_M":			"Reason type",
				},
				
				//Items por orden
				"MAE1014": {
					"ITEM":				"Product description",
					"CANT_P":			"Requested",
					"CANT_D":			"Dispatched",
					"CANT_R":			"Remainder",
					"NODESP":			"Confirm without dispatch/dispatch",
					"DESG_P":			"See weighing breakdown",
					"RGTR_DESP":		"The line has been marked as non-dispatch",
					"RGTR_DISP_DESP":	"Line is now available for dispatch",
					"DESP":				"No dispatch",
					"CUNI":				"Presentation unit",
					"SEDESP":			"It dispatches",
				},
				
				//Pesaje por linea
				"MAE1015": {
					"CAPT_WEIG":		"Take Weight",
				},
				
				"VALI": {
					"NAME_REQ": 		"Name is required",
					"LNAM_REQ": 		"Last name is required",
					"MAIL_REQ": 		"Email is required",
					"PSWD_REQ": 		"Password is required",
					"CPWD_REQ": 		"Password Confirmation is required",
					"PHON_REQ": 		"Phone is required",
					"ROLE_REQ": 		"Roles is required",
					"PROJS_REQ" :		"Projects is required",
					"MAIL_INV": 		"Invalid email",
					"NOT_EQU": 			"Password do not match",
					"MAI_NEQU": 		"Email do not match",
					"USER_CREA":		"User created successfully",
					"WARN":				"Warning!",
					"USER_NVAL":		"Username Invalid",
					"ROLES_REQ" :		"Roles is required",
					"ACTI_REQ" :		"Status is required",
					"CODE_REQ" :		"Code is required",
					"OBSR_REQ" :		"Observation is required",
					"STAT_REQ" :		"Status is required",
				},
				
				"CONF": {
					"SEND_MAIL":		"An email has been sent. You must wait for the administrator accepts your request."
				},
				
				"ALRT": {
					"ALRT":				"Alert",
					"USER_UPDT":		"The user was successfully updated.",
					"USER_DELE":		"The user was successfully removed.",
					"PROJ_NEW":			"The project was successfully registered.",
					"PROJ_UPDT":		"The project was successfully updated.",
					"PROJ_DELE":		"The project was successfully removed.",
					"PROJ_CLSE":		"The project was successfully closed.",
					"ACT_NEW":			"The activity was successfully registered.",
					"ACT_UPDT":			"The activity was successfully updated.",
					"ACT_DELE":			"The activity was successfully removed.",
					"ACT_CMPL":			"The activity was successfully closed.",
					"UPTE":				"The entity was successfully updated.",
					"NEW":				"The entity was successfully registered.",
					"SUPR":				"The entity was successfully removed.",
					"ORDER_CLOSE":		"Order was successfully closed",
					"ALRT01":			"Order successfully confirmed",
					"ALRT02":			"Seals successfully assigned",
					"ALRT03":			"Once confirmed the order will not be able to undo this operation",
				},
				
				"DOMAIN": {
					"YES" :				"Active",
					"NO" :				"Inactive",
					"Y":				"Yes",
					"N":				"No",
				},
				
				"WBL4B": {
					"EXCEPT_RESULT":	"An exception occurred in the result",
					"ERROR_OPEN_PORT":	"Error opening port",
					"ERROR_CLOSE_PORT":	"Error closing port",
					"ERROR_READ_PORT":	"Error reading the port",
					"ERROR_METHOD_RUN": "Execution Method Error",
					"LIBRARY_NOT_FOUND":"Error loading RXTX library",
					"PORT_NOT_FOUND":	"Port not found",
					"UNSTAB":			"Unstable Weighbridge",
					"WEIGHT_NEGATIVE":	"Negative weight",
					"NO_CHECK_ZERO":	"Weight has not reached zero",
					"WEIGH_OCUPPIED":	"Busy Weighbridge",
					"WEIGH_UNOCUPPIED":	"Unoccupied Weighbridge",
					"DISCONECT":		"Disconnected Weighbridge",
					"ERROR01":			"You can not delete a suspended order",
					"ERROR02":			"You can not delete a closed order",
					"ERROR03":			"Order without lines",
					"ERROR04":			"There are lines without weighing breakdowns",
					"ERROR05":			"There are lines for which the order is not yet complete",
					"ERROR06":			"Incorrect order status to close",
					"ERROR07":			"Incorrect order status to print",
					"ERROR08":			"Wrong status to suspend order",
					"ERROR09":			"Incorrect status to resume order",
					"ERROR010":			"Incorrect state to undo command",
					"ERROR011":			"Incorrect status to delete order",
					"ERROR012":			"Order still has lines",
					"ERROR013":			"Order does not have lines",
					"ERROR014":			"You must first select the product to weigh",
					"ERROR015":			"Wrong status to edit order",
				},
				
				"TLTPS": {
					"TP07":				"Example: T1, TS1, H1, ...",
					"TP08":				"Example: -10 to 50CC, 0 to 239 kpa, Atmosférico 400ppm, ...",
					"TP09":				"Example: Temperature, gas, ultraviolet, ...",
					"TP10":				"Stations accessed through the domain",
					
					
					"CHAR_UNIT_TP":		"Unit of measure with which the indicator will work. Example: kg",
					"CHAR_SEPA_TP":		"Character separador of the different groups that make up a chain. Example: the comma (,) in the chain ST,GS,+0008900kg",
					"CHAR_STAB_TP":		"Character that indicates the stability of the weight. Example: 'ST' in ST,GS,+0008900kg",
					"NMAX_STAB_TP":		"Number of consecutive stable weight readings that must be performed to ensure weight stability",
					"NMAX_UNST_TP":		"Number of readings of consecutive unstable weights that must be performed to insure weight instability",
					"VAL_MIN_TP":		"Minimum value considered as zero",
					"VAL_MAX_TP":		"Maximum value considered as zero",
					"NREAD_TRIED_TP":	"Maximum number of readings that must be performed to ensure the disconnection of the display unit",
					"NMAX_SLEP_TP":		"Added delay in port reading that allows waiting a certain amount of seconds when the weight is unstable",
					"SRVR_PORT_TP":		"Port that will provide service for weight catches. This is the same as the one used by WeighBridgeLite4Baan",
					"USE_TP":			"Select to use in weighbridge",
					"DIBRTE_TP":			"Difference between gross weight and theoretical weight",
					"POBRTE_TP":			"Difference in percentage between gross weight and theoretical weight",
					
					"NAME_PORT_TP":		"Identifier for the port where you will connect the display. Example: in Windows it is possible to connect the display to port 'COM1' or 'COM2'",
					"DSCA_PORT_TP":		"Description for the port. Example: COM1 serial port",
					"TIME_OUT_TP":		"Maximum time to wait for port opening (Milliseconds)",
					"TRACED_TP":		"Allows the WeighBridgeLite4Baan application to log into the log",
					"TP01":				"Search by order number",
					"TP02":				"Search by first name, last name and email",
					"TP03":				"Search by id, port and description",
					"TP04":				"Search by code and description",
					"TP05":				"Search by description and date",
					"TP06":				"Search by id, code and description",
				},
				
				"FORM": {
					"USER":				"User - ",
					"MAE1007":			"Indicator - ",
					"MAE1008":			"Port - ",
					"MAE1013":			"Order header - ",
					"PAR1001":			"General Parameters - ",
					"UTI1006":			"Reasons - ",
					"MAE1014":			"Order Line -",
					"MAE1015":			"Weight of line -",
					
					"EDIT":				"Edition",
					"NEW":				"Creation",
					"QUERY":			"Query",
				},
				
				"ORDER": {
					"CREA":				"Created",
					"PROC":				"In process",
					"SUSP":				"Suspended",
					"CLSE":				"Closed",
					"EXPO":				"Exported",
					"ELIM":				"Deleted",
				},
			});

			$translateProvider.translations("es", {
				"GENE": {
					"SEARCH": 			"Buscar...",
					"CANCEL": 			"Cancelar",
					"NEW":				"Nuevo",
					"SAVE":				"Guardar",
					"ACCEPT":			"Aceptar",
					"SPANISH":			"Español",
					"ENGLISH":			"Inglés",
					"REMOVE":			"Eliminar",
					"DETAIL":			"Detalle",
					"BTN_REG":			"Registrar",
					"CONT":				"Continuar",
					"CHNG_PSWD" :		"Cambiar Contraseña",
					"REME_ME":			"Recordarme",
					"CONF_DELE":		"Confirmación",
					"MESG_DELE":		"¿Esta seguro de eliminar el/los registros seleccionado(s)?",
					"SELE_AOPT":		"Seleccione una opción",
					"EDIT":				"Formulario de edición",
					"GENE_TAB":			"General",
					"PROJ":				"Proyectos",
					"ACT":				"Actividades",
					"USER":				"Usuarios",
					"PORT":				"Puertos",
					"DISP":				"Indicadores",
					"CMPL" :			"Completar",
					"ASC":				"E & A Asesores Sistemas y Computación, C.A.",
					"ASC_SIGL":			"ASC, C.A.",
					"CONT_USER":		"Usuarios Registrados",
					"COLLA":			"Colapsar",
					"REFR":				"Actualizar",
					"MSTR":				"Maestros",
					"ADMN":				"Administrador",
					"MAIN_NAVI":		"Barra de navegación",
					"NAME_APP":			"Sensor",
					"NAME_APP_SIG":		"WBSA",
					"TO_TRNS":			"Traducir al lenguaje",
					"REG":				"Registrar",
					"PASS_RECO":		"Recuperar Contraseña",
					"SIGN_OUT":			"Cerrar sesión",
					"TRLO":				"Trello",
					"ONLI":				"En linea",
					"ACTI_PROJ":		"Proyectos Activos",
					"CLSD_PROJ":		"Proyectos Cerrados",
					"GRAP_PROJ":		"Gráfico de Proyectos",
					"WELC":				"¡Bienvenido a Sensor!",
					"MORE_INFO":		"Más info",
					"REQ":				"El campo es requerido",
					"RGTR_SUCS":		"Registro procesado exitosamente",
					"RGTR_UPDT":		"Registro actualizado exitosamente",
					"RGTR_SUPR":		"Registro eliminado exitosamente",
					'LIST_PORT':		"Listado de Puertos",
					'TEST_CONE':		"Probar Conexión",
					'BTN_EDIT':			"Editar",
					'PARA':				"Parámetros",
					"CAPT":				"Captura",
					"CAPT_ZERO":		"Captura (cero)",
					"WIDG_ZONE":		"Widgets",
					"PROC":				"Proceso",
					"WEIGHING":			"Pesaje",
					"ASIG_SEAL":		"Asignar Precintos",
					"SEALS_SAVE":		"Precintos grabados satisfactoriamente",
					"DSCA":				"Descripción",
					"FECH":				"Fecha",
					"FECH_CREA":		"Fecha de creación",
					"FECH_FREI":		"Fecha de carga",
					"FECH_DESP":		"Fecha de despacho",
					"PERM":				"Permisos",
					"ANUL":				"Anular",
					"CODE":				"Código",
					"MOTI":				"Motivos",
					"SECU":				"Secuencia",
					"LIN_ORD":			"Lineas de Orden",
					"DESG_P":			"Desglose de pesaje",
					"HEADER":			"Cabecera de orden",
					"ARTI":				"Artículos",
					"PESO":				"Peso",
					"QUANT":			"Cantidad",
					"PALE":				"Paletas",
					"CEST_PAL":			"Cestas y paletas",
					"CARR":				"Carruchas",
					"CAJA":				"Caja",
					"COND":				"Conductor",
					"ERR001":			"Campo inválido",
					"PES_TA":			"Peso tara",
					"PES_TA_KG":		"Peso tara en KG",
					"PES_NE":			"Peso neto",
					"PES_BR":			"Peso bruto",
					"CTRLPE":			"Controles de pesaje",
					"PES_MA":			"Peso manual",
					"CONFIR":			"Confirmar",
					"CONTEN":			"Contenedor",
					"EMBALA":			"Embalaje",
					"QUANSM":			"Cant.",
					"ARTPES":			"Artículo a pesar",
					"ISCONT":			"¿Es contado?",
					"ISCONTtrue":		"Artículo contado",
					"ISCONTfalse":		"Artículo pesado",
					"PES_TEO":			"Peso teórico",
					"ERR001":			"Linea de orden aun con desglose de pesaje",
					"ALRT001":			"Linea de orden sin desglose de pesaje",
					"NUM_LIN":			"Número de línea",
					"SECU_PE":			"Secuencia de pesaje",
					"USE":				"Usar",
					"START_WE":			"Iniciar pesaje",
					"START_LINE":		"Ir a pesaje",
					"CODE":				"Código",
					"FECHPE":			"Fecha de pesaje",
					"FECONF":			"Fecha de confirmación",
					"PERCEN":			"Diferencia en %",
					"DIFERE":			"Diferencia",
					"DIFERE2":			"Diferencia (Unid. Pres/Unid. Alm.)",
					"CLOSEOR":			"Cerrar orden",
					"PRINT_ORDR":		"Imprimir orden de pesaje",
					"COMPANY":			"Compañia",
					"PLAC":				"Placa",
					"ORIGIN":			"Origen",
					"DESTINY":			"Destino",
					"PART":				"Cliente",
					"WARE":				"Almacén",
					"SEL_PART":			"Seleccione el cliente",
					"SEL_WARE":			"Seleccione el almacen",
					"SUSP":				"Suspender",
					"RETO":				"Retomar",
					"SUSP_OR":			"La orden seleccionada ahora se encuentra en estado suspendida",
					"PROC_OR":			"La orden seleccionada ahora se encuentra en estado en proceso",
					"DIF_UNI":			"KGS",
					"BACK":				"Atrás",
					"QUANRE":			"Cantidad pedida (Unid. Pres/Unid. Alm.)",
					"DIFPES":			"Diferencia de peso",
					"NORESULT":			"No se encontraron resultados ...",
					"RETURN":			"Retornable",
					"TOTAL":			"Total",
					"SHOW_WEIG":		"Ver pesos",
					"ARTOWE":			"Artículo a pesar",
					"PESOS":			"Pesos",
					"REAL_PES":			"Realizar pesaje",
					"CONFPE":			"Confirmar pedido",
					"CONFWE":			"Confirmar peso",
					"false":			"No",
					"true":				"Si",
					"ART_RETU":			"Artículos retornabales",
					"FCREA":			"Creación",
					"DISPATCH":			"Despacho",
					"PRINT":			"Imprimir",
					"AS_PREC":			"Asignar precintos",
					"CONFIRMED":		"Confirmado",
					"ERROR":			"Error",
					"ACTIONS":			"Acciones",
					"PHONE":			"Teléfono",
					"NAME":				"Nombre",
					"STATUS":			"Estado",
					"STNS":				"Estaciones",
					"STN":				"Estacion",
					"ERRORSERV":		"Error al procesar datos en el servidor",
					"ACTIVEfalse":		"Inactivo",
					"ACTIVEtrue":		"Activo",
					"ERROR01":			"Debe seleccionar un item para realizar esta operación",
					"NOMENC":			"Nomenclatura",
					"RANGO":			"Rango",
					"SENSOR":			"Sensor",
					"SENSORS":			"Sensores",
					"AST":				"(*)",
					"TYSENSOR":			"Tipo de sensor",
					"TYSENSORS":		"Tipo de sensores",
					"ROLES":			"Roles",
					"ROLE":				"Rol",
				},
				
				"URL": {
					"SIGN_OUT":			"/Sensor/logout",
					"TRLO":				"https://trello.com/login?returnUrl=%2Faeasc1",
				},
				
				"LOGI": {
					"MAIL_ADDR": 		"Ingrese la dirección de correo con la cual se registró para recuperar su contraseña",
				},
				
				"USER" : {
					"TITLE" : 			"Hola",
					"FOO" : 			"Este es un parrafo",
					"NEW" : 			"Nuevo Usuario",
					"NAME" : 			"Nombre",
					"LAST_NAME" : 		"Apellido",
					"MAIL" : 			"Correo Electrónico",
					"CONF_MAIL" :		"Confirmación correo",
					"PSWD" : 			"Contraseña",
					"CONF_PSWD" :		"Confirmación Contraseña",
					"TITLE_MSTR":		"Maestro de Usuarios",
					"REG":				"Formulario de Registro",
					"PHON" : 			"Teléfono",
					"LOGI" :			"Iniciar Sesión",
					"RMBR_PASS" :		"Recuerdo mi contraseña",
					"SIGN_UP" :			"Registrarse",
					"SIGN_HERE":		"Registrese aqui",
					"DONT_ACCO":		"¡No tiene una cuenta!",
					"EXIS_ACCO":		"Ya tengo una cuenta!",
					"USER_MAIL":		"Usuario o correo",
					"FORG_PSWD" : 		"¿Olvidó la contraseña?",
					"RESE_PSWD" :		"Reestablezca su contraseña",
					"NEW_PSWD" :		"Nueva contraseña:",
					"ROLE_USER" :		"Usuario",
					"ROLE_ADMIN" :		"Administrador",
					"STAT" :			"Estado",
					"BLOQ" :			"Bloqueado",
					"CRTE_DATE":		"Fecha de creación",
					"DATE_ACTI":		"Fecha de activación",
					"ROLES":			"Rol(es)",
					"FOR_APROB":		"Solicitudes pendientes por aprobación",
					"NORD":				"Crear orden manual",
					"INGR":				"Ingresar pesos manual",
					"DELE":				"Eliminar pesos",
					"APRO":				"Aprobar diferencia",
					"ANUL":				"Anular pedido",
					"PESO":				"Aprobar devolución (mal estado)",
					"GEOV":				"Generar OV devolución (Mal estado)",
				},
				
				// unidad de display
				"MAE1007": {
					"CODE":				"Código",
					"DSCA":				"Descripción",
					"CHAR_SEPA":		"Car. Sepa.",
					"CHAR_STAB":		"Car. Estab.",
					"POSI_STAB":		"Posi. Car. Estab.",
					"CHAR_UNIT":		"Car. Unidad",
					"NMAX_STAB":		"Num. Max. Estab.",
					"NMAX_UNST":		"Num. Max. Inestab.",
					"POSI_WEIG":		"Posi. Car. Peso",
					"VAL_MIN":			"Valor min.",
					"VAL_MAX":			"Valor máx.",
					"NREAD_TRIED":		"Cant. lecturas (desconexión)",
					"NMAX_SLEP":		"tiempo de espera a la lectura",
					"DSP_DEFA":			"Simulador por defecto",
					"CAPT_WEIG":		"Captura de peso",
					"SRVR_PORT":		"Puerto del servidor",
					"TRACED":			"Activar traza",
					"SIM_WEI":			"Simuladores usados en romana",

					"CHAR_SEPA_FULL":	"Caracter separador",
					"CHAR_STAB_FULL":	"Caracter de estabilidad",
					"POSI_STAB_FULL":	"Posición del caracter de estabilidad",
					"CHAR_UNIT_FULL":	"Caracter de unidad",
					"NMAX_STAB_FULL":	"Número máximo de estabilidades",
					"NMAX_UNST_FULL":	"Número máximo de inestabilidades",
					"POSI_WEIG_FULL":	"Posición del caracter de peso",
					"VAL_MIN_FULL":		"Tolerancia cero desde",
					"VAL_MAX_FULL":		"Tolerancia cero hasta",
					"NREAD_TRIED_FULL":	"Lecturas previas a la desconección",
					"WEIGHT":			"Peso: ",
				},
				
				// Parametros generales
				"PAR1001": {
					"SERI":				"Serie",
					"CDDP":				"Código distribuidora",
					"CURR_PARA":		"Parámetros actuales",
					"FECH":				"Fecha",
					"REP_TE":			"Reportar lo teórico",
					"PESCON":			"Pesar lo contado",
				},
				
				"MAE1008": {
					"NAME":				"Puerto",
					"DSCA":				"Descripción",
					"BAUD":				"Baudios",
					"PRTY":				"Paridad",
					"BITS_CHAR":		"Caracteres",
					"BITS_STOP":		"Bit de parada",
					"TIME_OUT":			"Timeout",
				},
				
				// Articulos
				"MAE1009": {
					"ITEM":				"Item",
					"CUNI":				"Unidad de presentación",
					"STUW":				"Unidad de despacho",
				},
				
				//Cabecera orden de pesaje
				"MAE1013": {
					"ORNO":				"Orden",
					"TIPM":				"Tipo de movimiento",
					"CDDP":				"Código distribuidora/planta",
					"MOTR":				"Medio de transporte",
					"PREC":				"Precintos",
					"STAT":				"Estado",
					"MESG_DELE":		"La orden seleccionada puede contener lineas asociadas. ¿Aún así desea anularla?",
				},
				
				//Motivos
				"UTI1006": {
					"TYPE_M":			"Tipo de motivo",
				},
				
				//Items por orden
				"MAE1014": {
					"ITEM":				"Descripción del producto",
					"CANT_P":			"Pedido",
					"CANT_D":		 	"Despachado",
					"CANT_R":			"Restante",
					"NODESP":			"Confirmar no despacho/despacho",
					"DESG_P":			"Ver desglose de pesaje",
					"RGTR_DESP":		"La linea ha sido marcada como no despacho",
					"RGTR_DISP_DESP":	"Línea ahora está disponible para el despacho",
					"DESP":				"No Despacho",
					"CUNI":				"Unidad Pres.",
					"SEDESP":			"Se despacha",
				},
				
				//Pesaje por linea
				"MAE1015": {
					"CAPT_WEIG":		"Tomar Peso",
				},
				
				"VALI": {
					"NAME_REQ": 		"Nombre es requerido",
					"LNAM_REQ": 		"Apellido es requerido",
					"MAIL_REQ": 		"Correo es requerido",
					"PSWD_REQ": 		"Contraseña es requerido",
					"CPWD_REQ": 		"Confirmación es requerido",
					"PHON_REQ": 		"Teléfono es requerido",
					"ROLE_REQ": 		"Roles es requerido",
					"MAIL_INV": 		"Correo inválido",
					"PAS_NEQU": 		"Contraseña no coincide",
					"MAI_NEQU": 		"Correo electrónico no coincide",
					"USER_CREA":		"Usuario creado satisfactoriamente",
					"WARN":				"¡Aviso!",
					"USER_NVAL":		"Nombre de usuario o correo inválido",
					"ROLES_REQ" :		"Roles es requerido",
					"PROJS_REQ" :		"Proyectos es requerido",
					"ACTI_REQ" :		"Estado",
					"CODE_REQ" :		"Código es requerido",
					"OBSR_REQ" :		"Observación es requerido",
					"STAT_REQ" :		"Estado es requerido",
				},
				
				"CONF": {
					"SEND_MAIL":		"Un correo electrónico le ha sido enviado. Debe esperar a que el administrador acepte su solicitud."
				},
				
				"ALRT": {
					"ALRT":				"Aviso",
					"USER_UPDT":		"El usuario fue actualizado exitosamente.",
					"USER_DELE":		"El usuario fue eliminado exitosamente.",
					"PROJ_NEW":			"El proyecto fue registrado exitosamente.",
					"PROJ_UPDT":		"El proyecto fue actualizado exitosamente.",
					"PROJ_DELE":		"El proyecto fue eliminado exitosamente.",
					"PROJ_CLSE":		"El proyecto fue cerrado exitosamente.",
					"ACT_NEW":			"La actividad fue registrada exitosamente.",
					"ACT_UPDT":			"La actividad fue actualizada exitosamente.",
					"ACT_DELE":			"La actividad fue eliminada exitosamente.",
					"ACT_CMPL":			"La actividad fue cerrada correctamente.",
					"ORDER_CLOSE":		"Orden fue cerrada con éxito",
					"ALRT01":			"Orden confirmada exitosamente",
					"ALRT02":			"Precinto asignado exitosamente",
					"ALRT03":			"Una vez confirmado el pedido no podrá deshacer esta operación",
				},
				
				"DOMAIN": {
					"YES" :				"Activo",
					"NO" :				"Inactivo",
					"Y":				"Si",
					"N":				"No",
				},
				
				"WBL4B": {
					"EXCEPT_RESULT":	"Se produjo una excepción en el resultado",
					"ERROR_OPEN_PORT":	"Error en la apertura del puerto",
					"ERROR_CLOSE_PORT":	"Error en el cierre del puerto",
					"ERROR_READ_PORT":	"Error en la lectura del puerto",
					"ERROR_METHOD_RUN": "Error en método de ejecución",
					"LIBRARY_NOT_FOUND":"Error al cargar libreria RXTX",
					"PORT_NOT_FOUND":	"Puerto no encontrado",
					"UNSTAB":			"Romana inestable",
					"WEIGHT_NEGATIVE":	"Peso negativo",
					"NO_CHECK_ZERO":	"Peso no pasó por cero",
					"WEIGH_OCUPPIED":	"Romana ocupada",
					"WEIGH_UNOCUPPIED":	"Romana desocupada",
					"DISCONECT":		"Romana desconectada",
					"ERROR01":			"No puede eliminar una orden suspendida",
					"ERROR02":			"No puede eliminar una orden cerrada",
					"ERROR03":			"Orden sin líneas",
					"ERROR04":			"Existen líneas sin desglose de pesajes",
					"ERROR05":			"Existen líneas para las que aun no se completa el pedido",
					"ERROR06":			"Estado de orden incorrecto para proceder al cierre",
					"ERROR07":			"Estado incorrecto para imprimir",
					"ERROR08":			"Estado incorrecto para suspender orden",
					"ERROR09":			"Estado incorrecto para retomar orden",
					"ERROR010":			"Estado incorrecto para anular orden",
					"ERROR011":			"Estado incorrecto para eliminar orden",
					"ERROR012":			"Orden aun posee líneas",
					"ERROR013":			"Pedido no posee líneas",
					"ERROR014":			"Debe seleccionar primero el producto a pesar",
					"ERROR015":			"Estado incorrecto para editar orden",
				},
				
				"TLTPS": {
					"TP07":				"Ejemplo: T1, TS1, H1, ...",
					"TP08":				"Ejemplo: -10 a 50CC, 0 a 239 kpa, Atmosférico 400ppm, ...",
					"TP09":				"Ejemplo: Temperatura, gas, ultravioleta, ...",
					"TP10":				"Estaciones accedidas a través del dominio",
					
					"CHAR_UNIT_TP":		"Unidad de medida con la que trabajará el indicador. Ejemplo: kg",
					"CHAR_SEPA_TP":		"Carácter separador de los distintos grupos que conforman a una cadena. Ejemplo: la coma(,) en la cadena ST,GS,+0008900kg",
					"CHAR_STAB_TP":		"Carácter que indica la estabilidad del peso. Ejemplo: 'ST' en la cadena ST,GS,+0008900kg",
					"NMAX_STAB_TP":		"Cantidad de lecturas de pesos estables consecutivas que deben ser realizadas para asegurar la estabilidad del peso",
					"NMAX_UNST_TP":		"Cantidad de lecturas de pesos inestables consecutivas que deben ser realizadas para asegurar la inestabilidad del peso",
					"VAL_MIN_TP":		"Valor mínimo considerado como cero",
					"VAL_MAX_TP":		"Valor máximo considerado como cero",
					"NREAD_TRIED_TP":	"Número máximo de intentos de lecturas que deben realizarse para asegurar la desconexión de la unidad de display",
					"NMAX_SLEP_TP":		"Added delay in port reading that allows waiting a certain amount of seconds when the weight is unstable",
					"SRVR_PORT_TP":		"Puerto que prestará servicio para las capturas de pesos. Este es el mismo que el usado por WeighBridgeLite4Baan",
					"USE_TP":			"Seleccionar para usar en romana",
					"DIBRTE_TP":			"Diferencia entre peso bruto y peso teórico",
					"POBRTE_TP":			"Diferencia en porcentaje entre peso bruto y peso teórico",
					
					"NAME_PORT_TP":		"Identificador para el puerto donde conectará el display. Ejemplo: en Windows es posible conectar el display al puerto 'COM1' o 'COM2'",
					"DSCA_PORT_TP":		"Descripción para el puerto. Ejemplo: Puerto serial COM1",
					"TIME_OUT_TP":		"Tiempo máximo a esperar por la apertura del puerto (milisegundos)",
					"TRACED_TP":		"Permite a la aplicación WeighBridgeLite4Baan registrar en el log",
					"TP01":				"Búsqueda por número de orden",
					"TP02":				"Búsqueda por nombre, apellido y correo",
					"TP03":				"Búsqueda por id, puerto y descripción",
					"TP04":				"Búsqueda por código y descripción",
					"TP05":				"Búsqueda por descripción y fecha",
					"TP06":				"Búsqueda por id, código y descripción",
				
				},
				
				"FORM": {
					"USER":				"Usuario - ",
					"MAE1007":			"Indicador - ",
					"MAE1008":			"Puerto - ",
					"MAE1013":			"Cabecera orden - ",
					"PAR1001":			"Parámetros generales - ",
					"UTI1006":			"Motivos - ",
					"MAE1014":			"Linea de Orden -",
					"MAE1015":			"Peso de linea -",
					
					"EDIT":				"Edición",
					"NEW":				"Creación",
					"QUERY":			"Consulta",
				},
				
				"ORDER": {
					"CREA":				"Creadas",
					"PROC":				"En Proceso",
					"SUSP":				"Suspendidas",
					"CLSE":				"Cerradas",
					"EXPO":				"Exportadas",
					"ELIM":				"Eliminadas",
				},
				
			});
			
			$translateProvider.preferredLanguage('en');
			$translateProvider.useSanitizeValueStrategy('escape');
		} ]);

"use strict";
angular.module('messages').service('translations', translations);
translations.$inject = [ '$http', '$q', '$translate' ];
function translations($http, $q, $translate) { 
	return {
		transMstr : function() {
			return transMstr();
		},
		transOptSelect: function ($scope) {
			var toTrans = transLanguages();
			$translate(toTrans).then(function(translation) {
				$scope.opts_langs = {
						availableLangs : [ {
							id : 'es',
							name : translation['GENE.SPANISH']
						}, {
							id : 'en',
							name : translation['GENE.ENGLISH']
						} ]
					};
			});
		},
		currentLang : function (lang, $scope) {
			switch(lang){
			case 'es':
				return $scope.opts_langs.availableLangs[0];
				break;
			case 'en':
				return $scope.opts_langs.availableLangs[1];
				break;
			}
		},
		
		setLocale: function(lang) {
			var deferred = $q.defer();
			$http.get("/Sensor/user/locale/?locale="+lang).then(function successCallback(response) {
                deferred.resolve(response);
			}, function errorCallback(response) {
				deferred.reject(response.error);
			});
			
			return deferred.promise;
		},
		
		setLanguage : function(lang) {
			var deferred = $q.defer();
			$http.post("/Sensor/user/create_language", lang).then(function successCallback(response) {
                deferred.resolve(response);
			}, function errorCallback(response) {
				deferred.reject(response.error);
			});
			
			return deferred.promise;
		},
		
		getLanguage : function() {
			var deferred = $q.defer();
			$http.get("/Sensor/user/language").then(function successCallback(response) {
                deferred.resolve(response);
			}, function errorCallback(response) {
				deferred.reject(response.error);
			});
			
			return deferred.promise;
		},
	}
		
	function transMstr() {
		var toTrans = new Array();
		toTrans.push('GENE.SPANISH');
		toTrans.push('GENE.ENGLISH');
		toTrans.push('GENE.REMOVE');
		toTrans.push('GENE.DETAIL');
		toTrans.push('GENE.ANUL');
		return toTrans;
	}
	
	function transLanguages() {
		var toTrans = new Array();
		toTrans.push('GENE.SPANISH');
		toTrans.push('GENE.ENGLISH');
		return toTrans;
	}
}

"use strict";
angular.module('messages').service('changeLang', changeLang);
changeLang.$inject = [ '$http', '$q', '$window', '$translate' ];
function changeLang($http, $q, $window, $translate ) { 
	return {
		set: function() {
			var lang = ($window.navigator.language || $window.navigator.userLanguage).indexOf("es") == 0 ? "es" : "en"; 
			$translate.use(lang);
		},
		getEnumLang: function() {
			if($translate.use() == "es") {
				return 0;
			}else{
				return 1;
			}
		}
	}
}

(function() {
	"use strict";
	angular.module('messages')
			.controller('languagesController', languagesController);
	languagesController.$inject = [ '$scope', '$translate', 'translations', '$window', 'NOT_CONTENT'];
	function languagesController($scope, $translate, translations, $window, NOT_CONTENT) {
		translations.getLanguage().then(function(response) {
			if(response.status == NOT_CONTENT) {
				var lang = ($window.navigator.language || $window.navigator.userLanguage).indexOf("es") == 0 ? "es" : "en"; 
			}else {
				var lang = response.data;
			}
			
			$translate.use(lang);
			translations.transOptSelect($scope);
			$scope.changeLanguage2 = function(option) {
				console.log();
				if( ($translate.use() != option.id) ){
					translations.setLocale(option.id).then(function(response) {
						translations.setLanguage(option.id).then(function(response) {
							$window.location.reload();
				        })
				        .catch(function(error) {
				        });
					})
			        .catch(function(error) {
			        });
				}
			};
        })
        .catch(function(error) {
        });
	}
})();

angular.module('messages').component('languages',
{
	templateUrl : "/Sensor/resources/js/angular/js/locale/languages.jsp",
	controller : 'languagesController'
});