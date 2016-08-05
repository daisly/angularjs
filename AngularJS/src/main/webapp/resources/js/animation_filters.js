var animationFilters = angular.module("animationFilters",[]);

animationFilters.filter("checkReadedFilter",function(){
  return function(input){
  return input == "true"?"已看":"未看";
  };
});
animationFilters.filter("getLableReadedFilter",function(){
  return function(input){
    return input == "true"?"label-success":"label-danger";
  };
});