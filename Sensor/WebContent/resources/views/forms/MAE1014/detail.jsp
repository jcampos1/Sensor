<!------------- FORMULARIO DETALLE ITEM POR ORDEN --------------->
<div class="modal-header">
	<h3 class="box-title">{{ ('FORM.MAE1014' |
		translate)+('FORM.QUERY' | translate) }}</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<!--  -->
	<div class="row">
		<div class="box box-danger">
			<div class="box-header with-border">
				<i class="glyphicon glyphicon-zoom-in"></i>
			</div>
			<div class="box-body">
				<div class="row">
					<div class="col-sm-4 col-xs-12">
						<h5>{{ 'MAE1013.ORNO' | translate }}</h5>
						{{mae1014.pk.orno}}
					</div>
					<div class="col-sm-4 col-xs-12">
						<h5>{{ 'MAE1014.ITEM' | translate }}</h5>
						{{mae1014.item.dsca}}
					</div>
					<div class="col-sm-4 col-xs-12">
						<h5>{{ 'MAE1014.CANT_P' | translate }}</h5>
						{{mae1014.cant_p | awnum:2:separator.sepade:'round':true:true:numThousandSep:numPrepend:numAppend}}
					</div>
				</div>

				<!--  <div class="col-sm-4">
			<h5>{{ 'GENE.ORDN' | translate }}</h5>
			<input name="header" id="header" class="form-control"
				ng-model="orno" readOnly="true" />
		</div>

		<div class="col-sm-4">
			<h5>{{ 'MAE1014.ITEM' | translate }}</h5>
			<input name="cant_p" id="cant_p" class="form-control"
				ng-model="mae1014.cant_p" readOnly="true" />
		</div>
		<div class="col-sm-4">
			<h5>{{ 'MAE1014.CANT_P' | translate }}</h5>
			<input type="number" name="cant_p" id="cant_p" class="form-control"
				placeholder="{{ 'MAE1014.CANT_P' | translate }}"
				ng-model="mae1014.cant_p" ng-pattern="/^[0-9]+(\.[0-9]{1,2})?$/"
				step="0.01" readOnly="true" />
		</div>-->
			</div>
			<br>
			<!-- /.box-body -->
		</div>
	</div>
	<br />
	<div class="modal-footer">
		<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
			class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
		</a>
	</div>
</div>