<a ng-click="create()" uib-popover="{{'GENE.NEW' | translate}}"
	popover-trigger="'mouseenter'" class="btn btn-social-icon btn-facebook">
	<span class="fa fa-plus-square"></span>
</a>
<script type="text/ng-template" id="createRoleComponent.html">
<div class="modal-header">
	<h3 class="box-title">
		<i class="fa fa-plus-square"></i>&nbsp;{{ ('GENE.NEW' | translate) }}
	</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<!--  -->
	<form id="RoleForm" name="RoleForm" novalidate="true">
		<div class="row">
			<!-- Nombre -->
			<div class="col-sm-6">
				<h5>
					<strong>{{'GENE.AST'| translate}}&nbsp;{{ 'GENE.NAME' |
						translate }}</strong>
				</h5>
				<input name="name" id="name" class="form-control"
					placeholder="{{ 'GENE.NAME' | translate }}" ng-model="role.name"
					ng-maxlength="50" required /> <span
					ng-show="!RoleForm.name.$pristine && RoleForm.name.$error.required"
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
		<br />
		<div class="modal-footer">
			<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
				class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
			</a> <a ng-disabled="!RoleForm.$valid" ng-click="save(RoleForm)"
				class="btn btn-app btn btn-primary"> <i class="fa fa-save"></i>
				{{ 'GENE.SAVE' | translate }}
			</a>
		</div>
	</form>
</div>
</script>