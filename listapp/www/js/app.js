// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var stories = [];
angular.module('listapp', ['ionic', 'ngResource'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})

.factory('HNStories', function($resource) {
    return $resource('https://hacker-news.firebaseio.com/v0/topstories.json');
})

.factory('HNStoriesItem', function($resource) {
    return $resource('https://hacker-news.firebaseio.com/v0/item/:id.json');
})


.controller("HomeCtrl", function ($scope, $http, HNStories, HNStoriesItem) {

    HNStories.query(function(data){
        stories = data;

        for (s in stories) {
            HNStoriesItem.get({ id: stories[s] }, function(data) {
                stories[s] = data;
            });
        }

        $scope.stories = stories;

    });

    // for (s in stories) {
    //     console.log(s)
    //     // HNStoriesItem.get({ id: s }, function(data) {
    //     //     $scope.stories[s] = data;
    //     // });
    // }

    // HNStoriesItem.get({ id: 8469802 }, function(data) {
    //     $scope.story = data;
    // });



    // for (s in $scope.stories) {
    //     console.log(stories[i]  )
    //     // HNStoriesItem.get({ id: s }, function(data) {
    //     //     $scope.stories[s] = data;
    //     // });
    // }


})
