<script type="text/ng-template" id="updateStation.html">
	<div class="modal-header">
		<h3 class="box-title"><i class="glyphicon glyphicon-edit"></i>&nbsp;{{ ('FORM.EDIT' | translate) }}</h3>
	</div>
	<div id="FATH_FORM" class="modal-body">
		<!--  -->
		<form id="StationEditForm" name="StationEditForm" novalidate="true">
			<div class="row">
				<div class="col-xs-4 col-xs-offset-4">
					<h4><strong>{{station.namest}}<strong></h4>
				</div>
			</div>
			<div class="row">
				<!-- Teléfono -->
				<div class="col-sm-6">
					<h5><strong>{{'GENE.AST'| translate}}&nbsp;{{ 'GENE.PHONE' | translate }}</strong></h5>
					<input name="phonst" id="phonst" class="form-control"
						placeholder="{{ 'GENE.PHONE' | translate }}"
						ng-model="station.phonst" ng-maxlength="30" required /> <span
						ng-show="!StationEditForm.phonst.$pristine && StationEditForm.phonst.$error.required"
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
				</a> <a ng-disabled="!StationEditForm.$valid" ng-click="update(StationEditForm)"
					class="btn btn-app btn btn-primary"> <i class="fa fa-save"></i>
					{{ 'GENE.SAVE' | translate }}
				</a>
			</div>
		</form>
	</div>
</script>