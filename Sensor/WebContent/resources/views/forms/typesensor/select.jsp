
<button data-toggle="tooltip" title="{{ 'GENE.TYSENSORS' | translate }}"
	type="button" class="btn btn-primary" ng-click="gridTypesensor()">
	<i class="fa fa-caret-right" aria-hidden="true"></i>
</button>

<script type="text/ng-template" id="selectTypesensorComponent.html">
<div id="modalgridtypesensor" class="modal-content">
	<div class="modal-header">
		<h3 class="box-title">{{ 'GENE.TYSENSORS' | translate}}</h3>
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
</script>