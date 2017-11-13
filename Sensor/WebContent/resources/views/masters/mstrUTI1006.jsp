<div id="mstr_activity" style="position: relative;">
	<div ng-controller="uti1006Controller">
    	<!-- Lista de operaciones -->
    	<div class="row">
			<div class="col-lg-3 col-sm-4 col-xs-8" style="text-align: left;">
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
				<create-uti1006-component />
				<a ng-click="remove()"
					uib-popover="{{'GENE.REMOVE' | translate}}"
					popover-trigger="'mouseenter'"
					class="btn btn-social-icon btn-github"> <span
					class="glyphicon glyphicon-trash"></span>
				</a>
			</div>
		</div>
		
		<!-- Vista detalle -->
		<%@ include file="/resources/views/forms/UTI1006/detail.jsp" %>
		
		<!-- Vista para actualizacion -->
		<%@ include file="/resources/views/forms/UTI1006/edit.jsp" %>
		
		<!-- Vista para eliminacion -->
		<script type="text/ng-template" id="myModalContent.html">
			<%@ include file="/WEB-INF/views/commons/confirm.jsp" %>
    	</script>
    	
		<br />
		
		<!-- Lista de motivos -->
		<div class="row" ui-i18n="{{ lang }}">
			<!--  -->
			<div class="col-sm-12">
				<div ui-grid="gridOptions" ui-grid-pagination ui-grid-selection
					ui-grid-exporter></div>
			</div>
		</div>
	</div>
</div>
