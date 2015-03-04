angular.module('app', ['ngResource']); //unit tests doesn't include routing
var toastr = {}; //Since toastr isn't included among the libraries in the test config, fake it