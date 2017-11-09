<div class="modal-header">
	<h3 class="box-title">{{ ('FORM.MAE1013' | translate)+('FORM.EDIT'
		| translate) }}</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<!--  -->
	<form id="MAE1013EditForm" name="MAE1013EditForm" novalidate="true">
		<div class="row">
			<div class="col-sm-6">
				<h5>{{ 'MAE1013.TIPM' | translate }}</h5>
				<select name="tipm" chosen="{width: '100%'}"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					allow-single-deselect="true" ng-model="mae1013.tipm"
					ng-options="tipm as tipm.dsca for tipm in lstTipm track by tipm.id"
					required>
				</select><span
					ng-show="!MAE1013EditForm.tipm.$untouched && MAE1013EditForm.tipm.$error.required"
					class="logError has-error"><label class="control-label"
					for="tipm"><i class="fa fa-times-circle-o"></i>{{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_tipm" class="logError has-error"></div>
			</div>

			<div class="col-sm-6">
				<h5>{{ 'MAE1013.CDDP' | translate }}</h5>
				<input name="cddp" id="cddp" class="form-control"
					placeholder="{{ 'MAE1013.CDDP' | translate }}"
					ng-model="mae1013.cddp" ng-maxlength="10" readOnly />
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<h5>{{ 'GENE.ORIGIN' | translate }}</h5>
				<select ng-change="selectOrigin()" name="origin"
					chosen="{width: '100%'}"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					allow-single-deselect="true" ng-model="mae1013.origin"
					ng-options="source as source.dsca for source in sources track by source.id"
					required>
				</select><span
					ng-show="!MAE1013EditForm.origin.$untouched && MAE1013EditForm.origin.$error.required"
					class="logError has-error"><label class="control-label"
					for="origin"><i class="fa fa-times-circle-o"></i>{{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_origin" class="logError has-error"></div>
			</div>
			<!-- Partner origen -->
			<div class="col-sm-6" ng-if="mae1013.origin.id==0">
				<search-mae1017-component nameform="MAE1013EditForm"
					mae1017="mae1013.orig_p" formm="MAE1013EditForm" />
			</div>
			<!-- Almacén origen -->
			<div class="col-sm-6" ng-if="mae1013.origin.id==1">
			<search-mae1018-component nameform="MAE1013EditForm"
					mae1018="mae1013.orig_a" formm="MAE1013EditForm" />
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<h5>{{ 'GENE.DESTINY' | translate }}</h5>
				<select ng-change="selectDestin()" name="destiny"
					chosen="{width: '100%'}"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					allow-single-deselect="true" ng-model="mae1013.destin"
					ng-options="source as source.dsca for source in sources track by source.id"
					required>
				</select><span
					ng-show="!MAE1013EditForm.destiny.$untouched && MAE1013EditForm.destiny.$error.required"
					class="logError has-error"><label class="control-label"
					for="destiny"><i class="fa fa-times-circle-o"></i>{{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_destiny" class="logError has-error"></div>
			</div>
			<!-- Partner destino -->
			<div class="col-sm-6" ng-if="mae1013.destin.id==0">
				<search-mae1017-d-component nameform="MAE1013EditForm"
					mae1017="mae1013.dest_p" formm="MAE1013EditForm" />
			</div>
			<!-- Almacen destino -->
			<div class="col-sm-6" ng-if="mae1013.destin.id==1">
			
			<search-mae1018-d-component nameform="MAE1013EditForm"
					mae1018="mae1013.dest_a" formm="MAE1013EditForm" />
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<h5>{{ 'MAE1013.PREC' | translate }}</h5>
				<input name="prec" id="prec" class="form-control"
					placeholder="{{ 'MAE1013.PREC' | translate }}"
					ng-model="mae1013.prec" ng-maxlength="49" clean="true"
					/>
				<div id="ERROR_prec" class="logError"></div>
			</div>

			<div class="col-sm-6">
				<search-mae1012-component nameform="MAE1013EditForm"
					mae1012="mae1013.motr" formm="MAE1013EditForm" />
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<search-mae1011-component nameform="MAE1013EditForm"
					mae1011="mae1013.cond" formm="MAE1013EditForm" />
			</div>
			<div class="col-sm-6">
				<search-mae1016-component nameform="MAE1013EditForm"
					mae1016="mae1013.company" formm="MAE1013EditForm" />
			</div>
		</div>
		<br />
		<div class="modal-footer">
			<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
				class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
			</a> <a ng-disabled="!MAE1013EditForm.$valid" ng-click="submitForm(mae1013, MAE1013EditForm)"
				class="btn btn-app btn btn-primary"> <i class="fa fa-save"></i>
				{{ 'GENE.SAVE' | translate }}
			</a>
		</div>
	</form>
</div>