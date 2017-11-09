<script type="text/ng-template" id="modalDesgloseMAE1010Ctrl.html">
<div id="modalDesgloseMAE1010Ctrl.html" class="modal-content">
	<div class="modal-header">
		<h3 class="box-title">{{ 'GENE.CONTEN' | translate}}</h3>
	</div>
	<div class="modal-body" ui-i18n="{{ lang }}">
		<div class="row">
			<div class="col-sm-3 col-xs-12">
				<h5>{{'MAE1013.ORNO' | translate}}</h5>
				{{mae1015.pk.orno}}
			</div>
		</div>
		<div class="row">
			<div class="col-sm-2">
				<h5>{{'GENE.PES_TA' | translate}}</h5>
				{{mae1015.pestar | awnum:'general'}}
			</div>
			<div class="col-sm-2">
				<h5>{{'GENE.PES_BR' | translate}}</h5>
				{{mae1015.pesbru | awnum:'general'}}
			</div>
			<div class="col-sm-2">
				<h5>{{'GENE.PES_NE' | translate}}</h5>
				{{mae1015.pesnet | awnum:'general'}}
			</div>
		</div>
		<br>
		<div id="grid1" ui-grid="gridOptions" ui-grid-selection
			ui-grid-pagination class="grid"></div>
		
		<div class="modal-footer">
			<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
				class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
			</a>
		</div>
	</div>
</div>
</script>

