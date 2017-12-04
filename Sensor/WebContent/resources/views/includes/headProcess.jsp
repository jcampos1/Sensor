<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title><spring:message code="${page_title}" /></title>
<!-- Tell the browser to be responsive to screen width -->
<meta
	content="width=device-width, initial-scale=1, maximum-scale=1, -scalable=no"
	name="viewport">
<!-- Font Awesome -->
<link rel="stylesheet"
	href="/Sensor/resources/css/font-awesome.min.css">
<!-- Ionicons -->
<link rel="stylesheet"
	href="/Sensor/resources/css/ionicons.min.css">
<!-- Theme style -->
<link rel="stylesheet"
	href="/Sensor/resources/dist/css/AdminLTE.min.css">
<!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
<link rel="stylesheet"
	href="/Sensor/resources/dist/css/skins/_all-skins.min.css">
<link rel="stylesheet"
	href="/Sensor/resources/css/checkboxes.min.css">
<link href="/Sensor/resources/css/styles.css"
	rel="stylesheet">
	
<link rel="stylesheet"
	href="/Sensor/resources/css/sweetalert.css">

<spring:url value="/resources/js/angular/node_modules/angular.js"
	var="angularJs" />
	
<spring:url value="/resources/js/angular/node_modules/sockjs.min.js"
	var="sockjs" />

<spring:url value="/resources/js/angular/node_modules/stomp.js"
	var="stomp" />

<spring:url value="/resources/js/angular/node_modules/sweetalert.min.js"
	var="SweetAlertMinJs" />

<spring:url
	value="/resources/js/angular/node_modules/NgSweetAlert.min.js"
	var="NgSweetAlertMinJs" />

<spring:url
	value="/resources/js/angular/node_modules/angular-ui-grid-translate.js"
	var="translateUiGridJs" />

<spring:url
	value="/resources/js/angular/node_modules/angular-translate.min.js"
	var="angularTranslateJs" />

<spring:url value="/resources/js/angular/js/services/NotifyService.js"
	var="notifyServ" />
<spring:url value="/resources/js/angular/js/services/UTI1006Service.js"
	var="uti1006ServJs" />

<spring:url value="/resources/js/angular/js/services/abstractService.js"
	var="abstServ" />
<spring:url value="/resources/js/angular/js/Constants.js"
	var="constants" />
<spring:url value="/resources/js/angular/node_modules/angular-touch.js"
	var="angularTouchJs" />
<spring:url value="/resources/js/angular/node_modules/ngMask.min.js"
	var="ngMask" />

<spring:url
	value="/resources/js/angular/js/components/MAE1013/new-mae1013.js"
	var="newMAE1013Js" />

<spring:url
	value="/resources/js/angular/js/components/MAE1012/select-mae1012.js"
	var="selectMAE1012Js" />
<spring:url
	value="/resources/js/angular/js/components/UTI1006/select-uti1006.js"
	var="selectUTI1006Js" />

<spring:url
	value="/resources/js/angular/js/components/MAE1013/assign-seals.js"
	var="assignSealsJs" />

<spring:url value="/resources/js/jquery-2.2.3.min.js" var="jquery" />
<spring:url value="/resources/js/jquery.inputmask.bundle.js"
	var="inputmask" />
<spring:url value="/resources/js/validations.js" var="utils" />
<spring:url value="/resources/js/angular/js/processApp.js"
	var="processApp" />

<spring:url
	value="/resources/js/angular/js/controllers/MAE1013Controller.js"
	var="mstrMAE1013Js" />

<spring:url
	value="/resources/js/angular/js/services/GRIDMAE1013Service.js"
	var="GRIDMAE1013ServJs" />

<spring:url value="/resources/js/angular/js/services/GenericService.js"
	var="servicesJs" />

<spring:url value="/resources/js/angular/js/services/MAE1013Service.js"
	var="mae1013ServJs" />

<spring:url
	value="/resources/js/angular/js/services/GRIDMAE1012Service.js"
	var="GRIDMAE1012ServJs" />

<spring:url
	value="/resources/js/angular/js/services/GRIDUTI1006Service.js"
	var="GRIDUTI1006ServJs" />

<spring:url value="/resources/js/angular/js/services/MAE1013Service.js"
	var="mae1013ServJs" />
<spring:url
	value="/resources/js/angular/node_modules/ui-bootstrap-tpls-2.0.1.min.js"
	var="uiBootstrap" />
<spring:url value="/resources/js/bootstrap/bootstrap-notify.min.js"
	var="bootstrap_notify" />
<spring:url value="/resources/js/angular/node_modules/contextMenu.js"
	var="contextMenu" />

<spring:url
	value="/resources/js/angular/node_modules/angular-ui-router.min.js"
	var="ui_router" />
<link
	href="/Sensor/resources/css/bootstrap.min.css"
	rel="stylesheet">

<link href="/Sensor/resources/css/bootstrap/animate.css"
	rel="stylesheet">
	
	<!--------------------- MAE1001  ---------------------->
<spring:url
	value="/resources/js/angular/js/services/MAE1001Service.js"
	var="mae1001service" />
<spring:url
	value="/resources/js/angular/js/components/usuario/new-user.js"
	var="newUserJs" />
<spring:url
	value="/resources/js/angular/js/components/MAE1008/new-mae1008.js"
	var="newMAE1008Js" />
<spring:url
	value="/resources/js/angular/js/controllers/UserController.js"
	var="mainControllersJs" />
<!--<spring:url
	value="/resources/js/angular/js/controllers/UserValidation.js"
	var="userValJs" />  -->

<spring:url
	value="/resources/js/angular/js/components/usuario/user-for-aprob.js"
	var="userForAprobationJs" />
<!---------------------------------------------------->

<!--------------------- SPINNER -------------->
<spring:url
value="/resources/js/angular/node_modules/spin.min.js"
var="spin" />
<spring:url
value="/resources/js/angular/node_modules/angular-loading-spinner.js"
var="loadspin" />
<spring:url
value="/resources/js/angular/node_modules/angular-spinner.min.js"
var="anguspin" />
<!--------------------------------------------------->

<!--------------------- UTI1006  ---------------------->
<spring:url
	value="/resources/js/angular/js/controllers/UTI1006Controller.js"
	var="mstrUTI1006Js" />
<spring:url value="/resources/js/angular/js/services/UTI1006Service.js"
	var="uti1006ServJs" />

<spring:url
	value="/resources/js/angular/js/components/UTI1006/select-uti1006.js"
	var="selectUTI1006Js" />
<!---------------------------------------------------->

<!--------------------- MAE1008  ---------------------->
<spring:url
	value="/resources/js/angular/js/components/MAE1007/select-mae1008.js"
	var="selectMAE1008Js" />
<spring:url value="/resources/js/angular/js/services/MAE1008Service.js"
	var="portServJs" />
<spring:url
	value="/resources/js/angular/js/controllers/MAE1008Controller.js"
	var="mstrMAE1008Js" />
<!---------------------------------------------------->

<!--------------------- MAE1007  ---------------------->
<spring:url
	value="/resources/js/angular/js/components/MAE1007/new-mae1007.js"
	var="newMAE1007Js" />
<spring:url
	value="/resources/js/angular/js/controllers/MAE1007Controller.js"
	var="mstrMAE1007Js" />

<spring:url value="/resources/js/angular/js/services/SimulatorService.js"
	var="simServ" />
<spring:url value="/resources/js/angular/js/services/MAE1007Service.js"
	var="mae1007ServJs" />

<spring:url
	value="/resources/js/angular/js/components/MAE1007/current-simulator.js"
	var="currentMAE1007Js" />
<!---------------------------------------------------->

<!--------------------- Station  ---------------------->
<spring:url value="/resources/js/angular/js/services/StationService.js"
	var="StationService" />

<spring:url
	value="/resources/js/angular/js/services/GridSelectStation.js"
	var="GridSelectStation" />
	
<spring:url
	value="/resources/js/angular/js/controllers/StationController.js"
	var="StationController" />
<!---------------------------------------------------->

<!--------------------- Sensor  ---------------------->
<spring:url value="/resources/js/angular/js/services/GridSensorService.js"
	var="SensorConfigurationGrid" />
	
<spring:url value="/resources/js/angular/js/services/SensorService.js"
	var="SensorService" />

<spring:url
	value="/resources/js/angular/js/controllers/SensorController.js"
	var="SensorController" />
<!---------------------------------------------------->

<!--------------------- Tipo de Sensor  ---------------------->
<spring:url value="/resources/js/angular/js/services/GridTypesensorService.js"
	var="TypesensorConfigurationGrid" />
	
<spring:url value="/resources/js/angular/js/services/TypesensorService.js"
	var="TypesensorService" />
	
<spring:url
	value="/resources/js/angular/js/services/GridSelectTypesensor.js"
	var="GridSelectTypesensor" />

<spring:url
	value="/resources/js/angular/js/controllers/TypesensorController.js"
	var="TypesensorController" />
<!---------------------------------------------------->

<!--------------------- Role  ---------------------->
<spring:url value="/resources/js/angular/js/services/GridRoleService.js"
	var="RoleConfigurationGrid" />
	
<spring:url value="/resources/js/angular/js/services/RoleService.js"
	var="RoleService" />

<spring:url
	value="/resources/js/angular/js/controllers/RoleController.js"
	var="RoleController" />
<!---------------------------------------------------->

<!--------------------- Micro  ---------------------->
<spring:url value="/resources/js/angular/js/services/TryReadingService.js"
	var="TryReadingService" />
<spring:url value="/resources/js/angular/js/services/MicroService.js"
	var="MicroService" />
<spring:url
	value="/resources/js/angular/js/controllers/MicroController.js"
	var="MicroController" />
<!---------------------------------------------------->

<!--------------------- MAE1001  ---------------------->
<spring:url value="/resources/js/angular/js/services/GridMAE1001Service.js"
	var="MAE1001ConfigurationGrid" />
	
<spring:url value="/resources/js/angular/js/services/MAE1001Service.js"
	var="MAE1001Service" />

<spring:url
	value="/resources/js/angular/js/controllers/MAE1001Controller.js"
	var="MAE1001Controller" />
<!---------------------------------------------------->

<!--------------------- PAR1001  ---------------------->
<spring:url
	value="/resources/js/angular/js/components/PAR1001/current-parameter.js"
	var="currentPAR1001Js" />
<spring:url value="/resources/js/angular/js/services/PAR1001Service.js"
	var="par1001ServJs" />

<spring:url
	value="/resources/js/angular/js/controllers/PAR1001Controller.js"
	var="mstrPAR1001Js" />
<!---------------------------------------------------->

<!--------------------- NUMBER DYNAMIC -------------->
<spring:url
value="/resources/js/angular/node_modules/dynamic-number.min.js"
var="dynanumb" />
<!--------------------------------------------------->

<!--------------------- PATTERN -------------------->
<spring:url
value="/resources/js/angular/node_modules/ng-pattern-restrict.js" var="pattern" />
<!--------------------------------------------------->

<!--------------------- COOKIES --------------------->
<spring:url
value="/resources/js/angular/node_modules/cookies.js" var="cookies" />
<!--------------------------------------------------->

<!--------------------- SEARCH MAE1012 COMPONENT -------------->
<spring:url
value="/resources/js/angular/js/components/MAE1012/search-mae1012.js"
var="searchMAE1012Js" />
<!--------------------------------------------------->

<!--------------------- SEARCH MAE1011 COMPONENT -------------->
<spring:url
value="/resources/js/angular/js/components/MAE1011/search-mae1011.js"
var="searchMAE1011Js" />
<!--------------------------------------------------->

<!--------------------- SEARCH MAE1016 COMPONENT -------------->
<spring:url
value="/resources/js/angular/js/components/MAE1016/search-mae1016.js"
var="searchMAE1016Js" />
<!--------------------------------------------------->

<!--------------------- SEARCH MAE1017 COMPONENT -------------->
<spring:url
value="/resources/js/angular/js/components/MAE1017/search-mae1017.js"
var="searchMAE1017Js" />
<!--------------------------------------------------->

<!--------------------- SEARCH MAE1018 COMPONENT -------------->
<spring:url
value="/resources/js/angular/js/components/MAE1018/search-mae1018.js"
var="searchMAE1018Js" />
<!--------------------------------------------------->

<!--------------------- SEARCH MAE1009 COMPONENT -------------->
<spring:url
value="/resources/js/angular/js/components/MAE1009/search-mae1009.js"
var="searchMAE1009Js" />
<!--------------------------------------------------->

<!--------------------- PRECINTOS COMPONENT -------------->
<spring:url
value="/resources/js/angular/js/components/PREC/CPREC.js"
var="CPREC" />
<!--------------------------------------------------->

<!--*********************DEPENDENCIAS COMUNES*****************-->
<!-------------------------- Mensajes -------------->
<spring:url value="/resources/js/angular/js/locale/messages.js"
	var="messages" />
<!--------------------------------------------------->
	
<!--------------------- Comunication01 -------------->
<spring:url value="/resources/js/angular/js/services/Comunication01.js"
	var="comunication01" />
<!--------------------------------------------------->

<!--------------------- Comunication02 -------------->
<spring:url value="/resources/js/angular/js/services/Comunication02.js"
	var="comunication02" />
<!--------------------------------------------------->

<!--------------------- Comunication02 -------------->
<spring:url value="/resources/js/angular/js/services/Comunication02.js"
	var="comunication02" />
<!--------------------------------------------------->

<!---------------------- Parámetros ----------------->
<spring:url value="/resources/js/angular/js/services/Parameters.js"
	var="parameters" />
<!--------------------------------------------------->
<!--**********************************************************-->

<!----- MODULO GENERAL PARA DEPENDENCIAS COMUNES ---->
<spring:url value="/resources/js/angular/js/Commons.js"
	var="commons" />
<!--------------------------------------------------->

<!--------------------- Widgets01 -------------->
<spring:url
	value="/resources/js/angular/js/components/WIDGETS/widgets01.js"
	var="widgets01" />
<!--------------------------------------------------->

<!--------------------- Widgets02 -------------->
<spring:url
	value="/resources/js/angular/js/components/WIDGETS/widgets02.js"
	var="widgets02" />
<!--------------------------------------------------->

<!--------------------- Seleccion de entidad articulo-------------->
<spring:url
	value="/resources/js/angular/js/services/GRIDMAE1009Service.js"
	var="gridmae1009Service" />
<spring:url
	value="/resources/js/angular/js/components/MAE1009/select-mae1009.js"
	var="selectMAE1009" />
<!----------------------------------------------------------------->

<!--------------------- DETALLE CONTENEDORES POR DESGLOSE DE PESAJE -------------->
<spring:url
	value="/resources/js/angular/js/services/GRIDMAE1010DESGLOSEService.js"
	var="gridmae1010desgloseService" />
<spring:url
	value="/resources/js/angular/js/components/MAE1010/desglose-mae1010.js"
	var="desgloseMAE1010" />
<!-------------------------------------------------------------------------------->

<!--------------------- DETALLE RETORNBALES POR ORDEN -------------->
<spring:url
	value="/resources/js/angular/js/components/MAE1010/GMAE1010_01.js"
	var="GMAE1010_01" />
<spring:url
	value="/resources/js/angular/js/components/MAE1010/CMAE1010_01.js"
	var="CMAE1010_01" />
<!-------------------------------------------------------------------------------->

<!--------------------- Seleccion de entidad conductor-------------->
<spring:url
	value="/resources/js/angular/js/components/MAE1011/GRIDMAE1011Service.js"
	var="gridmae1011Service" />
<spring:url
	value="/resources/js/angular/js/components/MAE1011/select-mae1011.js"
	var="selectMAE1011" />
<!----------------------------------------------------------------->

<!--------------------- MAE1007  ---------------------->
<spring:url value="/resources/js/angular/js/services/MAE1007Service.js"
	var="mae1007ServJs" />
<!---------------------------------------------------->

<!--------------------- Seleccion de entidad contenedores -------------->
<spring:url
	value="/resources/js/angular/js/services/GRIDMAE1010Service.js"
	var="gridmae1010Service" />
<spring:url
	value="/resources/js/angular/js/components/MAE1010/select-mae1010.js"
	var="selectMAE1010" />
<!---------------------------------------------------------------------->

<!--------------------- COMPONENTE CONTROLES DE PESAJE  -------------->
<spring:url
	value="/resources/js/angular/js/components/PESO/ctrl-pesaje.js"
	var="ctrlComponent" />
<!---------------------------------------------------------------------->

<!--------------------- MAE1015  -------------->
<spring:url
	value="/resources/js/angular/js/services/GRIDMAE1015Service.js"
	var="gridmae1015Service" />
<spring:url value="/resources/js/angular/js/services/MAE1015Service.js"
	var="mae1015Service" />
<spring:url
	value="/resources/js/angular/js/controllers/MAE1015Controller.js"
	var="mstrMAE1015APP" />
<!---------------------------------------------------------------------->

<!------------------------------ SERVICIO INDICADOR---------------->
<spring:url
	value="/resources/js/angular/js/services/SimulatorService.js"
	var="simulatorService" />
<!----------------------------------------------------------------->

<!------------------------- MAE1014 -------------------------------->
<spring:url value="/resources/js/angular/js/services/MAE1014Service.js"
	var="mae1014Service" />
<spring:url
	value="/resources/js/angular/js/services/GRIDMAE1014Service.js"
	var="GRIDMAE1014Service" />
<spring:url
	value="/resources/js/angular/js/components/MAE1014/new-mae1014.js"
	var="newMAE1014" />
<spring:url
	value="/resources/js/angular/js/controllers/MAE1014Controller.js"
	var="mstrMAE1014APP" />
<!----------------------------------------------------------------->

<!------------------------- CONTROLADOR PADRE  -------------------------------->
<spring:url
	value="/resources/js/angular/js/controllers/MedioController.js"
	var="medioAPP" />
<!----------------------------------------------------------------->

<!------------------------- SERVICIO PARA LOS MENSAJES DE ERROR CON SWEETALERT  -------------------------------->
<spring:url value="/resources/js/angular/js/services/AlertService.js"
	var="AlertAPP" />
<!----------------------------------------------------------------->

<!--------------------- MAE1016  ---------------------->
<spring:url
	value="/resources/js/angular/js/components/MAE1016/GRIDMAE1016Service.js"
	var="gridmae1016serv" />

<spring:url
	value="/resources/js/angular/js/components/MAE1016/select-mae1016.js"
	var="selectmae1016serv" />
<!---------------------------------------------------->

<!--------------------- MAE1017  ---------------------->
<spring:url
	value="/resources/js/angular/js/components/MAE1017/GRIDMAE1017Service.js"
	var="gridmae1017serv" />
<spring:url
	value="/resources/js/angular/js/components/MAE1017/select-mae1017.js"
	var="selectmae1017serv" />
<!---------------------------------------------------->

<!--------------------- MAE1018  ---------------------->
<spring:url
	value="/resources/js/angular/js/components/MAE1018/GRIDMAE1018Service.js"
	var="gridmae1018serv" />
<spring:url
	value="/resources/js/angular/js/components/MAE1018/select-mae1018.js"
	var="selectmae1018serv" />
<!---------------------------------------------------->

<!--------------------- PAR1001  ---------------------->
<spring:url value="/resources/js/angular/js/services/PAR1001Service.js"
	var="par1001serv" />

<!---------------------------------------------------->

<script type="text/javascript" src="${jquery}"></script>
<script type="text/javascript" src="${angularJs}"></script>
<script type="text/javascript" src="${sockjs}"></script>
<script type="text/javascript" src="${stomp}"></script>
<script type="text/javascript" src="${NgSweetAlertMinJs}"></script>
<script type="text/javascript" src="${SweetAlertMinJs}"></script>
<script type="text/javascript" src="${translateUiGridJs}"></script>
<script
	src="/Sensor/resources/js/angular/node_modules/chosen.jquery.min.js"></script>
<script
	src="/Sensor/resources/js/angular/node_modules/angular-chosen.min.js"></script>
<link rel="stylesheet" type="text/css"
	href="/Sensor/resources/css/chosen.css" />

<!--------------------UI ROUTER----------------------->
<script type="text/javascript" src="${ui_router}"></script>
<!---------------------------------------------------->

<script type="text/javascript" src="${constants}"></script>
<script type="text/javascript" src="${angularTranslateJs}"></script>
<script type="text/javascript" src="${angularTouchJs}"></script>
<script type="text/javascript" src="${ngMask}"></script>
<script type="text/javascript" src="${inputmask}"></script>
<script type="text/javascript" src="${utils}"></script>
<script type="text/javascript" src="${uiBootstrap}"></script>
<script type="text/javascript" src="${bootstrap_notify}"></script>
<script type="text/javascript" src="${contextMenu}"></script>
<script type="text/javascript" src="${pattern}"></script>
<script type="text/javascript" src="${cookies}"></script>

<!-------------------- SPINNER ----------------------->
<script type="text/javascript" src="${spin}"></script>
<script type="text/javascript" src="${anguspin}"></script>
<script type="text/javascript" src="${loadspin}"></script>
<!---------------------------------------------------->

<!-------------------- NUMER DYNAMIC ----------------------->
<script type="text/javascript" src="${dynanumb}"></script>
<!---------------------------------------------------------->

<!------------------ANGULAR ANIMATE--------------------->
<script src="/Sensor/resources/js/angular/node_modules/angular-animate.js"></script>
<!------------------------------------------------------>
	
<!---------------------UI-GRID-------------------------->
<script src="/Sensor/resources/js/angular/node_modules/ui-grid.js"></script>
<link rel="stylesheet" href="/Sensor/resources/css/ui-grid.css"
	type="text/css">
<script src="/Sensor/resources/js/angular/node_modules/csv.js"></script>
<script src="/Sensor/resources/js/angular/node_modules/pdfmake.min.js"></script>
<script src="/Sensor/resources/js/angular/node_modules/vfs_fonts.js"></script>
<!------------------------------------------------------>

<!-------------------- I18N ---------------------------->
<script type="text/javascript" src="${messages}"></script>
<!------------------------------------------------------>

<!-------------------- NOTIFICACIONES ------------------>
<script type="text/javascript" src="${notifyServ}"></script>
<!------------------------------------------------------>

<!----------------- CONFIGURACION GRID ----------------->
<script type="text/javascript" src="${abstServ}"></script>
<!------------------------------------------------------>

<!-------------------- COMUNICATION01 ------------------>
<script type="text/javascript" src="${comunication01}"></script>
<!------------------------------------------------------>

<!-------------------- COMUNICATION02 ------------------>
<script type="text/javascript" src="${comunication02}"></script>
<!------------------------------------------------------>

<!------------------- PARÁMETROS ----------------------->
<script type="text/javascript" src="${parameters}"></script>
<!------------------------------------------------------>

<!----- MODULO GENERAL CON DEPENDENCIAS COMUNES -------->
<script type="text/javascript" src="${commons}"></script>
<!------------------------------------------------------>

<!-------- MENSAJES DE ERRRORES Y ALERTAS -------------->
<script type="text/javascript" src="${AlertAPP}"></script>
<!------------------------------------------------------>

<!--------------- SERVICIO GENERICO --------------------->
<script type="text/javascript" src="${servicesJs}"></script>
<!------------------------------------------------------>

<!-- USER -->
<!--  <script type="text/javascript" src="${mae1001service}"></script>
<script type="text/javascript" src="${userServJs}"></script>
<script type="text/javascript" src="${newUserJs}"></script>
<script type="text/javascript" src="${userForAprobationJs}"></script>
<script type="text/javascript" src="${mainControllersJs}"></script>
<script type="text/javascript" src="${userValJs}"></script>-->
<!------------->

<!-- UTI1006 -->
<script type="text/javascript" src="${GRIDUTI1006ServJs}"></script>
<script type="text/javascript" src="${selectUTI1006Js}"></script>
<script type="text/javascript" src="${uti1006ServJs}"></script>
<script type="text/javascript" src="${mstrUTI1006Js}"></script>
<!------------->

<!------------------- medio -------------------------->
<script type="text/javascript" src="${medioAPP}"></script>
<!------------------------------------------------------>

<!---------------------- PAR1001 ----------------------->
<script type="text/javascript" src="${par1001ServJs}"></script>
<script type="text/javascript" src="${currentPAR1001Js}"></script>
<script type="text/javascript" src="${mstrPAR1001Js}"></script>
<!------------------------------------------------------>

<!-------------------- PRECINTOS COMPONENT ------------->
<script type="text/javascript" src="${CPREC}"></script>
<!------------------------------------------------------>

<!--------------------- MAE1013 ------------------------>
<script type="text/javascript" src="${mae1013ServJs}"></script>
<script type="text/javascript" src="${GRIDMAE1013ServJs}"></script>
<script type="text/javascript" src="${uti1006ServJs}"></script>
<script type="text/javascript" src="${GRIDMAE1012ServJs}"></script>
<script type="text/javascript" src="${assignSealsJs}"></script>
<script type="text/javascript" src="${newMAE1013Js}"></script>
<script type="text/javascript" src="${selectMAE1012Js}"></script>
<script type="text/javascript" src="${searchMAE1012Js}"></script>
<script type="text/javascript" src="${searchMAE1011Js}"></script>
<script type="text/javascript" src="${searchMAE1016Js}"></script>
<script type="text/javascript" src="${searchMAE1017Js}"></script>
<script type="text/javascript" src="${searchMAE1018Js}"></script>
<script type="text/javascript" src="${mstrMAE1013Js}"></script>
<!------------------------------------------------------>

<!---------------------- Widgets01 --------------------->
<script type="text/javascript" src="${widgets01}"></script>
<!------------------------------------------------------>

<!-- MAE1008 -->
<script type="text/javascript" src="${portServJs}"></script>
<script type="text/javascript" src="${selectMAE1008Js}"></script>
<script type="text/javascript" src="${newMAE1008Js}"></script>
<script type="text/javascript" src="${mstrMAE1008Js}"></script>
<!------------->

<!-- MAE1007 -->
<script type="text/javascript" src="${simServ}"></script>
<script type="text/javascript" src="${mae1007ServJs}"></script>
<script type="text/javascript" src="${newMAE1007Js}"></script>
<script type="text/javascript" src="${currentMAE1007Js}"></script>
<script type="text/javascript" src="${mstrMAE1007Js}"></script>
<!------------->

<!------------- Seleccion de entidad articulo ---------->
<script type="text/javascript" src="${gridmae1009Service}"></script>
<script type="text/javascript" src="${selectMAE1009}"></script>
<!------------------------------------------------------>

<!------ DETALLE CONTENEDORES POR DESGLOSE DE PESAJE --->
<script type="text/javascript" src="${gridmae1010desgloseService}"></script>
<script type="text/javascript" src="${desgloseMAE1010}"></script>
<!------------------------------------------------------>

<!------------- DETALLE RETORNABLES POR ORDEN ---------->
<script type="text/javascript" src="${GMAE1010_01}"></script>
<script type="text/javascript" src="${CMAE1010_01}"></script>
<!------------------------------------------------------>

<!----------- Seleccion de entidad conductor ----------->
<script type="text/javascript" src="${gridmae1011Service}"></script>
<script type="text/javascript" src="${selectMAE1011}"></script>
<!------------------------------------------------------>

<!----------- Seleccion de entidad contenedores -------->
<script type="text/javascript" src="${gridmae1010Service}"></script>
<script type="text/javascript" src="${selectMAE1010}"></script>
<!------------------------------------------------------>

<!--- SERVICIO MAE1015, UTILIZADO TAMBIEN POR MAE1014 -->
<script type="text/javascript" src="${mae1015Service}"></script>
<!------------------------------------------------------>

<!--------------------- MAE1014 ------------------------>
<script type="text/javascript" src="${mae1014Service}"></script>
<script type="text/javascript" src="${GRIDMAE1014Service}"></script>
<script type="text/javascript" src="${newMAE1014}"></script>
<script type="text/javascript" src="${searchMAE1009Js}"></script>
<script type="text/javascript" src="${mstrMAE1014APP}"></script>
<!------------------------------------------------------>

<!--------------------- MAE1015 ------------------------>
<script type="text/javascript" src="${gridmae1015Service}"></script>
<script type="text/javascript" src="${mstrMAE1015APP}"></script>
<!------------------------------------------------------>

<!--------------------- MAE1016 ------------------------>
<script type="text/javascript" src="${gridmae1016serv}"></script>
<script type="text/javascript" src="${selectmae1016serv}"></script>
<!------------------------------------------------------>

<!--------------------- MAE1017 ------------------------>
<script type="text/javascript" src="${gridmae1017serv}"></script>
<script type="text/javascript" src="${selectmae1017serv}"></script>
<!------------------------------------------------------>

<!--------------------- MAE1018 ------------------------>
<script type="text/javascript" src="${gridmae1018serv}"></script>
<script type="text/javascript" src="${selectmae1018serv}"></script>
<!------------------------------------------------------>

<!------------- Componente controles de pesaje --------->
<script type="text/javascript" src="${ctrlComponent}"></script>
<!------------------------------------------------------>

<script type="text/javascript" src="${processApp}"></script>

<!--******************ELEMENTOS CREADOS BASADOS EN EL MODULO processApp **************-->

<!--------------------- Station -------------------->
<script type="text/javascript" src="${StationService}"></script>
<script type="text/javascript" src="${GridSelectStation}"></script>
<script type="text/javascript" src="${StationController}"></script>
<!-------------------------------------------------->

<!--------------------- Sensor -------------------->
<script type="text/javascript" src="${SensorConfigurationGrid}"></script>
<script type="text/javascript" src="${SensorService}"></script>
<script type="text/javascript" src="${SensorController}"></script>
<!-------------------------------------------------->

<!--------------------- Tipo de sensor -------------------->
<script type="text/javascript" src="${TypesensorConfigurationGrid}"></script>
<script type="text/javascript" src="${TypesensorService}"></script>
<script type="text/javascript" src="${GridSelectTypesensor}"></script>
<script type="text/javascript" src="${TypesensorController}"></script>
<!-------------------------------------------------->

<!--------------------- Role -------------------->
<script type="text/javascript" src="${RoleConfigurationGrid}"></script>
<script type="text/javascript" src="${RoleService}"></script>
<script type="text/javascript" src="${RoleController}"></script>
<!-------------------------------------------------->

<!--------------------- Micro -------------------->
<script type="text/javascript" src="${TryReadingService}"></script>
<script type="text/javascript" src="${MicroService}"></script>
<script type="text/javascript" src="${MicroController}"></script>
<!-------------------------------------------------->

<!--------------------- MAE1001 -------------------->
<script type="text/javascript" src="${MAE1001ConfigurationGrid}"></script>
<script type="text/javascript" src="${MAE1001Service}"></script>
<script type="text/javascript" src="${MAE1001Controller}"></script>
<!-------------------------------------------------->

<!---------------------- Widgets02 --------------------->
<script type="text/javascript" src="${widgets02}"></script>
<!------------------------------------------------------>

<!--**********************************************************************************-->

</head>