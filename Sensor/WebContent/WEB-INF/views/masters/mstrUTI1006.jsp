
holllaa<div ng-controller="uti1006Controller">
	<script type="text/ng-template" id="myModalContent.html">
			<%@ include file="/WEB-INF/views/commons/confirm.jsp" %>
    	</script>
	<div class="row">
		<div class="col-lg-2">
			<div class="input-group">
				<div ng-controller="newUTI1006Controller">
					<script type="text/ng-template" id="modalNewUTI1006Ctrl.html">
							<%@ include file="/WEB-INF/views/forms/UTI1006/UTI1006.jsp" %>
						</script>
					<new-uti1006-component />
				</div>
				<script type="text/ng-template" id="modalDetailEntity.html">
							<%@ include file="/WEB-INF/views/forms/UTI1006/detail.jsp" %>
						</script>
			</div>
			<div class="input-group">
				<script type="text/ng-template" id="modalEditEntity.html">
							<%@ include file="/WEB-INF/views/forms/UTI1006/edit.jsp" %>
						</script>
			</div>
		</div>

		<div class="col-lg-2"></div>

		<div class="col-lg-8">
			<div class="input-group">
				<input type="text" ng-change="search()" ng-model="text"
					ng-model-options='{ debounce: 500 }' class="form-control">
				<span class="input-group-btn">
					<button class="btn btn-default" type="button">{{
						'GENE.SEARCH' | translate }}</button>
				</span>
			</div>
		</div>
	</div>
	<br />
	<div class="row" ui-i18n="{{ lang }}">
		<!--  -->
		<div class="col-sm-12">
			<div ui-grid="gridOptions" ui-grid-pagination ui-grid-selection
				ui-grid-exporter></div>
		</div>
	</div>
</div>
