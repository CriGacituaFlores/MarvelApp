var app = angular.module('myMarvel', ['ngRoute'])

app.config(["$routeProvider", function($routeProvider){

  $routeProvider.when("/index",{
    controller: "MarvelCtrl",
    templateUrl: "templates/page.html"
  }).when("/page2",{
    controller: "MarvelDetail",
    templateUrl: "templates/login.html"
  });
}]);