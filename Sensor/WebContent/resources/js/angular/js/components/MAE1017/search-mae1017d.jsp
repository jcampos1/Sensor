<h5>{{ ('GENE.SEL_PART' | translate) + "
	" + ('GENE.DESTINY' | translate) }}</h5>

<input type="hidden" form="{{$ctrl.nameform}}" ng-model="mae1017.dsca_p"
	required />
<p class="input-group">
	<input name="dest_p" id="dest_p" class="form-control"
		placeholder="{{ 'GENE.SEL_PART' | translate }}" ng-model="text"
		ng-change="load()" required /> <span class="input-group-btn">
		<select-mae1017-component source="destiny" />
	</span> </input>
</p>

<ul class="box-search" id="{{boxSearch}}">
<button type="button" class="close" aria-hidden="true" ng-click="close()">&times;</button>
	<li ng-repeat="mae1017 in lstMae1017"><a class="no-decor"
		ng-click="changeMae1017(mae1017)"> <span class="class01">{{
				mae1017.code_p }}</span> | {{mae1017.dsca_p}}
	</a></li>
	<div id="{{noResult}}" class="class02">
		<i class="fa fa-search" aria-hidden="true"></i>&nbsp;{{'GENE.NORESULT'
		| translate}}
	</div>
</ul>

<span
	ng-show="!$ctrl.formm.dest_p.$pristine && $ctrl.formm.dest_p.$error.required"
	class="logError has-error"><label class="control-label"
	for="orig_p"><i class="fa fa-times-circle-o"></i> {{ 'GENE.REQ'
		| translate }}</label></span>
<div id="ERROR_dest_p" class="logError"></div>
