import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').component('test', {
        template: require('./test.html'),
        controller: TestCtrl,
        controllerAs: 'tc'
    });

    TestCtrl.$inject = ['$scope'];

    function TestCtrl($scope) {
        var tc = $scope;

        // Technologies table
        var technologies = [
            { name: 'C#', likes: 0, dislikes: 0 },
            { name: 'ASP.Net', likes: 0, dislikes: 0 },
            { name: 'AngularJS', likes: 0, dislikes: 0 },
            { name: 'ReactJS', likes: 0, dislikes: 0 },
            { name: 'Python', likes: 0, dislikes: 0 },
            { name: 'Java', likes: 0, dislikes: 0 }
        ];

        tc.technologies = technologies;
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
        var employees = [
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
        tc.employees = employees;
        tc.reverseSort = false;

        tc.sortData = function(column) {
            tc.reverseSort = tc.sortColumn == column ? !tc.reverseSort : false;
            tc.sortColumn = column;
        };
    }
})();
