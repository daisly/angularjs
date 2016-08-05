var animationControllers = angular.module("animationControllers",[]);

animationControllers.controller("animationListController", function($scope, animationService){
  $scope.animations = animationService.get({id:"animation"});
  $scope.sort = "id";
});
  
animationControllers.controller("animationDetailController", function($scope, animationService, $routeParams){
  $scope.animation = animationService.get({id:$routeParams.id});
});