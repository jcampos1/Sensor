<!------------- FORMULARIO ITEMS POR ORNO --------------->

<div class="modal-header">
	<h3 class="box-title">{{ ('FORM.MAE1014' | translate)+('FORM.NEW'
		| translate) }}</h3>
</div>
<div id="FATH_FORM" class="modal-body">
	<!--  -->
	<form id="MAE1014Form" name="MAE1014Form" novalidate="true">
		<div class="row">
			<div class="col-sm-6">
				<search-mae1009-component nameform="MAE1014Form"
					mae1009="mae1014.item" formm="MAE1014Form" />
			</div>
			<div class="col-sm-6">
				<h5>{{ 'GENE.QUANT' | translate }}</h5>
				<div class="input-group">
					<input type="text" name="cant_p" id="cant_p" class="form-control"
						aria-describedby="basic-addon1"
						placeholder="{{ 'GENE.QUANT' | translate }}"
						ng-model="mae1014.cant_p" awnum="pedido"
						required /> <span class="input-group-addon" id="basic-addon1">
						{{mae1014.item.stuw}} </span>
				</div>
				<span
					ng-show="!MAE1014Form.cant_p.$pristine && MAE1014Form.cant_p.$error.required"
					class="logError has-error"><label class="control-label"
					for="cant_p"><i class="fa fa-times-circle-o"></i> {{
						'GENE.REQ' | translate }}</label></span>
				<div id="ERROR_cant_p" class="logError"></div>
			</div>
		</div>
		<br />
		<div class="modal-footer">
			<a ng-click="cancel()" class="btn btn-app btn btn-warning"> <i
				class="fa fa-close"></i> {{ 'GENE.CANCEL' | translate }}
			</a> <a ng-disabled="!MAE1014Form.$valid"
				ng-click="submitForm(mae1014, MAE1014Form)"
				class="btn btn-app btn btn-primary"> <i class="fa fa-save"></i>
				{{ 'GENE.SAVE' | translate }}
			</a>
		</div>
	</form>
</div>