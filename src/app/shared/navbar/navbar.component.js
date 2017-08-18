import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').component('navbar', {
        template: require('./navbar.html'),
        controller: NavbarCtrl,
        controllerAs: 'vm'
    });

    NavbarCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$state',
        '$stateParams',
        '$timeout',
        '$cookies',
        'QueryService',
        'ModalService',
        'SessionService',
        'NavbarService',
        'SidebarService'
    ];

    function NavbarCtrl(
        $rootScope,
        $scope,
        $state,
        $stateParams,
        $timeout,
        $cookies,
        QueryService,
        ModalService,
        SessionService,
        NavbarService,
        SidebarService
    ) {
        var vm = this;

        vm.logout = logout;
        vm.update_password = update_password;
        vm.view_profile = view_profile;
        vm.toggleSidebar = toggleSidebar;

        vm.logo = require('Images/nav-logo.png');
        vm.$onInit = function() {};

        function view_profile() {
            ModalService.view_account_modal();
        }

        function logout() {
            NavbarService.logout()
                .then(function(response) {
                    console.log('logout success');

                    // Clear the user in session
                    SessionService.clearUser();

                    // Go to login page
                    $state.go('login');
                })
                .catch(function(response) {
                    console.error('logout failed');
                    console.log(response);

                    // Go to login page
                    $state.go('login');
                });
        }

        function update_password() {
            ModalService.change_password_modal();
        }

        function toggleSidebar() {
            SidebarService.toggleSidebar();
        }
    }
})();
