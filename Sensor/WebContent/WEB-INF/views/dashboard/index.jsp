<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<script>
	var currentUser = <c:out value="${currentUser}" escapeXml="false"/>
</script>

<script>
	var separator = <c:out value="${separator}" escapeXml="false"/>
</script>
<html>

<!-- Recursos estaticos  -->
<%@ include file="/resources/views/includes/headProcess.jsp"%>

<body class="hold-transition skin-blue sidebar-mini" ng-app="processApp">
	<div class="wrapper" class="users-list">
		<%@ include file="/resources/views/includes/header.jsp"%>
		<!-- Left side column. contains the logo and sidebar -->
		<%@ include file="/resources/views/includes/sidebar-left.jsp"%>

		<span us-spinner="{radius:30, width:8, length: 16}"></span>

		<!-- Content Wrapper. Contains page content -->
		<div class="content-wrapper">
			<!-- Content Header (Page header) -->
			<div ui-view="content-header"></div>
			<!-- Main content -->
			<section class="content">
				<!-- Small boxes (Stat box) -->
				<div ui-view="widgets"></div>
				<!-- Main row -->
				<div class="row" ng-controller="listenersCtrl">
					<!-- Left col -->
					<section class="col-lg-12">
						<!-- Custom tabs (Charts with tabs)-->
						<div ui-view="header"></div>
					</section>
					
					<section class="col-lg-12">
						<div ui-view="stations"></div>
					</section>
					
					<section class="col-lg-12">
						<div ui-view="mstr"></div>
					</section>
					<section class="col-lg-12">
						<div ui-view="lines"></div>
					</section>

					<section class="col-lg-12">
						<div ui-view="peso"></div>
					</section>

					<section class="col-lg-12"
						ng-if="mae1013.stat.id ==1 || mae1013.stat.id ==0">
						<div ui-view="conten"></div>
					</section>
					<section class="col-lg-12">
						<div ui-view="desglose"></div>
					</section>
					<!-- /.Left col -->
				</div>
				<!-- /.row (main row) -->
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

	<script type="text/javascript">
		window.masterActive = function ( mstr ) {
			switch ( mstr ) {
				case "0":
					$("#link-mstr-user").addClass("active");
				break;
				case "1":
					$("#link-mstr-mae1008").addClass("active");
				break;
				case "2":
					$("#link-mstr-mae1007").addClass("active");
				break;
				case "3":
					$("#link-mstr-par1001").addClass("active");
				break;
				case "4":
					$("#link-mstr-mae1013").addClass("active");
				break;
				case "5":
					$("#link-mstr-uti1006").addClass("active");
				break;
			}
		}

		window.masterActive("${mstr}");
	</script>
</body>
</html>
