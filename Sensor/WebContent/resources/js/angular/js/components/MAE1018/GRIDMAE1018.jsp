<div id="modalgridmae1018" class="modal-content">
	<div class="modal-header">
		<h3 class="box-title">{{ 'GENE.WARE' | translate}}</h3>
	</div>
	<div class="modal-body" ui-i18n="{{ lang }}">
		<div class="row">
			<div class="col-sm-6 col-xs-8 col-sm-offset-6 col-xs-offset-4">
				<div class="input-group">
					<input type="text" ng-change="search()" ng-model="text"
						ng-model-options='{ debounce: 200 }' class="form-control">
					<span class="input-group-btn">
						<button class="btn btn-primary" type="button">{{
							'GENE.SEARCH' | translate }}</button>
					</span>
				</div>
			</div>
		</div>
		<br>
		<div id="grid1" ui-grid="gridOptions" ui-grid-selection
			ui-grid-pagination class="grid"></div>
	</div>
	<div class="modal-footer">
		<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
			class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
		</a>
	</div>
</div>
