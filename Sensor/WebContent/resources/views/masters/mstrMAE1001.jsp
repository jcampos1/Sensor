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
		<script type="text/ng-template" id="confirm.html">
			<%@ include file="/resources/views/commons/confirm.jsp" %>
    	</script>
    	
    	<!-- Seleccion de motivo de eliminacion -->
		<select-uti1006-component />

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
