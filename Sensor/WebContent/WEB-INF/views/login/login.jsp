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
<body class="bg_login" ng-app="registerApp">

	<img alt="" src="./resources/images/img-bg.jpg" style=" filter: blur(2px);width: 100%; height: 100%; position: absolute; z-index: -1000;">
	<div ng-controller="loginController">
		<div class="container">
			<div id="loginbox" style="margin-top: 80px;"
				class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
				<div class="panel panel-info">
					<div class="panel-heading">
						<div class="panel-title">{{ 'USER.LOGI' | translate }}</div>
						<div
							style="float: right; font-size: 80%; position: relative; top: -10px">
							<a href="forgotPasswd">{{ 'USER.FORG_PSWD' | translate }}</a>
						</div>
					</div>

					<div style="padding-top: 0" class="panel-body">
						<div style="display: none" id="login-alert"
							class="alert alert-danger col-sm-12"></div>
						<div class="logAlert">
							<c:if test="${error != null}">
								<strong>{{'GENE.ERROR' | translate}}</strong> ${error}
							</c:if>
						</div>
						<br> <br>
						<form id="signupForm" name="signupForm" action="login"
							method='POST' class="form-horizontal" role="form" novalidate>
							<div class="input-group">
								<span class="input-group-addon"><i
									class="glyphicon glyphicon-user"></i></span><input id="login-username"
									name="login" ng-model="login"
									placeholder="{{ 'USER.USER_MAIL' | translate }}" type="email"
									class="form-control" required />
							</div>
							<div>
								<c:if test="${nologin != null}">
									<span class="logError">${nologin }</span>
								</c:if>
								<span
									ng-show="!signupForm.login.$pristine && signupForm.login.$error.required"
									class="logError has-error"><label class="control-label"
									for="login"><i class="fa fa-times-circle-o"></i> {{
										'VALI.MAIL_REQ' | translate }}</label></span> <span
									ng-show="!signupForm.login.$pristine && signupForm.login.$error.email"
									class="logError has-error"><label class="control-label"
									for="login"><i class="fa fa-times-circle-o"></i> {{
										'VALI.MAIL_INV' | translate }}</label></span>
							</div>

							<div style="margin-top: 25px" class="input-group">
								<span class="input-group-addon"><i
									class="glyphicon glyphicon-lock"></i></span> <input
									class="form-control" type='password' id="passwd"
									ng-model="passwd" name="passwd"
									placeholder="{{ 'USER.PSWD' | translate }}" required>
							</div>
							<div>
								<c:if test="${nopasswd != null}">
									<span class="logError">${nopasswd }</span>
								</c:if>
								<span
									ng-show="!signupForm.passwd.$pristine && signupForm.passwd.$error.required"
									class="logError has-error"><label class="control-label"
									for="passwd"><i class="fa fa-times-circle-o"></i> {{
										'VALI.PSWD_REQ' | translate }}</label></span>
							</div>

							<div style="margin-top: 10px" class="form-group">
								<!-- Button -->
								<div class="modal-footer">
									<div class="col-sm-12 controls">
										<button id="btn-login" type="submit"
											class="btn btn-app btn btn-success"
											ng-disabled="!signupForm.$valid">
											<i class="fa fa-sign-in" aria-hidden="true"></i> {{
											'USER.LOGI' | translate }}
										</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>