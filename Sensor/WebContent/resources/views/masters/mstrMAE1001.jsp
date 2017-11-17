<div id="mstr_user" style="position: relative;">
	<div class="row">
		<div class="col-sm-12">
			<aprobation-mae1001-component />
		</div>
	</div>
	<div ng-controller="MAE1001Ctrl">
		<!-- Lista de operaciones -->
		<div class="row">
			<div class="col-lg-3 col-sm-4 col-xs-8" style="text-align: left;">
				<h4>{{'GENE.ACTIONS' | translate}}</h4>
				<a ng-click="detail()" uib-popover="{{'GENE.DETAIL' | translate}}"
					popover-trigger="'mouseenter'"
					class="btn btn-social-icon btn-twitter"> <span
					class="glyphicon glyphicon-zoom-in"></span>
				</a> <a ng-click="update()"
					uib-popover="{{'GENE.BTN_EDIT' | translate}}"
					popover-trigger="'mouseenter'"
					class="btn btn-social-icon btn-google"> <span
					class="glyphicon glyphicon-edit"></span>
				</a>
				<create-mae1001-component />
				<a ng-click="remove()" uib-popover="{{'GENE.REMOVE' | translate}}"
					popover-trigger="'mouseenter'"
					class="btn btn-social-icon btn-github"> <span
					class="glyphicon glyphicon-trash"></span>
				</a>
			</div>
		</div>

		<!-- Vista detalle -->
		<%@ include file="/resources/views/forms/MAE1001/detail.jsp"%>
		
		<!-- Vista edicion -->
		<%@ include file="/resources/views/forms/MAE1001/edit.jsp"%>

		<!-- Vista de confirmacion de eliminacion -->
		<script type="text/ng-template" id="myModalContent.html">
			<%@ include file="/resources/views/commons/confirm.jsp" %>
    	</script>

		<%-- <div class="row">
			<div class="col-sm-2 col-xs-2">
				<div class="input-group">
					<div ng-controller="newUserController">
						<script type="text/ng-template" id="modalNewEntity.html">
							<%@ include file="/resources/views/forms/users/register.jsp" %>
						</script>
						<new-user-component />
					</div>
				</div>
				<div class="input-group">
					<script type="text/ng-template" id="modalEditEntity.html">
							<%@ include file="/resources/views/forms/users/edit.jsp" %>
						</script>
				</div>
				<script type="text/ng-template" id="modalDetailEntity.html">
							<%@ include file="/resources/views/forms/users/detail.jsp" %>
						</script>
			</div>--%>

		<!-- Titulo -->
		<div class="row">
			<div class="col-lg-12" style="text-align: center;">
				<h3>
					<strong>{{"GENE.USER" | translate}}</strong>
				</h3>
			</div>
		</div>

		<div class="row" ui-i18n="{{ lang }}">
			<!--  -->
			<div class="col-sm-12">
				<div ui-grid="gridOptions" ui-grid-pagination ui-grid-selection
					ui-grid-exporter></div>
			</div>
		</div>
	</div>
</div>
