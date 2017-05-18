var app = angular.module('Stocks-App', ['ngRoute', 'ngCookies']);


app.config(function($routeProvider) {

  $routeProvider
    .when('/', {
      controller: 'loginCtr',
      templateUrl: 'views/login.html',
      reloadOnSearch: false,
      controllerAs: 'vm'
    })
    .when('/dashboard', {
      resolve: {
        "check": function($location, $rootScope) {
          if (!$rootScope.loggedIn) {
            $location.path('/');
          }
        }
      },
      templateUrl: 'views/dashboard.html',
      controller: 'loginCtr',
      controllerAs: 'vm'

    })
    .when('/register', {
      controller: 'loginCtr',
      templateUrl: 'views/register.html',
      controllerAs: 'vm'
      //Added a meals config
    })
    .otherwise({
      redirectTo: '/'
    });

});

app.config(['$qProvider', function($qProvider) {
  $qProvider.errorOnUnhandledRejections(false);
}]);
// Set Control
app.controller('loginCtr', ['$http', '$scope', '$location', '$rootScope', '$cookies', '$window', 'userPersistenceService', function($http, $scope, $location, $rootScope, $cookies, $window, userPersistenceService) {
  var vm = this;
  this.currentUser;

  // Control for login
  this.submit = function() {

    // $scope.error_msg = null;
    // $rootScope.loggedIn = false;
    // localStorage.clear('token');
    // userPersistenceService.clearCookieData('userName');
    // console.log("username = ", this.username);
    // console.log("pw =", this.username);

    console.log("this.formLogin", this.formLogin);
    this.URL = 'http://localhost:3000/login';

    $http({
      method: 'POST',
      url: this.URL,
      data: this.formLogin
    }).then(function(result) {
      console.log("Data from server: ", result.data);
      if (result.data.error) {
        console.log(result.data.error);
        $scope.error_msg = result.data.error
      } else {
        $scope.error_msg = null;
        $rootScope.loggedIn = true;
        $location.path('/dashboard');

      }

    }.bind(this));


  };

  // create user ... from register form
  this.register = function() {

    console.log("Register");
    console.log("this.formdata", this.formdata);
    this.URL = 'http://localhost:3000/users';

    $http({
      method: 'POST',
      url: this.URL,
      data: this.formdata
    }).then(function(result) {
      console.log("Data from server: ", result);
      $location.path('/login');
    }.bind(this));
  };

}]);


// Server - set cookies
app.factory("userPersistenceService", [
  "$cookies",
  function($cookies) {
    var userName = "";

    return {
      setCookieData: function(username) {
        userName = username;
        $cookies.put("userName", username);
      },
      getCookieData: function() {
        userName = $cookies.get("userName");
        return userName;
      },
      clearCookieData: function() {
        userName = "";
        $cookies.remove("userName");
      }
    };
  }
]);
