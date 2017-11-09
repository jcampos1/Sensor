<div class="modal-header">
	<h3 class="box-title">{{ ('FORM.PAR1001' | translate)+('FORM.NEW' | translate) }}</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<!--  -->
	<form id="PAR1001Form" name="PAR1001Form" novalidate="true">
		<div class="row">
			<div class="col-sm-6">
				<h5>{{ 'GENE.DSCA' | translate }}</h5>
				<input name="dsca" id="dsca" class="form-control"
					placeholder="{{ 'GENE.DSCA' | translate }}" ng-model="par1001.dsca"
					ng-maxlength="35" required /> <span
					ng-show="!PAR1001EditForm.dsca.$pristine && PAR1001EditForm.dsca.$error.required"
					class="logError has-error"><label class="control-label"
					for="dsca"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_dsca" class="logError"></div>
			</div>
			<div class="col-sm-6">
				<h5>{{ 'PAR1001.SERI' | translate }}</h5>
				<input name="seri" id="seri" class="form-control"
					placeholder="{{ 'PAR1001.SERI' | translate }}"
					ng-model="par1001.seri" ng-maxlength="3" required /> <span
					ng-show="!PAR1001Form.seri.$pristine && PAR1001Form.seri.$error.required"
					class="logError has-error"><label class="control-label"
					for="seri"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_seri" class="logError"></div>
			</div>
		</div>
		<br />
		<div class="row">
			<div class="col-sm-6">
				<h5>{{ 'PAR1001.CDDP' | translate }}</h5>
				<input name="cddp" id="cddp" class="form-control"
					placeholder="{{ 'PAR1001.CDDP' | translate }}"
					ng-model="par1001.cddp" ng-maxlength="6" required /> <span
					ng-show="!PAR1001Form.cddp.$pristine && PAR1001Form.cddp.$error.required"
					class="logError has-error"><label class="control-label"
					for="cddp"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_cddp" class="logError"></div>
			</div>
		</div>
		<br />
		<div class="modal-footer">
			<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
				class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
			</a> <a ng-disabled="!PAR1001Form.$valid" ng-click="submitForm(par1001, PAR1001Form)"
				class="btn btn-app btn btn-primary"> <i class="fa fa-save"></i>
				{{ 'GENE.SAVE' | translate }}
			</a>
		</div>
	</form>
</div>