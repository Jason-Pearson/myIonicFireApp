angular.module('app.routes', [])

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
    abstract:true
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

$urlRouterProvider.otherwise('/page1/page12')

  

});