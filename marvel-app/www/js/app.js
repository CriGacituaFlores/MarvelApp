(function() {
var app = angular.module('myMarvel', ['ngRoute','ngResource','ionic','ionic-material'])

app.config(["$routeProvider",function($routeProvider){

  $routeProvider.when("/comics",{
    controller: "MarvelCtrl",
    templateUrl: "templates/marvel_index.html"
  }).when("/comic/:id",{
    controller: "MarvelDetail",
    templateUrl: "templates/pages.html"
  }).when("/",{
    controller: "MarvelSlide",
    templateUrl: "templates/slide.html"
  });

}]);

app.factory('ComicService', function() {
  return {
       PRIV_KEY: '29bf991829ba2e685a2d2f4bbc6fcd84d60dd29b',
       PUBLIC_KEY: '7d230d5b17bc13d8f1f390973976bbe3',
       ts: new Date().getTime(),
       url_base: 'http://gateway.marvel.com:80/v1/public/comics'
  };
});

app.controller('MarvelSlide',function($scope,$location){
  $scope.goHome = function(){
    $location.path("/comics")
  }
});

app.controller('MarvelCtrl', function($http,$scope,$location,ComicService){

  var hash = md5(ComicService.ts + ComicService.PRIV_KEY + ComicService.PUBLIC_KEY).toString();
  var url_principal = ComicService.url_base + '?ts='+ ComicService.ts +'&apikey='+ ComicService.PUBLIC_KEY +'&hash='+ hash +''
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
    $location.path("/comic/" + comic.id)
  }
});

app.controller('MarvelDetail', [
  "$scope","$http","$routeParams","$location","$resource","ComicService",
  function($scope,$http,$routeParams,$location,$resource,ComicService){

    $scope.comicId = $routeParams.id;

    var hash = md5(ComicService.ts + ComicService.PRIV_KEY + ComicService.PUBLIC_KEY).toString();

    //url principal la cual servira para poder consumir la api
    var url_principal = ComicService.url_base + "/" + $scope.comicId + '?ts='+ ComicService.ts +'&apikey='+ ComicService.PUBLIC_KEY +'&hash='+ hash +''
    console.log(url_principal)

    //PARA OBTENER EL COMIC ESPECIFICO

    $scope.comic = [];

    $http.get(url_principal)
      .success(function(response){
        angular.forEach(response.data.results, function(child){
          $scope.comic.push(child);
        });
      }
    );

    //PARA OBTENER PERSONAJES DEL COMIC

    $scope.characters = [];

    $http.get('http://gateway.marvel.com/v1/public/comics/'+ $scope.comicId +'/characters' + '?ts=' + ComicService.ts + '&apikey=' + ComicService.PUBLIC_KEY + '&hash=' + hash)
    .success(function(response){
      angular.forEach(response.data.items, function(child){
        $scope.characters.push(child)
      })
    })

    //PARA OBTENER CREADORES DEL COMIC

    $scope.creators = [];

    $http.get('http://gateway.marvel.com/v1/public/comics/'+ $scope.comicId +'/creators' + '?ts=' + ComicService.ts + '&apikey=' + ComicService.PUBLIC_KEY + '&hash=' + hash)
    .success(function(response){
      angular.forEach(response.data.results, function(child){
        $scope.creators.push(child)
      })
    })


    $scope.backIndex = function() {
      $location.path("/")
    }

    //PARA OBTENER URLS DEL COMIC

    $scope.urls = [];

    $http.get('http://gateway.marvel.com/v1/public/comics/' + $scope.comicId  + '?ts=' + ComicService.ts + '&apikey=' + ComicService.PUBLIC_KEY + '&hash=' + hash)
    .success(function(response){
      angular.forEach(response.data.results, function(child){
        angular.forEach(child.urls, function(url){
          $scope.urls.push(url)
        })
      })
    })
  }
]);

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
