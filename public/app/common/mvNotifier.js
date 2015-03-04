angular.module('app').value('mvToastr', toastr);

angular.module('app').factory('mvNotifier', function (mvToastr) {

    var notify = function (success, msg) {
        if (success) {
            mvToastr.success(msg);
        }
        else {
            mvToastr.error(msg);
        }
        console.log(msg);
    };

    return {
        notify: notify
    }
});