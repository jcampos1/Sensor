<div class="modal-header">
	<h3 class="box-title">{{ ('FORM.MAE1008' | translate)+('FORM.NEW' | translate) }}</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<!--  -->
	<form id="MAE1008Form" name="MAE1008Form" novalidate="true">
		<div class="row">
			<div class="col-sm-6">
				<h5>
					{{ 'MAE1008.NAME' | translate }}&nbsp;<i
						uib-tooltip="{{'TLTPS.NAME_PORT_TP'| translate}}"
						tooltip-trigger="focus" class="fa fa-info-circle"
						aria-hidden="true"></i>
				</h5>
				<input name="port_name" id="port_name" class="form-control"
					placeholder="{{ 'MAE1008.NAME' | translate }}"
					ng-model="port.port_name" ng-maxlength="10" required /> <span
					ng-show="!MAE1008Form.port_name.$pristine && MAE1008Form.port_name.$error.required"
					class="logError has-error"><label class="control-label"
					for="code"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_port_name" class="logError has-error"></div>
			</div>
			<div class="col-sm-6">
				<h5>
					{{ 'MAE1008.DSCA' | translate }}&nbsp;<i
						uib-tooltip="{{'TLTPS.DSCA_PORT_TP'| translate}}"
						tooltip-trigger="focus" class="fa fa-info-circle"
						aria-hidden="true"></i>
				</h5>
				<input name="port_dsca" id="port_dsca" class="form-control"
					placeholder="{{ 'MAE1008.DSCA' | translate }}"
					ng-model="port.port_dsca" ng-maxlength="30" required /> <span
					ng-show="!MAE1008Form.port_dsca.$pristine && MAE1008Form.port_dsca.$error.required"
					class="logError has-error"><label class="control-label"
					for="name"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_port_dsca" class="logError has-error"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<h5>{{ 'MAE1008.BAUD' | translate }}</h5>
				<select name="baud" chosen="{width: '100%'}"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					allow-single-deselect="true" ng-model="port.baud"
					ng-options="baud for baud in lstBaud" required>
				</select><span
					ng-show="!MAE1008Form.baud.$untouched && MAE1008Form.baud.$error.required"
					class="logError has-error"><label class="control-label"
					for="baud"><i class="fa fa-times-circle-o"></i>{{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_baud" class="logError has-error"></div>
			</div>
			<div class="col-sm-6">
				<h5>{{ 'MAE1008.PRTY' | translate }}</h5>
				<select name="prty" chosen="{width: '100%'}"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					allow-single-deselect="true" ng-model="port.prty"
					ng-options="prty as prty.dsca for prty in lstPrty track by prty.id"
					required>
				</select><span
					ng-show="!MAE1008Form.prty.$untouched && MAE1008Form.prty.$error.required"
					class="logError has-error"><label class="control-label"
					for="prty"><i class="fa fa-times-circle-o"></i>{{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_prty" class="logError has-error"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<h5>{{ 'MAE1008.BITS_CHAR' | translate }}</h5>
				<select name="bits_char" chosen="{width: '100%'}"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					allow-single-deselect="true" ng-model="port.bits_char"
					ng-options="bits_char for bits_char in lstBits_char" required>
				</select><span
					ng-show="!MAE1008Form.bits_char.$untouched && MAE1008Form.bits_char.$error.required"
					class="logError has-error"><label class="control-label"
					for="bits_char"><i class="fa fa-times-circle-o"></i>{{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_bits_char" class="logError has-error"></div>
			</div>
			<div class="col-sm-6">
				<h5>{{ 'MAE1008.BITS_STOP' | translate }}</h5>
				<select name="bits_stop" chosen="{width: '100%'}"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					allow-single-deselect="true" ng-model="port.bits_stop"
					ng-options="bits_stop for bits_stop in lstBits_stop" required>
					<option disabled="true" selected="true" value=""
						label="{{ 'MAE1008.BITS_STOP' | translate }}" />
				</select><span
					ng-show="!MAE1008Form.bits_stop.$untouched && MAE1008Form.bits_stop.$error.required"
					class="logError has-error"><label class="control-label"
					for="bits_stop"><i class="fa fa-times-circle-o"></i>{{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_bits_stop" class="logError has-error"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<h5>
					{{ 'MAE1008.TIME_OUT' | translate }}&nbsp;<i
						uib-tooltip="{{'TLTPS.TIME_OUT_TP'| translate}}"
						tooltip-trigger="focus" class="fa fa-info-circle"
						aria-hidden="true"></i>
				</h5>
				<input name="tout_read" id="tout_read" class="form-control"
					placeholder="{{ 'MAE1008.TIME_OUT' | translate }}"
					ng-model="port.tout_read" ng-maxlength="5" required /> <span
					ng-show="!MAE1008Form.tout_read.$pristine && MAE1008Form.tout_read.$error.required"
					class="logError has-error"><label class="control-label"
					for="code"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_tout_read" class="logError"></div>
			</div>
		</div>
		<br />
		<div class="modal-footer">
			<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
				class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
			</a> <a ng-disabled="!MAE1008Form.$valid" ng-click="submitForm(port, MAE1008Form)"
				class="btn btn-app btn btn-primary"> <i class="fa fa-save"></i>
				{{ 'GENE.SAVE' | translate }}
			</a>
		</div>
	</form>
</div>