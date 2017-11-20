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
<spring:url
	value="resources/js/angular/node_modules/ui-bootstrap-tpls-2.0.1.min.js"
	var="uiBootstrap" />
<!-------------------------->

<!--------------------------------------------------------------------------------->

<!--------------------- Internacionalización -------------->
<spring:url
	value="resources/js/angular/node_modules/angular-translate.min.js"
	var="angularTranslateJs" />

<spring:url value="/resources/js/angular/js/locale/messages.js"
	var="messages" />
<!---------------------------------------------->

<!--------------------- LOGIN  ---------------------->
<spring:url
	value="resources/js/angular/js/controllers/UserValidation.js"
	var="UserValidation" />
<!---------------------------------------------------->

<link
	href="//netdna.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
	rel="stylesheet">

<script type="text/javascript" src="${jquery}"></script>
<script type="text/javascript" src="${angularJs}"></script>
<script type="text/javascript" src="${angularTranslateJs}"></script>
<script type="text/javascript" src="${uiBootstrap}"></script>
<script type="text/javascript" src="${messages}"></script>

<script type="text/javascript" src="${UserValidation}"></script>

</head>