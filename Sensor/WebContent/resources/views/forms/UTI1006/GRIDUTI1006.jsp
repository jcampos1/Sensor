<div id="modalgriduti1006" class="modal-content">
	<div class="modal-header">
		<h3 class="box-title">{{ 'GENE.MOTI' | translate}}</h3>
	</div>
	<div class="modal-body" ui-i18n="{{ lang }}">
		<div id="grid1" ui-grid="gridOptions" ui-grid-selection
			ui-grid-pagination class="grid"></div>
	</div>
	<div class="modal-footer">
		<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
			class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
		</a>
	</div>
</div>

