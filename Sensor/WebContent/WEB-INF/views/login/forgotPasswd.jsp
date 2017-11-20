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
<body ng-app="registerApp" class="bg_login">
	<div ng-controller="loginController">
		<img alt="" src="./resources/images/img-bg.jpg" style="filter: blur(2px); width: 100%; height: 100%; position: absolute; z-index: -1000;">
		<div class="container">
			<div id="loginbox" style="margin-top: 50px;"
				class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
				<div class="panel panel-info">
					<div class="panel-heading">
						<div class="panel-title">{{ 'GENE.PASS_RECO' | translate }}</div>
					</div>
					<div style="padding-top: 0" class="panel-body">
						<div style="display: none" id="login-alert"
							class="alert alert-danger col-sm-12"></div>
						<div class="logAlert">
						</div>
						<div class="modal-header">
							<h3 class="box-title">{{ 'USER.FORG_PSWD' | translate }}</h3>
							<p>{{ 'LOGI.MAIL_ADDR' | translate }}</p>
						</div>
						<div id="FATH_FORM" class="modal-body">
							<div class="logFormInputs">
								<form:form id="forgotPasswd" name="forgotPasswd"
									action="forgotPasswd" method="POST" commandName="email">
									<div class="logInputs">
										<div class="row">
											<div class="col-sm-12">
												<form:input path="login" type="email" class="form-control"
													placeholder="{{ 'USER.MAIL' | translate }}" required="true"
													ng-model="login" />
												<span class="logError"><form:errors path="login" /></span>
												<span
													ng-show="!forgotPasswd.login.$pristine && forgotPasswd.login.$error.required"
													class="logError has-error"><label
													class="control-label" for="login"><i
														class="fa fa-times-circle-o"></i> {{ 'VALI.MAIL_REQ' |
														translate }}</label></span> <span
													ng-show="!forgotPasswd.login.$pristine && forgotPasswd.login.$error.email"
													class="logError has-error"><label
													class="control-label" for="login"><i
														class="fa fa-times-circle-o"></i> {{ 'VALI.MAIL_INV' |
														translate }}</label></span>
											</div>
										</div>
									</div>
									<br>
									<div class="modal-footer">
										<div class="form-inline">
											<div class="form-group signUpReposition">
												<button class="btn btn-app btn btn-primary" type="submit"
													form="forgotPasswd" value="Submit"
													ng-disabled="!forgotPasswd.$valid">
													<i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
													{{ 'GENE.CONT' | translate }}
												</button>
											</div>
										</div>
									</div>
									<div class="form-group">
										<div class="col-md-12 control">
											<div
												style="border-top: 1px solid #888; padding-top: 15px; font-size: 85%">
												{{ 'USER.RMBR_PASS' | translate }} <a href="login"> {{
													'USER.LOGI' | translate }} </a>
											</div>
										</div>
									</div>
								</form:form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>

