<div class="modal-header">
	<h3 class="box-title">{{ ('FORM.MAE1008' | translate)+('FORM.EDIT' | translate) }}</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<!--  -->
	<form id="MAE1008EditForm" name="MAE1008EditForm" commandName="MAE1008"
		novalidate="true">
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
					ng-show="!MAE1008EditForm.port_name.$pristine && MAE1008EditForm.port_name.$error.required"
					class="logError has-error"><label class="control-label"
					for="code"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_port_name" class="logError"></div>
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
					ng-show="!MAE1008EditForm.port_dsca.$pristine && MAE1008EditForm.port_dsca.$error.required"
					class="logError has-error"><label class="control-label"
					for="name"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_port_dsca" class="logError"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<h5>{{ 'MAE1008.BAUD' | translate }}</h5>
				<select chosen="{width: '100%'}" allow-single-deselect="true"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					ng-model="port.baud" ng-options="baud for baud in lstBaud"
					class="form-control">
				</select>
			</div>
			<div class="col-sm-6">
				<h5>{{ 'MAE1008.PRTY' | translate }}</h5>
				<select chosen="{width: '100%'}" allow-single-deselect="true"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					ng-model="port.prty"
					ng-options="prty as prty.dsca for prty in lstPrty track by prty.id"
					class="form-control">
				</select>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<h5>{{ 'MAE1008.BITS_CHAR' | translate }}</h5>
				<select chosen="{width: '100%'}" allow-single-deselect="true"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					ng-model="port.bits_char"
					ng-options="bits_char for bits_char in lstBits_char"
					class="form-control">
				</select>
			</div>
			<div class="col-sm-6">
				<h5>{{ 'MAE1008.BITS_STOP' | translate }}</h5>
				<select chosen="{width: '100%'}" allow-single-deselect="true"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					ng-model="port.bits_stop"
					ng-options="bits_stop for bits_stop in lstBits_stop"
					class="form-control">
					<option disabled="true" value=""
						label="{{ 'MAE1008.BITS_STOP' | translate }}" />
				</select>
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
					ng-show="!MAE1008EditForm.tout_read.$pristine && MAE1008EditForm.tout_read.$error.required"
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
			</a> <a ng-disabled="!MAE1008EditForm.$valid" ng-click="submitForm(port, MAE1008EditForm)"
				class="btn btn-app btn btn-primary"> <i class="fa fa-save"></i>
				{{ 'GENE.SAVE' | translate }}
			</a>
		</div>
	</form>
</div>