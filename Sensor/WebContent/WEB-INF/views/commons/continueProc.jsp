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
	<div ng-controller="loginController">
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
							<strong><spring:message code="warning" /></strong> ${error}
						</div>
						<div>
							<h1>${headTitle}</h1>
							<p>${message}</p>
						</div>
						<div id="FATH_FORM" class="modal-body">
							<div class="logFormInputs">
								<div class="modal-footer">
									<div class="form-inline">
										<div class="form-group signUpReposition">
											<a href="${nextForm}" class="btn btn-app btn btn-primary">
												<i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
												{{ 'GENE.CONT' | translate }}
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>