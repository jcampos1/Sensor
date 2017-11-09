<div class="modal-header">
	<h3 class="box-title">{{ ('FORM.MAE1008' | translate)+('FORM.QUERY' | translate) }}</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<!--  -->
	<div class="row">
		<div class="col-sm-4">
			<h5>{{ 'MAE1008.NAME' | translate }}</h5>
			<input name="port_name" id="port_name" class="form-control"
				placeholder="{{ 'MAE1008.NAME' | translate }}"
				ng-model="port.port_name" readOnly="true" />
		</div>
		<div class="col-sm-4">
			<h5>{{ 'MAE1008.DSCA' | translate }}</h5>
			<input name="port_dsca" id="port_dsca" class="form-control"
				placeholder="{{ 'MAE1008.DSCA' | translate }}"
				ng-model="port.port_dsca" readOnly="true" />
		</div>
		<div class="col-sm-4">
			<h5>{{ 'MAE1008.BAUD' | translate }}</h5>
			<select chosen="{width: '100%'}" allow-single-deselect="true" ng-model="port.baud" ng-options="baud for baud in lstBaud"
				class="form-control" readOnly="true" disabled="true">
				<option disabled="true" value=""
					label="{{ 'MAE1008.BAUD' | translate }}" />
			</select>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-4">
			<h5>{{ 'MAE1008.PRTY' | translate }}</h5>
			<select chosen="{width: '100%'}" allow-single-deselect="true" ng-model="port.prty"
				ng-options="prty as prty.dsca for prty in lstPrty track by prty.id"
				class="form-control" readOnly="true" disabled="true">
				<option disabled="true" selected="true" value="" value=""
					label="{{ 'MAE1008.PRTY' | translate }}" />
			</select>
		</div>
		<div class="col-sm-4">
			<h5>{{ 'MAE1008.BITS_CHAR' | translate }}</h5>
			<select chosen="{width: '100%'}" allow-single-deselect="true" ng-model="port.bits_char"
				ng-options="bits_char for bits_char in lstBits_char"
				class="form-control" readOnly="true" disabled="true">
				<option disabled="true" selected="true" value=""
					label="{{ 'MAE1008.BITS_CHAR' | translate }}" />
			</select>
		</div>
		<div class="col-sm-4">
			<h5>{{ 'MAE1008.BITS_STOP' | translate }}</h5>
			<select chosen="{width: '100%'}" allow-single-deselect="true" ng-model="port.bits_stop"
				ng-options="bits_stop for bits_stop in lstBits_stop"
				class="form-control" readOnly="true" disabled="true">
				<option disabled="true" selected="true" value=""
					label="{{ 'MAE1008.BITS_STOP' | translate }}" />
			</select>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-4">
			<h5>{{ 'MAE1008.TIME_OUT' | translate }}</h5>
			<input name="tout_read" id="tout_read" class="form-control"
				placeholder="{{ 'MAE1008.TIME_OUT' | translate }}"
				ng-model="port.tout_read" ng-maxlength="5" readOnly="true" />
		</div>
	</div>
	<br />
	<div class="modal-footer">
		<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
			class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
		</a>
	</div>
</div>