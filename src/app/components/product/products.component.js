import angular from 'angular';
import URLS from 'Helpers/urls';

(function() {
    'use strict';

    angular.module('app').component('products', {
        template: require('./products.html'),
        controller: ProductCtrl,
        controllerAs: 'pc'
    });

    ProductCtrl.$inject = [
        'QueryService',
        'logger',
        '$window',
        '$http',
        '$log',
        '$uibModal'
    ];

    function ProductCtrl(
        QueryService,
        logger,
        $window,
        $http,
        $log,
        $uibModal
    ) {
        var pc = this;
        // var token = $window.localStorage.token

        pc.myInterval = 3000;
        pc.noWrapSlides = false;
        pc.active = 0;
        pc.viewProductModal = viewProductModal;

        // console.log("Product Controller " + token)

        getData();

        function getData() {
            var request = {
                method: 'GET', // POST, GET, PUT, DELETE
                // body: {'x-access-token': token}, // data to be sent
                // params: { per_page: 20 }, // sample { page:1, limit:10 }
                hasFile: false, // formData to be sent
                route: { product: '' }, // will result /users
                cache: false, // false if not needed
                cache_string: [''] // replace with '' if not needed
            };

            QueryService.query(request).then(
                function(response) {
                    console.log(response);
                    pc.products = response.data.data.items;
                    // logger.success('',response, MESSAGE.success);
                },
                function(err) {
                    logger.error(err);
                }
            );
        }

        function viewProductModal() {
            var modalInstance = $uibModal.open({
                animation: pc.animationsEnabled,
                component: 'viewProduct',
                size: 'sm'
                // resolve: {
                //   items: function () {
                //     return $ctrl.items;
                //   }
                // }
            });

            modalInstance.result.then(
                function(selectedItem) {
                    pc.selected = selectedItem;
                },
                function() {
                    $log.info('modal-component dismissed at: ' + new Date());
                }
            );
        }
    }
})();
