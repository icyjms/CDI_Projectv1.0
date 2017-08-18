'use strict';
// import css libraries
import 'angular-loading-bar/build/loading-bar.css';
import 'angular-toastr/dist/angular-toastr.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'magic-check/css/magic-check.css';
import 'titatoggle/dist/titatoggle-dist.css';
import 'print.js/dist/print.min.css';

import angular from 'angular';
// import angular dependencies that don't default export their modules names
import '@uirouter/angularjs';
import 'angular-socket-io';

// import other relevant js files from npm
import 'js-marker-clusterer';
import 'ng-file-upload/dist/ng-file-upload-shim';
import 'wicket/wicket-gmap3';
import * as jsts from 'jsts';

angular.module('app', [
    'ui.router',
    require('angular-animate'),
    require('angular-aria'),
    require('angular-chart.js'),
    require('angular-cookies'),
    require('angular-loading-bar'),
    require('angular-messages'),
    require('angular-sanitize'),
    'btford.socket-io',
    require('angular-toastr'),
    require('angular-ui-bootstrap'),
    require('ng-csv'),
    require('ng-file-upload'),
    require('ngmap')
]);
