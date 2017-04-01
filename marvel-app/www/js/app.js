(function() {
var app = angular.module('myMarvel', ['ngRoute','ionic','ionic-material'])

app.config(["$routeProvider",function($routeProvider){

  $routeProvider.when("/",{
    controller: "MarvelCtrl",
    templateUrl: "templates/marvel_index.html"
  }).when("/:id",{
    controller: "MarvelDetail",
    templateUrl: "templates/pages.html"
  });

}]);

app.controller('MarvelCtrl', function($http,$scope,$location){

  //Private key generada a la cuenta de marvel
  var PRIV_KEY = "29bf991829ba2e685a2d2f4bbc6fcd84d60dd29b";

  //Public key generada a la cuenta de marvel
  var PUBLIC_KEY = "7d230d5b17bc13d8f1f390973976bbe3";

  //TimeStamp necesario para pasarlo como parametro en la URL
  var ts = new Date().getTime();

  //Parametro hash para pasar en la url
  var hash = md5(ts + PRIV_KEY + PUBLIC_KEY).toString();

  //Url base de los comics
  var url_base = 'http://gateway.marvel.com:80/v1/public/comics';

  //url principal la cual servira para poder consumir la api
  var url_principal = url_base + '?ts='+ ts +'&apikey='+ PUBLIC_KEY +'&hash='+ hash +''
  console.log(url_principal)
  $scope.comics = [];

  $http.get(url_principal)
    .success(function(response){
      angular.forEach(response.data.results, function(child){
        $scope.comics.push(child);
      });
    }
  );

  $scope.viewDetail = function(comic) {
    $location.path("/" + comic.id)
  }
});

app.controller('MarvelDetail', function($http,$scope,$location){

  $scope.backIndex = function() {
    $location.path("/")
  }
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

}());
