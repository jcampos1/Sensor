<!-- Custom tabs (Charts with tabs)-->
<div class="nav-tabs-custom" ng-controller="mae1013Controller">
	<!-- Tabs within a box -->
	<ul class="nav nav-tabs pull-right">
		<li class="active"><a href="#mstr_mae1013" data-toggle="tab">{{'GENE.HEADER'
				| translate }}</a></li>
		<li class="pull-left header"><i class="fa fa-table"></i>
			{{ st.dsca+'s' }}</li>
	</ul>
	<div class="tab-content no-padding">
		<!-- Morris chart - Sales -->
		<div class="tab-pane active" id="mstr_mae1013"
			style="position: relative;">
			<br>
			<div>
				<div >
					<script type="text/ng-template" id="myModalContent.html">
			<%@ include file="/resources/views/commons/confirmMAE1013.jsp" %>
    	</script>
					<div class="row">
						<div class="col-lg-2">
							<div class="input-group">
								<script type="text/ng-template" id="modalNewMAE1013Ctrl.html">
							<%@ include file="/resources/views/forms/MAE1013/MAE1013.jsp" %>
						</script>
								<new-mae1013-component />
								
								<script type="text/ng-template" id="modalDetailEntity.html">
							<%@ include file="/resources/views/forms/MAE1013/detail.jsp" %>
						</script>
							</div>
							<div class="input-group">
								<script type="text/ng-template" id="modalEditMAE1013.html">
									<%@ include file="/resources/views/forms/MAE1013/edit.jsp" %>
								</script>
							</div>
						</div>
						<div class="col-lg-2">
							<select-uti1006-component />
						</div>

						<div class="col-lg-4 col-sm-6"></div>
						<div class="col-lg-4 col-sm-6 col-xs-12">
							<div class="input-group">
								<input type="text" uib-popover="{{'TLTPS.TP01'|translate}}"  popover-trigger="'mouseenter'" ng-change="search()" ng-model="text"
									ng-model-options='{ debounce: 500 }' class="form-control">
								<span class="input-group-btn">
									<button class="btn btn-primary" type="button">{{
										'GENE.SEARCH' | translate }}</button>
								</span>
							</div>
						</div>
					</div>
					<br>
					<div class="row">
						<div class="col-lg-9 col-xs-7"></div>
						<div class="col-lg-3 col-xs-5" style="text-align: right;">
							<a ng-disabled="countRowSelect!=1" ng-click="detailBtn()"
								uib-popover="{{'GENE.DETAIL' | translate}}"
								popover-trigger="'mouseenter'"
								class="btn btn-social-icon btn-twitter"> <span
								class="glyphicon glyphicon-zoom-in"></span>
							</a> 
							
							<a ng-if="st.id == 0"
									ng-disabled="countRowSelect!=1" ng-click="editBtn()"
									uib-popover="{{'GENE.BTN_EDIT' | translate}}"
									popover-trigger="'mouseenter'"
									class="btn btn-social-icon btn-github"> <span
									class="glyphicon glyphicon-edit"></span>
								</a>
								
							<a ng-if="st.id == 1" ng-disabled="countRowSelect!=1" ng-click="closeOrderBtn()"
								uib-popover="{{'GENE.CLOSEOR' | translate}}"
								popover-trigger="'mouseenter'"
								class="btn btn-social-icon btn-facebook"> <span
								class="fa fa-check"></span>
							</a>
							
							<a ng-if="st.id == 4 || st.id == 5" ng-disabled="countRowSelect!=1" ng-click="printOrder()"
								uib-popover="{{'GENE.PRINT_ORDR' | translate}}"
								popover-trigger="'mouseenter'"
								class="btn btn-social-icon btn-microsoft"> <span
								class="fa fa-print"></span>
							</a>
							
							<a ng-disabled="countRowSelect!=1" ng-click="onDblClickRowBtn()"
								uib-popover="{{'GENE.START_LINE' | translate}}"
								popover-trigger="'mouseenter'"
								class="btn btn-social-icon btn-flickr"> <span
								class="fa fa-link"></span>
							</a> 
							<a ng-if="st.id == 1" ng-disabled="countRowSelect!=1"
								ng-click="suspendBtn()"
								uib-popover="{{'GENE.SUSP' | translate}}"
								popover-trigger="'mouseenter'"
								class="btn btn-social-icon btn-adn"> <span
								class="fa fa-toggle-off"></span>
							</a>
							<a ng-if="st.id == 2" ng-disabled="countRowSelect!=1"
								ng-click="retuBtn()"
								uib-popover="{{'GENE.RETO' | translate}}"
								popover-trigger="'mouseenter'"
								class="btn btn-social-icon btn-adn"> <span
								class="fa fa-toggle-on"></span>
							</a>
							<a ng-if="st.id == 0 || st.id == 1" ng-disabled="countRowSelect!=1 || !currentUser.anul"
								ng-click="checkStatusBtn()"
								uib-popover="{{'GENE.ANUL' | translate}}"
								popover-trigger="'mouseenter'"
								class="btn btn-social-icon btn-google"> <span
								class="glyphicon glyphicon-trash"></span>
							</a>
						</div>
					</div>

					<prec-component />
					
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