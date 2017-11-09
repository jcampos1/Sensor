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
<body ng-app="registerApp" class="bg_login content">
	<div ng-controller="userController">

		<div class="container">
			<div id="loginbox" style="margin-top: 50px;"
				class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
				<div class="panel panel-info">
					<div class="panel-heading">
						<div class="panel-title">{{ 'USER.RESE_PSWD' | translate }}</div>
					</div>
					<div style="padding-top: 0" class="panel-body">
						<div style="display: none" id="login-alert"
							class="alert alert-danger col-sm-12"></div>
						<div class="logAlert">
							<c:if test="${error != null}">
								<div class="logAlert">
									<c:if test="${error != null}">
										<strong>{{ 'VALI.WARN' | translate }}</strong> ${error }</c:if>
								</div>
							</c:if>
						</div>
						<br> <br>
						<form:form id="changePWD" name="changePWD" action="changePWD"
							method="POST" commandName="changePass">
							<div class="logInputs">
								<form:input path="login" type='hidden' />
								<div class="row">
									<div class="col-sm-12">
										<form:input path="pass" type='password' class="form-control"
											placeholder="{{ 'USER.NEW_PSWD' | translate }}"
											ng-model="pass" ng-maxlength="100" required="true" />
										<span class="logError has-error"><form:errors
												path="pass" /></span> <span
											ng-show="!changePWD.pass.$pristine && changePWD.pass.$error.required"
											class="logError has-error"><label
											class="control-label" for="pass"><i
												class="fa fa-times-circle-o"></i> {{ 'VALI.PSWD_REQ' |
												translate }}</label></span>

									</div>
								</div>
								<br>
								<div class="row">
									<div class="col-sm-12">
										<spring:message code="new_cpass" var="lbl_new_cpass" />
										<form:input path="conf_pass" type='password'
											class="form-control"
											placeholder="{{ 'USER.CONF_PSWD' | translate }}"
											ng-maxlength="100" pw-check='pass' ng-model="conf_pass"
											required="true" />
										<span
											ng-show="!changePWD.conf_pass.$pristine && changePWD.conf_pass.$error.required"
											class="logError has-error"><label
											class="control-label" for="conf_pass"><i
												class="fa fa-times-circle-o"></i> {{ 'VALI.CPWD_REQ' |
												translate }}</label> </span> <span class="logError has-error"><form:errors
												path="conf_pass" /></span>
										<div class='logError msg-block  has-error'
											ng-show='changePWD.$error'>
											<span class='msg-error has-error'
												ng-show='!changePWD.conf_pass.$pristine && changePWD.conf_pass.$error.pwmatch'>
												<label class="control-label" for="conf_pass"><i
													class="fa fa-times-circle-o"></i> {{'VALI.PAS_NEQU' |
													translate }}</label>
											</span>
											<div id="ERROR_conf_pass" class="logError"></div>
										</div>
									</div>
								</div>
							</div>
							<div class="modal-footer">
								<div class="form-inline">
									<div class="form-group signUpReposition">
										<button class="btn btn-app btn btn-primary" type="submit"
											form="changePWD" value="Submit"
											ng-disabled="!changePWD.$valid">
											<i class="fa fa-save"></i> {{'GENE.CHNG_PSWD' | translate }}
										</button>
									</div>
								</div>
							</div>
						</form:form>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
