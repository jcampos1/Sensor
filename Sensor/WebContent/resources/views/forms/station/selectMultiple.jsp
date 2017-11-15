
<button data-toggle="tooltip" title="{{ 'GENE.STNS' | translate }}"
	type="button" class="btn btn-primary" ng-click="gridStationMultiple()">
	<i class="fa fa-caret-right" aria-hidden="true"></i>
</button>

<script type="text/ng-template" id="selectStationMultipleComponent.html">
<div id="modalgridstationmultiple" class="modal-content">
	<div class="modal-header">
		<h3 class="box-title">{{ 'GENE.STNS' | translate}}</h3>
	</div>
	<div class="modal-body" ui-i18n="{{ lang }}">
		<div id="grid1" ui-grid="gridOptions" ui-grid-selection
			ui-grid-pagination class="grid"></div>
	</div>
	<div class="modal-footer">
		<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
			class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
		</a> <a ng-click="saveStations()" class="btn btn-app btn btn-primary">
			<i class="fa fa-save"></i> {{ 'GENE.SAVE' | translate }}
		</a>
	</div>
</div>
</script>