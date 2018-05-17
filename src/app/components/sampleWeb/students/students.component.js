import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').component('students', {
        template: require('./students.html'),
        controller: StudentsCtrl,
        controllerAs: 'sc'
    });

    StudentsCtrl.$inject = ['QueryService', 'logger'];

    function StudentsCtrl(QueryService, logger) {
        var sc = this;

        getData();

        function getData() {
            var request = {
                method: 'GET', // POST, GET, PUT, DELETE
                body: false, // data to be sent
                params: { per_page: 20 }, // sample { page:1, limit:10 }
                hasFile: false, // formData to be sent
                route: { users: '' }, // will result /users
                cache: false, // false if not needed
                cache_string: ['users'] // replace with '' if not needed
            };

            QueryService.query(request).then(
                function(response) {
                    sc.students = response.data.data;
                    // logger.success('',response, MESSAGE.success);
                },
                function(err) {
                    logger.error(MESSAGE.error, err, '');
                }
            );
        }
    }
})();
