<div id="mstr_sensor" style="position: relative;">
	<div ng-controller="SensorCtrl">
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
				<create-sensor-component />
				<a ng-click="remove()" uib-popover="{{'GENE.REMOVE' | translate}}"
					popover-trigger="'mouseenter'"
					class="btn btn-social-icon btn-github"> <span
					class="glyphicon glyphicon-trash"></span>
				</a>
			</div>
		</div>

		<!-- Vista detalle -->
		<%@ include file="/resources/views/forms/sensor/detail.jsp"%>

		<!-- Vista para actualizacion -->
		<%@ include file="/resources/views/forms/sensor/edit.jsp"%>

		<!-- Vista de confirmacion -->
		<script type="text/ng-template" id="confirm.html">
			<%@ include file="/resources/views/commons/confirm.jsp" %>
		</script>

		<!-- Seleccion de motivo de eliminacion -->
		<select-uti1006-component />

		<br />

		<!-- Titulo -->
		<div class="row">
			<div class="col-lg-12" style="text-align: center;">
				<h3>
					<i class="fa fa-home"></i>&nbsp;<strong>{{"GENE.SENSORS" |
						translate}}</strong>
				</h3>
			</div>
		</div>

		<!-- Lista de sensores -->
		<div class="row" ui-i18n="{{ lang }}">
			<div class="col-sm-12">
				<div ui-grid="gridOptions" ui-grid-pagination ui-grid-selection
					ui-grid-exporter></div>
			</div>
		</div>
	</div>
</div>