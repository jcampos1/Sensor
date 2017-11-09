<div class="modal-header">
	<h3 class="box-title">{{ ('FORM.USER' | translate)+('FORM.QUERY' |
		translate) }}</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<div class="row">
		<div class="col-sm-4">
			<h5>{{ 'USER.NAME' | translate }}</h5>
			<input name="frst_name" id="frst_name" class="textOnly form-control"
				placeholder="{{ 'USER.NAME' | translate }}"
				ng-model="user.frst_name" readOnly />
		</div>
		<div class="col-sm-4">
			<h5>{{ 'USER.LAST_NAME' | translate }}</h5>
			<input name="last_name" id="last_name" class="textOnly form-control"
				placeholder="{{ 'USER.LAST_NAME' | translate }}"
				ng-model="user.last_name" readOnly />
		</div>
		<div class="col-sm-4">
			<h5>{{ 'USER.MAIL' | translate }}</h5>
			<input name="user_mail" class="form-control"
				placeholder="{{ 'USER.MAIL' | translate }}"
				ng-model="user.user_mail" type="email" readOnly />
		</div>
	</div>
	<br />
	<div class="row">
		<div class="col-sm-4">
			<h5>{{ 'USER.PHON' | translate }}</h5>
			<input name="phone" class="form-control"
				placeholder="{{
							'USER.PHON' | translate }}"
				ng-model="user.phone" mask="(999) 999-9999" readOnly />
		</div>
		<div class="col-sm-4">
			<h5>{{ 'USER.CRTE_DATE' | translate }}</h5>
			<input name="crte_date" class="form-control"
				placeholder="{{
							'USER.CRTE_DATE' | translate }}"
				ng-model="user.crte_date" readOnly />
		</div>
		<div class="col-sm-4">
			<h5>{{ 'USER.STAT' | translate }}</h5>
			<select id="active" name="active" ng-model="user.active"
				chosen="{width: '100%'}"
				ng-options="(item?'{{'DOMAIN.YES' | translate}}':'{{'DOMAIN.NO' | translate}}') for item in [true, false]"
				disabled>
			</select>
		</div>
	</div>
	<br />
	<div class="row">
		<div class="col-sm-4">
			<h5>{{ 'USER.DATE_ACTI' | translate }}</h5>
			<input name="date_acti" class="form-control"
				placeholder="{{
							'USER.DATE_ACTI' | translate }}"
				ng-model="user.date_acti" readOnly />
		</div>
		<div class="col-sm-4">
			<h5>{{ 'USER.BLOQ' | translate }}</h5>
			<select id="user_bloq" name="user_bloq" ng-model="user.user_bloq"
				chosen="{width: '100%'}"
				ng-options="(item?'{{'DOMAIN.Y' | translate}}':'{{'DOMAIN.N' | translate}}') for item in [true, false]"
				disabled>
			</select>
		</div>
		<div class="col-sm-4">
			<h5>{{ 'USER.ROLES' | translate }}</h5>
			<select data-placeholder="{{
						'GENE.SELE_AOPT' | translate }}"
				chosen="{width: '100%'}" multiple
				ng-options="option as option.role_name for option in rolesList track by option.id"
				name="roles" ng-model="user.roles" disabled>
			</select>
		</div>
	</div>
	<br />
	<div class="row">
		<div class="col-sm-6">{{ 'GENE.PERM' | translate }}</div>
	</div>
	<div class="row">
		<div class="col-sm-6">
			<div class="checkbox">
				<label> <input type="checkbox" ng-model="user.ornd" readOnly="true" disabled="true">
					{{ 'USER.NORD' | translate }}
				</label>
			</div>
		</div>
		<div class="col-sm-6">
			<div class="checkbox">
				<label> <input type="checkbox" ng-model="user.ingr" readOnly="true" disabled="true">
					{{ 'USER.INGR' | translate }}
				</label>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-6">
			<div class="checkbox">
				<label> <input type="checkbox" ng-model="user.dele" readOnly="true" disabled="true">
					{{ 'USER.DELE' | translate }}
				</label>
			</div>
		</div>
		<div class="col-sm-6">
			<div class="checkbox">
				<label> <input type="checkbox" ng-model="user.apro" readOnly="true" disabled="true">
					{{ 'USER.APRO' | translate }}
				</label>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-6">
			<div class="checkbox">
				<label> <input type="checkbox" ng-model="user.anul" readOnly="true" disabled="true">
					{{ 'USER.ANUL' | translate }}
				</label>
			</div>
		</div>
		<div class="col-sm-6">
			<div class="checkbox">
				<label> <input type="checkbox" ng-model="user.peso" readOnly="true" disabled="true">
					{{ 'USER.PESO' | translate }}
				</label>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-6">
			<div class="checkbox">
				<label> <input type="checkbox" ng-model="user.geov" readOnly="true" disabled="true">
					{{ 'USER.GEOV' | translate }}
				</label>
			</div>
		</div>
	</div>
	<br>

	<div class="modal-footer">
		<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
			class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
		</a>
	</div>
</div>