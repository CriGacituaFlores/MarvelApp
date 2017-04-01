var app = angular.module('myMarvel',[])

app.controller('MarvelCtrl', function($http,$scope){

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
    });
});

app.controller('MarvelDetail', function($http,$scope){

});