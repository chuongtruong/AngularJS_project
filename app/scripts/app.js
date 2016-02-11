
var app=angular.module("myApp", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider) {
$urlRouterProvider.otherwise("/home");
$stateProvider
    .state('app', {
        abstract: true,
        templateUrl: 'navbar.html'
    })
    .state('home', {
        parent:'app',
        url:"/home",
        templateUrl: 'home.html'
    })
    .state('video', {
        parent: 'app',
        url:"/video",
        templateUrl: 'video.html'
    });
    .state('upload',{
        parent : 'app',
        url:"/upload",
        templateUrl: 'upload1.html'
    });
});