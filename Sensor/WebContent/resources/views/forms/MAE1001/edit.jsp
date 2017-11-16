<div class="modal-header">
	<h3 class="box-title">{{ ('FORM.USER' | translate)+('FORM.EDIT' |
		translate) }}</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<!--  -->
	<form id="userEditForm" id="userEditForm" name="userEditForm"
		novalidate>
		<div class="row">
			<div class="col-sm-6">
				<h5>{{ 'USER.NAME' | translate }}</h5>
				<input name="frst_name" id="frst_name" class="textOnly form-control"
					placeholder="{{ 'USER.NAME' | translate }}"
					ng-model="user.frst_name" ng-maxlength="18" required /> <span
					ng-show="!userEditForm.frst_name.$touched && userEditForm.frst_name.$error.required"
					class="logError has-error">{{ 'VALI.NAME_REQ' | translate }}</span>
				<div id="ERROR_frst_name" class="logError has-error"></div>
			</div>
			<div class="col-sm-6">
				<h5>{{ 'USER.PHON' | translate }}</h5>
				<input name="phone" id="phone" class="form-control"
					placeholder="{{
							'USER.PHON' | translate }}"
					ng-model="user.phone" ng-maxlength="20" mask="(999) 999-9999"
					clean="true" required /> <span
					ng-show="!userEditForm.phone.$touched && userEditForm.phone.$error.required"
					class="logError has-error">{{ 'VALI.PHON_REQ' | translate }}</span>
				<div id="ERROR_phone" class="logError has-error"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<h5>{{ 'USER.MAIL' | translate }}</h5>
				<input name="user_mail" id="user_mail" class="form-control"
					placeholder="{{ 'USER.MAIL' | translate }}"
					ng-model="user.user_mail" type="email" ng-maxlength="54" required />
				<span
					ng-show="!userForm.user_mail.$touched && userForm.user_mail.$error.email"
					class="logError has-error"><label class="control-label"
					for="user_mail"><i class="fa fa-times-circle-o"></i> {{
						'VALI.MAIL_INV' | translate }}</label></span> <span class="logError has-error"
					ng-show="!userForm.user_mail.$touched && userForm.user_mail.$error.required"><label
					class="control-label" for="user_mail"><i
						class="fa fa-times-circle-o"></i> {{ 'VALI.MAIL_REQ' | translate
						}}</label></span>
				<div id="ERROR_user_mail" class="logError has-error"></div>
			</div>
			<div class="col-sm-6">
				<h5>{{ 'USER.CONF_MAIL' | translate }}</h5>
				<input name="conf_mail" id="conf_mail" class="form-control"
					placeholder="{{ 'USER.CONF_MAIL' | translate }}"
					ng-model="user.conf_mail" type="email" ng-maxlength="54"
					pw-check='user_mail' required /> <span
					ng-show="!userEditForm.conf_mail.$touched && userEditForm.conf_mail.$error.email"
					class="logError has-error"><label class="control-label"
					for="conf_mail"><i class="fa fa-times-circle-o"></i> {{
						'VALI.MAIL_INV' | translate }}</label></span> <span class="logError has-error"
					ng-show="!userEditForm.conf_mail.$touched && userEditForm.conf_mail.$error.required"><label
					class="control-label" for="conf_mail"><i
						class="fa fa-times-circle-o"></i> {{ 'VALI.MAIL_REQ' | translate
						}}</label></span>
				<div class='logError msg-block' ng-show='userEditForm.$error'>
					<span class='msg-error has-error'
						ng-show='!userEditForm.conf_mail.$touched && userEditForm.conf_mail.$error.pwmatch'>
						<label class="control-label" for="conf_mail"><i
							class="fa fa-times-circle-o"></i> {{'VALI.MAI_NEQU' | translate
							}}</label>
					</span>
					<div id="ERROR_conf_mail" class="logError has-error"></div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<h5>{{ 'USER.STAT' | translate }}</h5>
				<select id="active" name="active" ng-model="user.active"
					chosen="{width: '100%'}"
					data-placeholder="{{
						'GENE.SELE_AOPT' | translate }}"
					disable-search="true" allow-single-deselect="true"
					ng-options="(item?'{{'DOMAIN.YES' | translate}}':'{{'DOMAIN.NO' | translate}}') for item in [true, false]"
					required>
				</select> <span
					ng-show="!userEditForm.active.$pending && userEditForm.status.$error.required"
					class="logError has-error"><label class="control-label"
					for="name"><i class="fa fa-times-circle-o"></i>{{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_active" class="logError has-error"></div>
			</div>
			<div class="col-sm-6">
				<h5>{{ 'USER.ROLES' | translate }}</h5>
				<select data-placeholder="{{
						'GENE.SELE_AOPT' | translate }}"
					chosen="{width: '100%'}" multiple
					ng-options="option as option.role_name for option in rolesList track by option.id"
					name="roles" ng-model="user.roles" required>
				</select>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">{{ 'GENE.PERM' | translate }}</div>
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
		<br />
		<div class="modal-footer">
			<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
				class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
			</a> <a ng-disabled="!userEditForm.$valid" ng-click="submitForm(user, userEditForm)"
				class="btn btn-app btn btn-primary"> <i class="fa fa-save"></i>
				{{ 'GENE.SAVE' | translate }}
			</a>
		</div>
	</form>
</div>