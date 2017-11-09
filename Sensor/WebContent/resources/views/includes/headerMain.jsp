
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<spring:url value="resources/js/angular/node_modules/angular.js"
	var="angularJs" />
<spring:url
	value="resources/js/angular/node_modules/angular-route.min.js"
	var="ngRoute" />

<%-- <spring:url value="resources/js/angular/node_modules/angular.min.js"
	var="angularMinJs" /> --%>
<spring:url
	value="resources/js/angular/node_modules/angular-translate.min.js"
	var="angularTranslateJs" />

<spring:url
	value="resources/js/angular/node_modules/multiple-select.min.js"
	var="multSelectxxx" />

<spring:url
	value="resources/js/angular/node_modules/isteven-multi-select.js"
	var="multSelect" />

<spring:url value="/resources/js/angular/js/locale/messages.js"
	var="messages" />
<spring:url value="/resources/js/angular/js/services/NotifyService.js"
	var="notifyServ" />

<spring:url value="/resources/js/angular/js/services/abstractService.js"
	var="abstServ" />


<spring:url value="/resources/js/angular/js/Constants.js"
	var="constants" />
<spring:url value="resources/js/angular/node_modules/angular-touch.js"
	var="angularTouchJs" />
<spring:url value="resources/js/angular/node_modules/ngMask.min.js"
	var="ngMask" />

<spring:url
	value="resources/js/angular/js/components/usuario/new-user.js"
	var="newUserJs" />
<spring:url
	value="resources/js/angular/js/components/project/new-project.js"
	var="newProjectJs" />

<spring:url
	value="resources/js/angular/js/components/activity/new-activity.js"
	var="newActivityJs" />

<spring:url
	value="resources/js/angular/js/components/activity/current-activities.js"
	var="currentActivitiesJs" />

<spring:url
	value="/resources/js/angular/js/components/tags/multiple-select.js"
	var="mSelectJs" />

<spring:url
	value="/resources/js/angular/js/components/usuario/new-user.html"
	var="form_user" />

<spring:url value="resources/js/jquery-2.2.3.min.js" var="jquery" />
<spring:url value="resources/js/jquery.inputmask.bundle.js"
	var="inputmask" />
<spring:url value="resources/js/validations.js" var="utils" />
<spring:url value="resources/js/angular/js/app.js" var="appsJs" />
<spring:url value="resources/js/angular/js/appProject.js"
	var="appProjectJs" />
<spring:url value="resources/js/angular/js/appActivity.js"
	var="appActivityJs" />
<spring:url
	value="resources/js/angular/js/controllers/UserController.js"
	var="mainControllersJs" />

<spring:url
	value="resources/js/angular/js/controllers/ProjectController.js"
	var="mstrProjectJs" />

<spring:url
	value="resources/js/angular/js/controllers/ActivityController.js"
	var="mstrActivityJs" />
<spring:url
	value="resources/js/angular/js/controllers/UserValidation.js"
	var="userValJs" />
<spring:url value="resources/js/angular/js/services/GenericService.js"
	var="servicesJs" />
<spring:url value="resources/js/angular/js/services/UserService.js"
	var="userServJs" />
<spring:url value="resources/js/angular/js/services/ProjectService.js"
	var="projServJs" />
<spring:url value="resources/js/angular/js/services/ActivityService.js"
	var="actServJs" />
<spring:url
	value="resources/js/angular/node_modules/ui-bootstrap-tpls-2.0.1.min.js"
	var="uiBootstrap" />
<spring:url value="resources/js/bootstrap/bootstrap-notify.min.js"
	var="bootstrap_notify" />
<spring:url value="resources/js/angular/node_modules/contextMenu.js"
	var="contextMenu" />

<!-- Latest compiled and minified CSS -->
<!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"> -->

<link
	href="//netdna.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
	rel="stylesheet">

<link href="resources/css/bootstrap/animate.css" rel="stylesheet">
<link href="resources/css/multiple-select.min.css" rel="stylesheet">

<link href="resources/css/isteven-multi-select.css" rel="stylesheet">

<link href="resources/css/styles.css" rel="stylesheet">

<script type="text/javascript" src="${angularJs}"></script>
<script type="text/javascript" src="${ngRoute}"></script>
<script type="text/javascript" src="${multSelectxxx}"></script>
<script type="text/javascript" src="${multSelect}"></script>



<script type="text/javascript" src="${constants}"></script>
<%-- <script type="text/javascript" src="${angularMinJs}"></script> --%>
<script type="text/javascript" src="${angularTranslateJs}"></script>
<script type="text/javascript" src="${angularTouchJs}"></script>
<script type="text/javascript" src="${ngMask}"></script>
<script type="text/javascript" src="${jquery}"></script>
<script type="text/javascript" src="${inputmask}"></script>
<script type="text/javascript" src="${utils}"></script>
<script type="text/javascript" src="${uiBootstrap}"></script>
<script type="text/javascript" src="${bootstrap_notify}"></script>
<%-- <script type="text/javascript" src="${dynamicLocaleJs}"></script> --%>
<script type="text/javascript" src="${contextMenu}"></script>

<script
	src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular-animate.js"></script>

<script
	src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-sanitize.js"></script>

<script src="http://ui-grid.info/release/ui-grid.js"></script>
<link rel="stylesheet" href="http://ui-grid.info/release/ui-grid.css"
	type="text/css">

<script src="http://ui-grid.info/docs/grunt-scripts/csv.js"></script>
<script src="http://ui-grid.info/docs/grunt-scripts/pdfmake.js"></script>
<script src="http://ui-grid.info/docs/grunt-scripts/vfs_fonts.js"></script>

<script type="text/javascript" src="${messages}"></script>
<script type="text/javascript" src="${notifyServ}"></script>
<script type="text/javascript" src="${abstServ}"></script>
<script type="text/javascript" src="${servicesJs}"></script>
<script type="text/javascript" src="${userServJs}"></script>
<script type="text/javascript" src="${projServJs}"></script>
<script type="text/javascript" src="${actServJs}"></script>
<script type="text/javascript" src="${newUserJs}"></script>
<script type="text/javascript" src="${newProjectJs}"></script>
<script type="text/javascript" src="${newActivityJs}"></script>
<script type="text/javascript" src="${mSelectJs}"></script>
<script type="text/javascript" src="${currentActivitiesJs}"></script>
<script type="text/javascript" src="${appsJs}"></script>
<script type="text/javascript" src="${appProjectJs}"></script>
<script type="text/javascript" src="${appActivityJs}"></script>
<script type="text/javascript" src="${mstrProjectJs}"></script>
<script type="text/javascript" src="${mstrActivityJs}"></script>
<script type="text/javascript" src="${mainControllersJs}"></script>
<script type="text/javascript" src="${userValJs}"></script>