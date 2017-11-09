<div class="modal-header">
	<h3>{{ ('FORM.MAE1013' | translate)+('FORM.QUERY' | translate) }}
	</h3>
</div>
<div class="modal-body">
	<!--  -->
	<div class="row">
		<div class="col-sm-4">
			<h5>{{ 'MAE1013.ORNO' | translate }}</h5>
			<input name="orno" id="orno" class="form-control"
				placeholder="{{ 'MAE1013.ORNO' | translate }}"
				ng-model="mae1013.orno" readOnly="true" />
		</div>
		<div class="col-sm-4">
			<h5>{{ 'MAE1013.CDDP' | translate }}</h5>
			<input name="cddp" id="cddp" class="form-control"
				placeholder="{{ 'MAE1013.CDDP' | translate }}"
				ng-model="mae1013.cddp" readOnly="true" />
		</div>
		<div class="col-sm-4">
			<h5>{{ 'MAE1013.TIPM' | translate }}</h5>
			<input name="tipm" id="tipm" class="form-control"
				placeholder="{{ 'MAE1013.TIPM' | translate }}"
				ng-model="mae1013.tipm.dsca" readOnly="true" />
		</div>
	</div>
	<div class="row">
		<div class="col-sm-4">
			<h5>{{ 'MAE1013.STAT' | translate }}</h5>
			<input name="stat" id="stat" class="form-control"
				placeholder="{{ 'MAE1013.STAT' | translate }}"
				ng-model="mae1013.stat.dsca" readOnly="true" />
		</div>
		<div class="col-sm-4">
			<h5>{{ 'GENE.FECH' | translate }}</h5>
			<input name="fech" id="fech" class="form-control"
				placeholder="{{ 'GENE.FECH' | translate }}" ng-model="mae1013.fech"
				readOnly="true" />
		</div>
		<div class="col-sm-4">
			<h5>{{ 'GENE.FECH' | translate }}</h5>
			<input name="user" id="user" class="form-control"
				placeholder="{{ 'USER.ROLE_USER' | translate }}"
				ng-model="mae1013.user.frst_name" readOnly="true" />
		</div>
	</div>
	<div class="row">
		<div class="col-sm-6">
			<h5>{{ 'MAE1013.MOTR' | translate }}</h5>
			<input name="motr" id="motr" class="form-control"
				placeholder="{{ 'MAE1013.MOTR' | translate }}"
				ng-model="mae1013.motr.motr" readOnly="true" />
		</div>
		<div class="col-sm-6">
			<h5>{{ 'GENE.COMPANY' | translate }}</h5>
			<input name="company" id="company" class="form-control"
				placeholder="{{ 'GENE.COMPANY' | translate }}"
				ng-model="mae1013.company.dsca" readOnly="true" />
		</div>
	</div>
	<div class="row">
		<!-- Partner origen -->
		<div class="col-sm-6" ng-if="mae1013.origin.id==0">
			<h5>{{ ('GENE.PART' | translate) + " " + ('GENE.ORIGIN' |
				translate) }}</h5>
			<input name="orig_p" id="orig_p" class="form-control"
				placeholder="{{ 'GENE.SEL_PART' | translate }}"
				ng-model="mae1013.orig_p.dsca_p" readonly="true" required />
		</div>
		<!-- Almacén origen -->
		<div class="col-sm-6" ng-if="mae1013.origin.id==1">
			<h5>{{ ('GENE.WARE' | translate) + " " + ('GENE.ORIGIN' |
				translate) }}</h5>
			<input name="orig_a" id="orig_a" class="form-control"
				placeholder="{{ 'GENE.SEL_WARE' | translate }}"
				ng-model="mae1013.orig_a.dsca_a" readonly="true" required />
		</div>

		<!-- Partner destino -->
		<div class="col-sm-6" ng-if="mae1013.destin.id==0">
			<h5>{{ ('GENE.PART' | translate) + " " + ('GENE.DESTINY' |
				translate) }}</h5>
			<input name="dest_p" id="dest_p" class="form-control"
				placeholder="{{ 'GENE.SEL_PART' | translate }}"
				ng-model="mae1013.dest_p.dsca_p" readonly="true" required /> <span
				class="input-group-btn"> </span>
		</div>
		<!-- Partner destino -->
		<div class="col-sm-6" ng-if="mae1013.destin.id==1">
			<h5>{{ ('GENE.SEL_WARE' | translate) + " " + ('GENE.DESTINY' |
				translate) }}</h5>
			<input name="dest_a" id="dest_a" class="form-control"
				placeholder="{{ 'GENE.SEL_WARE' | translate }}"
				ng-model="mae1013.dest_a.dsca_a" readonly="true" required /> <span
				class="input-group-btn">
		</div>
	</div>

	<div class="row">
		<div class="col-sm-6">
			<h5>{{ 'MAE1013.PREC' | translate }}</h5>
			<input name="prec" id="prec" class="form-control"
				placeholder="{{ 'MAE1013.PREC' | translate }}"
				ng-model="mae1013.prec"
				mask="99999999-99999999-99999999-99999999-99999999" readOnly="true" />
		</div>
	</div>
	<br />
	<div class="modal-footer">
		<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
			class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
		</a>
	</div>
</div>