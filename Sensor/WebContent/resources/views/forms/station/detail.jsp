<script type="text/ng-template" id="detailStation.html">
<div class="modal-header">
	<h3 class="box-title">
		<span class="glyphicon glyphicon-zoom-in"></span>&nbsp;
		 {{ 'FORM.QUERY' | translate }}</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<div class="row">
		<div class="col-sm-4 col-xs-4">
			<h5>{{ 'GENE.NAME' | translate }}</h5>
			{{station.namest}}
		</div>
		<div class="col-sm-4 col-xs-4">
			<h5>{{ 'GENE.PHONE' | translate }}</h5>
			{{station.phonst}}
		</div>
		<div class="col-sm-4 col-xs-4">
			<h5>{{ 'GENE.STATUS' | translate }}</h5>
			{{'GENE.ACTIVE'+station.status | translate}}
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