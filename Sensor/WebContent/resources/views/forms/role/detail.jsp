<script type="text/ng-template" id="detailRole.html">
<div class="modal-header">
	<h3 class="box-title">
		<span class="glyphicon glyphicon-zoom-in"></span>&nbsp; {{
		'FORM.QUERY' | translate }}
	</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<div class="row">
		<div class="col-sm-4 col-xs-4">
			<h5>
				<strong>{{ 'GENE.NAME' | translate }}</strong>
			</h5>
			{{role.name}}
		</div>
		<!-- <div class="col-sm-4 col-xs-4">
			<h5>
				<strong>{{ 'GENE.NOMENC' | translate }}</strong>
			</h5>
			{{sensor.nomenc}}
		</div> -->
	</div>
	<%--<div class="row">
		<div class="col-sm-4 col-xs-4">
			<h5>
				<strong>{{ 'GENE.STN' | translate }}</strong>
			</h5>
			{{sensor.station.namest}}
		</div>
		<div class="col-sm-4 col-xs-4">
			<h5>
				<strong>{{ 'GENE.TYSENSOR' | translate }}</strong>
			</h5>
			{{sensor.typesensor.namety}}
		</div>
	</div>
	<div class="row">
		<div class="col-sm-12">
			<h5>
				<strong>{{ 'GENE.RANGO' | translate }}</strong>
			</h5>
			{{sensor.rango}}
		</div>
	</div> --%>
	<br />
	<div class="modal-footer">
		<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
			class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
		</a>
	</div>
</div>
</script>