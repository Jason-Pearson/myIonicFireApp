angular.module('app.controllers', [])

.controller('homeLoginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('yourSurveysCtrl', ['$scope', '$stateParams', '$rootScope', '$window', '$ionicModal', '$firebase', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams, $rootScope, $window, $ionicModal, $firebase) {


        }
    ])
    .controller('yourSurveysCtrl', ['$scope', '$stateParams', '$rootScope', '$window', '$ionicModal', '$firebase',
        function($scope, $stateParams, $rootScope, $window, $ionicModal, $firebase) {
            $rootScope.show("Please wait... Processing");
            $scope.list = [];
            var bucketListRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
            bucketListRef.on('value', function(snapshot) {
                var data = snapshot.val();

                $scope.list = [];

                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        if (data[key].isCompleted == false) {
                            data[key].key = key;
                            $scope.list.push(data[key]);
                        }
                    }
                }

                if ($scope.list.length == 0) {
                    $scope.noData = true;
                } else {
                    $scope.noData = false;
                }
                $rootScope.hide();
            });

            $ionicModal.fromTemplateUrl('templates/newItem.html', function(modal) {
                $scope.newTemplate = modal;
            });

            $scope.newTask = function() {
                $scope.newTemplate.show();
            };

            $scope.markCompleted = function(key) {
                $rootScope.show("Please wait... Updating List");
                var itemRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail) + '/' + key);
                itemRef.update({
                    isCompleted: true
                }, function(error) {
                    if (error) {
                        $rootScope.hide();
                        $rootScope.notify('Oops! something went wrong. Try again later');
                    } else {
                        $rootScope.hide();
                        $rootScope.notify('Successfully updated');
                    }
                });
            };

            $scope.deleteItem = function(key) {
                $rootScope.show("Please wait... Deleting from List");
                var itemRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
                bucketListRef.child(key).remove(function(error) {
                    if (error) {
                        $rootScope.hide();
                        $rootScope.notify('Oops! something went wrong. Try again later');
                    } else {
                        $rootScope.hide();
                        $rootScope.notify('Successfully deleted');
                    }
                });
            };
        }
    ])

.controller('activeSurveysCtrl', ['$scope', '$stateParams', '$rootScope', '$window', '$ionicModal', '$firebase', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $rootScope, $window, $ionicModal, $firebase) {


    }
])

.controller('linksCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams) {


        }
    ])
    //.controller('loginCtrl', ['$scope', -->'$stateParams','$rootScope', '$firebaseAuth', '$window',
    //  function ($scope, -->$stateParams,$rootScope, $firebaseAuth, $window) {
    .controller('loginCtrl', ['$scope', '$rootScope', '$firebaseAuth', '$window',
        function($scope, $rootScope, $firebaseAuth, $window) {
            // check session
            $rootScope.checkSession();
            $scope.user = {
                email: "",
                password: ""
            };
            $scope.validateUser = function() {
                $rootScope.show('Please wait.. Authenticating');
                var email = this.user.email;
                var password = this.user.password;
                if (!email || !password) {
                    $rootScope.notify("Please enter valid credentials");
                    return false;
                }
                $rootScope.auth.$login('password', {
                        email: email,
                        password: password
                    })
                    .then(function(user) {
                        $rootScope.hide();
                        $rootScope.userEmail = user.email;
                        $window.location.href = ('/page1/page2'); //
                    }, function(error) {
                        $rootScope.hide();
                        if (error.code == 'INVALID_EMAIL') {
                            $rootScope.notify('Invalid Email Address');
                        } else if (error.code == 'INVALID_PASSWORD') {
                            $rootScope.notify('Invalid Password');
                        } else if (error.code == 'INVALID_USER') {
                            $rootScope.notify('Invalid User');
                        } else {
                            $rootScope.notify('Oops something went wrong. Please try again later');
                        }
                    });
            }
        }
    ])

.controller('signupCtrl', ['$scope', '$rootScope', '$firebaseAuth', '$window',
    function($scope, $rootScope, $firebaseAuth, $window) {
        $scope.user = {
            email: "",
            password: ""
        };
        $scope.createUser = function() {
            var email = this.user.email;
            var password = this.user.password;

            if (!email || !password) {
                $rootScope.notify("Please enter valid credentials");
                return false;
            }

            $rootScope.show('Please wait.. Registering');
            $rootScope.auth.$createUser(email, password, function(error, user) {
                if (!error) {
                    $rootScope.hide();
                    $rootScope.userEmail = user.email;
                    $window.location.href = ('/page1/page5');
                } else {
                    $rootScope.hide();
                    if (error.code == 'INVALID_EMAIL') {
                        $rootScope.notify('Invalid Email Address');
                    } else if (error.code == 'EMAIL_TAKEN') {
                        $rootScope.notify('Email Address already taken');
                    } else {
                        $rootScope.notify('Oops something went wrong. Please try again later');
                    }
                }
            });
        }
    }
])

.controller('createSurveyCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('surveyCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('surveyAnalyticsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('surveyInfoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('createQuestionCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

function escapeEmailAddress(email) {
    if (!email) return false
        // Replace '.' (not allowed in a Firebase key) with ','
    email = email.toLowerCase();
    email = email.replace(/\./g, ',');
    return email.trim();
}