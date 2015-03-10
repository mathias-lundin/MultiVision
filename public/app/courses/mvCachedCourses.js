angular.module('app').factory('mvCachedCourses', function (mvCourse) {

    var courseList;

    var query = function () {
        if(!courseList)
            courseList = mvCourse.query();
        return courseList;
    };

    return {
        query: query
    }

});