var app = angular.module("myApp", ["ui.router", "ui.bootstrap", "ngCordova"]);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/home");
    $stateProvider
        .state('app', {
            abstract: true,
            templateUrl: 'views/navbarFooter.html',
            controller: 'rootController'
        })
        .state('home', {
            parent: 'app',
            url: "/home",
            templateUrl: 'views/home.html'
        })
        .state('discover', {
            parent: 'app',
            templateUrl: 'views/discover.html',
            url: "/discover",
            controller: 'discoverController'
        })
        .state('photo', {
            parent: 'app',
            url: "/photo",
            templateUrl: 'views/photo.html',
            controller: 'galleryController'
        })
        .state('video', {
            parent: 'app',
            url: "/video",
            templateUrl: 'views/video.html',
            controller: 'videoController'
        })
        .state('sound', {
            parent: 'app',
            url: "/sound",
            templateUrl: 'views/sound.html',
            controller: 'audioController'
        })
        .state('uploadEdit', {
            parent: 'app',
            url: "/uploadEdit",
            templateUrl: 'views/uploadEdit.html',
            controller: "uploadController"
        })
        .state('editVideo', {
            parent: 'app',
            url: "/editVideo",
            templateUrl: 'views/editVideo.html',
            controller: 'VideoRecordController'
        })
        .state('editAudio', {
            replace: true,
            parent: 'app',
            url: "/editAudio",
            templateUrl: 'views/editAudio.html',
            controller: 'SoundRecordController'
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
        .state('searchResult', {
            parent: 'app',
            url: '/searchResult',
            templateUrl: 'views/searchResult.html',
            controller: 'searchResultController'
        });
});

// security config
app.run(function ($rootScope, $state) {
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
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


    $rootScope.isLoggedIn = function () {
        var userId = localStorage.getItem("userID");
        return !!userId;

    }
});