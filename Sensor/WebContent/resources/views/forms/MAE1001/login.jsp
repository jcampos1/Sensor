<div class="container">
	<div id="loginbox" style="margin-top: 50px;"
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
				<form id="signupForm" name="signupForm" action="login" method='POST'
					class="form-horizontal" role="form" novalidate>
					<div class="input-group">
						<span class="input-group-addon"><i
							class="glyphicon glyphicon-user"></i></span><input id="login-username"
							name="username" ng-model="username"
							placeholder="{{ 'USER.USER_MAIL' | translate }}" type="email"
							class="form-control" required />
					</div>
					<div>
						<c:if test="${nologin != null}">
							<span class="logError">${nologin }</span>
						</c:if>
						<span
							ng-show="!signupForm.username.$pristine && signupForm.username.$error.required"
							class="logError has-error"><label class="control-label"
							for="username"><i class="fa fa-times-circle-o"></i> {{
								'VALI.MAIL_REQ' | translate }}</label></span> <span
							ng-show="!signupForm.username.$pristine && signupForm.username.$error.email"
							class="logError has-error"><label class="control-label"
							for="username"><i class="fa fa-times-circle-o"></i> {{
								'VALI.MAIL_INV' | translate }}</label></span>
					</div>

					<div style="margin-top: 25px" class="input-group">
						<span class="input-group-addon"><i
							class="glyphicon glyphicon-lock"></i></span> <input class="form-control"
							type='password' id="password" ng-model="password" name="password"
							placeholder="{{ 'USER.PSWD' | translate }}" required>
					</div>
					<div>
						<c:if test="${nopasswd != null}">
							<span class="logError">${nopasswd }</span>
						</c:if>
						<span
							ng-show="!signupForm.password.$pristine && signupForm.password.$error.required"
							class="logError has-error"><label class="control-label"
							for="password"><i class="fa fa-times-circle-o"></i> {{
								'VALI.PSWD_REQ' | translate }}</label></span>
					</div>

					<div style="margin-top: 10px" class="form-group">
						<!-- Button -->
						<div class="modal-footer">
							<div class="col-sm-12 controls">
								<button id="btn-login" type="submit"
									class="btn btn-app btn btn-success"
									ng-disabled="!signupForm.$valid">
									<i class="fa fa-sign-in" aria-hidden="true"></i> {{ 'USER.LOGI'
									| translate }}
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>