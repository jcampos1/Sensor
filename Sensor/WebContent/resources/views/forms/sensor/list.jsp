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
		<create-station-component />
		<a ng-click="remove()"
			uib-popover="{{'GENE.REMOVE' | translate}}"
			popover-trigger="'mouseenter'"
			class="btn btn-social-icon btn-github"> <span
			class="glyphicon glyphicon-trash"></span>
		</a>
	</div>
</div>

<!-- Titulo estaciones -->
<div class="row">
	<div class="col-lg-12" style="text-align: center;"> 
		<h3><i class="fa fa-home"></i>&nbsp;<strong>{{"GENE.STNS" | translate}}</strong></h3>
	</div>
</div>

<!-- Vista de detalle -->
<%@ include file="/resources/views/forms/station/detail.jsp" %>
<!-- Vista de edicion -->
<%@ include file="/resources/views/forms/station/edit.jsp" %>
<!-- Vista de confirmacion -->
<script type="text/ng-template" id="confirm.html">
	<%@ include file="/resources/views/commons/confirm.jsp" %>
</script>

<!-- Seleccion de motivo de eliminacion -->
<select-uti1006-component />

<!-- Lista de estaciones -->
<div class="row" id="stations">
	<div ng-repeat="station in stations" class="col-lg-3 col-sm-4 col-xs-12" ng-click="selected(station)">
		<div class="info-box bg-blue">
			<span class="info-box-icon"><i class="fa fa-home"></i>
			</span>
			<div class="info-box-content">
			    <span class="info-box-text">{{station.namest}} </span>
			    <span class="info-box-number" >{{station.phonst}}</span>
			    <span class="progress-description">
			      	<div class="ckbx-style-9">
                        <input ng-disabled="true" type="checkbox" ng-model="station.status" value="0">
                        <label for="ckbx-style-9-1"></label>
                    </div>
				</span>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	$(document).ready(function(){
	    $("#stations").on('click', '.cls80', function(){
	    	console.log("SELECCIONADA");
	        $('.cls80').removeClass("clsSelected");
	        $(this).addClass("clsSelected");
	    });
	});
</script>