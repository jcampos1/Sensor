<h5>{{ 'GENE.COND' | translate }}</h5>
<input type="hidden" form = "{{$ctrl.nameform}}" name="mae1011" id="mae1011" ng-model="mae1011.cedu"
		 required />
<p class="input-group">
	<input name="mae10112" id="mae10112" class="form-control"
		placeholder="{{ 'GENE.COND' | translate }}" ng-model="text"
		ng-change="load()" required /> <span class="input-group-btn">
		<select-mae1011-component />
	</span> </input>
</p>

<ul class="box-search" id="{{boxSearch}}">
<button type="button" class="close" aria-hidden="true" ng-click="close()">&times;</button>
	<li ng-repeat="mae1011 in lstMae1011"><a class="no-decor"
		ng-click="changeMae1011(mae1011)"> <span class="class01">{{
				mae1011.cedu }}</span> | {{mae1011.nomb}}&nbsp; {{mae1011.apel}}
	</a></li>
	<div id="{{noResult}}" class="class02"><i class="fa fa-search" aria-hidden="true"></i>&nbsp;{{'GENE.NORESULT' | translate}}</div>
</ul>

<span
	ng-show="!$ctrl.formm.mae10112.$pristine && $ctrl.formm.mae10112.$error.required"
	class="logError has-error"><label class="control-label"
	for="mae10112"><i class="fa fa-times-circle-o"></i> {{ 'GENE.REQ' |
		translate }}</label></span>
<div id="ERROR_cond" class="logError"></div>