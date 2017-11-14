<script type="text/ng-template" id="detailTypesensor.html">
<div class="modal-header">
	<h3 class="box-title">
		<span class="glyphicon glyphicon-zoom-in"></span>&nbsp;
		 {{ 'FORM.QUERY' | translate }}</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<div class="row">
		<div class="col-sm-12">
			<h5><strong>{{ 'GENE.NAME' | translate }}</strong></h5>
			{{typesensor.namety}}
		</div>
	</div>
	<div class="row">
		<div class="col-sm-12">
			<h5><strong>{{ 'GENE.DSCA' | translate }}</strong></h5>
			{{typesensor.descty}}
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