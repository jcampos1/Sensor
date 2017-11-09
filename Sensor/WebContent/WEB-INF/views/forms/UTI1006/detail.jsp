<!------------- FORMULARIO DETALLE MOTIVO --------------->

<div class="modal-header">
	<h3 class="box-title">{{ ('FORM.UTI1006' |
		translate)+('FORM.QUERY' | translate) }}</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<!--  -->
	<div class="row">
		<div class="col-sm-4">
			<h5>{{ 'GENE.CODE' | translate }}</h5>
			<input name="code_m" id="code_m" class="form-control"
				ng-model="uti1006.code_m" readOnly="true" />
		</div>
		<div class="col-sm-4">
			<h5>{{ 'GENE.DSCA' | translate }}</h5>
			<input name="dsca_m" id="dsca_m" class="form-control"
				ng-model="uti1006.dsca_m" readOnly="true" />
		</div>

		<div class="col-sm-4">
			<h5>{{ 'UTI1006.TYPE_M' | translate }}</h5>
			<select name="type_m" id="type_m" chosen="{width: '100%'}"
				placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
				allow-single-deselect="true" ng-model="uti1006.type_m"
				ng-options="type_m as type_m.dsca for type_m in lstType track by type_m.id"
				readOnly="true" disabled="true">
				<option disabled="true" selected="true" value=""
					label="{{ 'UTI1006.TYPE_M' | translate }}" />
			</select>
		</div>
	</div>
	<br />
	<div class="modal-footer">
		<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
			class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
		</a>
	</div>
</div>