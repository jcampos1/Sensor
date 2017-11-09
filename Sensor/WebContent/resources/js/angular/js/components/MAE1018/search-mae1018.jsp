<h5>{{ ('GENE.SEL_WARE' | translate) + "
	" + ('GENE.ORIGIN' | translate) }}</h5>

<input type="hidden" form="{{$ctrl.nameform}}" ng-model="mae1018.dsca_a"
	required />
<p class="input-group">
	<input name="orig_a" id="orig_a" class="form-control"
		placeholder="{{ 'GENE.SEL_WARE' | translate }}" ng-model="text"
		ng-change="load()" required /> <span class="input-group-btn">
		<select-mae1018-component source="origin"/>
	</span> </input>
</p>

<ul class="box-search" id="{{boxSearch}}">
<button type="button" class="close" aria-hidden="true" ng-click="close()">&times;</button>
	<li ng-repeat="mae1018 in lstMae1018"><a class="no-decor"
		ng-click="changeMae1018(mae1018)"> <span class="class01">{{
				mae1018.code_a }}</span> | {{mae1018.dsca_a}}
	</a></li>
	<div id="{{noResult}}" class="class02">
		<i class="fa fa-search" aria-hidden="true"></i>&nbsp;{{'GENE.NORESULT'
		| translate}}
	</div>
</ul>

<span
	ng-show="!$ctrl.formm.orig_a.$pristine && $ctrl.formm.orig_a.$error.required"
	class="logError has-error"><label class="control-label"
	for="orig_a"><i class="fa fa-times-circle-o"></i> {{ 'GENE.REQ'
		| translate }}</label></span>
<div id="ERROR_orig_a" class="logError"></div>