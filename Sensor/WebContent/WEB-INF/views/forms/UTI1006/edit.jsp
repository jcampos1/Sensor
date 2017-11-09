<!------------- FORMULARIO EDICIÓN MOTIVO --------------->

<div class="modal-header">
	<h3 class="box-title">{{ ('FORM.UTI1006' | translate)+('FORM.EDIT' | translate) }}</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<!--  -->
	<form id="UTI1006EditForm" name="UTI1006EditForm"
		novalidate="true">
		<div class="row">
			<div class="col-sm-6">
				<h5>{{ 'GENE.CODE' | translate }}</h5>
				<input name="code_m" id="code_m" class="form-control"
					placeholder="{{ 'GENE.CODE' | translate }}"
					ng-model="uti1006.code_m" ng-maxlength="6" required /> <span
					ng-show="!UTI1006EditForm.code_m.$pristine && UTI1006EditForm.code_m.$error.required"
					class="logError has-error"><label class="control-label"
					for="code_m"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_code_m" class="logError has-error"></div>
			</div>
			<div class="col-sm-6">
				<h5>{{ 'GENE.DSCA' | translate }}</h5>
				<input name="dsca_m" id="dsca_m" class="form-control"
					placeholder="{{ 'UTI1006.DSCA_M' | translate }}"
					ng-model="uti1006.dsca_m" ng-maxlength="30" required /> <span
					ng-show="!UTI1006EditForm.dsca_m.$pristine && UTI1006EditForm.dsca_m.$error.required"
					class="logError has-error"><label class="control-label"
					for="dsca_m"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_dsca_m" class="logError has-error"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<h5>{{ 'UTI1006.TYPE_M' | translate }}</h5>
				<select name="type_m" id="type_m" chosen="{width: '100%'}"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					allow-single-deselect="true" ng-model="uti1006.type_m"
					ng-options="type_m as type_m.dsca for type_m in lstType track by type_m.id" required>
				</select><span
					ng-show="!UTI1006EditForm.type_m.$untouched && UTI1006EditForm.type_m.$error.required"
					class="logError has-error"><label class="control-label"
					for="type_m"><i class="fa fa-times-circle-o"></i>{{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_type_m" class="logError has-error"></div>
			</div>
		</div>
		<br />
		<div class="modal-footer">
			<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
				class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
			</a> <a ng-disabled="!UTI1006EditForm.$valid" ng-click="submitForm(uti1006)"
				class="btn btn-app btn btn-primary"> <i class="fa fa-save"></i>
				{{ 'GENE.SAVE' | translate }}
			</a>
		</div>
	</form>
</div>