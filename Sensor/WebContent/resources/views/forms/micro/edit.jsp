<script type="text/ng-template" id="updateMicro.html">
<div class="modal-header">
	<h3 class="box-title">
		<i class="glyphicon glyphicon-edit"></i>&nbsp;{{ ('FORM.EDIT' |
		translate) }}
	</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<!--  -->
	<form id="MicroEditForm" name="MicroEditForm" novalidate="true">
		<div class="row">
			<!-- NOMBRE (COM1, COM2, ETC) -->
			<div class="col-sm-6">
				<h5>
					<strong>{{'GENE.AST'| translate}}&nbsp;{{ 'GENE.NAME' |
						translate }}</strong>&nbsp;<i
						uib-tooltip="{{'TLTPS.NAME_PORT_TP'| translate}}"
						tooltip-trigger="focus" class="fa fa-info-circle"
						aria-hidden="true"></i>
				</h5>
				<input name="port_name" id="port_name" class="form-control"
					placeholder="{{ 'GENE.NAME' | translate }}"
					ng-model="micro.port_name" ng-maxlength="10" required /> <span
					ng-show="!MicroEditForm.port_name.$pristine && MicroEditForm.port_name.$error.required"
					class="logError has-error"><label class="control-label"
					for="port_name"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_port_name" class="logError"></div>
			</div>
			<!-- DESCRIPCION -->
			<div class="col-sm-6">
				<h5>
					<strong>{{'GENE.AST'| translate}}&nbsp;{{ 'GENE.DSCA' |
						translate }}</strong>&nbsp;<i
						uib-tooltip="{{'TLTPS.DSCA_PORT_TP'| translate}}"
						tooltip-trigger="focus" class="fa fa-info-circle"
						aria-hidden="true"></i>
				</h5>
				<input name="port_dsca" id="port_dsca" class="form-control"
					placeholder="{{ 'GENE.DSCA' | translate }}"
					ng-model="micro.port_dsca" ng-maxlength="30" required /> <span
					ng-show="!MicroEditForm.port_dsca.$pristine && MicroEditForm.port_dsca.$error.required"
					class="logError has-error"><label class="control-label"
					for="port_dsca"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_port_dsca" class="logError"></div>
			</div>
		</div>
		<div class="row">
			<!-- BAUDIOS -->
			<div class="col-sm-6">
				<h5>
					<strong>{{'GENE.AST'| translate}}&nbsp;{{ 'MAE1008.BAUD' |
						translate }}</strong>
				</h5>
				<select chosen="{width: '100%'}" allow-single-deselect="true"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					ng-model="micro.baud" ng-options="baud for baud in lstBaud"
					class="form-control">
				</select>
				<div id="ERROR_baud" class="logError"></div>
			</div>
			<!-- PARIDAD -->
			<div class="col-sm-6">
				<h5>
					<strong>{{'GENE.AST'| translate}}&nbsp;{{ 'MAE1008.PRTY' |
						translate }}</strong>
				</h5>
				<select chosen="{width: '100%'}" allow-single-deselect="true"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					ng-model="micro.prty"
					ng-options="prty as prty.dsca for prty in lstPrty track by prty.id"
					class="form-control">
				</select>
				<div id="ERROR_prty" class="logError"></div>
			</div>
		</div>
		<div class="row">
			<!-- BITS POR CARACTER -->
			<div class="col-sm-6">
				<h5>
					<strong>{{'GENE.AST'| translate}}&nbsp;{{
						'MAE1008.BITS_CHAR' | translate }}</strong>
				</h5>
				<select chosen="{width: '100%'}" allow-single-deselect="true"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					ng-model="micro.bits_char"
					ng-options="bits_char for bits_char in lstBits_char"
					class="form-control">
				</select>
				<div id="ERROR_bits_char" class="logError"></div>
			</div>
			<!-- BIT DE PARADA -->
			<div class="col-sm-6">
				<h5>
					<strong>{{'GENE.AST'| translate}}&nbsp;{{
						'MAE1008.BITS_STOP' | translate }}</strong>
				</h5>
				<select chosen="{width: '100%'}" allow-single-deselect="true"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					ng-model="micro.bits_stop"
					ng-options="bits_stop for bits_stop in lstBits_stop"
					class="form-control">
					<option disabled="true" value=""
						label="{{ 'MAE1008.BITS_STOP' | translate }}" />
				</select>
				<div id="ERROR_bits_stop" class="logError"></div>
			</div>
		</div>
		<div class="row">
			<!-- TIMEOUT -->
			<div class="col-sm-6">
				<h5>
					<strong>{{'GENE.AST'| translate}}&nbsp;{{
						'MAE1008.TIME_OUT' | translate }}</strong>
				</h5>
				<input name="tout_read" id="tout_read" class="form-control"
					placeholder="{{ 'MAE1008.TIME_OUT' | translate }}"
					ng-model="micro.tout_read" ng-maxlength="5" required /> <span
					ng-show="!MicroEditForm.tout_read.$pristine && MicroEditForm.tout_read.$error.required"
					class="logError has-error"><label class="control-label"
					for="tout_read"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_tout_read" class="logError"></div>
			</div>
			<!-- TOLERANCIA DE INACTIVIDAD -->
			<div class="col-sm-6">
				<h5>
					<strong>{{'GENE.AST'| translate}}&nbsp;{{ 'GENE.TOLEIN' |
						translate }}</strong>&nbsp;<i uib-tooltip="{{'TLTPS.TP11'| translate}}"
						tooltip-trigger="focus" class="fa fa-info-circle"
						aria-hidden="true"></i>
				</h5>
				<select chosen="{width: '100%'}" allow-single-deselect="true"
					placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
					ng-model="micro.tolein" ng-options="tolein for tolein in lstTolein"
					class="form-control">
				</select>
				<div id="ERROR_tolein" class="logError"></div>
			</div>
		</div>
		<br />
		<div class="row">
			<!-- LECTURAS -->
			<div class="col-sm-12">
				<div class="table table-striped table-condensed table-responsive">
					<table class="table">
						<thead>
							<tr>
								<th>{{'GENE.READINGS' | translate}}</th>
							</tr>
						</thead>
						<tbody
							style="display: block; height: 100px; overflow-y: auto; overflow-x: hidden;">
							<tr ng-repeat="reading in readings track by $index" ng-class="{'class-first-row' : $index == 0}">
								<td>{{reading}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<br />
		<div class="modal-footer">
			<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
				class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
			</a> <a ng-click="runMicro(MicroEditForm)"
				ng-disabled="!MicroEditForm.$valid" uib-popover="{{'TLTPS.TP12' | translate}}" popover-trigger="'mouseenter'"
				class="btn btn-app btn btn-success"> <i class="fa fa-check"></i>
				{{ 'GENE.TEST_CONE' | translate }}
			</a> <a ng-click="stopMicro()" uib-popover="{{'TLTPS.TP13' | translate}}" popover-trigger="'mouseenter'" class="btn btn-app btn btn-danger"> <i
				class="fa fa-stop"></i> {{ 'GENE.STOP' | translate }}
			</a><a ng-disabled="!MicroEditForm.$valid"
				ng-click="update(MicroEditForm)" uib-popover="{{'TLTPS.TP14' | translate}}" popover-trigger="'mouseenter'" class="btn btn-app btn btn-primary">
				<i class="fa fa-save"></i> {{ 'GENE.SAVE' | translate }}
			</a>
		</div>
	</form>
</div>
</script>