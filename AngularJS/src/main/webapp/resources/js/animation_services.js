var animationService = angular.module("animationService",["ngResource"]);
  
animationService.factory("animationService",function($resource){
  return $resource("../resources/data/:id.json");
});