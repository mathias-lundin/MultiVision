angular.module('app').controller('mvSignupController', function ($scope, $location, mvAuth, mvUser, mvNotifier) {

    $scope.signup = function () {
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.firstName,
            lastName: $scope.lastName
        };

        mvAuth.createUser(newUserData).then(function () {
            mvNotifier.notify(true, 'User account created');
            $location.path('/');
        }, function (reason) {
            mvNotifier.notify(false, reason);
        });
    };

});