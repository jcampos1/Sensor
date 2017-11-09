<div class="box box-danger" id="ctrl-pesaje">
	<form id="CTRLPESA" name="CTRLPESA" novalidate="true">
		<div class="box-header with-border">
			<i class="ion ion-clipboard"></i>
			<h3 class="box-title">{{ 'GENE.CTRLPE' | translate }}</h3>
			<div class="box-tools pull-right" data-toggle="tooltip">
				<div class="btn-group" data-toggle="btn-toggle">
					<button type="button" class="btn btn-default btn-sm pull-right"
						data-widget="collapse" data-toggle="tooltip"
						title="{{ 'GENE.COLLA' | translate }}" style="margin-right: 5px;">
						<i class="fa fa-minus text-blue"></i>
					</button>
				</div>
			</div>
		</div>
		<div class="box-body">
			<div class="row" style="margin: 2px; background-color: #f4f4f4;">
				<div class="col-sm-2 col-xs-3">
					<h5>{{ 'GENE.CODE' | translate }}</h5>
					<h3>{{line_ord.item.item}}</h3>
				</div>
				<div class="col-sm-4 col-xs-4">
					<h5>{{ 'GENE.ARTPES' | translate }}</h5>
					<h3>{{line_ord.item.dsca}}</h3>
				</div>
				<div class="col-sm-1 col-xs-1">
					<br> <label> <!--  <i class="fa fa-check" aria-hidden="true"></i>-->{{
						'GENE.ISCONT'+line_ord.item.iscont | translate }} 
				</div>
				<%-- <div class="col-sm-2 col-xs-2">
					<h5>{{ 'GENE.DIFERE' | translate }}</h5>
					<h3>{{line_ord.difere | number:2 }}</h3>
				</div>
				<div class="col-sm-2 col-xs-2">
					<h5>{{ 'GENE.PERCEN' | translate }}</h5>
					<h3>{{line_ord.percen | number:2 }}</h3>
				</div>--%>
			</div>
			<div class="row">
				<div class="col-sm-2 col-xs-4">
					<h5>{{ 'GENE.DISP' | translate }}</h5>
					<select name="disp" id="disp" chosen="{width: '100%'}"
						placeholder-text-single="'{{::'GENE.SELE_AOPT' | translate}}'"
						ng-options="ind as ind.dsca for ind in indicators track by ind.id"
						class="form-control input-sm" ng-model="disp"
						ng-disabled="line_ord == undefined || (line_ord.item.iscont && !par1001.pescon)"
						ng-change="changeDisp(disp, '{{disp.srvrpo}}')">
					</select>
				</div>
				<div class="col-sm-2 col-xs-4"></div>
				<div class="col-sm-3 col-xs-4">
					<div class="checkbox">
						<label> <input ng-change="isValidPes_ma(CTRLPESA)"
							name="pes_ma" id="pes_ma" type="checkbox" ng-model="pes_ma"
							ng-disabled="!currentUser.ingr || (line_ord.item.iscont && !par1001.pescon)">
							{{ 'GENE.PES_MA' | translate }}
						</label>
					</div>
					<div class="input-group input-group-sm">
						<input name="weight" id="weight" ng-model="weight"
							ng-value="pes_ne" type="text"
							class="form-control input-group-sm nospin"
							ng-disabled="!CTRLPESA.pes_ma.$viewValue || (!par1001.pescon && line_ord.item.iscont)"
							awnum num-sep="{{separator.sepade}}" num-fract="2"
							num-thousand="true" num-neg="false" num-fixed="true"> <span
							class="input-group-btn input-group-sm">
							<button
								ng-disabled="line_ord == undefined || (line_ord.item.iscont && !par1001.pescon) || CTRLPESA.pes_ma.$viewValue"
								ng-click="captureWeigh(disp)" class="btn btn-primary btn-sm"
								type="button">
								<strong>{{ 'MAE1015.CAPT_WEIG' | translate}}</strong>
							</button> &nbsp;<img ng-if="showLoading" width="30px" height="30px"
							src="/Sensor/resources/images/loading.gif" />
						</span>
					</div>
				</div>
				<div class="col-sm-3"></div>
				<div class="col-sm-2 col-xs-4">
					<br>
					<div class="input-group input-group-sm" style="float: right;">
						<a ng-click="confirmWeigh()" class="for-control btn btn-success">
							<i class="fa fa-check-square-o"></i> {{ 'GENE.CONFWE' | translate
							}}
						</a>
					</div>
				</div>
			</div>
			<br>
			<div class="row">
				<hr>
				<div class="col-lg-4 col-sm-6 col-xs-12">
					<h5>{{ 'GENE.QUANRE' | translate }}</h5>
					<h3>{{
						line_ord.cantpcu | awnum:'general' }}&nbsp;{{line_ord.arcuni |
						uppercase}} / {{ line_ord.cant_p |
						awnum:'general' }}&nbsp;{{line_ord.arstuw | uppercase}}</h3>
				</div>
				<div class="col-lg-4 col-sm-6 col-xs-12">
					<h5>{{ 'GENE.DIFERE2' | translate }}</h5>
					<h3>{{
						line_ord.difecu | awnum:'general' }}&nbsp;{{line_ord.arcuni |
						uppercase}} / {{ line_ord.difere | awnum:'general' }}&nbsp;{{line_ord.arstuw | uppercase}}</h3>
				</div>
				<div class="col-lg-2 col-sm-6 col-xs-12">
					<h5>
						{{ 'GENE.DIFPES' | translate }}&nbsp;<i
							uib-tooltip="{{'TLTPS.DIBRTE_TP'| translate}}"
							tooltip-trigger="focus" class="fa fa-info-circle"
							aria-hidden="true"></i>
					</h5>
					<h3>{{ dibrte | awnum:'general' }}{{ 'GENE.DIF_UNI' |
						translate }}</h3>
				</div>

				<div class="col-lg-2 col-sm-6 col-xs-12">
					<h5>
						{{ 'GENE.PERCEN' | translate }}&nbsp;<i
							uib-tooltip="{{'TLTPS.POBRTE_TP'| translate}}"
							tooltip-trigger="focus" class="fa fa-info-circle"
							aria-hidden="true"></i>
					</h5>
					<h3>{{ pobrte | awnum:'general' }}</h3>
				</div>
				<hr>
			</div>
			<div class="row">
				<div class="col-sm-3 col-xs-6 grow">
					<h4>{{ 'GENE.PES_TA' | translate }}</h4>

					<div class="sampletext">{{pes_ta | awnum:'general'}}</div>
					<input type="hidden" class="sampletext" name="pes_ta"
						ng-value="pes_ta" ng-model="pes_ta" step="any" min="0"
						readOnly="true" disabled="true" required />
				</div>
				<div class="col-sm-3 col-xs-6 grow">
					<h4>{{ 'GENE.PES_BR' | translate }}</h4>

					<div class="sampletext">{{pes_br | awnum:'general'}}</div>

					<input type="hidden" class="sampletext" name="pes_br"
						ng-value="pes_br" ng-model="pes_br" step="any" min="0"
						readOnly="true" disabled="true" required />
				</div>
				<div class="col-sm-3 col-xs-6 grow">
					<h4>{{ 'GENE.PES_NE' | translate }}</h4>
					<div class="sampletext">{{pes_ne | awnum:'general'}}</div>
					<input type="hidden" class="sampletext" name="pes_ne"
						ng-model="pes_ne" ng-value="pes_ne" step="any" min="0"
						readOnly="true" disabled="true" required />
				</div>
				<div class="col-sm-3 col-xs-6 grow">
					<h4>{{ 'GENE.PES_TEO' | translate }}</h4>
					<div class="sampletext">{{pes_teo | awnum:'general'}}</div>

					<input type="hidden" class="sampletext" name="pes_teo" id="pes_teo"
						ng-model="pes_teo" ng-value="pes_teo" step="any" min="0"
						readOnly="true" disabled="true" />
				</div>
			</div>
		</div>
		<!-- /.box-body -->
	</form>
</div>