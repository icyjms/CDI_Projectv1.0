import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').component('sampleWeb', {
        template: require('./web.html'),
        controller: WebCtrl,
        controllerAs: 'wc'
    });

    WebCtrl.$inject = ['$location'];

    function WebCtrl($location) {
        var wc = this;
        console.log('Web controller');
        $location.path('sampleWeb/home');
    }
})();
