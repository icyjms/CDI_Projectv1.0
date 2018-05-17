import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').component('home', {
        template: require('./home.html'),
        controller: HomeCtrl,
        controllerAs: 'hc'
    });

    HomeCtrl.$inject = [];

    function HomeCtrl() {
        console.log('home ctrl');
    }
})();
