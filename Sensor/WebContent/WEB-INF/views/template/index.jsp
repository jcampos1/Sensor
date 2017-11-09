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

<%@ include file="/resources/views/includes/head.jsp"%>

<body class="hold-transition skin-blue sidebar-mini" ng-app="generalApp">

	<span us-spinner="{radius:30, width:8, length: 16}"></span>
	<div class="wrapper">
		<%@ include file="/resources/views/includes/header.jsp"%>
		<!-- Left side column. contains the logo and sidebar -->
		<%@ include file="/resources/views/includes/sidebar-left.jsp"%>
		<!-- Content Wrapper. Contains page content -->
		<div class="content-wrapper">
			<!-- Content Header (Page header) -->
			<%@ include file="/resources/views/includes/content-header.jsp"%>
			<!-- Main content -->
			<section class="content">
				<!-- Small boxes (Stat box) -->
				<div ui-view="widgets"></div>
				<div ui-view="mstr"></div>
			</section>
			<!-- /.content -->
		</div>
		<!-- /.content-wrapper -->
		<footer class="main-footer">
			<div class="pull-right hidden-xs">
				<b>Version</b> 2.3.7
			</div>
			<strong>Copyright &copy; 2016 <a
				href="http://almsaeedstudio.com">Almsaeed Studio</a>.
			</strong> All rights reserved.
		</footer>

		<!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
		<div class="control-sidebar-bg"></div>
	</div>
	<!-- ./wrapper -->

	<!-- Bootstrap 3.3.6 -->
	<script
		src="/Sensor/resources/bootstrap/js/bootstrap.min.js"></script>
	<!-- AdminLTE App -->
	<script src="/Sensor/resources/dist/js/app.min.js"></script>
	<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
	<script
		src="/Sensor/resources/dist/js/pages/dashboard.js"></script>
	<!-- AdminLTE for demo purposes -->
	<script src="/Sensor/resources/dist/js/demo.js"></script>
</body>
</html>
