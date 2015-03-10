angular.module('app').controller('mvCourseDetailsController', function ($scope, $routeParams, mvCachedCourses) {

    mvCachedCourses.query().$promise.then(function (collection) {
        var i = 0,
            len = collection.length,
            course;

        for (; i < len; i++) {
            course = collection[i];
            if (course._id === $routeParams.id) {
                $scope.course = course;
                break;
            }
        }
    })

});