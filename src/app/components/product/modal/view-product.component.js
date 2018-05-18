import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').component('view-product', {
        template: require('./view-product.html'),
        controller: ViewProdCtrl,
        controllerAs: 'vpc'
    });

    ViewProdCtrl.$inject = [];

    function ViewProdCtrl() {
        var vpc = this;
        console.log('View prod ctrl');
    }
})();
