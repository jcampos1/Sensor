<script type="text/ng-template" id="updateMAE1001.html">
<div class="modal-header">
	<h3 class="box-title">{{ ('FORM.USER' | translate)+('FORM.EDIT' |
		translate) }}</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<!--  -->
	<form id="MAE1001EditForm" name="MAE1001EditForm" novalidate="true">
		<div class="row">
			<!-- NOMBRE -->
			<div class="col-sm-6">
				<h5>
					<strong>{{'GENE.AST'| translate}}&nbsp;{{ 'GENE.NAME' |
						translate }}</strong>
				</h5>
				<input name="frst_name" id="frst_name" class="textOnly form-control"
					placeholder="{{ 'GENE.NAME' | translate }}"
					ng-model="user.frst_name" ng-maxlength="18" required /> <span
					ng-show="!MAE1001EditForm.frst_name.$pristine && MAE1001EditForm.frst_name.$error.required"
					class="logError has-error""><label class="control-label"
					for="frst_name"><i class="fa fa-times-circle-o"></i>&nbsp;{{
						'VALI.NAME_REQ' | translate }}</label></span>
				<div id="ERROR_frst_name" class="logError"></div>
			</div>
			<!-- APELLIDO -->
			<div class="col-sm-6">
				<h5>
					<strong>{{'GENE.AST'| translate}}&nbsp;{{ 'USER.LAST_NAME' |
						translate }}</strong>
				</h5>
				<input name="last_name" id="last_name" class="textOnly form-control"
					placeholder="{{ 'USER.LAST_NAME' | translate }}"
					ng-model="user.last_name" ng-maxlength="15" required /> <span
					ng-show="!MAE1001EditForm.last_name.$pristine && MAE1001EditForm.last_name.$error.required"
					class="logError has-error"> <label class="control-label"
					for="last_name"><i class="fa fa-times-circle-o"></i>&nbsp;
						{{ 'VALI.LNAM_REQ' | translate }}</label>
				</span>
				<div id="ERROR_last_name" class="logError"></div>
			</div>
		</div>
		<div class="row">
			<!-- CORREO -->
			<div class="col-sm-6">
				<h5>
					<strong>{{'GENE.AST'| translate}}&nbsp;{{ 'USER.MAIL' |
						translate }}</strong>
				</h5>
				<input name="user_mail" id="user_mail" class="form-control"
					placeholder="{{ 'USER.MAIL' | translate }}"
					ng-model="user.user_mail" type="email" ng-maxlength="54" required />
				<span
					ng-show="!MAE1001EditForm.user_mail.$pristine && MAE1001EditForm.user_mail.$error.email"
					class="logError has-error"><label class="control-label"
					for="user_mail"><i class="fa fa-times-circle-o"></i> {{
						'VALI.MAIL_INV' | translate }}</label></span> <span class="logError has-error"
					ng-show="!MAE1001EditForm.user_mail.$pristine && MAE1001EditForm.user_mail.$error.required"><label
					class="control-label" for="user_mail"><i
						class="fa fa-times-circle-o"></i>&nbsp; {{ 'VALI.MAIL_REQ' |
						translate }}</label></span>
				<div id="ERROR_user_mail" class="logError"></div>
			</div>
			<!-- CONFIRMACION CORREO -->
			<div class="col-sm-6">
				<h5>
					<strong>{{'GENE.AST'| translate}}&nbsp;{{ 'USER.CONF_MAIL' |
						translate }}</strong>
				</h5>
				<input name="conf_mail" id="conf_mail" class="form-control"
					placeholder="{{ 'USER.CONF_MAIL' | translate }}"
					ng-model="user.conf_mail" type="email" ng-maxlength="54"
					match='user_mail' required /> <span
					ng-show="!MAE1001EditForm.conf_mail.$pristine && MAE1001EditForm.conf_mail.$error.email"
					class="logError has-error"><label class="control-label"
					for="conf_mail"><i class="fa fa-times-circle-o"></i> {{
						'VALI.MAIL_INV' | translate }}</label></span> <span class="logError has-error"
					ng-show="!MAE1001EditForm.conf_mail.$pristine && MAE1001EditForm.conf_mail.$error.required"><label
					class="control-label" for="conf_mail"><i
						class="fa fa-times-circle-o"></i>&nbsp; {{ 'VALI.MAIL_REQ' |
						translate }}</label></span>
				<div class='logError msg-block' ng-show='MAE1001EditForm.$error'>
					<span class='msg-error has-error'
						ng-show='!MAE1001EditForm.conf_mail.$pristine && MAE1001EditForm.conf_mail.$error.match'>
						<label class="control-label" for="conf_mail"><i
							class="fa fa-times-circle-o"></i> {{'VALI.MAI_NEQU' | translate
							}}</label>
					</span>
					<div id="ERROR_conf_mail" class="logError"></div>
				</div>
			</div>
		</div>
		<div class="row">
			<!-- TEL�FONO -->
			<div class="col-sm-6">
				<h5>
					<strong>{{'GENE.AST'| translate}}&nbsp;{{ 'GENE.PHONE' |
						translate }}</strong>
				</h5>
				<input name="phone" id="phone" class="form-control"
					placeholder="{{
							'USER.PHON' | translate }}"
					ng-model="user.phone" ng-maxlength="20" mask="(999) 999-9999"
					clean="true" required /> <span
					ng-show="!MAE1001EditForm.phone.$pristine && MAE1001EditForm.phone.$error.required"
					class="logError has-error"><label class="control-label"
					for="phone"><i class="fa fa-times-circle-o"></i>&nbsp; {{
						'VALI.PHON_REQ' | translate }}</label></span>
				<div id="ERROR_phone" class="logError"></div>
			</div>
			
			<!-- ROLES O DOMINIOS -->
			<div class="col-sm-6">
				<h5>
					<strong>{{'GENE.AST'| translate}}&nbsp;{{ 'USER.ROLES' |
						translate }}</strong>
				</h5>
				<select data-placeholder="{{
						'GENE.SELE_AOPT' | translate }}"
					chosen="{width: '100%'}" multiple
					ng-options="role as role.name for role in roles track by role.id"
					name="roles" ng-model="user.roles" required>
				</select>
				<span
					ng-show="!MAE1001EditForm.roles.$pristine && MAE1001EditForm.roles.$error.required"
					class="logError has-error"><label class="control-label"
					for="roles"><i class="fa fa-times-circle-o"></i>&nbsp; {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_roles" class="logError"></div>
			</div>
		</div>
		<br />
		<div class="modal-footer">
			<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
				class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
			</a> <a ng-disabled="!MAE1001EditForm.$valid" ng-click="update(MAE1001EditForm)"
				class="btn btn-app btn btn-primary"> <i class="fa fa-save"></i>
				{{ 'GENE.SAVE' | translate }}
			</a>
		</div>
	</form>
</div>
</script>