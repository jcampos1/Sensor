<h5>{{ 'GENE.ARTI' | translate }}</h5>
<input type="hidden" form = "{{$ctrl.nameform}}" name="mae1009" id="mae1009" ng-model="mae1009.item"
		 required />
<p class="input-group">
	<input name="mae10092" id="mae10092" class="form-control"
		placeholder="{{ 'GENE.ARTI' | translate }}" ng-model="text"
		ng-change="load()" required /> <span class="input-group-btn">
		<select-mae1009-component />
	</span> </input>
</p>

<ul class="box-search" id="{{boxSearch}}">
<button type="button" class="close" aria-hidden="true" ng-click="close()">&times;</button>
	<li ng-repeat="mae1009 in lstMae1009"><a class="no-decor"
		ng-click="changeMae1009(mae1009)"> <span class="class01">{{
				mae1009.item }}</span> | {{mae1009.dsca}}
	</a></li>
	<div id="{{noResult}}" class="class02"><i class="fa fa-search" aria-hidden="true"></i>&nbsp;{{'GENE.NORESULT' | translate}}</div>
</ul>

<span
	ng-show="!$ctrl.formm.mae10092.$pristine && $ctrl.formm.mae10092.$error.required"
	class="logError has-error"><label class="control-label"
	for="mae10092"><i class="fa fa-times-circle-o"></i> {{ 'GENE.REQ' |
		translate }}</label></span>
<div id="ERROR_item" class="logError"></div>