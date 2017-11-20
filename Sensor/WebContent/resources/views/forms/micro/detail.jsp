<script type="text/ng-template" id="detailMicro.html">
<div class="modal-header">
	<h3 class="box-title">
		<span class="glyphicon glyphicon-zoom-in"></span>&nbsp; {{
		'FORM.QUERY' | translate }}
	</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<div class="row">
		<!-- NOMBRE -->
		<div class="col-sm-4 col-xs-4">
			<h5>
				<strong>{{ 'GENE.NAME' | translate }}</strong>
			</h5>
			{{micro.port_name}}
		</div>
		<!-- DESCRIPCIÓN -->
		<div class="col-sm-4 col-xs-4">
			<h5>
				<strong>{{ 'GENE.DSCA' | translate }}</strong>
			</h5>
			{{micro.port_dsca}}
		</div>
		<!-- BAUDIOS -->
		<div class="col-sm-4 col-xs-4">
			<h5>
				<strong>{{ 'MAE1008.BAUD' | translate }}</strong>
			</h5>
			{{micro.baud}}
		</div>
	</div>
	<div class="row">
		<!-- PARIDAD -->
		<div class="col-sm-4 col-xs-4">
			<h5>
				<strong>{{ 'MAE1008.PRTY' | translate }}</strong>
			</h5>
			{{micro.prty.dsca}}
		</div>
		<!-- BITS POR CARACTER -->
		<div class="col-sm-4 col-xs-4">
			<h5>
				<strong>{{ 'MAE1008.BITS_CHAR' | translate }}</strong>
			</h5>
			{{micro.bits_char}}
		</div>
		<!-- BIT DE PARADA -->
		<div class="col-sm-4 col-xs-4">
			<h5>
				<strong>{{ 'MAE1008.BITS_STOP' | translate }}</strong>
			</h5>
			{{micro.bits_stop}}
		</div>
	</div>
	<div class="row">
		<!-- TIMEOUT -->
		<div class="col-sm-4 col-xs-4">
			<h5>
				<strong>{{ 'MAE1008.TIME_OUT' | translate }}</strong>
			</h5>
			{{micro.tout_read}}
		</div>
	</div>
	<br />
	<div class="modal-footer">
		<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
			class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
		</a>
	</div>
</div>
</script>