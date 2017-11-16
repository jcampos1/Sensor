<script type="text/ng-template" id="detailMAE1001.html">
<div class="modal-header">
	<h3 class="box-title">
		<span class="glyphicon glyphicon-zoom-in"></span>&nbsp; {{
		'FORM.QUERY' | translate }}
	</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<div class="row">
		<!-- NOMBRE -->
		<div class="col-sm-4 col-xs-4">
			<h5>
				<strong>{{ 'GENE.NAME' | translate }}</strong>
			</h5>
			{{user.frst_name}}
		</div>
		<!-- APELLIDO -->
		<div class="col-sm-4 col-xs-4">
			<h5>
				<strong>{{ 'USER.LAST_NAME' | translate }}</strong>
			</h5>
			{{user.last_name}}
		</div>
		<!-- CORREO -->
		<div class="col-sm-4 col-xs-4">
			<h5>
				<strong>{{ 'USER.MAIL' | translate }}</strong>
			</h5>
			{{user.user_mail}}
		</div>
	</div>
	<div class="row">
		<!-- TELÉFONO -->
		<div class="col-sm-4 col-xs-4">
			<h5>
				<strong>{{ 'GENE.PHONE' | translate }}</strong>
			</h5>
			{{user.phone}}
		</div>
		<!-- FECHA DE CREACIÓN -->
		<div class="col-sm-4 col-xs-4">
			<h5>
				<strong>{{ 'USER.CRTE_DATE' | translate }}</strong>
			</h5>
			{{user.crte_date}}
		</div>
		<!-- ACTIVO/INACTIVO -->
		<div class="col-sm-4 col-xs-4">
			<h5>
				<strong>{{ 'GENE.STATUS' | translate }}</strong>
			</h5>
			{{'GENE.ACTIVE'+user.active | translate}}
		</div>
	</div>
	<div class="row">
		<!-- FECHA DE ACTIVACIÓN -->
		<div class="col-sm-4 col-xs-4">
			<h5>
				<strong>{{ 'USER.DATE_ACTI' | translate }}</strong>
			</h5>
			{{user.date_acti}}
		</div>
		<!-- BLOQUEADO -->
		<div class="col-sm-4 col-xs-4">
			<h5>
				<strong>{{ 'USER.BLOQ' | translate }}</strong>
			</h5>
			{{'GENE.'+user.user_bloq | translate}}
		</div>
	</div>
	<div class="row">
		<!-- DOMINIOS -->
		<div class="col-sm-4 col-xs-4">
			<h5>
				<strong>{{ 'USER.ROLES' | translate }}</strong>
			</h5>
			<ul class="list-inline">
				<li ng-repeat="role in user.roles">{{role.name}}</li>
			</ul>
		</div>
	</div>
	<br />
	<div class="modal-footer">
		<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
			class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
		</a>
	</div>
</div>
</script>