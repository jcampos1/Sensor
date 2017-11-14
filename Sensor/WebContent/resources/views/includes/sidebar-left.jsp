<!-- Left side column. contains the logo and sidebar -->
<aside class="main-sidebar">
	<section class="sidebar">
		<!-- Sidebar user panel -->
		<div class="user-panel">
			<div class="pull-left image">
				<img
					src="/Sensor/resources/dist/img/profile-logo.jpg"
					class="img-circle" alt="User Image">
			</div>
			<div class="pull-left info"
				style="word-break: break-all; font-size: 12px;">
				<p>
					<sec:authentication property="principal.username" />
				</p>
				<a href=""><i class="fa fa-circle text-success"></i>{{'GENE.ONLI'
					| translate}}</a>
			</div>
		</div>
		<!-- search form -->
		<form action="" method="get" class="sidebar-form">
			<div class="input-group">
				<input type="text" name="q" class="form-control"
					placeholder="{{'GENE.SEARCH' | translate}}"> <span
					class="input-group-btn">
					<button type="submit" name="search" id="search-btn"
						class="btn btn-flat">
						<i class="fa fa-search"></i>
					</button>
				</span>
			</div>
		</form>
		<!-- /.search form -->
		<!-- sidebar menu: : style can be found in sidebar.less -->
		<ul class="sidebar-menu">
			<li class="header">{{'GENE.MAIN_NAVI' | translate}}</li>

			<sec:authorize access="hasRole('ROLE_ADMIN') and isAuthenticated()">
				<!-- submenu -- Maestros -->
				<li class="active treeview"><a href=""> <i
						class="fa fa-table"></i> <span>{{'GENE.MSTR' | translate}}</span>
						<span class="pull-right-container"> <i
							class="fa fa-angle-left pull-right"></i>
					</span>
				</a>
					<ul class="treeview-menu">

						<li ui-sref-active="active" class="grow"><a ui-sref="users"><i
								class="fa fa-circle-o"></i> {{'GENE.USER' | translate}}</a></li>
						<li ui-sref-active="active" class="grow"><a ui-sref="port"><i
								class="fa fa-circle-o"></i> {{'GENE.PORT' | translate}}</a></li>
						<li ui-sref-active="active" class="grow"><a ui-sref="display"><i
								class="fa fa-circle-o"></i> {{'GENE.DISP' | translate}}</a></li>
						<li ui-sref-active="active" class="grow"><a ui-sref="station"><i
								class="fa fa-circle-o"></i> {{'GENE.STNS' | translate}}</a></li>
						<li ui-sref-active="active" class="grow"><a ui-sref="sensor"><i
							class="fa fa-circle-o"></i> {{'GENE.SENSOR' | translate}}</a></li>
						<li ui-sref-active="active" class="grow"><a ui-sref="typesensor"><i
							class="fa fa-circle-o"></i> {{'GENE.TYSENSOR' | translate}}</a></li>
						<li ui-sref-active="active" class="grow"><a
							ui-sref="parameters"><i class="fa fa-circle-o"></i>
								{{'GENE.PARA' | translate}}</a></li>
						<li ui-sref-active="active" class="grow"><a ui-sref="reasons"><i
								class="fa fa-circle-o"></i> {{'GENE.MOTI' | translate}}</a></li>
					</ul></li>
			</sec:authorize>

			<!-- submenu -- Proceso -->
			<li class="treeview"><a href=""> <i class="fa fa-truck"></i>
					<span>{{'GENE.PROC' | translate}}</span> <span
					class="pull-right-container"> <i
						class="fa fa-angle-left pull-right"></i>
				</span>
			</a>
				<ul class="treeview-menu">
					<li ui-sref-active="active" class="grow"><a ui-sref="header"><i
							class="fa fa-circle-o"></i> {{'GENE.WEIGHING' | translate}}</a></li>
				</ul></li>
		</ul>
	</section>
	<!-- /.sidebar -->
</aside>