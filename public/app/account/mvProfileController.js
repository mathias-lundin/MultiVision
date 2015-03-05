angular.module('app').controller('mvProfileController', function ($scope, mvAuth, mvIdentity, mvNotifier) {

    var currentUser = mvIdentity.currentUser;
    // updating any of these scope values will not update the currentUser
    $scope.email = currentUser.username;
    $scope.firstName = currentUser.firstName;
    $scope.lastName = currentUser.lastName;

    $scope.update = function () {
        var newUserData = {
            username: $scope.email,
            firstName: $scope.firstName,
            lastName: $scope.lastName
        };

        if($scope.password && $scope.password.length > 0) {
            newUserData.password = $scope.password;
        }

        mvAuth.updateCurrentUser(newUserData).then(function () {
            mvNotifier.notify(true, 'Your user account has been updated');
        }, function (reason) {
            mvNotifier.notify(false, reason);
        });
    };

    //dasd

});