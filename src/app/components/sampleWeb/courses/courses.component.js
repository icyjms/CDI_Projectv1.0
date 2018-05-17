import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').component('courses', {
        template: require('./courses.html'),
        controller: CoursesCtrl,
        controllerAs: 'cc'
    });

    CoursesCtrl.$inject = [];

    function CoursesCtrl() {
        console.log('Course controller');
        var cc = this;

        cc.courses = [
            'Angular JS',
            'React JS',
            'Java',
            'Android',
            'JavaScript',
            'Node JS'
        ];
    }
})();
