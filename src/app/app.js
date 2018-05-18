// import css libraries
import 'angular-loading-bar/build/loading-bar.css';
import 'angular-toastr/dist/angular-toastr.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import angular from 'angular';

// import angular dependencies that don't default export their modules names
import '@uirouter/angularjs';
import 'angular-socket-io';
import 'moment';
import 'angular-permission';
import 'ngmap';
import 'angular-smart-table';
import 'angular-animate';

(function() {
    'use strict';

    angular.module('app', [
        'ui.router',
        'ngMap',
        'permission',
        'permission.ui',
        'smart-table',
        require('angular-aria'),
        require('angular-cookies'),
        require('angular-loading-bar'),
        require('angular-messages'),
        require('angular-sanitize'),
        'btford.socket-io',
        require('angular-toastr'),
        require('angular-ui-bootstrap')
    ]);
})();
