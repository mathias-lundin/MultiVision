angular.module('app').factory('mvAuth', function ($http, mvIdentity, $q, mvUser) {

    var authenticateUser = function (username, password) {
        var deferred = $q.defer();
        $http.post('/login', { username: username, password: password }).then(function (response) {
            if(response.data.success) {
                var user = new mvUser();
                angular.extend(user, response.data.user);
                mvIdentity.currentUser = user;
            }
            deferred.resolve(response.data.success);
        });
        return deferred.promise;
    };

    var logoutUser = function () {
        var deferred = $q.defer();
        $http.post('/logout', { logout: true }).then(function () {
            mvIdentity.currentUser = undefined;
            deferred.resolve();
        });
        return deferred.promise;
    };

    var authorizeCurrentUserForRoute = function (role) {
        if(mvIdentity.isAuthorized(role)) {
            return true;
        } else {
            return $q.reject('not authorized');
        }
    };

    return {
        authenticateUser: authenticateUser,
        logoutUser: logoutUser,
        authorizeCurrentUserForRoute: authorizeCurrentUserForRoute
    }

});