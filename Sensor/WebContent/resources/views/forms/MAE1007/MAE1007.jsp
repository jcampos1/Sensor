<div class="modal-header">
	<h3 class="box-title">{{ ('FORM.MAE1007' | translate)+('FORM.NEW'
		| translate) }}</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<!--  -->
	<form id="MAE1007Form" name="MAE1007Form" novalidate="true">
		<div class="row">
			<div class="col-sm-6">
				<h5>{{ 'MAE1007.CODE' | translate }}</h5>
				<input name="code" id="code" class="form-control"
					placeholder="{{ 'MAE1007.CODE' | translate }}"
					ng-model="mae1007.code" ng-maxlength="6" required /> <span
					ng-show="!MAE1007Form.code.$pristine && MAE1007Form.code.$error.required"
					class="logError has-error"><label class="control-label"
					for="code"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_code" class="logError"></div>
			</div>
			<div class="col-sm-6">
				<h5>{{ 'MAE1007.DSCA' | translate }}</h5>
				<input name="dsca" id="dsca" class="form-control"
					placeholder="{{ 'MAE1007.DSCA' | translate }}"
					ng-model="mae1007.dsca" ng-maxlength="30" required /> <span
					ng-show="!MAE1007Form.dsca.$pristine && MAE1007Form.dsca.$error.required"
					class="logError has-error"><label class="control-label"
					for="name"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_dsca" class="logError"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<h5>
					{{ 'MAE1007.CHAR_SEPA_FULL' | translate }}&nbsp;<i
						uib-tooltip="{{'TLTPS.CHAR_SEPA_TP'| translate}}"
						tooltip-trigger="focus" class="fa fa-info-circle"
						aria-hidden="true"></i>
				</h5>
				<select name="char_sepa" id="char_sepa" chosen="{width: '100%'}"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					allow-single-deselect="true" ng-model="mae1007.char_sepa"
					ng-options="char_sepa as char_sepa.dsca for char_sepa in lstChar_sepa track by char_sepa.id"
					class="form-control" required>
				</select><span
					ng-show="!MAE1007Form.char_sepa.$untouched && MAE1007Form.char_sepa.$error.required"
					class="logError has-error"><label class="control-label"
					for="char_sepa"><i class="fa fa-times-circle-o"></i>{{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_char_sepa" class="logError has-error"></div>
			</div>
			<div class="col-sm-6">
				<h5>
					{{ 'MAE1007.CHAR_STAB_FULL' | translate }}&nbsp;<i
						uib-tooltip="{{'TLTPS.CHAR_STAB_TP'| translate}}"
						tooltip-trigger="focus" class="fa fa-info-circle"
						aria-hidden="true"></i>
				</h5>
				<input name="char_stab" id="char_stab" class="form-control"
					placeholder="{{ 'MAE1007.CHAR_STAB_FULL' | translate }}"
					ng-model="mae1007.char_stab" ng-maxlength="3" />
				<div id="ERROR_char_stab" class="logError"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<h5>
					{{ 'MAE1007.CHAR_UNIT_FULL' | translate }}&nbsp;<i
						uib-tooltip="{{'TLTPS.CHAR_UNIT_TP'| translate}}"
						tooltip-trigger="focus" class="fa fa-info-circle"
						aria-hidden="true"></i>
				</h5>
				<input name="char_unit" id="char_unit" class="form-control"
					placeholder="{{ 'MAE1007.CHAR_UNIT_FULL' | translate }}"
					ng-model="mae1007.char_unit" ng-maxlength="3" required /> <span
					ng-show="!MAE1007Form.char_unit.$pristine && MAE1007Form.char_unit.$error.required"
					class="logError has-error"><label class="control-label"
					for="char_unit"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_char_unit" class="logError"></div>
			</div>
			<div class="col-sm-6">
				<h5>
					{{ 'MAE1007.NMAX_STAB_FULL' | translate }}&nbsp;<i
						uib-tooltip="{{'TLTPS.NMAX_STAB_TP'| translate}}"
						tooltip-trigger="focus" class="fa fa-info-circle"
						aria-hidden="true"></i>
				</h5>
				<select name="nmax_stab" chosen="{width: '100%'}"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					allow-single-deselect="true" ng-model="mae1007.nmax_stab"
					ng-options="nmax_stab for nmax_stab in lstNmax_stab"
					class="form-control" required>
				</select><span
					ng-show="!MAE1007Form.nmax_stab.$untouched && MAE1007Form.nmax_stab.$error.required"
					class="logError has-error"><label class="control-label"
					for="nmax_stab"><i class="fa fa-times-circle-o"></i>{{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_nmax_stab" class="logError has-error"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<h5>
					{{ 'MAE1007.NMAX_UNST_FULL' | translate }}&nbsp;<i
						uib-tooltip="{{'TLTPS.NMAX_UNST_TP'| translate}}"
						tooltip-trigger="focus" class="fa fa-info-circle"
						aria-hidden="true"></i>
				</h5>
				<select name="nmax_unst" chosen="{width: '100%'}"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					allow-single-deselect="true" ng-model="mae1007.nmax_unst"
					ng-options="nmax_unst for nmax_unst in lstNmax_unst"
					class="form-control" required>
				</select><span
					ng-show="!MAE1007Form.nmax_unst.$untouched && MAE1007Form.nmax_unst.$error.required"
					class="logError has-error"><label class="control-label"
					for="nmax_unst"><i class="fa fa-times-circle-o"></i>{{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_nmax_unst" class="logError has-error"></div>
			</div>
			<div class="col-sm-6">
				<h5>{{ 'MAE1007.POSI_WEIG_FULL' | translate }}</h5>
				<select name="posi_weig" chosen="{width: '100%'}"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					allow-single-deselect="true" ng-model="mae1007.posi_weig"
					ng-options="posi_weig for posi_weig in lstPosi_weig"
					class="form-control" required>
				</select><span
					ng-show="!MAE1007Form.posi_weig.$untouched && MAE1007Form.posi_weig.$error.required"
					class="logError has-error"><label class="control-label"
					for="posi_weig"><i class="fa fa-times-circle-o"></i>{{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_posi_weig" class="logError has-error"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<h5>
					{{ 'MAE1007.NMAX_SLEP' | translate }}&nbsp;<i
						uib-tooltip="{{'TLTPS.NMAX_SLEP_TP'| translate}}"
						tooltip-trigger="focus" class="fa fa-info-circle"
						aria-hidden="true"></i>
				</h5>
				<select name="nmax_slep" chosen="{width: '100%'}"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					allow-single-deselect="true" ng-model="mae1007.nmax_slep"
					ng-options="nmax_slep for nmax_slep in lstNmax_slep"
					class="form-control" required>
				</select><span
					ng-show="!MAE1007Form.nmax_slep.$untouched && MAE1007Form.nmax_slep.$error.required"
					class="logError has-error"><label class="control-label"
					for="nmax_slep"><i class="fa fa-times-circle-o"></i>{{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_nmax_slep" class="logError has-error"></div>
			</div>
			<div class="col-sm-6">
				<h5>{{ 'MAE1007.POSI_STAB_FULL' | translate }}</h5>
				<select name="posi_stab" chosen="{width: '100%'}"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					allow-single-deselect="true" ng-model="mae1007.posi_stab"
					ng-options="posi_stab for posi_stab in lstPosi_stab"
					class="form-control" required>
				</select><span
					ng-show="!MAE1007Form.posi_stab.$untouched && MAE1007Form.posi_stab.$error.required"
					class="logError has-error"><label class="control-label"
					for="posi_stab"><i class="fa fa-times-circle-o"></i>{{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_posi_stab" class="logError has-error"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<h5>
					{{ 'MAE1007.VAL_MIN_FULL' | translate }}&nbsp;<i
						uib-tooltip="{{'TLTPS.VAL_MIN_TP'| translate}}"
						tooltip-trigger="focus" class="fa fa-info-circle"
						aria-hidden="true"></i>
				</h5>
				<select name="val_min" chosen="{width: '100%'}"
					allow-single-deselect="true" ng-model="mae1007.val_min"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					ng-options="val_min for val_min in lstVal_min" class="form-control"
					required>
				</select><span
					ng-show="!MAE1007Form.val_min.$untouched && MAE1007Form.val_min.$error.required"
					class="logError has-error"><label class="control-label"
					for="val_min"><i class="fa fa-times-circle-o"></i>{{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_val_min" class="logError has-error"></div>
			</div>
			<div class="col-sm-6">
				<h5>
					{{ 'MAE1007.VAL_MAX_FULL' | translate }}&nbsp;<i
						uib-tooltip="{{'TLTPS.VAL_MAX_TP'| translate}}"
						tooltip-trigger="focus" class="fa fa-info-circle"
						aria-hidden="true"></i>
				</h5>
				<select name="val_max" chosen="{width: '100%'}"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					allow-single-deselect="true" ng-model="mae1007.val_max"
					ng-options="val_max for val_max in lstVal_max" class="form-control"
					required>
				</select><span
					ng-show="!MAE1007Form.val_max.$untouched && MAE1007Form.val_max.$error.required"
					class="logError has-error"><label class="control-label"
					for="val_max"><i class="fa fa-times-circle-o"></i>{{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_val_max" class="logError has-error"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<h5>
					{{ 'MAE1007.NREAD_TRIED_FULL' | translate }}&nbsp;<i
						uib-tooltip="{{'TLTPS.NREAD_TRIED_TP'| translate}}"
						tooltip-trigger="focus" class="fa fa-info-circle"
						aria-hidden="true"></i>
				</h5>
				<select name="nread_tried" chosen="{width: '100%'}"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					allow-single-deselect="true" ng-model="mae1007.nread_tried"
					ng-options="nread_tried for nread_tried in lstNread_tried"
					class="form-control" required>
				</select><span
					ng-show="!MAE1007Form.nread_tried.$untouched && MAE1007Form.nread_tried.$error.required"
					class="logError has-error"><label class="control-label"
					for="nread_tried"><i class="fa fa-times-circle-o"></i>{{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_nread_tried" class="logError has-error"></div>
			</div>
			<div class="col-sm-6" ng-controller="selectMAE1008Controller">
				<h5>{{ 'GENE.PORT' | translate }}</h5>
				<p class="input-group">
					<input name="port" id="port" class="form-control"
						placeholder="{{ 'GENE.PORT' | translate }}"
						ng-model="rowSelected.port_name" ng-maxlength="10" readonly="true"
						required /> <span class="input-group-btn"> <select-mae1008-component />
					</span> </input>
				</p>
				</span> <span
					ng-show="!MAE1007Form.port.$pristine && MAE1007Form.port.$error.required"
					class="logError has-error"><label class="control-label"
					for="char_unit"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_port" class="logError"></div>
			</div>

		</div>
		<div class="row">
			<div class="col-sm-6">
				<h5>
					{{ 'MAE1007.SRVR_PORT' | translate }}&nbsp;<i
						uib-tooltip="{{'TLTPS.SRVR_PORT_TP'| translate}}"
						tooltip-trigger="focus" class="fa fa-info-circle"
						aria-hidden="true"></i>
				</h5>
				<input name="srvrpo" id="srvrpo" class="form-control"
					placeholder="{{ 'MAE1007.CHAR_UNIT_FULL' | translate }}"
					ng-model="mae1007.srvrpo" readOnly="true" required /> <span
					ng-show="!MAE1007Form.srvrpo.$pristine && MAE1007Form.srvrpo.$error.required"
					class="logError has-error"><label class="control-label"
					for="srvrpo"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_srvrpo" class="logError"></div>
			</div>
			<div class="col-sm-6">
				<h5>
					{{ 'MAE1007.TRACED' | translate }}&nbsp;<i
						uib-tooltip="{{'TLTPS.TRACED_TP'| translate}}"
						tooltip-trigger="focus" class="fa fa-info-circle"
						aria-hidden="true"></i>
				</h5>
				<select id="traced" name="traced" ng-model="mae1007.traced"
					chosen="{width: '100%'}"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					disable-search="true" allow-single-deselect="true"
					ng-options="(item?'{{'DOMAIN.Y' | translate}}':'{{'DOMAIN.N' | translate}}') for item in [true, false]"
					required>
				</select> <span
					ng-show="!MAE1007Form.traced.$pristine && MAE1007Form.traced.$error.required"
					class="logError has-error"><label class="control-label"
					for="traced"><i class="fa fa-times-circle-o"></i>{{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_traced" class="logError has-error"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<h5>{{ 'GENE.USE' | translate }}</h5>
				<select id="isused" name="isused" ng-model="mae1007.isused"
					chosen="{width: '100%'}"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					disable-search="true" allow-single-deselect="true"
					ng-options="(item?'{{'DOMAIN.Y' | translate}}':'{{'DOMAIN.N' | translate}}') for item in [true, false]"
					required>
				</select> <span
					ng-show="!MAE1007Form.isused.$pristine && MAE1007Form.isused.$error.required"
					class="logError has-error"><label class="control-label"
					for="isused"><i class="fa fa-times-circle-o"></i>{{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_isused" class="logError has-error"></div>
			</div>
			<div class="col-sm-6">
				<h5>{{ 'MAE1007.DSP_DEFA' | translate }}</h5>
				<select id="defaul" name="defaul" ng-model="mae1007.defaul"
					chosen="{width: '100%'}"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					disable-search="true" allow-single-deselect="true"
					ng-options="(item?'{{'DOMAIN.Y' | translate}}':'{{'DOMAIN.N' | translate}}') for item in [true, false]"
					required>
				</select> <span
					ng-show="!MAE1007Form.defaul.$pristine && MAE1007Form.defaul.$error.required"
					class="logError has-error"><label class="control-label"
					for="defaul"><i class="fa fa-times-circle-o"></i>{{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_defaul" class="logError has-error"></div>
			</div>
		</div>
		<br />
		<div class="row">
			<div class="col-sm-2">
				<button ng-disabled="!isRunApp" class="btn btn-primary"
					type="button" ng-click="captureWeigh(mae1007.srvrpo, '3', MAE1007Form)">
					<i class="fa fa-external-link" aria-hidden="true"></i>&nbsp;{{
					'GENE.CAPT' | translate }}
				</button>
			</div>
			<div class="col-sm-10"></div>
		</div>
		<br />
		<div class="row">
			<div class="col-sm-2">
				<button ng-disabled="!isRunApp" class="btn btn-primary"
					type="button" ng-click="captureWeigh(mae1007.srvrpo, '2', MAE1007Form)"
					class="form-control">
					<i class="fa fa-external-link" aria-hidden="true"></i>&nbsp;{{
					'GENE.CAPT_ZERO' | translate }}
				</button>
			</div>
			<div class="col-sm-5"></div>
			<div class="col-sm-4 form-group">
				<span style="font-size: 20px" ng-show="weight > -1000">{{
					'MAE1007.WEIGHT' | translate }}{{weight}}</span>
			</div>
		</div>
		<br />
		<div class="modal-footer">
			<div class="col-sm-1">
				<a ng-click="tryConnection(mae1007, MAE1007Form)"
					ng-disabled="!MAE1007Form.$valid"
					class="btn btn-app btn btn-success"> <i class="fa fa-check"
					aria-hidden="true"></i> {{'GENE.TEST_CONE' | translate }}
				</a>
			</div>
			<div class="col-sm-11">
				<a ng-click="cancel(mae1007.srvrpo)"
					class="btn btn-app btn btn-warning"> <i class="fa fa-close"></i>
					{{ 'GENE.CANCEL' | translate }}
				</a> <a ng-disabled="!MAE1007Form.$valid" ng-click="submitForm(mae1007, MAE1007Form)"
					class="btn btn-app btn btn-primary"> <i class="fa fa-save"></i>
					{{ 'GENE.SAVE' | translate }}
				</a>
			</div>
		</div>
	</form>
</div>