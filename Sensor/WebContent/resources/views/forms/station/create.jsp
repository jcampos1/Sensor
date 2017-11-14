<a  ng-click="create()"
	uib-popover="{{'GENE.NEW' | translate}}"
	popover-trigger="'mouseenter'"
	class="btn btn-social-icon btn-facebook"> <span
	class="fa fa-plus-square"></span>
</a>
<script type="text/ng-template" id="createStationComponent.html">
	<div class="modal-header">
		<h3 class="box-title"><i class="fa fa-plus-square"></i>&nbsp;{{ ('GENE.NEW' | translate) }}</h3>
	</div>
	<div id="FATH_FORM" class="modal-body">
		<!--  -->
		<form id="StationForm" name="StationForm" novalidate="true">
			<div class="row">
				<!-- Nombre -->
				<div class="col-sm-6">
					<h5><strong>{{'GENE.AST'| translate}}&nbsp;{{ 'GENE.NAME' | translate }}</strong></h5>
					<input name="namest" id="namest" class="form-control"
						placeholder="{{ 'GENE.NAME' | translate }}"
						ng-model="station.namest" ng-maxlength="30" required /> <span
						ng-show="!StationForm.namest.$pristine && StationForm.namest.$error.required"
						class="logError has-error"><label class="control-label"
						for="namest"><i class="fa fa-times-circle-o"></i> {{
							'GENE.REQ' | translate }}</label></span>
					<div id="ERROR_namest" class="logError"></div>
				</div>
				<!-- Teléfono -->
				<div class="col-sm-6">
					<h5><strong>{{'GENE.AST'| translate}}&nbsp;{{ 'GENE.PHONE' | translate }}</strong></h5>
					<input name="phonst" id="phonst" class="form-control"
						placeholder="{{ 'GENE.PHONE' | translate }}"
						ng-model="station.phonst" ng-maxlength="30" required /> <span
						ng-show="!StationForm.phonst.$pristine && StationForm.phonst.$error.required"
						class="logError has-error"><label class="control-label"
						for="phonst"><i class="fa fa-times-circle-o"></i> {{
							'GENE.REQ' | translate }}</label></span>
					<div id="ERROR_phonst" class="logError"></div>
				</div>
			</div>
			<br />
			<div class="modal-footer">
				<a ng-click="cancel()"
					class="btn btn-app btn btn-warning"> <i class="fa fa-close"></i>
					{{ 'GENE.CANCEL' | translate }}
				</a> <a ng-disabled="!StationForm.$valid" ng-click="save(StationForm)"
					class="btn btn-app btn btn-primary"> <i class="fa fa-save"></i>
					{{ 'GENE.SAVE' | translate }}
				</a>
			</div>
		</form>
	</div>
</script>