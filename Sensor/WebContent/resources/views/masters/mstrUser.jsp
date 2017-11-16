<div id="mstr_user" style="position: relative;">
	<br>
	<div ng-controller="userController">
		<script type="text/ng-template" id="myModalContent.html">
			<%@ include file="/resources/views/commons/confirm.jsp" %>
    	</script>
		<!--  <div class="row">
			<div class="col-sm-12">
				<user-for-aprob-component></user-for-aprob-component>
			</div>
		</div>-->
		<%-- <div class="row">
			<div class="col-sm-2 col-xs-2">
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
				<script type="text/ng-template" id="modalDetailEntity.html">
							<%@ include file="/resources/views/forms/users/detail.jsp" %>
						</script>
			</div>--%>

		<br />
		<div class="row" ui-i18n="{{ lang }}">
			<!--  -->
			<div class="col-sm-12">
				<div ui-grid="gridOptions" ui-grid-pagination ui-grid-selection
					ui-grid-exporter></div>
			</div>
		</div>
	</div>
</div>
