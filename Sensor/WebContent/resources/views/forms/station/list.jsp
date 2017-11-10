<div class="row">
	<div class="col-lg-3 col-sm-4 col-xs-6" style="text-align: left;">
		<h4>{{'GENE.ACTIONS' | translate}}</h4>
		<a ng-click="detail()"
			uib-popover="{{'GENE.DETAIL' | translate}}"
			popover-trigger="'mouseenter'"
			class="btn btn-social-icon btn-twitter"> <span
			class="glyphicon glyphicon-zoom-in"></span>
		</a> 
		<a  ng-click="update()"
			uib-popover="{{'GENE.BTN_EDIT' | translate}}"
			popover-trigger="'mouseenter'"
			class="btn btn-social-icon btn-google"> <span
			class="glyphicon glyphicon-edit"></span>
		</a>
		<create-station-component />
		<a ng-click="remove()"
			uib-popover="{{'GENE.REMOVE' | translate}}"
			popover-trigger="'mouseenter'"
			class="btn btn-social-icon btn-github"> <span
			class="glyphicon glyphicon-trash"></span>
		</a>
	</div>
</div>
<hr/>

<%@ include file="/resources/views/forms/station/detail.jsp" %>
<%@ include file="/resources/views/forms/station/edit.jsp" %>

<div class="row" id="stations">
	<div ng-repeat="station in stations" class="col-lg-3 col-sm-4 col-xs-12" ng-click="selected(station)">
		<div class="info-box bg-blue">
			<span class="info-box-icon"><i class="fa fa-comments-o"></i></span>
			<div class="info-box-content">
			    <span class="info-box-text">{{station.namest}}</span>
			    <span class="info-box-number">{{station.status}}41,410</span>
			    <!-- The progress section is optional -->
			    <div class="progress">
			      <div class="progress-bar" style="width: 70%"></div>
			    </div>
			    <span class="progress-description">
			      {{station.phonst}}
				</span>
			</div>
		</div>
	</div>
</div>

<!-- Custom tabs (Charts with tabs)-->
<%-- <div class="nav-tabs-custom">
	<ul class="nav nav-tabs pull-right">
		<li class="active"><a href="#mstr_user" data-toggle="tab">{{'GENE.STNS'
				| translate }}</a></li>
		<li class="pull-left header"><i class="fa fa-table"></i>
			{{'GENE.MSTR' | translate }}</li>
	</ul>
	<div class="tab-content no-padding">
		<!-- Morris chart - Sales -->
		<div class="tab-pane active" id="mstr_activity"
			style="position: relative;">
			<br>
			<div ng-controller="mae1007Controller">
				<script type="text/ng-template" id="myModalContent.html">
			<%@ include file="/resources/views/commons/confirm.jsp" %>
    	</script>
				<div class="row">
					<div class="col-lg-12">
						<current-simulator></current-simulator>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-2">
						<div class="input-group">
								<script type="text/ng-template" id="modalNewMAE1007Ctrl.html">
							<%@ include file="/resources/views/forms/MAE1007/MAE1007.jsp" %>
						</script>
								<script type="text/ng-template" id="modalSelectMAE1008Ctrl.html">
							<%@ include file="/resources/views/forms/MAE1007/GRIDMAE1008.jsp" %>
						</script>
								<new-mae1007-component />
						</div>
						<div class="input-group">
							<script type="text/ng-template" id="modalEditEntity.html">
							<%@ include file="/resources/views/forms/MAE1007/edit.jsp" %>
						</script>
						</div>
						<script type="text/ng-template" id="modalDetailEntity.html">
							<%@ include file="/resources/views/forms/MAE1007/detail.jsp" %>
						</script>
					</div>

					<div class="col-sm-6 col-xs-8 col-sm-offset-4 col-xs-offset-2">
						<div class="input-group">
							<input type="text" uib-popover="{{'TLTPS.TP04'|translate}}"
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
--%>

<script type="text/javascript">
	$(document).ready(function(){
	    $("#stations").on('click', '.cls80', function(){
	    	console.log("SELECCIONADA");
	        $('.cls80').removeClass("clsSelected");
	        $(this).addClass("clsSelected");
	    });
	});
</script>