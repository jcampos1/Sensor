<h5>{{ 'MAE1013.PREC' | translate }}</h5>
<input name="prec" id="prec" class="form-control"
	placeholder="{{ 'MAE1013.PREC' | translate }}" ng-model="vm.prec"
	ng-click="$ctrl.assignSeals()" />


<script type="text/ng-template" id="modalAssignSealsCtrl.html">
<div class="modal-header">
	<h3 class="box-title">{{ 'GENE.ASIG_SEAL' | translate }}</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<!--  -->
	<form class="form-inline" id="PrecForm" name="PrecForm"
		novalidate="true" role="form">
		<div class="form-group">
			<input name="prec0" id="prec0" class="form-control input-sm" ng-model="vm.prec0"
				maxlength="8" required /> <span
				ng-show="!PrecForm.prec0.$pristine && PrecForm.prec0.$error.required"
				class="logError has-error"><label class="control-label"
				for="name"><i class="fa fa-times-circle-o"></i> {{
					'GENE.REQ' | translate }}</label></span>
			<div id="ERROR_prec0" class="logError"></div>
		</div>

		<div class="form-group">
			<input name="prec1" id="prec1" class="form-control input-sm" ng-model="vm.prec1"
				maxlength="8" required /><span
				ng-show="!PrecForm.prec1.$pristine && PrecForm.prec1.$error.required"
				class="logError has-error"><label class="control-label"
				for="name"><i class="fa fa-times-circle-o"></i> {{
					'GENE.REQ' | translate }}</label></span>
			<div id="ERROR_prec1" class="logError"></div>
		</div>

		<div class="form-group">
			<input name="prec2" id="prec2" class="form-control input-sm" ng-model="vm.prec2"
				maxlength="8" required /><span
				ng-show="!PrecForm.prec2.$pristine && PrecForm.prec2.$error.required"
				class="logError has-error"><label class="control-label"
				for="name"><i class="fa fa-times-circle-o"></i> {{
					'GENE.REQ' | translate }}</label></span>
			<div id="ERROR_prec2" class="logError"></div>
		</div>

		<div class="form-group">
			<input name="prec3" id="prec3" class="form-control input-sm" ng-model="vm.prec3"
				maxlength="8" required /><span
				ng-show="!PrecForm.prec3.$pristine && PrecForm.prec3.$error.required"
				class="logError has-error"><label class="control-label"
				for="name"><i class="fa fa-times-circle-o"></i> {{
					'GENE.REQ' | translate }}</label></span>
			<div id="ERROR_prec3" class="logError"></div>
		</div>
		<div class="form-group">
			<input name="prec4" id="prec4" class="form-control input-sm" ng-model="vm.prec4"
				maxlength="8" required /><span
				ng-show="!PrecForm.prec4.$pristine && PrecForm.prec4.$error.required"
				class="logError has-error"><label class="control-label"
				for="name"><i class="fa fa-times-circle-o"></i> {{
					'GENE.REQ' | translate }}</label></span>
			<div id="ERROR_prec4" class="logError"></div>
		</div>
		<br />
		<br />
		<div class="modal-footer">
			<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
				class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
			</a> <a ng-disabled="!PrecForm.$valid"
				ng-click="submitPrecForm(vm.prec0,vm.prec1,vm.prec2,vm.prec3,vm.prec4)"
				class="btn btn-app btn btn-primary"> <i class="fa fa-save"></i>
				{{ 'GENE.SAVE' | translate }}
			</a>
		</div>
	</form>
</div>
</script>