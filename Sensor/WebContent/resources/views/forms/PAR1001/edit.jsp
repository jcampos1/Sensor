<div class="modal-header">
	<h3 class="box-title">{{ ('FORM.PAR1001' | translate)+('FORM.EDIT'
		| translate) }}</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<!--  -->
	<form id="PAR1001EditForm" name="PAR1001EditForm" novalidate="true">
		<div class="row">
			<div class="col-sm-6">
				<h5>{{ 'MAE1007.DSCA' | translate }}</h5>
				<input name="dsca" id="dsca" class="form-control"
					placeholder="{{ 'GENE.DSCA' | translate }}" ng-model="par1001.dsca"
					ng-maxlength="35" required /> <span
					ng-show="!PAR1001EditForm.dsca.$pristine && PAR1001EditForm.dsca.$error.required"
					class="logError has-error"><label class="control-label"
					for="dsca"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_dsca" class="logError"></div>
			</div>
			<div class="col-sm-3">
				<h5>{{ 'PAR1001.SERI' | translate }}</h5>
				<input name="seri" id="seri" class="form-control"
					placeholder="{{ 'PAR1001.SERI' | translate }}"
					ng-model="par1001.seri" ng-maxlength="3" required /> <span
					ng-show="!PAR1001EditForm.seri.$pristine && PAR1001EditForm.seri.$error.required"
					class="logError has-error"><label class="control-label"
					for="seri"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_seri" class="logError"></div>
			</div>
			<div class="col-sm-3">
				<h5>{{ 'GENE.COMPANY' | translate }}</h5>
				<p class="input-group">
					<input name="company" id="company" class="form-control"
						placeholder="{{ 'GENE.COMPANY' | translate }}"
						ng-model="par1001.company.dsca" readonly="true" required /> <span
						class="input-group-btn"> <select-mae1016-component />
					</span> </input>
				</p>
				<span
					ng-show="!MAE1013Form.company.$pristine && MAE1013Form.company.$error.required"
					class="logError has-error"><label class="control-label"
					for="company"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_company" class="logError"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<h5>{{ 'PAR1001.CDDP' | translate }}</h5>
				<input name="cddp" id="cddp" class="form-control"
					placeholder="{{ 'PAR1001.CDDP' | translate }}"
					ng-model="par1001.cddp" ng-maxlength="6" required /> <span
					ng-show="!PAR1001EditForm.cddp.$pristine && PAR1001EditForm.cddp.$error.required"
					class="logError has-error"><label class="control-label"
					for="cddp"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_cddp" class="logError"></div>
			</div>
			<div class="col-sm-3">
				<br />
				<div class="checkbox">
					<label> <input name="rep_te" id="rep_te" type="checkbox"
						ng-model="par1001.rep_te"> {{ 'PAR1001.REP_TE' | translate
						}}
					</label> <span ng-show="!PAR1001EditForm.rep_te && !PAR1001EditForm.pescon"
						class="logError has-error"><label class="control-label"
						for="rep_te"><i class="fa fa-times-circle-o"></i> {{
							'GENE.ERR001' | translate }}</label></span>
					<div id="ERROR_rep_te" class="logError"></div>
				</div>
			</div>
			<div class="col-sm-3">
				<br />
				<div class="checkbox">
					<label> <input name="pescon" id="pescon" type="checkbox"
						ng-model="par1001.pescon"> {{ 'PAR1001.PESCON' | translate
						}}
					</label> <span ng-show="!PAR1001EditForm.rep_te && !PAR1001EditForm.pescon"
						class="logError has-error"><label class="control-label"
						for="pescon"><i class="fa fa-times-circle-o"></i> {{
							'GENE.ERR001' | translate }}</label></span>
					<div id="ERROR_pescon" class="logError"></div>
				</div>
			</div>
		</div>
		<br />
		<div class="modal-footer">
			<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
				class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
			</a> <a ng-disabled="!PAR1001EditForm.$valid"
				ng-click="submitForm(par1001, PAR1001EditForm)" class="btn btn-app btn btn-primary">
				<i class="fa fa-save"></i> {{ 'GENE.SAVE' | translate }}
			</a>
		</div>
	</form>
</div>