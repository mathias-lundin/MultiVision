angular.module('app').controller('mvUserListController', function ($scope, mvUser) {

    $scope.users = mvUser.query();
    console.log($scope.users);

});