<!-- Custom tabs (Charts with tabs)-->
<div class="nav-tabs-custom">
	<ul class="nav nav-tabs pull-right">
		<li class="active"><a href="#mstr_user" data-toggle="tab">{{'GENE.PARA'
				| translate }}</a></li>
		<li class="pull-left header"><i class="fa fa-table"></i>
			{{'GENE.MSTR' | translate }}</li>
	</ul>
	<div class="tab-content no-padding">
		<!-- Morris chart - Sales -->
		<div class="tab-pane active" id="mstr_activity"
			style="position: relative;">
			<br>
			<div ng-controller="par1001Controller">
				<div class="row">
					<div class="col-lg-12">
						<current-parameter></current-parameter>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-2 col-xs-2">
						<div class="input-group">
							<script type="text/ng-template" id="modalDetailEntity.html">
							<%@ include file="/resources/views/forms/PAR1001/detail.jsp" %>
						</script>
						</div>
					</div>
					<div class="col-sm-6 col-xs-8 col-sm-offset-4 col-xs-offset-2">
						<div class="input-group">
							<input type="text" uib-popover="{{'TLTPS.TP05'|translate}}"
								popover-trigger="'mouseenter'" ng-change="search()" ng-model="text"
								ng-model-options='{ debounce: 500 }' class="form-control">
							<span class="input-group-btn">
								<button class="btn btn-primary" type="button">{{
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
		</div>
	</div>
</div>