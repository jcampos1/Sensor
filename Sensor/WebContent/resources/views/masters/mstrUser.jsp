<div id="mstr_user"
	style="position: relative;">
	<br>
	<div ng-controller="userController">
		<script type="text/ng-template" id="myModalContent.html">
			<%@ include file="/resources/views/commons/confirm.jsp" %>
    	</script>
		<div class="row">
			<div class="col-sm-12">
				<user-for-aprob-component></user-for-aprob-component>
			</div>
		</div>
		<div class="row">
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
			</div>

			<div class="col-sm-5 col-xs-6 col-sm-offset-5 col-xs-offset-4">
				<div class="input-group">
					<input type="text" uib-popover="{{'TLTPS.TP02'|translate}}"
						popover-trigger="'mouseenter'" ng-change="search()"
						ng-model="text" ng-model-options='{ debounce: 600 }'
						class="form-control"> <span class="input-group-btn">
						<button class="btn btn-primary" type="button">{{
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
</div>
