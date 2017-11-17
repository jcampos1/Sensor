<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title><spring:message code="${page_title}" /></title>
<!-- Tell the browser to be responsive to screen width -->
<meta
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
	name="viewport">
<!-- Bootstrap 3.3.6 -->
<link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css">
<!-- Font Awesome -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
<!-- Ionicons -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
<!-- Theme style -->
<link rel="stylesheet" href="resources/dist/css/AdminLTE.min.css">
<!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
<link rel="stylesheet"
	href="resources/dist/css/skins/_all-skins.min.css">

<link href="resources/css/styles.css" rel="stylesheet">

<!------------------------------------- RECURSOS ----------------------------------->

<!------------- JS -------->
<spring:url value="resources/js/angular/node_modules/angular.js"
	var="angularJs" />
<spring:url value="resources/js/jquery-2.2.3.min.js" var="jquery" />
<spring:url value="resources/js/jquery.inputmask.bundle.js"
	var="inputmask" />
<spring:url
	value="resources/js/angular/node_modules/ui-bootstrap-tpls-2.0.1.min.js"
	var="uiBootstrap" />
<spring:url value="resources/js/bootstrap/bootstrap-notify.min.js"
	var="bootstrap_notify" />
<spring:url value="resources/js/angular/node_modules/contextMenu.js"
	var="contextMenu" />
<!-------------------------->

<!------------- CSS -------->
<!-------------------------->
<!--------------------------------------------------------------------------------->

<!--------------------- Plugin Angularjs -------------->
<spring:url value="resources/js/angular/node_modules/angular-touch.js"
	var="angularTouchJs" />
<spring:url value="resources/js/angular/node_modules/ngMask.min.js"
	var="ngMask" />
<!----------------------------------------------------->

<!--------------------- SweetAlert Plugin -------------->
<spring:url value="resources/js/angular/node_modules/sweetalert.min.js"
	var="SweetAlertMinJs" />
<spring:url
	value="resources/js/angular/node_modules/NgSweetAlert.min.js"
	var="NgSweetAlertMinJs" />
<!---------------------------------------------->

<!--------------------- Comunication01 -------------->
<spring:url value="resources/js/angular/js/services/Comunication01.js"
	var="comunication01" />
<!--------------------------------------------------->

<!--------------------- Comunication02 -------------->
<spring:url value="resources/js/angular/js/services/Comunication02.js"
	var="comunication02" />
<!--------------------------------------------------->

<!--------------------- Internacionalización -------------->
<spring:url
	value="resources/js/angular/node_modules/angular-ui-grid-translate.js"
	var="translateUiGridJs" />

<spring:url
	value="resources/js/angular/node_modules/angular-translate.min.js"
	var="angularTranslateJs" />

<spring:url value="/resources/js/angular/js/locale/messages.js"
	var="messages" />
<!---------------------------------------------->

<!-------------------UI ROUTER ------------------------->
<spring:url
	value="resources/js/angular/node_modules/angular-ui-router.min.js"
	var="ui_router" />
<!---------------------------------------------->

<!--------------------- Servicio Generales  -------------->
<spring:url value="/resources/js/angular/js/services/NotifyService.js"
	var="notifyServ" />
<spring:url value="/resources/js/angular/js/services/abstractService.js"
	var="abstServ" />
<spring:url value="/resources/js/angular/js/Constants.js"
	var="constants" />
<spring:url value="resources/js/angular/js/services/GenericService.js"
	var="servicesJs" />
<!---------------------------------------------------->

<!--------------------- MAE1001  ---------------------->
<spring:url
	value="resources/js/angular/js/services/MAE1001Service.js"
	var="mae1001service" />
<spring:url
	value="resources/js/angular/js/components/usuario/new-user.js"
	var="newUserJs" />
<spring:url
	value="resources/js/angular/js/components/MAE1008/new-mae1008.js"
	var="newMAE1008Js" />
<spring:url
	value="resources/js/angular/js/controllers/UserController.js"
	var="mainControllersJs" />
<spring:url
	value="resources/js/angular/js/controllers/UserValidation.js"
	var="userValJs" />
<spring:url value="resources/js/angular/js/services/UserService.js"
	var="userServJs" />

<spring:url
	value="resources/js/angular/js/components/usuario/user-for-aprob.js"
	var="userForAprobationJs" />
<!---------------------------------------------------->

<!--------------------- Widgets02 -------------->
<spring:url
	value="/resources/js/angular/js/components/WIDGETS/widgets02.js"
	var="widgets02" />
<!--------------------------------------------------->

<!--------------------- SPINNER -------------->
<spring:url
value="resources/js/angular/node_modules/spin.min.js"
var="spin" />
<spring:url
value="resources/js/angular/node_modules/angular-loading-spinner.js"
var="loadspin" />
<spring:url
value="resources/js/angular/node_modules/angular-spinner.min.js"
var="anguspin" />
<!--------------------------------------------------->

<!--------------------- UTI1006  ---------------------->
<spring:url
	value="resources/js/angular/js/components/UTI1006/new-uti1006.js"
	var="newUTI1006Js" />
<spring:url
	value="resources/js/angular/js/controllers/UTI1006Controller.js"
	var="mstrUTI1006Js" />
<spring:url value="resources/js/angular/js/services/UTI1006Service.js"
	var="uti1006ServJs" />

<spring:url
	value="/resources/js/angular/js/components/UTI1006/select-uti1006.js"
	var="selectUTI1006Js" />
<!---------------------------------------------------->

<!--------------------- MAE1008  ---------------------->
<spring:url
	value="resources/js/angular/js/components/MAE1007/select-mae1008.js"
	var="selectMAE1008Js" />
<spring:url value="resources/js/angular/js/services/MAE1008Service.js"
	var="portServJs" />
<spring:url
	value="resources/js/angular/js/controllers/MAE1008Controller.js"
	var="mstrMAE1008Js" />
<!---------------------------------------------------->

<!--------------------- MAE1007  ---------------------->
<spring:url
	value="resources/js/angular/js/components/MAE1007/new-mae1007.js"
	var="newMAE1007Js" />
<spring:url
	value="resources/js/angular/js/controllers/MAE1007Controller.js"
	var="mstrMAE1007Js" />

<spring:url value="resources/js/angular/js/services/SimulatorService.js"
	var="simServ" />
<spring:url value="resources/js/angular/js/services/MAE1007Service.js"
	var="mae1007ServJs" />

<spring:url
	value="resources/js/angular/js/components/MAE1007/current-simulator.js"
	var="currentMAE1007Js" />
<!---------------------------------------------------->

<!--------------------- MAE1016  ---------------------->
<spring:url value="/resources/js/angular/js/components/MAE1016/GRIDMAE1016Service.js"
	var="gridmae1016serv" />
	
		<spring:url value="/resources/js/angular/js/components/MAE1016/select-mae1016.js"
	var="selectmae1016serv" />
<!---------------------------------------------------->

<!--------------------- PAR1001  ---------------------->
<spring:url
	value="resources/js/angular/js/components/PAR1001/current-parameter.js"
	var="currentPAR1001Js" />
<spring:url value="resources/js/angular/js/services/PAR1001Service.js"
	var="par1001ServJs" />

<spring:url
	value="resources/js/angular/js/controllers/PAR1001Controller.js"
	var="mstrPAR1001Js" />
<!---------------------------------------------------->

<!--------------------- OTROS  ---------------------->
<spring:url value="resources/js/validations.js" var="utils" />
<!---------------------------------------------------->

<!--------------------- APPS  ---------------------->
<spring:url value="resources/js/angular/js/generalApp.js"
	var="geneAppsJs" />
<!---------------------------------------------------->

<link
	href="//netdna.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
	rel="stylesheet">

<link href="resources/css/bootstrap/animate.css" rel="stylesheet">

<script type="text/javascript" src="${jquery}"></script>
<script type="text/javascript" src="${angularJs}"></script>
<script type="text/javascript" src="${NgSweetAlertMinJs}"></script>
<script type="text/javascript" src="${SweetAlertMinJs}"></script>
<script type="text/javascript" src="${translateUiGridJs}"></script>

<script
	src="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.5.1/chosen.jquery.min.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/angular-chosen-localytics/1.4.0/angular-chosen.min.js"></script>
<link rel="stylesheet" type="text/css"
	href="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.5.1/chosen.css" />

<!------------------- UI ROUTER ------------------------------>
<script type="text/javascript" src="${ui_router}"></script>
<!------------------------------------------------------------>

<script type="text/javascript" src="${constants}"></script>
<script type="text/javascript" src="${angularTranslateJs}"></script>
<script type="text/javascript" src="${angularTouchJs}"></script>
<script type="text/javascript" src="${ngMask}"></script>
<script type="text/javascript" src="${inputmask}"></script>
<script type="text/javascript" src="${utils}"></script>
<script type="text/javascript" src="${uiBootstrap}"></script>
<script type="text/javascript" src="${bootstrap_notify}"></script>
<script type="text/javascript" src="${contextMenu}"></script>

<!-------------------- SPINNER ----------------------->
<script type="text/javascript" src="${spin}"></script>
<script type="text/javascript" src="${anguspin}"></script>
<script type="text/javascript" src="${loadspin}"></script>
<!---------------------------------------------------->

<link rel="stylesheet" href="resources/css/sweetalert.css">

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.1/css/bootstrap-select.min.css">

<!-- Latest compiled and minified JavaScript -->
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.1/js/bootstrap-select.min.js"></script>

<script
	src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular-animate.js"></script>

<script
	src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-sanitize.js"></script>

<!---------------------UI-GRID-------------------------->
<script src="/Sensor/resources/js/angular/node_modules/ui-grid.js"></script>
<link rel="stylesheet" href="/Sensor/resources/css/ui-grid.css"
	type="text/css">
<script src="/Sensor/resources/js/angular/node_modules/csv.js"></script>
<script src="/Sensor/resources/js/angular/node_modules/pdfmake.min.js"></script>
<script src="/Sensor/resources/js/angular/node_modules/vfs_fonts.js"></script>
<!------------------------------------------------------>

<!-- Comunication01 -->
<script type="text/javascript" src="${comunication01}"></script>

<!-- Comunication02 -->
<script type="text/javascript" src="${comunication02}"></script>

<script type="text/javascript" src="${messages}"></script>
<script type="text/javascript" src="${notifyServ}"></script>
<script type="text/javascript" src="${abstServ}"></script>
<script type="text/javascript" src="${servicesJs}"></script>

<!-- UTI1006 -->
<script type="text/javascript" src="${uti1006ServJs}"></script>
<script type="text/javascript" src="${newUTI1006Js}"></script>
<script type="text/javascript" src="${mstrUTI1006Js}"></script>
<!------------->

<!-- USER -->
<script type="text/javascript" src="${mae1001service}"></script>
<script type="text/javascript" src="${userServJs}"></script>
<script type="text/javascript" src="${newUserJs}"></script>
<script type="text/javascript" src="${userForAprobationJs}"></script>
<script type="text/javascript" src="${mainControllersJs}"></script>
<script type="text/javascript" src="${userValJs}"></script>
<!------------->

<!---------------------- Widgets02 --------------------->
<script type="text/javascript" src="${widgets02}"></script>
<!------------------------------------------------------>

<!-- MAE1016 -->
<script type="text/javascript" src="${gridmae1016serv}"></script>
<script type="text/javascript" src="${selectmae1016serv}"></script>

<!-- PAR1001 -->
<script type="text/javascript" src="${par1001ServJs}"></script>
<script type="text/javascript" src="${currentPAR1001Js}"></script>
<script type="text/javascript" src="${mstrPAR1001Js}"></script>
<!------------->

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

<script type="text/javascript" src="${geneAppsJs}"></script>

</head>