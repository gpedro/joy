'use strict';

app.controller('forgotCtrl', ['$scope', '$http', '$location', '$routeParams', '$settings',
    function activateCtrl($scope, $http, $location, $routeParams, $settings) {

        $scope.user = {};

        $scope.isToken = function() {
            if ($location.search().token && $location.search().token.length > 1) {
                return true;
            } else {
                return false;
            }
        };

        if ($location.search().token && $location.search().token.length > 1) {

            $scope.loadingPage = true;

            $http.post($settings.apiUri + '/forgot/reset', {
                token: $location.search().token
            })
                .success(function(data, status) {
                    if (status == 200) {
                        $scope.notification = {
                            show: true,
                            isArray: false,
                            type: 'success',
                            message: data.response.msg
                        };
                        $scope.loadingPage = false;
                    }
                })
                .error(function(data, status) {
                    $scope.notification = {
                        show: true,
                        isArray: true,
                        type: 'error',
                        message: data.errors
                    };
                    $scope.loadingPage = false;
                });
        }

        $scope.submit = function(isValid) {
            if (isValid) {

                $scope.loading = true;
                var forgotUser = $scope.user;
                forgotUser.sckey = $('input[name="sckey"]').val();
                forgotUser.scvalue = $('input[name="scvalue"]').val();
                $http.post($settings.apiUri + '/forgot', forgotUser)
                    .success(function(data, status) {
                        if (status == 200) {
                            $scope.notification = {
                                show: true,
                                isArray: false,
                                type: 'success',
                                message: data.response.msg
                            };
                            $scope.loading = false;
                            $scope.forgotForm.$setPristine();
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
                    });
            }
        };
    }
]);
