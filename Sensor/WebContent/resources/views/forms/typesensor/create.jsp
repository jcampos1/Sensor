<a ng-click="create()" uib-popover="{{'GENE.NEW' | translate}}"
	popover-trigger="'mouseenter'" class="btn btn-social-icon btn-facebook">
	<span class="fa fa-plus-square"></span>
</a>
<script type="text/ng-template" id="createTypesensorComponent.html">
<div class="modal-header">
	<h3 class="box-title">
		<i class="fa fa-plus-square"></i>&nbsp;{{ ('GENE.NEW' | translate) }}
	</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<!--  -->
	<form id="TypesensorForm" name="TypesensorForm" novalidate="true">
		<div class="row">
			<!-- Nombre -->
			<div class="col-sm-12">
				<h5>
					<strong>{{'GENE.AST'| translate}}&nbsp;{{ 'GENE.NAME' |
						translate }}</strong>
				</h5>
				<input name="namety" id="namety" class="form-control"
					placeholder="{{ 'GENE.NAME' | translate }}"
					ng-model="typesensor.namety" ng-maxlength="50" required /> <span
					ng-show="!TypesensorForm.namety.$pristine && TypesensorForm.namety.$error.required"
					class="logError has-error"><label class="control-label"
					for="namety"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_namety" class="logError"></div>
			</div>
		</div>
		<div class="row">
			<!-- Descripcion -->
			<div class="col-sm-12">
				<h5>
					<strong>{{ 'GENE.DSCA' |
						translate }}</strong>
				</h5>
				<textarea rows="3" name="descty" id="rango" class="form-control"
					placeholder="{{ 'GENE.DSCA' | translate }}"
					ng-model="typesensor.descty" ng-maxlength="100" />
				<div id="ERROR_descty" class="logError"></div>
			</div>
		</div>
		<br />
		<div class="modal-footer">
			<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
				class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
			</a> <a ng-disabled="!TypesensorForm.$valid" ng-click="save(TypesensorForm)"
				class="btn btn-app btn btn-primary"> <i class="fa fa-save"></i>
				{{ 'GENE.SAVE' | translate }}
			</a>
		</div>
	</form>
</div>
</script>