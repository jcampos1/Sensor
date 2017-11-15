<a ng-click="create()" uib-popover="{{'GENE.NEW' | translate}}"
	popover-trigger="'mouseenter'" class="btn btn-social-icon btn-facebook">
	<span class="fa fa-plus-square"></span>
</a>
<script type="text/ng-template" id="createSensorComponent.html">
<div class="modal-header">
	<h3 class="box-title">
		<i class="fa fa-plus-square"></i>&nbsp;{{ ('GENE.NEW' | translate) }}
	</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<!--  -->
	<form id="SensorForm" name="SensorForm" novalidate="true">
		<div class="row">
			<!-- Nombre -->
			<div class="col-sm-6">
				<h5>
					<strong>{{'GENE.AST'| translate}}&nbsp;{{ 'GENE.NAME' |
						translate }}</strong>
				</h5>
				<input name="namese" id="namese" class="form-control"
					placeholder="{{ 'GENE.NAME' | translate }}"
					ng-model="sensor.namese" ng-maxlength="50" required /> <span
					ng-show="!SensorForm.namese.$pristine && SensorForm.namese.$error.required"
					class="logError has-error"><label class="control-label"
					for="namese"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_namese" class="logError"></div>
			</div>
			<!-- Nomenclatura -->
			<div class="col-sm-6">
				<h5>
					<strong>{{'GENE.AST'| translate}}&nbsp;{{ 'GENE.NOMENC' |
						translate }}</strong>
				</h5>
				<input name="nomenc" id="nomenc" class="form-control"
					placeholder="{{ 'GENE.NOMENC' | translate }}"
					ng-model="sensor.nomenc" ng-maxlength="20" required /> <span
					ng-show="!SensorForm.nomenc.$pristine && SensorForm.nomenc.$error.required"
					class="logError has-error"><label class="control-label"
					for="nomenc"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_nomenc" class="logError"></div>
			</div>
		</div>
		<div class="row">
			<!-- Tipo de sensor -->
			<div class="col-sm-6">
				<h5>
					<strong>{{'GENE.AST'| translate}}&nbsp;{{ 'GENE.TYSENSOR' |
						translate }}</strong>
				</h5>
				<p class="input-group">
					<input name="typesensor" id="typesensor" class="form-control"
						placeholder="{{ 'GENE.TYSENSOR' | translate }}"
						ng-model="sensor.typesensor.namety" required readOnly /> <span
						class="input-group-btn"> <select-typesensor-component />
					</span> </input>
				</p>
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
					</span> </input>
				</p>
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
					ng-show="!SensorForm.rango.$pristine && SensorForm.rango.$error.required"
					class="logError has-error"><label class="control-label"
					for="rango"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_rango" class="logError"></div>
			</div>
		</div>
		<br />
		<div class="modal-footer">
			<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
				class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
			</a> <a ng-disabled="!SensorForm.$valid" ng-click="save(SensorForm)"
				class="btn btn-app btn btn-primary"> <i class="fa fa-save"></i>
				{{ 'GENE.SAVE' | translate }}
			</a>
		</div>
	</form>
</div>
</script>