import angular from 'angular';
import URLS from 'Helpers/urls';

(function() {
    'use strict';

    angular
        .module('app')
        .component('productList', {
            template: require('./list.html'),
            controller: ProductCtrl,
            controllerAs: 'pc'
        })
        // .factory('$localstorage', ['$window', function($window) {
        //     return {
        //       set: function(key, value) {
        //         return $window.localStorage[key] = value;
        //       },
        //       get: function(key, defaultValue) {
        //         return $window.localStorage[key] || defaultValue || false;
        //       },
        //       setObject: function(key, value) {
        //         return $window.localStorage[key] = JSON.stringify(value);
        //       },
        //       getObject: function(key, defaultValue) {
        //         if($window.localStorage[key] != undefined){
        //             return JSON.parse($window.localStorage[key]);
        //         }else{
        //           return defaultValue || false;
        //         }
        //       },
        //       remove: function(key){
        //         $window.localStorage.removeItem(key);
        //       },
        //       clear: function(){
        //         $window.localStorage.clear();
        //       }
        //     }
        //   }]);

        .factory('datafactory', [
            '$http',
            function($http) {
                var datafactory = {};

                datafactory.AddUser = function(user) {
                    return $http.post(URLS.base + URLS.users, user);
                };

                datafactory.registerUser = function(user) {
                    return $http.post(URLS.base + '/register', user);
                };

                datafactory.updateUser = function(user) {
                    return $http.put(URLS.base + URLS.users + '/2');
                };

                return datafactory;
            }
        ]);

    ProductCtrl.$inject = [
        '$scope',
        '$state',
        '$window',
        '$http',
        'datafactory'
    ];

    function ProductCtrl($scope, $state, $window, $http, datafactory) {
        console.log('Store');

        var pc = this;
        pc.data = {};

        pc.addData = function(newData) {
            datafactory.AddUser(newData).then(
                function(response) {
                    console.log(response.data);
                    // pc.data.push(newData);
                },
                function(error) {
                    console.log(error);
                }
            );
        };

        pc.registerUser = function(newData) {
            datafactory.registerUser(newData).then(
                function(response) {
                    console.log(response);
                },
                function(error) {
                    console.log(error);
                }
            );
        };

        pc.update = function(newData) {
            datafactory.updateUser(newData).then(
                function(response) {
                    console.log(response.data);
                },
                function(error) {
                    console.log(error);
                }
            );
        };
    }
})();
