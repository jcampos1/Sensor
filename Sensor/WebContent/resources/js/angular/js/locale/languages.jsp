<!-- TO DO List -->
<div class="box box-primary">
	<!-- /.box-header -->
	<div class="box-body">
		<ul class="todo-list">
			<li ng-repeat="option in opts_langs.availableLangs">
				<!-- drag handle --> <span class="handle"> <i
					class="fa fa-ellipsis-v"></i> <i class="fa fa-ellipsis-v"></i>
			</span> <!-- todo text --> <span class="text"><a
									href="" ng-click="changeLanguage2(option)">{{option.name}}
			</a></span>  <!-- General tools such as edit or delete-->
			</li>
		</ul>
	</div>
</div>
			