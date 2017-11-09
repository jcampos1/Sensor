<div class="box box-danger" shortcuts="keyUp">
	<div class="box-header with-border">
		<i class="fa fa-list"></i>
		<h3 class="box-title">{{ 'GENE.DESG_P' | translate }}</h3>
		<div class="box-tools pull-right" data-toggle="tooltip">
			<div class="btn-group" data-toggle="btn-toggle">
				<button type="button" class="btn btn-default btn-sm pull-right"
					data-widget="collapse" data-toggle="tooltip"
					title="{{ 'GENE.COLLA' | translate }}" style="margin-right: 5px;">
					<i class="fa fa-minus text-blue"></i>
				</button>
			</div>
		</div>
	</div>

	<div class="box-body">
		<span ng-show="line!=null && line!=undefined"><h5>{{"MAE1013.ORNO"
				| translate}}: {{line.pk.orno}}</h5>
			<h5>{{"GENE.NUM_LIN" | translate}}: {{line.pk.pono}}</h5></span>
		<!-- Custom tabs (Charts with tabs)-->
		<div class="nav-tabs-custom">
			<div class="tab-content no-padding">
				<!-- Morris chart - Sales -->
				<div class="tab-pane active" id="mstr_mae1015"
					style="position: relative;">
					<br>
					<div>
						<div ng-controller="mae1015Controller">
						
							<script type="text/ng-template" id="myModalContent.html">
									<%@ include file="/resources/views/commons/confirm.jsp" %>
    							</script>
							<div class="row">
								<div class="col-lg-2 col-xs-12">
									<div class="input-group">
										<script type="text/ng-template"
											id="modalDetailEntityMAE1015.html">
											<%@ include file="/resources/views/forms/MAE1015/detail.jsp" %>
										</script>
									</div>
									<div class="input-group"></div>
								</div>
								<div class="col-lg-8 col-sm-9 col-xs-8"></div>
								<div class="col-lg-2 col-sm-3 col-xs-4" style="text-align:right;">
									<a ng-disabled="countRowSelect!=1" ng-click="detailBtn()"
										uib-popover="{{'GENE.DETAIL' | translate}}"
										popover-trigger="'mouseenter'"
										class="btn btn-social-icon btn-twitter"> <span
										class="glyphicon glyphicon-zoom-in"></span>
									</a> 
									
									<a ng-disabled="countRowSelect!=1" ng-click="findContenBtn()"
										uib-popover="{{'GENE.SHOW_WEIG' | translate}}"
										popover-trigger="'mouseenter'"
										class="btn btn-social-icon btn-facebook"> <span
										class="fa fa-object-ungroup"></span>
									</a> 
									
									<a ng-if="mae1013.stat.id ==1 || mae1013.stat.id ==0" ng-disabled="!currentUser.dele || (currentUser.dele && countRowSelect!=1 )" ng-click="elimBtn()"
										uib-popover="{{'GENE.REMOVE' | translate}}"
										popover-trigger="'mouseenter'"
										class="btn btn-social-icon btn-google"> <span
										class="glyphicon glyphicon-trash"></span>
									</a>
								</div>
							</div>
							<desglose-mae1010-component/>
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
		</div>
	</div>
</div>