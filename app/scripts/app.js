var app = angular.module("myApp", ["ui.router", "ui.bootstrap"]);
//"controllerModule" we can delete


app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/home");
  $stateProvider
    .state('app', {
      abstract: true,
      templateUrl: 'navbarFooter.html',
      controller: 'rootController'
    })
    .state('home', {
      parent: 'app',
      url: "/home",
      templateUrl: 'home.html'
    })
    .state('photo', {
      parent: 'app',
      url: "/photo",
      templateUrl: 'photo.html',
      controller: "galleryController"
    })
    .state('video', {
      parent: 'app',
      url: "/video",
      templateUrl: 'video.html'
    })
    .state('sound', {
      parent: 'app',
      url: "/sound",
      templateUrl: 'sound.html'
    })
    .state('uploadEdit', {
      parent: 'app',
      url: "/uploadEdit",
      templateUrl: 'uploadEdit.html'
    })
    .state('signup', {
      parent: 'app',
      url: "/signup",
      templateUrl: 'views/registerForm.html',
      controller: 'registerController'
    })
    .state('login', {
      parent: 'app',
      url: "/login",
      templateUrl: 'views/loginForm.html',
      controller: 'loginController'
    })
  .state('signupSuccess', {
            parent: 'app',
            url: "/signupSuccess",
            templateUrl: 'signupSuccess.html'
        })
    .state('loginSuccess', {
        parent: 'app',
        url: "/loginSuccess",
        templateUrl: 'loginSuccess.html'
    });
});

// security config
app.run(function($rootScope, $state) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
    var userId = localStorage.getItem("userID");
    if (toState.name === "uploadEdit") {
      if (!userId) {
        event.preventDefault();
        alert("Please login first !");
        $state.go("login");
        return;
      }
    }
  });

  $rootScope.isLoggedIn = function() {
    var userId = localStorage.getItem("userID");
    return !!userId;
  }
});