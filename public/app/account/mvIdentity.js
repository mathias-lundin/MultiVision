angular.module('app').factory('mvIdentity', function ($window, mvUser) {

    var currentUser;
    if(!!$window.bootstrappedUserObject) {
        currentUser = new mvUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }

    var isAuthenticated = function () {
      return !!this.currentUser;
    };

    var isAuthorized = function (role) {
        return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
    }

    return {
        currentUser: currentUser,
        isAuthenticated: isAuthenticated,
        isAuthorized: isAuthorized
    }

});