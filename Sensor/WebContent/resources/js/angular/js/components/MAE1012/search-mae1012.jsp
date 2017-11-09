<h5>{{ 'MAE1013.MOTR' | translate }}</h5>
<input type="hidden" form = "{{$ctrl.nameform}}" name="motr" id="motr" ng-model="mae1012.dsca"
		 required />
<p class="input-group">
	<input name="motr2" id="motr2" class="form-control"
		placeholder="{{ 'MAE1013.MOTR' | translate }}" ng-model="dsca"
		ng-change="loadMotr()" required /> <span class="input-group-btn">
		<select-mae1012-component />
	</span> </input>
</p>

<ul class="box-search" id="{{boxSearch}}">
<button type="button" class="close" aria-hidden="true" ng-click="close()">&times;</button>
	<li ng-repeat="motr in motrs"><a class="no-decor"
		ng-click="changeMotr(motr)"> <span class="class01">{{
				motr.plac }}</span> | {{ motr.dsca }}
	</a></li>
	<div id="{{noResult}}" class="class02"><i class="fa fa-search" aria-hidden="true"></i>&nbsp;{{'GENE.NORESULT' | translate}}</div>
</ul>

<span
	ng-show="!$ctrl.formm.motr2.$pristine && $ctrl.formm.motr2.$error.required"
	class="logError has-error"><label class="control-label"
	for="motr2"><i class="fa fa-times-circle-o"></i> {{ 'GENE.REQ' |
		translate }}</label></span>
<div id="ERROR_motr" class="logError"></div>