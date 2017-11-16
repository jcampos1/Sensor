<script type="text/ng-template" id="updateRole.html">
<div class="modal-header">
	<h3 class="box-title">
		<i class="glyphicon glyphicon-edit"></i>&nbsp;{{ ('FORM.EDIT' |
		translate) }}
	</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<!--  -->
	<form id="RoleEditForm" name="RoleEditForm" novalidate="true">
		<div class="row">
			<!-- Nombre -->
			<div class="col-sm-6">
				<h5>
					<strong>{{'GENE.AST'| translate}}&nbsp;{{ 'GENE.NAME' |
						translate }}</strong>
				</h5>
				<input name="name" id="name" class="form-control"
					placeholder="{{ 'GENE.NAME' | translate }}"
					ng-model="role.name" ng-maxlength="50" required /> <span
					ng-show="!SensorEditForm.name.$pristine && SensorEditForm.name.$error.required"
					class="logError has-error"><label class="control-label"
					for="name"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_name" class="logError"></div>
			</div>
			<!-- Estaciones -->
			<div class="col-sm-6">
				<h5>
					<strong>{{ 'GENE.STNS' |
						translate }}</strong>&nbsp;<i
						uib-tooltip="{{'TLTPS.TP10'| translate}}"
						tooltip-trigger="focus" class="fa fa-info-circle"
						aria-hidden="true"></i>
				</h5>
				<p class="input-group">
					<input name="stations" id="stations" class="form-control"
						placeholder="{{ 'GENE.STNS' | translate }}" ng-model="stations"
						readOnly /> <span class="input-group-btn"> <select-station-multiple-component />
					</span> </input>
				</p>
			</div>
		</div>
		<%--<div class="row">
			<!-- Tipo de sensor -->
			<div class="col-sm-6">
				<h5>
					<strong>{{'GENE.AST'| translate}}&nbsp;{{ 'GENE.TYSENSOR'
						| translate }}</strong>
				</h5>
				<p class="input-group">
					<input name="typesensor" id="typesensor" class="form-control"
						placeholder="{{ 'GENE.TYSENSOR' | translate }}"
						ng-model="sensor.typesensor.namety" required readOnly /> <span
						class="input-group-btn"> <select-typesensor-component />
					</span> </input> <span
						ng-show="!SensorEditForm.typesensor.$pristine && SensorEditForm.typesensor.$error.required"
						class="logError has-error"><label class="control-label"
						for="typesensor"><i class="fa fa-times-circle-o"></i> {{
							'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_typesensor" class="logError"></div>


			</div>
			<!-- Estacion -->
			<div class="col-sm-6">
				<h5>
					<strong>{{'GENE.AST'| translate}}&nbsp;{{ 'GENE.STN' |
						translate }}</strong>
				</h5>
				<p class="input-group">
					<input name="station" id="station" class="form-control"
						placeholder="{{ 'GENE.STN' | translate }}"
						ng-model="sensor.station.namest" required readOnly /> <span
						class="input-group-btn"> <select-station-component />
					</span> </input> <span
						ng-show="!SensorEditForm.station.$pristine && SensorEditForm.station.$error.required"
						class="logError has-error"><label class="control-label"
						for="station"><i class="fa fa-times-circle-o"></i> {{
							'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_station" class="logError"></div>
			</div>
		</div>
		<div class="row">
			<!-- Rango -->
			<div class="col-sm-12">
				<h5>
					<strong>{{'GENE.AST'| translate}}&nbsp;{{ 'GENE.RANGO' |
						translate }}</strong>
				</h5>
				<textarea rows="3" name="rango" id="rango" class="form-control"
					placeholder="{{ 'GENE.RANGO' | translate }}"
					ng-model="sensor.rango" ng-maxlength="100" required />
				<span
					ng-show="!SensorEditForm.rango.$pristine && SensorEditForm.rango.$error.required"
					class="logError has-error"><label class="control-label"
					for="rango"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_rango" class="logError"></div>
			</div>
		</div> --%>
		<br />
		<div class="modal-footer">
			<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
				class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
			</a> <a ng-disabled="!RoleEditForm.$valid"
				ng-click="update(RoleEditForm)"
				class="btn btn-app btn btn-primary"> <i class="fa fa-save"></i>
				{{ 'GENE.SAVE' | translate }}
			</a>
		</div>
	</form>
</div>
</script>
