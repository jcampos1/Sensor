<hr>
<h4>{{'GENE.ART_RETU' | translate}}</h4>
<hr>
<div class="row">
	<div class="col-sm-2">
		<h5>{{'GENE.PES_TA' | translate}}</h5>
		{{pestar | awnum:'general' }}
	</div>
</div>
<br>

<div class="row" ui-i18n="{{ lang }}">
	<!--  -->
	<div class="col-sm-12">
		<div ui-grid="gridOptions" ui-grid-selection ui-grid-pagination
			class="grid"></div>
	</div>
</div>

