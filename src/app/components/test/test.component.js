import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').component('test', {
        template: require('./test.html'),
        controller: TestCtrl,
        controllerAs: 'tc',
        bindings: {
            pageData: '<',
            onChangePage: '&',
            sizeChange: '&'
        }
    });

    TestCtrl.$inject = ['$http', '$log', 'QueryService'];

    function TestCtrl($http, $log, QueryService) {
        var tc = this;

        // Technologies table
        tc.technologies = [
            {
                name: 'C#',
                likes: 0,
                dislikes: 0
            },
            {
                name: 'ASP.Net',
                likes: 0,
                dislikes: 0
            },
            {
                name: 'AngularJS',
                likes: 0,
                dislikes: 0
            },
            {
                name: 'ReactJS',
                likes: 0,
                dislikes: 0
            },
            {
                name: 'Python',
                likes: 0,
                dislikes: 0
            },
            {
                name: 'Java',
                likes: 0,
                dislikes: 0
            }
        ];

        tc.rowlimit = 3;

        tc.incrementLikes = function(technology) {
            technology.likes++;
        };

        tc.incrementDislikes = function(technology) {
            technology.dislikes++;
        };

        tc.reset = function(technology) {
            technology.likes = 0;
            technology.dislikes = 0;
        };

        tc.remove = function(technology) {
            var index = tc.technologies.indexOf(technology);
            tc.technologies.splice(index, 1);
        };

        // Employees table
        tc.employees = [
            {
                fname: 'James',
                hobby: 'Basketball',
                salary: '20000',
                gender: 'Male',
                city: 'Calamba'
            },
            {
                fname: 'Michael',
                hobby: 'Swimming',
                salary: '25000',
                gender: 'Male',
                city: 'Sta Cruz'
            },
            {
                fname: 'Sharon',
                hobby: 'Volleyball',
                salary: '10000',
                gender: 'Female',
                city: 'Calamba'
            },
            {
                fname: 'Charles',
                hobby: 'Jogging',
                salary: '15000',
                gender: 'Male',
                city: 'Manila'
            },
            {
                fname: 'Harold',
                hobby: 'Eating',
                salary: '35000',
                gender: 'Male',
                city: 'Manila'
            },
            {
                fname: 'Jane',
                hobby: 'Dancing',
                salary: '1000',
                gender: 'Female',
                city: 'Sta Cruz'
            }
        ];

        tc.sortColumn = 'name';
        tc.reverseSort = false;

        tc.sortData = function(column) {
            tc.reverseSort = tc.sortColumn == column ? !tc.reverseSort : false;
            tc.sortColumn = column;
        };

        // Users table
        getData();

        function getData() {
            var request = {
                method: 'GET', // POST, GET, PUT, DELETE
                body: false, // data to be sent
                params: { per_page: 10 }, // sample { page:1, limit:10 }
                hasFile: false, // formData to be sent
                route: { user: '' }, // will result /users
                cache: false, // false if not needed
                cache_string: [''] // replace with '' if not needed
            };

            QueryService.query(request).then(
                function(response) {
                    console.log(response);
                    tc.users = response.data.data.items;
                    tc.totalItems = tc.users.length;
                    // logger.success('',response, MESSAGE.success);
                },
                function(err) {
                    logger.error(MESSAGE.error, err, '');
                }
            );
        }

        tc.currentPage = 2;
        tc.itemsPerPage = 10;

        tc.onPageChange = onPageChange;
        tc.onSizeChange = onSizeChange;

        function onPageChange() {
            onChangePage();
        }

        function onSizeChange() {
            sizeChange();
        }

        // set the default amount of items being displayed
        tc.limit = 5;

        // loadMore function
        tc.loadMore = function() {
            // $scope.limit = tc.users.length
            if (tc.limit != tc.users.length) {
                tc.limit = tc.limit + 10;
            }
        };
    }
})();
