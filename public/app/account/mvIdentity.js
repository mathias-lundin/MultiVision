angular.module('app').factory('mvIdentity', function () {

    var isAuthenticated = function () {
      return !!this.currentUser;
    };

    return {
        currentUser: undefined,
        isAuthenticated: isAuthenticated
    }

});