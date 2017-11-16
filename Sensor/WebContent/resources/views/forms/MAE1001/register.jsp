<div class="modal-header">
	<h3 class="box-title">{{ ('FORM.USER' | translate)+('FORM.NEW' |
		translate) }}</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<!--  -->
	<form id="userForm" name="userForm" novalidate="true">
		<div class="row">
			<div class="col-sm-6">
				<h5>{{ 'USER.NAME' | translate }}</h5>
				<input name="frst_name" id="frst_name" class="textOnly form-control"
					placeholder="{{ 'USER.NAME' | translate }}"
					ng-model="user.frst_name" ng-maxlength="18" required /> <span
					ng-show="!userForm.frst_name.$pristine && userForm.frst_name.$error.required"
					class="logError has-error""><label class="control-label"
					for="frst_name"><i class="fa fa-times-circle-o"></i>&nbsp;{{
						'VALI.NAME_REQ' | translate }}</label></span>
				<div id="ERROR_frst_name" class="logError"></div>
			</div>
			<div class="col-sm-6">
				<h5>{{ 'USER.LAST_NAME' | translate }}</h5>
				<input name="last_name" id="last_name" class="textOnly form-control"
					placeholder="{{ 'USER.LAST_NAME' | translate }}"
					ng-model="user.last_name" ng-maxlength="15" required /> <span
					ng-show="!userForm.last_name.$pristine && userForm.last_name.$error.required"
					class="logError has-error"> <label class="control-label"
					for="last_name"><i class="fa fa-times-circle-o"></i>&nbsp;
						{{ 'VALI.LNAM_REQ' | translate }}</label>
				</span>
				<div id="ERROR_last_name" class="logError"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<h5>{{ 'USER.MAIL' | translate }}</h5>
				<input name="user_mail" id="user_mail" class="form-control"
					placeholder="{{ 'USER.MAIL' | translate }}"
					ng-model="user.user_mail" type="email" ng-maxlength="54" required />
				<span
					ng-show="!userForm.user_mail.$pristine && userForm.user_mail.$error.email"
					class="logError has-error"><label class="control-label"
					for="user_mail"><i class="fa fa-times-circle-o"></i> {{
						'VALI.MAIL_INV' | translate }}</label></span> <span class="logError has-error"
					ng-show="!userForm.user_mail.$pristine && userForm.user_mail.$error.required"><label
					class="control-label" for="user_mail"><i
						class="fa fa-times-circle-o"></i>&nbsp; {{ 'VALI.MAIL_REQ' |
						translate }}</label></span>
				<div id="ERROR_user_mail" class="logError"></div>
			</div>
			<div class="col-sm-6">
				<h5>{{ 'USER.CONF_MAIL' | translate }}</h5>
				<input name="conf_mail" id="conf_mail" class="form-control"
					placeholder="{{ 'USER.CONF_MAIL' | translate }}"
					ng-model="user.conf_mail" type="email" ng-maxlength="54"
					pw-check='user_mail' required /> <span
					ng-show="!userForm.conf_mail.$pristine && userForm.conf_mail.$error.email"
					class="logError has-error"><label class="control-label"
					for="conf_mail"><i class="fa fa-times-circle-o"></i> {{
						'VALI.MAIL_INV' | translate }}</label></span> <span class="logError has-error"
					ng-show="!userForm.conf_mail.$pristine && userForm.conf_mail.$error.required"><label
					class="control-label" for="conf_mail"><i
						class="fa fa-times-circle-o"></i>&nbsp; {{ 'VALI.MAIL_REQ' |
						translate }}</label></span>
				<div class='logError msg-block' ng-show='userForm.$error'>
					<span class='msg-error has-error'
						ng-show='!userForm.conf_mail.$pristine && userForm.conf_mail.$error.pwmatch'>
						<label class="control-label" for="conf_mail"><i
							class="fa fa-times-circle-o"></i> {{'VALI.MAI_NEQU' | translate
							}}</label>
					</span>
					<div id="ERROR_conf_mail" class="logError"></div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<h5>{{ 'USER.PSWD' | translate }}</h5>
				<input type="password" name="user_pass" id="user_pass"
					class="form-control" placeholder="{{ 'USER.PSWD' | translate }}"
					ng-model="user.user_pass" ng-maxlength="100" required /> <span
					ng-show="!userForm.user_pass.$pristine && userForm.user_pass.$error.required"
					class="logError has-error"><label class="control-label"
					for="user_pass"><i class="fa fa-times-circle-o"></i>&nbsp;
						{{ 'VALI.PSWD_REQ' | translate }}</label></span>
				<div id="ERROR_user_pass" class="logError"></div>
			</div>
			<div class="col-sm-6">
				<h5>{{ 'USER.CONF_PSWD' | translate }}</h5>
				<input type="password" name="conf_pass" id="conf_pass"
					class="form-control"
					placeholder="{{ 'USER.CONF_PSWD' | translate }}"
					ng-model="user.conf_pass" ng-maxlength="100" pw-check='user_pass'
					required /> <span
					ng-show="!userForm.conf_pass.$pristine && userForm.conf_pass.$error.required"
					class="logError has-error"><label class="control-label"
					for="conf_pass"><i class="fa fa-times-circle-o"></i>&nbsp;
						{{ 'VALI.CPWD_REQ' | translate }}</label></span>
				<div class='logError msg-block' ng-show='userForm.$error'>
					<span class='msg-error has-error'
						ng-show='!userForm.conf_pass.$pristine && userForm.conf_pass.$error.pwmatch'>
						<label class="control-label" for="conf_pass"><i
							class="fa fa-times-circle-o"></i> {{'VALI.PAS_NEQU' | translate
							}} </label>
					</span>
					<div id="ERROR_conf_pass" class="logError"></div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<h5>{{ 'USER.PHON' | translate }}</h5>
				<input name="phone" id="phone" class="form-control"
					placeholder="{{
							'USER.PHON' | translate }}"
					ng-model="user.phone" ng-maxlength="20" mask="(999) 999-9999"
					clean="true" required /> <span
					ng-show="!userForm.phone.$pristine && userForm.phone.$error.required"
					class="logError has-error"><label class="control-label"
					for="phone"><i class="fa fa-times-circle-o"></i>&nbsp; {{
						'VALI.PHON_REQ' | translate }}</label></span>
				<div id="ERROR_phone" class="logError"></div>
			</div>
		</div>
		<br/>
		<div class="row">
			<div class="col-sm-6"><h5>{{ 'GENE.PERM' | translate }}</h5></div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<div class="checkbox">
					<label> <input type="checkbox" ng-model="user.ornd">
						{{ 'USER.NORD' | translate }}
					</label>
				</div>
			</div>
			<div class="col-sm-6">
				<div class="checkbox">
					<label> <input type="checkbox" ng-model="user.ingr">
						{{ 'USER.INGR' | translate }}
					</label>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<div class="checkbox">
					<label> <input type="checkbox" ng-model="user.dele">
						{{ 'USER.DELE' | translate }}
					</label>
				</div>
			</div>
			<div class="col-sm-6">
				<div class="checkbox">
					<label> <input type="checkbox" ng-model="user.apro">
						{{ 'USER.APRO' | translate }}
					</label>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<div class="checkbox">
					<label> <input type="checkbox" ng-model="user.anul">
						{{ 'USER.ANUL' | translate }}
					</label>
				</div>
			</div>
			<div class="col-sm-6">
				<div class="checkbox">
					<label> <input type="checkbox" ng-model="user.peso">
						{{ 'USER.PESO' | translate }}
					</label>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<div class="checkbox">
					<label> <input type="checkbox" ng-model="user.geov">
						{{ 'USER.GEOV' | translate }}
					</label>
				</div>
			</div>
			<div class="col-sm-6">
				<div class="checkbox">
					<label> <input type="checkbox" ng-model="user.pesaje">
						{{ 'GENE.REAL_PES' | translate }}
					</label>
				</div>
			</div>
		</div>
		<br>
		<div class="modal-footer">
			<sec:authorize access="isAuthenticated()">
				<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
					class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
				</a>
			</sec:authorize>
			<a ng-disabled="!userForm.$valid" ng-click="submitForm(user)"
				class="btn btn-app btn btn-primary"> <i class="fa fa-save"></i>
				{{ 'GENE.BTN_REG' | translate }}
			</a>
		</div>
		<sec:authorize access="!isAuthenticated()">
			<div class="form-group">
				<div class="col-md-12 control">
					<div
						style="border-top: 1px solid #888; padding-top: 15px; font-size: 85%">
						{{ 'USER.EXIS_ACCO' | translate }} <a href="login"> {{
							'USER.LOGI' | translate }} </a>
					</div>
				</div>
			</div>
		</sec:authorize>
	</form>
</div>