<div class="box box-danger">
	<div class="box-header with-border">

		<i class="ion ion-clipboard"></i>
		<h3 class="box-title">{{ 'GENE.HEADER' | translate }}</h3>
		<div class="box-tools pull-right" data-toggle="tooltip">
			<div class="btn-group" data-toggle="btn-toggle">
				<button type="button" class="btn btn-default btn-sm pull-right"
					data-widget="collapse" data-toggle="tooltip"
					title="{{ 'GENE.COLLA' | translate }}" style="margin-right: 5px;">
					<i class="fa fa-minus text-blue"></i>
				</button>
			</div>
		</div>
	</div>
	<div class="box-body">
		<div class="row">
			<div class="col-sm-3 col-xs-6">
				<h5>{{ 'MAE1013.ORNO' | translate }}</h5>
				{{mae1013.orno}}
				<!--  <input name="orno" id="orno" class="form-control input-sm"
					placeholder="{{ 'MAE1013.ORNO' | translate }}"
					ng-model="mae1013.orno" readOnly="true" />-->
			</div>
			<div class="col-sm-3 col-xs-12">
				<h5>{{ 'GENE.FECH_CREA' | translate }}</h5>
				{{mae1013.fech}}
				<!--<input name="fech" id="fech" class="form-control input-sm"
					placeholder="{{ 'MAE1013.FECH' | translate }}"
					ng-model="mae1013.fech" readOnly="true" />-->
			</div>
			<div class="col-sm-3 col-xs-6">
				<h5>{{ 'GENE.COMPANY' | translate }}</h5>
				{{mae1013.company.dsca}}
				<!--<input name="comp" id="comp" class="form-control input-sm"
					placeholder="{{ 'GENE.COMPANY' | translate }}"
					ng-model="mae1013.company.dsca" readOnly="true" />-->
			</div>
			<div class="col-sm-3 col-xs-6">
				<h5>{{ 'MAE1013.CDDP' | translate }}</h5>
				{{mae1013.cddp}}
				<!--<input name="cddp" id="cddp" class="form-control input-sm"
					placeholder="{{ 'MAE1013.CDDP' | translate }}"
					ng-model="mae1013.cddp" readOnly="true" />-->
			</div>
		</div>
		<hr>
		<div class="row">
			<div class="col-sm-2 col-xs-12">
				<h5>{{ 'MAE1013.TIPM' | translate }}</h5>
				{{mae1013.tipm.dsca}}
				<!--<input name="tipm" id="tipm" class="form-control input-sm"
					placeholder="{{ 'MAE1013.TIPM' | translate }}"
					ng-model="mae1013.tipm.dsca" readOnly="true" />-->
			</div>
			<div class="col-sm-2 col-xs-12">
				<h5>{{ 'MAE1013.STAT' | translate }}</h5>
				{{mae1013.stat.dsca}}
				<!--<input name="stat" id="stat" class="form-control input-sm"
					placeholder="{{ 'MAE1013.STAT' | translate }}"
					ng-model="mae1013.stat.dsca" readOnly="true" />-->
			</div>
			<div class="col-sm-2 col-xs-12">
				<h5>{{ 'GENE.CONFPE' | translate }}</h5>
				{{("GENE."+mae1013.confpe) | translate}}
				<!--<input name="prec" id="prec" class="form-control input-sm"
					placeholder="{{ 'MAE1013.PREC' | translate }}"
					ng-model="mae1013.prec"
					mask="99999999-99999999-99999999-99999999-99999999" readOnly="true" />-->
			</div>
			
			<div class="col-sm-2 col-xs-12">
				<h5>{{ 'GENE.FECONF' | translate }}</h5>
				{{mae1013.fech_confpe}}
			</div>
			<div class="col-sm-2 col-xs-12">
				<h5>{{ 'GENE.FECH_FREI' | translate }}</h5>
				{{mae1013.fech_carg}}
				<!--<input name="fech_carg" id="fech_carg" class="form-control input-sm"
					placeholder="{{ 'GENE.FECH_FREI' | translate }}"
					ng-model="mae1013.fech_carg" readOnly="true" />-->
			</div>

			<div class="col-sm-2 col-xs-12">
				<h5>{{ 'GENE.FECH_DESP' | translate }}</h5>
				{{mae1013.fech_desp}}
				<!--<input name="fech_desp" id="fech_desp" class="form-control input-sm"
					placeholder="{{ 'GENE.FECH_DESP' | translate }}"
					ng-model="mae1013.fech_desp" readOnly="true" />-->
			</div>
		</div><hr>
		<div class="row">
			<div class="col-sm-2 col-xs-12">
				<h5>{{ 'USER.ROLE_USER' | translate }}</h5>
				{{mae1013.user.frst_name}}
				<!--<input name="user" id="user" class="form-control input-sm"
					placeholder="{{ 'USER.ROLE_USER' | translate }}"
					ng-model="mae1013.user.frst_name" readOnly="true" />-->
			</div>

			<div class="col-sm-2 col-xs-12">
				<h5>{{ 'GENE.COND' | translate }}</h5>
				{{mae1013.cond.cedu}}
				<!--<input name="cond" id="cond" class="form-control input-sm"
					placeholder="{{ 'GENE.COND' | translate }}"
					ng-model="mae1013.cond.cedu" readOnly="true" />-->
			</div>
			<div class="col-sm-3 col-xs-12">
				<h5>{{ 'MAE1013.MOTR' | translate }}</h5>
				{{mae1013.motr.motr}}
				<!--<input name="motr" id="motr" class="form-control input-sm"
					placeholder="{{ 'MAE1013.MOTR' | translate }}"
					ng-model="mae1013.motr.motr" readOnly="true" />-->
			</div>
			<div class="col-sm-5 col-xs-12">
				<h5>{{ 'MAE1013.PREC' | translate }}</h5>
				{{mae1013.prec}}
				<!--<input name="prec" id="prec" class="form-control input-sm"
					placeholder="{{ 'MAE1013.PREC' | translate }}"
					ng-model="mae1013.prec"
					mask="99999999-99999999-99999999-99999999-99999999" readOnly="true" />-->
			</div>
		</div>
	</div>
	<br>
	<!-- /.box-body -->
</div>