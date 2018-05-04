import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').component('chat', {
        template: require('./chat.html'),
        controller: ChatController,
        controllerAs: 'vm'
    });

    ChatController.$inject = ['$scope', '$state', '$window'];

    function ChatController($scope, $state, $window) {
        $window.localStorage.setItem('local', 'This is local');
        console.log($window.localStorage.getItem('local'));

        $window.sessionStorage.setItem('session', 'This is session');
        console.log($window.sessionStorage.getItem('session'));
    }
})();
