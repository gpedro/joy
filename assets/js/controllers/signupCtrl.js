'use strict';

app.controller('signupCtrl', ['$scope', '$http', '$settings', 'vcRecaptchaService',
    function signupCtrl($scope, $http, $settings, vcRecaptchaService) {

        var $ = jQuery;
        $scope.user = {},
        $scope.recaptcha = {
            key: '6LeVevsSAAAAAIHGIvTc7wVhG6olwPwA_Z7E2Q0O'
        };

        $scope.submit = function(isValid) {
            if (isValid) {
                $scope.loading = true;
                var newUser = $scope.user;
                newUser.recaptcha = vcRecaptchaService.data();
                console.log(vcRecaptchaService.data());
                $http.post($settings.apiUri + '/signup', newUser)
                    .success(function(data, status) {
                        if (status == 200) {
                            $scope.notification = {
                                show: true,
                                isArray: false,
                                type: 'success',
                                message: data.response.msg
                            };
                            $scope.loading = false;
                            $scope.signupForm.$setPristine();
                            $scope.user = {};
                        }
                    })
                    .error(function(data, status) {
                        $scope.notification = {
                            show: true,
                            isArray: true,
                            type: 'error',
                            message: data.errors
                        };
                        $scope.loading = false;
                        vcRecaptchaService.reload();
                    });
            }
        };
    }
]);
