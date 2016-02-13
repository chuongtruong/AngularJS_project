var app = angular.module("myApp", ["ui.router", "ui.bootstrap"]);
//"controllerModule" we can delete

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
    $stateProvider
        .state('app', {
            abstract: true,
            templateUrl: 'navbarFooter.html'
        })
        .state('home', {
            parent: 'app',
            url: "/home",
            templateUrl: 'home.html'
        })
        .state('photo', {
            parent: 'app',
            url: "/photo",
            templateUrl: 'photo.html'
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
            templateUrl: 'signup.html'
        })
        .state('login', {
            parent: 'app',
            url: "/login",
            templateUrl: 'login.html'
        });
});
