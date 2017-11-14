<script type="text/ng-template" id="updateSensor.html">
<div class="modal-header">
	<h3 class="box-title">
		<i class="glyphicon glyphicon-edit"></i>&nbsp;{{ ('FORM.EDIT' |
		translate) }}
	</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<!--  -->
	<form id="SensorEditForm" name="SensorEditForm" novalidate="true">
		<!-- Nombre -->
		<div class="col-sm-6">
			<h5><strong>{{'GENE.AST'| translate}}&nbsp;{{ 'GENE.NAME' | translate }}</strong></h5>
			<input name="namese" id="namese" class="form-control"
				placeholder="{{ 'GENE.NAME' | translate }}" ng-model="sensor.namese"
				ng-maxlength="50" required /> <span
				ng-show="!SensorEditForm.namese.$pristine && SensorEditForm.namese.$error.required"
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
				ng-show="!SensorEditForm.nomenc.$pristine && SensorEditForm.nomenc.$error.required"
				class="logError has-error"><label class="control-label"
				for="nomenc"><i class="fa fa-times-circle-o"></i> {{
					'GENE.REQ' | translate }}</label></span>
			<div id="ERROR_nomenc" class="logError"></div>
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
		</div>
		<br />
		<div class="modal-footer">
			<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
				class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
			</a> <a ng-disabled="!SensorEditForm.$valid"
				ng-click="update(SensorEditForm)"
				class="btn btn-app btn btn-primary"> <i class="fa fa-save"></i>
				{{ 'GENE.SAVE' | translate }}
			</a>
		</div>
	</form>
</div>
</script>
