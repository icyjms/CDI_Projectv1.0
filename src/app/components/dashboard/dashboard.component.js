import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').component('dashboard', {
        template: require('./dashboard.html'),
        controller: DashboardCtrl,
        controllerAs: 'vm'
    });

    DashboardCtrl.$inject = [
        '$scope',
        '$state',
        'ModalService',
        'QueryService',
        'logger'
    ];

    function DashboardCtrl(
        $scope,
        $state,
        ModalService,
        QueryService,
        logger
    ) {
        var vm = this;
        vm.titleHeader = 'Dashboard';
    
        //Sample request

        getData ();
    
        function getData () {
            var request = {
                method  : 'GET', // POST, GET, PUT, DELETE
                body    : false, // data to be sent
                params  : {per_page: 10}, // sample { page:1, limit:10 }
                hasFile : false, // formData to be sent
                route   : { users:'' }, // will result /users
                cache   : true, // false if not needed
                cache_string : ['users'] // replace with '' if not needed
            };

            QueryService
                .query(request)
                .then(function (response) {
                    console.log(response);
                    vm.data = response.data.data;
                    // logger.success('',response, MESSAGE.success);
                }, function (err) {
                    logger.error(MESSAGE.error, err, '');
                });
        }
    } //ctrl
})();
