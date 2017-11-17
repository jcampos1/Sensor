<!-- Usuarios por aprobar -->
<div class="box box-danger">
	<div class="box-header with-border">
		<h3 class="box-title">{{'USER.FOR_APROB' | translate}}</h3>
		<div class="box-tools pull-right">
			<span class="label label-danger">{{lastMembers + "
				"}}{{'GENE.NEWMEMB' | translate}}</span>
			<button type="button" class="btn btn-box-tool" data-widget="collapse">
				<i class="fa fa-minus"></i>
			</button>
			<button type="button" class="btn btn-box-tool" data-widget="remove">
				<i class="fa fa-times"></i>
			</button>
		</div>
	</div>
	<!-- /.box-header -->
	<div class="box-body no-padding">
		<ul class="users-list clearfix">
			<li ng-repeat="user in users"><h3>
					<span style="cursor: pointer;" ng-click="activate(user)" class="glyphicon glyphicon-edit"></span>
				</h3>
				<a class="users-list-name" style="cursor: pointer"
				ng-click="detail(user)">{{user.frst_name + " " +
					user.last_name}}</a> <span class="users-list-date">{{user.crte_date}}</span></li>
		</ul>
		<!-- /.users-list -->
	</div>
	<!-- /.box-body -->
	<div class="box-footer text-center">
		<a href="javascript:void(0)" class="uppercase"></a>
	</div>
	<!-- /.box-footer -->
</div>
<!--/.box -->
