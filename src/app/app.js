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

(function() {
    'use strict';

    angular.module('app', [
        'ui.router',
        require('angular-aria'),
        require('angular-chart.js'),
        require('angular-cookies'),
        require('angular-loading-bar'),
        require('angular-messages'),
        require('angular-sanitize'),
        'btford.socket-io',
        require('angular-toastr'),
        require('angular-ui-bootstrap')
    ]);
})();
