<a  ng-click="create()"
	uib-popover="{{'GENE.NEW' | translate}}"
	popover-trigger="'mouseenter'"
	class="btn btn-social-icon btn-facebook"> <span
	class="fa fa-plus-square"></span>
</a>
<script type="text/ng-template" id="createSensorComponent.html">
	<div class="modal-header">
		<h3 class="box-title"><i class="fa fa-plus-square"></i>&nbsp;{{ ('GENE.NEW' | translate) }}</h3>
	</div>
	<div id="FATH_FORM" class="modal-body">
		<!--  -->
		<form id="SensorForm" name="SensorForm" novalidate="true">
			<div class="row">
				<!-- Nombre -->
				<div class="col-sm-6">
					<h5><strong>{{ 'GENE.NAME' | translate }}</strong></h5>
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
					<h5><strong>{{ 'GENE.NOMENC' | translate }}</strong></h5>
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
				<!-- Rango -->
				<div class="col-sm-12">
					<h5><strong>{{ 'GENE.RANGO' | translate }}</strong></h5>
					<input type="textarea" name="rango" id="rango" class="form-control"
						placeholder="{{ 'GENE.RANGO' | translate }}"
						ng-model="sensor.rango" ng-maxlength="100" required /> <span
						ng-show="!SensorForm.rango.$pristine && SensorForm.rango.$error.required"
						class="logError has-error"><label class="control-label"
						for="rango"><i class="fa fa-times-circle-o"></i> {{
							'GENE.REQ' | translate }}</label></span>
					<div id="ERROR_rango" class="logError"></div>
				</div>
			</div>
			<br />
			<div class="modal-footer">
				<a ng-click="cancel()"
					class="btn btn-app btn btn-warning"> <i class="fa fa-close"></i>
					{{ 'GENE.CANCEL' | translate }}
				</a> <a ng-disabled="!SensorForm.$valid" ng-click="save(SensorForm)"
					class="btn btn-app btn btn-primary"> <i class="fa fa-save"></i>
					{{ 'GENE.SAVE' | translate }}
				</a>
			</div>
		</form>
	</div>
</script>