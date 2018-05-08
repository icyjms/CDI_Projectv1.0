import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').component('test', {
        template: require('./test.html'),
        controller: TestCtrl,
        controllerAs: 'tc'
    });

    TestCtrl.$inject = ['$scope', '$http', '$log'];

    function TestCtrl($scope, $http, $log) {
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
        var urlBase = 'http://api-express-staging.codedisruptors.com:7010';
        // var urlBase = "http://dummy.restapiexample.com/api/v1/employees";

        tc.users = $http.get(urlBase + '/user').then(
            function(response) {
                tc.users = response.data.data.items;
                $log.info(tc.users);
            },
            function(error) {
                tc.error = error.data;
                $log.info(error);
            }
        );

        tc.totalItems = tc.users.length;
        tc.currentPage = 1;
        tc.itemsPerPage = 10;
    }
})();
