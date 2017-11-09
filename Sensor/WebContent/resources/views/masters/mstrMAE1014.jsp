<div class="box box-danger" shortcuts="keyUp" id="mstr_mae1014">
	<div class="box-header with-border">

		<i class="fa fa-list"></i>
		<h3 class="box-title">{{ 'GENE.LIN_ORD' | translate }}</h3>
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

		<!-- Custom tabs (Charts with tabs)-->
		<div class="nav-tabs-custom">
			<div class="tab-content no-padding">
				<!-- Morris chart - Sales -->
				<div class="tab-pane active" style="position: relative;">
					<br>
					<div ng-controller="mae1014Controller">
						<script type="text/ng-template" id="myModalContent.html">
			<%@ include file="/resources/views/commons/confirm.jsp" %>
    	</script>
						<div class="row">
							<div class="col-lg-2 col-xs-12">
								<div class="input-group">
									<script type="text/ng-template" id="modalNewMAE1014Ctrl.html">
												<%@ include file="/resources/views/forms/MAE1014/MAE1014.jsp" %>
											</script>
									<new-mae1014-component />
									<script type="text/ng-template" id="modalDetailEntity.html">
											<%@ include file="/resources/views/forms/MAE1014/detail.jsp" %>
										</script>
								</div>
								<div class="input-group">
									<script type="text/ng-template" id="modalEditEntity.html">
											<%@ include file="/resources/views/forms/MAE1014/edit.jsp" %>
										</script>
								</div>
							</div>
							<div class="col-lg-3 col-xs-5 col-lg-offset-7 col-xs-offset-7"
								style="text-align: right;">
								<a ng-disabled="countRowSelect!=1" ng-click="detailBtn()"
									uib-popover="{{'GENE.DETAIL' | translate}}"
									popover-trigger="'mouseenter'"
									class="btn btn-social-icon btn-twitter"> <span
									class="glyphicon glyphicon-zoom-in"></span>
								</a> <a ng-if="mae1013.confpe && mae1013.stat.id == 1 &&currentUser.pesaje"
									ng-disabled="countRowSelect!=1" ng-click="onDblClickRowBtn()"
									uib-popover="{{'GENE.START_WE' | translate}}"
									popover-trigger="'mouseenter'"
									class="btn btn-social-icon btn-flickr"> <span
									class="fa fa-life-ring"></span>
								</a> <a ng-if="mae1013.confpe && mae1013.stat.id == 1 && currentUser.pesaje"
									ng-disabled="countRowSelect!=1" ng-click="motivosBtn()"
									uib-popover="{{'MAE1014.NODESP' | translate}}"
									popover-trigger="'mouseenter'"
									class="btn btn-social-icon btn-dropbox"> <span
									class="glyphicon glyphicon-check"></span>
								</a> <a ng-if="mae1013.confpe" ng-disabled="countRowSelect!=1"
									ng-click="desgloseBtn()"
									uib-popover="{{'MAE1014.DESG_P' | translate}}"
									popover-trigger="'mouseenter'"
									class="btn btn-social-icon btn-facebook"> <span
									class="glyphicon glyphicon-th-list"></span>
								</a> <a ng-if="!mae1013.confpe && currentUser.ornd"
									ng-disabled="countRowSelect!=1" ng-click="editBtn()"
									uib-popover="{{'GENE.BTN_EDIT' | translate}}"
									popover-trigger="'mouseenter'"
									class="btn btn-social-icon btn-github"> <span
									class="glyphicon glyphicon-edit"></span>
								</a> <a ng-if="!mae1013.confpe && currentUser.ornd"
									ng-disabled="countRowSelect!=1" ng-click="checkLineBtn()"
									uib-popover="{{'GENE.REMOVE' | translate}}"
									popover-trigger="'mouseenter'"
									class="btn btn-social-icon btn-google"> <span
									class="glyphicon glyphicon-trash"></span>
								</a>
							</div>
						</div>
						<br />
						<div class="row" ui-i18n="{{ lang }}">
							<!--  -->
							<div class="col-sm-12">
								<div ui-grid="gridOptions" ui-grid-pagination ui-grid-selection
									ui-grid-exporter></div>
							</div>
						</div>
						<div class="row">
							<div
								class="col-lg-12 class04">
								<button class="btn btn-danger" type="button"
									ng-disabled="!mae1013.confpe || mae1013.stat.id != 1 || !currentUser.pesaje"
									ng-click="closeOrder(mae1013.orno, true)">
									<i class="fa fa-check"></i> {{ 'GENE.CLOSEOR' |
									translate }}
								</button>
								<button class="btn btn-primary" type="button"
									ng-disabled="mae1013.confpe || (!mae1013.confpe && !currentUser.ornd) || mae1013.stat.id == 3"
									ng-click="confirmPe()">
									<i class="fa fa-check-square-o"></i> {{ 'GENE.CONFPE' |
									translate }}
								</button>
								<button class="btn btn-warning" type="button"
									ng-disabled="mae1013.stat.id != 0 && mae1013.stat.id != 1"
									ng-click="asignPrec()">
									<i class="fa fa-list-ul"></i> {{ 'GENE.AS_PREC' |
									translate }}
								</button>
								<button class="btn btn-success" type="button"
									ng-disabled="mae1013.stat.id != 4 && mae1013.stat.id != 5"
									ng-click="printOrder(mae1013)">
									<i class="fa fa-print"></i> {{ 'GENE.PRINT' |
									translate }}
								</button>
							</div>
						</div>
					</div>
					
					<mae101001-component ng-if="mae1013.confpe"/>
					<prec-component />
				</div>
			</div>
		</div>
	</div>
</div>