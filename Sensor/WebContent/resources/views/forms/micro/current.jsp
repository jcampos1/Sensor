<!-- Microcontrolador por defecto -->
<div class="box box-danger">
	<div class="box-header with-border">
		<h3 class="box-title">{{'GENE.MICRO' | translate}}</h3>
		<div class="box-tools pull-right">
			<span class="label label-danger">1</span>
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
			<li>
			<img alt="Microcontroller" src="./resources/images/micro.jpg" style="cursor: pointer;" ng-click="update(micro)">
			 <a class="users-list-name" style="cursor: pointer"
				ng-click="detail(micro)">{{micro.port_dsca}}</a> <span
				class="users-list-date">{{micro.port_name}}</span></li>
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

<!-- Vista detalle -->
<%@ include file="/resources/views/forms/micro/detail.jsp"%>

<!-- Vista para actualizacion -->
<%@ include file="/resources/views/forms/micro/edit.jsp"%>