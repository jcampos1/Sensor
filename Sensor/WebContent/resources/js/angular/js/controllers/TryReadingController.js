angular.module("processApp").controller("TryReadingCtrl", function($scope, TryReadingService) {
  $scope.messages = [];
  $scope.message = "";
  $scope.max = 140;

  $scope.addMessage = function() {
	  TryReadingService.send();
    $scope.message = "";
  };

  TryReadingService.receive().then(null, null, function(message) {
	  console.log("mensaje recibido es: ");
	  console.log(message);
    $scope.messages.push(message);
  });
});