<div id="modalgridmae1008" class="modal-content">
	<div class="modal-header">
		<h3 class="box-title">{{ 'GENE.LIST_PORT' | translate}}</h3>
	</div>
	<div class="modal-body">
		<div id="grid1" ui-grid="gridOptions" ui-grid-selection class="grid"></div>
	</div>
	<div class="modal-footer">
		<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
			class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
		</a>
	</div>
</div>
