<div class="modal-header">
	<h3 class="box-title">{{ ('FORM.MAE1007' |
		translate)+('FORM.QUERY' | translate) }}</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<div class="row">
		<div class="col-sm-6">
			<h5>{{ 'MAE1007.CODE' | translate }}</h5>
			<input name="code" id="code" class="form-control"
				placeholder="{{ 'MAE1007.CODE' | translate }}"
				ng-model="mae1007.code" readOnly />
		</div>
		<div class="col-sm-6">
			<h5>{{ 'MAE1007.DSCA' | translate }}</h5>
			<input name="dsca" id="dsca" class="form-control"
				placeholder="{{ 'MAE1007.DSCA' | translate }}"
				ng-model="mae1007.dsca" readOnly />
		</div>
	</div>
	<div class="row">
		<div class="col-sm-6">
			<h5>{{ 'MAE1007.CHAR_SEPA' | translate }}</h5>
			<select name="char_sepa" chosen="{width: '100%'}"
				allow-single-deselect="true" ng-model="mae1007.char_sepa"
				ng-options="char_sepa as char_sepa.dsca for char_sepa in lstChar_sepa track by char_sepa.id"
				disabled>
				<option disabled="true" value=""
					label="{{ 'MAE1007.CHAR_SEPA' | translate }}" />
			</select>
		</div>
		<div class="col-sm-6">
			<h5>{{ 'MAE1007.CHAR_STAB' | translate }}</h5>
			<input name="char_stab" id="char_stab"
				placeholder="{{ 'MAE1007.CHAR_STAB' | translate }}"
				ng-model="mae1007.char_stab" class="form-control" readOnly />
		</div>
	</div>
	<div class="row">
		<div class="col-sm-6">
			<h5>{{ 'MAE1007.CHAR_UNIT' | translate }}</h5>
			<input name="char_unit" id="char_unit"
				placeholder="{{ 'MAE1007.CHAR_UNIT' | translate }}"
				ng-model="mae1007.char_unit" class="form-control" readOnly />
		</div>
		<div class="col-sm-6">
			<h5>{{ 'MAE1007.NMAX_STAB' | translate }}</h5>
			<select name="nmax_stab" chosen="{width: '100%'}"
				allow-single-deselect="true" ng-model="mae1007.nmax_stab"
				ng-options="nmax_stab for nmax_stab in lstNmax_stab" disabled>
				<option disabled="true" value=""
					label="{{ 'MAE1007.NMAX_STAB' | translate }}" />
			</select>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-6">
			<h5>{{ 'MAE1007.NMAX_UNST' | translate }}</h5>
			<select name="nmax_unst" chosen="{width: '100%'}"
				allow-single-deselect="true" ng-model="mae1007.nmax_unst"
				ng-options="nmax_unst for nmax_unst in lstNmax_unst" disabled>
				<option disabled="true" value=""
					label="{{ 'MAE1007.NMAX_UNST' | translate }}" />
			</select>
		</div>
		<div class="col-sm-6">
			<h5>{{ 'MAE1007.POSI_WEIG' | translate }}</h5>
			<select name="posi_weig" chosen="{width: '100%'}"
				allow-single-deselect="true" ng-model="mae1007.posi_weig"
				ng-options="posi_weig for posi_weig in lstPosi_weig" disabled>
				<option disabled="true" value=""
					label="{{ 'MAE1007.POSI_WEIG' | translate }}" />
			</select>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-6">
			<h5>{{ 'MAE1007.NMAX_SLEP' | translate }}</h5>
			<select name="nmax_slep" chosen="{width: '100%'}"
				allow-single-deselect="true" ng-model="mae1007.nmax_slep"
				ng-options="nmax_slep for nmax_slep in lstNmax_slep" disabled>
				<option disabled="true" value=""
					label="{{ 'MAE1007.NMAX_SLEP' | translate }}" />
			</select>
		</div>
		<div class="col-sm-6">
			<h5>{{ 'MAE1007.POSI_STAB' | translate }}</h5>
			<select name="posi_stab" chosen="{width: '100%'}"
				allow-single-deselect="true" ng-model="mae1007.posi_stab"
				ng-options="posi_stab for posi_stab in lstPosi_stab" disabled>
				<option disabled="true" value=""
					label="{{ 'MAE1007.POSI_STAB' | translate }}" />
			</select>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-6">
			<h5>{{ 'MAE1007.VAL_MIN' | translate }}</h5>
			<select name="val_min" chosen="{width: '100%'}"
				allow-single-deselect="true" ng-model="mae1007.val_min"
				ng-options="val_min for val_min in lstVal_min" disabled>
				<option disabled="true" value=""
					label="{{ 'MAE1007.VAL_MIN' | translate }}" />
			</select>
		</div>
		<div class="col-sm-6">
			<h5>{{ 'MAE1007.VAL_MAX' | translate }}</h5>
			<select name="val_max" chosen="{width: '100%'}"
				allow-single-deselect="true" ng-model="mae1007.val_max"
				ng-options="val_max for val_max in lstVal_max" disabled>
				<option disabled="true" value=""
					label="{{ 'MAE1007.VAL_MAX' | translate }}" />
			</select>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-6">
			<h5>{{ 'MAE1007.NREAD_TRIED' | translate }}</h5>
			<select name="nread_tried" chosen="{width: '100%'}"
				allow-single-deselect="true" ng-model="mae1007.nread_tried"
				ng-options="nread_tried for nread_tried in lstNread_tried" disabled>
			</select>
		</div>
		<div class="col-sm-6" ng-controller="selectMAE1008Controller">
			<h5>{{ 'GENE.PORT' | translate }}</h5>
			<input name="port" id="port" class="form-control"
				placeholder="{{ 'GENE.PORT' | translate }}"
				ng-model="mae1007.port.port_name" ng-maxlength="10" readonly="true" />
		</div>
	</div>
	<div class="row">
		<div class="col-sm-6">
			<h5>{{ 'MAE1007.SRVR_PORT' | translate }}</h5>
			<input name="srvrpo" id="srvrpo" class="form-control"
				placeholder="{{ 'MAE1007.CHAR_UNIT_FULL' | translate }}"
				ng-model="mae1007.srvrpo" readOnly="true" />
		</div>
		<div class="col-sm-6">
			<h5>{{ 'MAE1007.TRACED' | translate }}</h5>
			<select id="traced" name="traced" ng-model="mae1007.traced"
				chosen="{width: '100%'}"
				placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
				disable-search="true" allow-single-deselect="true"
				ng-options="(item?'{{'DOMAIN.Y' | translate}}':'{{'DOMAIN.N' | translate}}') for item in [true, false]"
				disabled></select>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-6">
			<h5>{{ 'MAE1007.DSP_DEFA' | translate }}</h5>
			<select id="isused" name="isused" ng-model="mae1007.isused"
				chosen="{width: '100%'}" disable-search="true"
				allow-single-deselect="true"
				ng-options="(item?'{{'DOMAIN.Y' | translate}}':'{{'DOMAIN.N' | translate}}') for item in [true, false]"
				disabled>
			</select>
		</div>
	</div>
	<br />
	<div class="modal-footer">
		<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
			class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
		</a>
	</div>
</div>