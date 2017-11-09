<div class="modal-header">
	{{ ('FORM.PAR1001' | translate)+('FORM.QUERY' | translate) }}
	</h3>
</div>
<div class="modal-body">
	<!--  -->
	<div class="row">
		<div class="col-sm-4">
			<h5>{{ 'PAR1001.FECH' | translate }}</h5>
			<input name="fech" id="fech" class="form-control"
				placeholder="{{ 'PAR1001.FECH' | translate }}"
				ng-model="par1001.fech" readOnly="true" />
		</div>
		<div class="col-sm-4">
			<h5>{{ 'MAE1007.DSCA' | translate }}</h5>
			<input name="dsca" id="dsca" class="form-control"
				placeholder="{{ 'MAE1007.DSCA' | translate }}"
				ng-model="par1001.dsca" ng-maxlength="35" readOnly="true" />
		</div>
		<div class="col-sm-4">
			<h5>{{ 'USER.ROLE_USER' | translate }}</h5>
			<input name="user" id="user" class="form-control"
				placeholder="{{ 'USER.ROLE_USER' | translate }}"
				ng-model="par1001.user.frst_name" readOnly="true" />
		</div>
	</div>
	<br>
	<div class="row">
		<div class="col-sm-4">
			<h5>{{ 'PAR1001.SERI' | translate }}</h5>
			<input name="seri" id="seri" class="form-control"
				placeholder="{{ 'PAR1001.SERI' | translate }}"
				ng-model="par1001.seri" ng-maxlength="3" readOnly="true" />
		</div>
		<div class="col-sm-4">
			<h5>{{ 'PAR1001.CDDP' | translate }}</h5>
			<input name="cddp" id="cddp" class="form-control"
				placeholder="{{ 'PAR1001.CDDP' | translate }}"
				ng-model="par1001.cddp" ng-maxlength="6" readOnly="true" />
		</div>
		<div class="col-sm-4">
			<h5>{{ 'GENE.COMPANY' | translate }}</h5>
			<input name="company" id="company" class="form-control"
				placeholder="{{ 'GENE.COMPANY' | translate }}"
				ng-model="par1001.company.dsca" readOnly="true" />
		</div>
	</div>
	<br>
	<div class="row">
		<div class="col-sm-2">
			<br />
			<div class="checkbox">
				<label> <input name="rep_te" id="rep_te" type="checkbox"
					ng-model="par1001.rep_te" readOnly="true" disabled="true">
					{{ 'PAR1001.REP_TE' | translate }}
				</label>
			</div>
		</div>
		<div class="col-sm-2">
			<br />
			<div class="checkbox">
				<label> <input name="pescon" id="pescon" type="checkbox"
					ng-model="par1001.pescon" readOnly="true" disabled="true">
					{{ 'PAR1001.PESCON' | translate }}
				</label>
			</div>
		</div>
	</div>
	<br>

	<div class="modal-footer">
		<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
			class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
		</a>
	</div>
</div>