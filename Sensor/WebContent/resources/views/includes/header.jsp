<header class="main-header">
	<!-- Logo -->
	<a href="" class="logo"> <!-- mini logo for sidebar mini 50x50 pixels -->
		<span class="logo-mini"><b>L</b>ABS</span> <!-- logo for regular state and mobile devices -->
		<span class="logo-lg"><b>{{'GENE.NAME_APP_SIG' | translate}}</b></span>
	</a>
	<!-- Header Navbar: style can be found in header.less -->
	<nav class="navbar navbar-static-top">
		<!-- Sidebar toggle button-->
		<a id="btn-sidebar-left" class="sidebar-toggle" data-toggle="offcanvas"
			role="button"> <span class="sr-only">Toggle navigation</span>
		</a>

		<div class="navbar-custom-menu">
			<ul class="nav navbar-nav">
				<!-- Tasks: style can be found in dropdown.less -->
				<li class="dropdown tasks-menu"><a href=""
					class="dropdown-toggle" data-toggle="dropdown"> <i
						class="fa fa-language"></i> <span class="label label-danger">2</span>
				</a>
					<ul class="dropdown-menu">
						<li class="header">{{'GENE.TO_TRNS' | translate}}</li>
						<languages />
					</ul></li>
				<!-- User Account: style can be found in dropdown.less -->
				<li class="dropdown user user-menu"><a href=""
					class="dropdown-toggle" data-toggle="dropdown"> <img
						src="/Sensor/resources/dist/img/profile-logo.jpg" class="user-image"
						alt="User Image"> <span class="hidden-xs"><sec:authentication
								property="principal.username" /></span></a>
					<ul class="dropdown-menu">
						<!-- User image -->
						<li class="user-header"><img
							src="/Sensor/resources/dist/img/profile-logo.jpg" class="img-circle"
							alt="User Image">
							<p>
								<sec:authentication property="principal.username" />
								<sec:authorize
									access="hasRole('ROLE_ADMIN') and isAuthenticated()">
								- {{'GENE.ADMN' | translate }} <small>{{ 'GENE.ASC' |
										translate }}</small>
								</sec:authorize>

							</p></li>
						<!-- Menu Body -->
						<li class="user-body">
							<div class="row">
								<div class="col-xs-4 text-center">
									<a href=""></a>
								</div>
								<div class="col-xs-4 text-center">
									<a href=""></a>
								</div>
								<div class="col-xs-4 text-center">
									<a href=""></a>
								</div>
							</div> <!-- /.row -->
						</li>
						<!-- Menu Footer-->
						<li class="user-footer">
							<div class="pull-left">
								<a href="{{'URL.TRLO'|translate}}"
									class="btn btn-primary btn-flat" target="_blank"><i
									class="fa fa-trello" aria-hidden="true"></i> {{ 'GENE.TRLO' |
									translate }}</a>
							</div>
							<div class="pull-right">
								<a href="{{'URL.SIGN_OUT'|translate}}"
									class="btn btn-primary btn-flat">{{ 'GENE.SIGN_OUT' |
									translate }}</a>
							</div>
						</li>
					</ul></li>
			</ul>
		</div>
	</nav>
</header>