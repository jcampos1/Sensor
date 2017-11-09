<div class="row">
	<div class="col-lg-2 col-xs-6 clase2" style="cursor: pointer;">
		<!-- small box -->
		<div class="small-box bg-blue" ng-click="vm.queryByStat(stats[0])">
			<div class="inner">
				<h3>
					{{lstCant[0]}}<sup style="font-size: 20px;"></sup>
				</h3>

				<p>{{'ORDER.CREA' | translate}}</p>
			</div>
			<div class="icon">
				<i class="ion-social-buffer-outline"></i>
			</div>
			<a class="small-box-footer">{{'GENE.MORE_INFO' | translate}} <i
				class="fa fa-arrow-circle-right"></i></a>
		</div>
	</div>
	<div class="col-lg-2 col-xs-6 clase2" style="cursor: pointer;">
		<!-- small box -->
		<div class="small-box bg-aqua" ng-click="vm.queryByStat(stats[1])">
			<div class="inner">
				<h3>{{lstCant[1]}}<sup style="font-size: 20px;"></sup>
				</h3>

				<p>{{'ORDER.PROC' | translate}}</p>
			</div>
			<div class="icon">
				<i class="ion-ios-paper-outline"></i>
			</div>
			<a class="small-box-footer">{{'GENE.MORE_INFO' | translate}} <i
				class="fa fa-arrow-circle-right"></i></a>
		</div>
	</div>
	<!-- ./col -->
	<div class="col-lg-2 col-xs-6 clase2" style="cursor: pointer;">
		<!-- small box -->
		<div class="small-box bg-green" ng-click="vm.queryByStat(stats[2])">
			<div class="inner">
				<h3>
					{{lstCant[2]}}<sup style="font-size: 20px;"></sup>
				</h3>

				<p>{{'ORDER.SUSP' | translate}}</p>
			</div>
			<div class="icon">
				<i class="ion-ios-timer-outline"></i>
			</div>
			<a href="#" class="small-box-footer">{{'GENE.MORE_INFO' |
				translate}} <i class="fa fa-arrow-circle-right"></i>
			</a>
		</div>
	</div>
	<!-- ./col -->
	<div class="col-lg-2 col-xs-6 clase2" style="cursor: pointer;">
		<!-- small box -->
		<div class="small-box bg-yellow" ng-click="vm.queryByStat(stats[4])">
			<div class="inner">
				<h3>{{lstCant[3]}}<sup style="font-size: 20px;"></sup>
				</h3>

				<p>{{'ORDER.CLSE' | translate}}</p>
			</div>
			<div class="icon">
				<i class="ion-android-clipboard"></i>
			</div>
			<a href="#" class="small-box-footer">{{'GENE.MORE_INFO' |
				translate}} <i class="fa fa-arrow-circle-right"></i>
			</a>
		</div>
	</div>
	<!-- ./col -->
	<div class="col-lg-2 col-xs-6 clase2" style="cursor: pointer;">
		<!-- small box -->
		<div class="small-box bg-orange" ng-click="vm.queryByStat(stats[5])">
			<div class="inner">
				<h3>{{lstCant[4]}}<sup style="font-size: 20px;"></sup>
				</h3>

				<p>{{'ORDER.EXPO' | translate}}</p>
			</div>
			<div class="icon">
				<i class="ion-archive"></i>
			</div>
			<a href="#" class="small-box-footer">{{'GENE.MORE_INFO' |
				translate}} <i class="fa fa-arrow-circle-right"></i>
			</a>
		</div>
	</div>
	<!-- ./col -->

	<div class="col-lg-2 col-xs-6 clase2" style="cursor: pointer;">
		<!-- small box -->
		<div class="small-box bg-red" ng-click="vm.queryByStat(stats[3])">
			<div class="inner">
				<h3>{{lstCant[5]}}<sup style="font-size: 20px;"></sup>
				</h3>

				<p>{{'ORDER.ELIM' | translate}}</p>
			</div>
			<div class="icon">
				<i class="ion-trash-a"></i>
			</div>
			<a href="#" class="small-box-footer">{{'GENE.MORE_INFO' |
				translate}} <i class="fa fa-arrow-circle-right"></i>
			</a>
		</div>
	</div>
	<!-- ./col -->
</div>
<!-- /.row -->