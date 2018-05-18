import angular from 'angular';
import { debug } from 'util';

(function() {
    'use strict';

    /**
     * This Service contains methods for managing user session
     */
    angular.module('app').service('SessionService', SessionService);

    SessionService.$inject = ['$cookies'];

    function SessionService($cookies) {
        var parent = this;

        // This function saves user data into browser cookies
        this.saveUser = function(response) {
            var user = response.data.items[0];
            $cookies.putObject('user', {
                id: user.id,
                fullname: user.fullName,
                phoneNumber: user.phoneNumber,
                email: user.email,
                token: user.token,
                role: 'ADMIN'
            });
            debugger;
        };

        this.getUser = function() {
            return $cookies.getObject('user');
        };

        this.getToken = function() {
            var user = parent.getUser();
            if (user) {
                return user.token;
            } else {
                return '';
            }
        };

        // This function will clear user cookies data
        // including token
        this.clearUser = function() {
            $cookies.remove('user');
        };
    }
})();
