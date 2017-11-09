<script type="text/ng-template" id="modalCPRECCtrl.html">
<div class="modal-header">
	<h3 class="box-title">{{'GENE.AS_PREC' | translate }}</h3>
</div>
<div class="modal-body">
	<form id="CPRECForm" name="CPRECForm" novalidate="true">
		<!--  -->
			<div class="input-group">
				<input id="prec" name="prec" type="text" class="form-control"
					placeholder="{{ 'MAE1013.PREC' | translate }}" ng-model="prec"
					ng-maxlength="49" clean="true"
					required> <span class="input-group-btn">
					<button class="btn btn-primary" type="button" ng-click="save(CPRECForm)" ng-disabled="!CPRECForm.$valid">{{'GENE.SAVE'
						| translate }}</button>
				</span>
			</div>
			<span
				ng-show="!CPRECForm.prec.$untouched && CPRECForm.prec.$error.required"
				class="logError has-error"><label class="control-label"
				for="prec"><i class="fa fa-times-circle-o"></i>{{ 'GENE.REQ'
					| translate }}</label></span>
			<div id="ERROR_prec" class="logError"></div>
		<br>
		<div class="modal-footer">
			<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
				class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
			</a>
		</div>
	</form>
</div>
</script>