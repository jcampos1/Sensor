<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="aplication">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>

<link rel="stylesheet" href="http://ui-grid.info/release/ui-grid.css"
	type="text/css">

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
<script src="http://ui-grid.info/release/ui-grid.js"></script>	
	
</head>
<body>

<div ng-controller="MainCtrl">
	<div ui-grid="{data: myData}"></div>
</div>


<script type="text/javascript">
alert('hola');
	var app = angular.module('aplication', ['ui.grid']);
	
	app.controller('MainCtrl', function ($scope, $http) {
		$http.get("http://localhost:8080/TimeSheet/signUp/all").then(function (response) {
			
			alert('hola');
			$scope.myData = response.data;
		});
	});
	
	
</script>
</body>
</html>