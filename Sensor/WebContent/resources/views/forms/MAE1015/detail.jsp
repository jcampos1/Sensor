<!------------- DETALLE DESGLOSE DE PESAJE --------------->
<div class="modal-header">
	<h4 class="box-title">{{ ('FORM.MAE1015' |
		translate)+('FORM.QUERY' | translate) }}</h4>
</div>
<div id="FATH_FORM" class="modal-body">
	<!--  -->
	<div class="row">
		<div class="col-sm-3 col-xs-6">
			<h4>{{ 'MAE1013.ORNO' | translate }}</h4>
			<h5>{{mae1015.pk.orno}}</h5>
		</div>

		<div class="col-sm-3 col-xs-6">
			<h4>{{ 'GENE.NUM_LIN' | translate }}</h4>
			<h5>{{mae1015.pk.pono}}</h5>
		</div>

		<div class="col-sm-3 col-xs-6">
			<h4>{{ 'GENE.SECU_PE' | translate }}</h4>
			<h5>{{mae1015.pk.secu}}</h5>
		</div>
		<div class="col-sm-3 col-xs-6">
			<h4>{{ 'GENE.PES_MA' | translate }}</h4>
			<h5>{{'GENE.'+mae1015.pesman | translate}}</h5>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-4 col-xs-6">
			<h4>{{ 'GENE.PES_TA' | translate }}</h4>
			<h5>{{mae1015.pestar | awnum:2:separator.sepade:'round':true:true:numThousandSep:numPrepend:numAppend}}</h5>
		</div>

		<div class="col-sm-4 col-xs-6">
			<h4>{{ 'GENE.PES_BR' | translate }}</h4>
			<h5>{{mae1015.pesbru | awnum:2:separator.sepade:'round':true:true:numThousandSep:numPrepend:numAppend}}</h5>
		</div>

		<div class="col-sm-4 col-xs-6">
			<h4>{{ 'GENE.PES_NE' | translate }}</h4>
			<h5>{{mae1015.pesnet | awnum:2:separator.sepade:'round':true:true:numThousandSep:numPrepend:numAppend}}</h5>
		</div>
	</div>
	<br />
	<div class="modal-footer">
		<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
			class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
		</a>
	</div>
</div>