// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'firebase', 'app.controllers', 'app.routes', 'app.directives', 'app.services'])
    .run(function($ionicPlatform, $rootScope, $firebaseAuth, $firebase, $window, $ionicLoading) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            $rootScope.userEmail = null;
            $rootScope.baseUrl = 'https://ionic-survey-app.firebaseio.com';
            var authRef = new Firebase($rootScope.baseUrl);
            $rootScope.auth = $firebaseAuth(authRef);

            $rootScope.show = function(text) {
                $rootScope.loading = $ionicLoading.show({
                    content: text ? text : 'Loading..',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
            };

            $rootScope.hide = function() {
                $ionicLoading.hide();
            };

            $rootScope.notify = function(text) {
                $rootScope.show(text);
                $window.setTimeout(function() {
                    $rootScope.hide();
                }, 1999);
            };

            $rootScope.logout = function() {
                $rootScope.auth.$logout();
                $rootScope.checkSession();
            };

            $rootScope.checkSession = function() {
                var auth = new FirebaseSimpleLogin(authRef, function(error, user) {
                    if (error) {
                        // no action yet.. redirect to default route
                        $rootScope.userEmail = null;
                        $window.location.href = '/page1/page5'; //tabsController.login
                    } else if (user) {
                        // user authenticated with Firebase
                        $rootScope.userEmail = user.email;
                        $window.location.href = ('/page1/page2');
                    } else {
                        // user is logged out
                        $rootScope.userEmail = null;
                        $window.location.href = '/page1/page8'; //tabsController.home
                    }
                });
            }
        });
    })


.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider



        .state('tabsController.homeLogin', {
        url: '/page2',
        views: {
            'tab1': {
                templateUrl: 'templates/homeLogin.html',
                controller: 'homeLoginCtrl'
            }
        }
    })

    .state('tabsController.home', {
        url: '/page8',
        views: {
            'tab1': {
                templateUrl: 'templates/home.html',
                controller: 'homeCtrl'
            }
        }
    })

    .state('tabsController.yourSurveys', {
        url: '/page3',
        views: {
            'tab2': {
                templateUrl: 'templates/yourSurveys.html',
                controller: 'yourSurveysCtrl'
            }
        }
    })

    .state('tabsController.activeSurveys', {
        url: '/page4',
        views: {
            'tab3': {
                templateUrl: 'templates/activeSurveys.html',
                controller: 'activeSurveysCtrl'
            }
        }
    })

    .state('tabsController.links', {
        url: '/page12',
        views: {
            'tab3': {
                templateUrl: 'templates/links.html',
                controller: 'linksCtrl'
            }
        }
    })

    .state('tabsController', {
        url: '/page1',
        templateUrl: 'templates/tabsController.html',
        abstract: true
    })

    .state('tabsController.login', {
        url: '/page5',
        views: {
            'tab1': {
                templateUrl: 'templates/login.html',
                controller: 'loginCtrl'
            }
        }
    })

    .state('tabsController.signup', {
        url: '/page6',
        views: {
            'tab1': {
                templateUrl: 'templates/signup.html',
                controller: 'signupCtrl'
            }
        }
    })

    .state('tabsController.createSurvey', {
        url: '/page7',
        views: {
            'tab2': {
                templateUrl: 'templates/createSurvey.html',
                controller: 'createSurveyCtrl'
            }
        }
    })

    .state('survey', {
        url: '/page11',
        templateUrl: 'templates/survey.html',
        controller: 'surveyCtrl'
    })

    .state('surveyAnalytics', {
        url: '/page13',
        templateUrl: 'templates/surveyAnalytics.html',
        controller: 'surveyAnalyticsCtrl'
    })

    .state('tabsController.surveyInfo', {
        url: '/page9',
        views: {
            'tab2': {
                templateUrl: 'templates/surveyInfo.html',
                controller: 'surveyInfoCtrl'
            }
        }
    })

    .state('tabsController.createQuestion', {
        url: '/page10',
        views: {
            'tab2': {
                templateUrl: 'templates/createQuestion.html',
                controller: 'createQuestionCtrl'
            }
        }
    })

    $urlRouterProvider.otherwise('/page1/page3')
});
/*From Survey folder's - js/App.js - can only choose one or the other, or modify them both >__<
.config(function($ionicConfigProvider, $sceDelegateProvider){
  

  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.

.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",  
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])


  This directive is used to open regular and dynamic href links inside of inappbrowser.

.directive('hrefInappbrowser', function() {
  return {
    restrict: 'A',
    replace: false,
    transclude: false,
    link: function(scope, element, attrs) {
      var href = attrs['hrefInappbrowser'];

      attrs.$observe('hrefInappbrowser', function(val){
        href = val;
      });
      
      element.bind('click', function (event) {

        window.open(href, '_system', 'location=yes');

        event.preventDefault();
        event.stopPropagation();

      });
    }
  };
});*/