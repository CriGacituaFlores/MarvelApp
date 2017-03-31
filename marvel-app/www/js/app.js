(function() {
var app = angular.module('myMarvel', ['ionic'])

app.controller('MarvelCtrl', function($http,$scope){

  var PRIV_KEY = "29bf991829ba2e685a2d2f4bbc6fcd84d60dd29b";
  var PUBLIC_KEY = "7d230d5b17bc13d8f1f390973976bbe3";
  var ts = new Date().getTime();
  var hash = md5(ts + PRIV_KEY + PUBLIC_KEY).toString();

  var url_base = 'http://gateway.marvel.com:80/v1/public/comics';
  var url_principal = url_base + '?ts='+ ts +'&apikey='+ PUBLIC_KEY +'&hash='+ hash +''

  $scope.comics = [];

  $http.get(url_principal)
    .success(function(response){
      angular.forEach(response.data.results, function(child){
        console.log(child.description);
        $scope.comics.push(child);
      });
    });
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
