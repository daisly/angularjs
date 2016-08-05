var animationRounts = angular.module("animationRounts",["ngRoute"]);
//路由和多视图处理
animationRounts.config(function($routeProvider){
    $routeProvider
      .when('/',{
        templateUrl: "list.html",
        controller: "animationListController"
      })
      .when('/:id',{
        templateUrl: "detail.html",
        controller: "animationDetailController"
      })
      .otherwise({redirectTo:'/'});
  });
