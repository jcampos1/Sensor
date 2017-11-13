<!------------- FORMULARIO DETALLE MOTIVO --------------->
<script type="text/ng-template" id="detailMotive.html">
<div class="modal-header">
	<h3 class="box-title">
		<span class="glyphicon glyphicon-zoom-in"></span>&nbsp;
		 {{ 'FORM.QUERY' | translate }}</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<!--  -->
	<div class="row">
		<div class="col-sm-4 col-xs-12">
			<h5><strong>{{ 'GENE.CODE' | translate }}</strong></h5>
			{{uti1006.code_m}}
		</div>
		<div class="col-sm-8 col-xs-12">
			<h5><strong>{{ 'GENE.DSCA' | translate }}</strong></h5>
			{{uti1006.dsca_m}}
		</div>
		<div class="col-sm-12 col-xs-12">
			<h5><strong>{{ 'UTI1006.TYPE_M' | translate }}</strong></h5>
			{{uti1006.type_m.dsca}}
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