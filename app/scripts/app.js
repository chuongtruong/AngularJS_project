var app = angular.module("myApp", ["ui.router"]);

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
        .state'sound', {
            parent: 'app',
            url: "/sound",
            templateUrl: 'sound.html'
        })
        .state('upload', {
            parent: 'app',
            url: "/upload",
            templateUrl: 'upload1.html'
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