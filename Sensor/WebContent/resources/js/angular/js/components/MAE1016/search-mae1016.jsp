<h5>{{ 'GENE.COMPANY' | translate }}</h5>
<input type="hidden" form = "{{$ctrl.nameform}}" name="mae1016" id="mae1016" ng-model="mae1016.dsca"
		 required />
<p class="input-group">
	<input name="mae10162" id="mae10162" class="form-control"
		placeholder="{{ 'GENE.COMPANY' | translate }}" ng-model="text"
		ng-change="load()" required /> <span class="input-group-btn">
		<select-mae1016-component />
	</span> </input>
</p>

<ul class="box-search" id="{{boxSearch}}">
<button type="button" class="close" aria-hidden="true" ng-click="close()">&times;</button>
	<li ng-repeat="mae1016 in lstMae1016"><a class="no-decor"
		ng-click="changeMae1016(mae1016)"> <span class="class01">{{
				mae1016.number }}</span> | {{mae1016.dsca}}
	</a></li>
	<div id="{{noResult}}" class="class02"><i class="fa fa-search" aria-hidden="true"></i>&nbsp;{{'GENE.NORESULT' | translate}}</div>
</ul>

<span
	ng-show="!$ctrl.formm.mae10162.$pristine && $ctrl.formm.mae10162.$error.required"
	class="logError has-error"><label class="control-label"
	for="mae10162"><i class="fa fa-times-circle-o"></i> {{ 'GENE.REQ' |
		translate }}</label></span>
<div id="ERROR_company" class="logError"></div>