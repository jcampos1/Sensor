<%@ include file="/WEB-INF/includes/headerMain.jsp"%>
<title><spring:message code="ttl.mstr_user" /></title>
</head>
<body ng-app="myApp">
	<div ng-controller="userController">
		<script type="text/ng-template" id="myModalContent.html">
			<%@ include file="/WEB-INF/views/commons/confirm.jsp" %>
    	</script>
		<select class="form-control"
			ng-options="option as option.name for option in opts_langs.availableLangs track by option.id"
			ng-model="current_lang" ng-change="changeLanguage()">
			<option style="display: none" value="">{{ 'GENE.SELE_AOPT' |
				translate }}</option>
		</select>
		<div class="row">
			<div class="col-sm-12">
				<h1>{{ 'USER.TITLE_MSTR' | translate }}</h1>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-2">
				<div class="input-group">
					<div ng-controller="newUserController">
						<script type="text/ng-template" id="modalNewEntity.html">
							<%@ include file="/resources/views/forms/users/register.jsp" %>
						</script>
						<new-user-component />
					</div>
				</div>

				<div class="input-group">
					<script type="text/ng-template" id="modalEditEntity.html">
							<%@ include file="/resources/views/forms/users/edit.jsp" %>
						</script>
				</div>
			</div>

			<div class="col-sm-6"></div>

			<div class="col-sm-4">
				<div class="input-group">
					<input type="text" ng-change="search()" ng-model="text"
						ng-model-options='{ debounce: 1000 }' class="form-control">
					<span class="input-group-btn">
						<button class="btn btn-default" type="button">{{
							'GENE.SEARCH' | translate }}</button>
					</span>
				</div>
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
	</div>
</body>
</html>