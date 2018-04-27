import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').component('chat', {
        template: require('./chat.html'),
        controller: ChatController,
        controllerAs: 'vm'
    });

    ChatController.$inject = ['$scope', '$state'];

    function ChatController($scope, $state) {}
})();
