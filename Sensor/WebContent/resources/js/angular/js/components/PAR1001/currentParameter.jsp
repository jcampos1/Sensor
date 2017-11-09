<div ng-controller="currentParameterController as vm">
	<div class="row">
		<div class="col-sm-2">
			<div class="input-group">
				<script type="text/ng-template" id="modalEditEntity.html">
						<%@ include file="/resources/views/forms/PAR1001/edit.jsp" %>
					</script>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-lg-12">
			<div>
				<!-- TO DO List -->
				<div class="box box-primary">
					<div class="box-header">
						<i class="ion ion-clipboard"></i>
						<h3 class="box-title">{{ 'PAR1001.CURR_PARA' | translate }}</h3>
						<div class="box-tools pull-right" data-toggle="tooltip">
							<div class="btn-group" data-toggle="btn-toggle">
								<button type="button" ng-click="vm.getParameter()"
									class="btn btn-default btn-sm active"
									title="{{ 'GENE.REFR' | translate }}">
									<i class="fa fa-refresh text-green"></i>
								</button>
								<button type="button" class="btn btn-default btn-sm pull-right"
									data-widget="collapse" data-toggle="tooltip"
									title="{{ 'GENE.COLLA' | translate }}"
									style="margin-right: 5px;">
									<i class="fa fa-minus text-blue"></i>
								</button>
							</div>
						</div>
					</div>
					<!-- /.box-header -->
					<div class="box-body">
						<ul class="todo-list">
							<li context-menu="menuEdit" ng-dblclick="vm.open(vm.par1001)"
								style="cursor: pointer;">
								<!-- drag handle --> <span class="handle"> <i
									class="fa fa-ellipsis-v"></i> <i class="fa fa-ellipsis-v"></i>
							</span> <!-- todo text --> <span class="text"> <button type="button" ng-click="vm.open(vm.par1001)"
										class="btn btn-link">{{vm.par1001.fech}}</button><br>{{vm.par1001.user.frst_name}}<br>{{vm.par1001.dsca}}<br />
							</span> <!-- General tools such as edit or delete-->
								<div class="tools">
									<button type="button" ng-click="vm.open(vm.par1001)"
										class="btn btn-link"><i
										class="fa fa-edit"></i></button>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<!-- /.box -->
			</div>
		</div>
	</div>
</div>
