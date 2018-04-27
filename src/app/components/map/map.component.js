import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').component('mapComponent', {
        template: require('./map.html'),
        controller: MapController,
        controllerAs: 'vm'
    });

    MapController.$inject = ['$scope', '$state'];

    function MapController($scope, $state) {
        var vm = this;

        var map;
        var service;

        function initialise(location) {
            // console.log(location);

            // Gets your current location
            var currentLocation = new google.maps.LatLng(
                location.coords.latitude,
                location.coords.longitude
            );

            var mapOptions = {
                center: currentLocation,
                zoom: 18,
                mapTypeId: 'roadmap'
            };

            // Display the map in your map <tag> located in map.html
            map = new google.maps.Map(
                document.getElementById('map-canvas'),
                mapOptions
            );

            // Place a marker of your current location
            var marker = new google.maps.Marker({
                position: currentLocation,
                map: map
            });

            // Create the search box and link it to the UI element.
            var input = document.getElementById('search');
            var searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            // Bias the SearchBox results towards current map's viewport.
            map.addListener('bounds_changed', function() {
                searchBox.setBounds(map.getBounds());
            });

            var markers = [];

            searchBox.addListener('places_changed', function() {
                var places = searchBox.getPlaces();

                if (places.length == 0) {
                    return;
                }

                markers.forEach(function(marker) {
                    marker.setMap(null);
                });
                markers = [];

                var bounds = new google.maps.LatLngBounds();
                places.forEach(function(place) {
                    if (!place.geometry) {
                        console.log('Returned place contains no geometry');
                        return;
                    }

                    //Customize the map icon
                    var icon = {
                        url: place.icon,
                        size: new google.maps.Size(100, 100),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    };

                    markers.push(
                        new google.maps.Marker({
                            map: map,
                            icon: icon,
                            title: place.name,
                            position: place.geometry.location,
                            animation: google.maps.Animation.BOUNCE
                        })
                    );

                    if (place.geometry.viewport) {
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                map.fitBounds(bounds);
            });

            var trafficLayer = new google.maps.TrafficLayer();

            $scope.displayTrafficLayer = function() {
                if (trafficLayer.getMap()) {
                    trafficLayer.setMap(null);
                } else {
                    trafficLayer.setMap(map);
                }
            };
            // service = new google.maps.places.PlacesService(map);
            // google.maps.event.addListenerOnce(map,'bounds_changed',performSearch);
        }

        // function searchHandler(results, status){
        //     console.log(results);

        //     //Mark all the results found
        //     if (status == google.maps.places.PlacesServiceStatus.OK) {
        //         for (var i = 0; i < results.length; i++) {
        //             var marker = new google.maps.Marker({
        //                 position: results[i].geometry.location,
        //                 map: map,
        //             });
        //         }
        //     }
        // };

        // function performSearch(){

        //     var request = {
        //         bounds: map.getBounds(),
        //         name: "cave",
        //         radius: '5000',
        //     };

        //     service.nearbySearch(request, searchHandler);
        // }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        //It will wait for the page to be fully loaded before it executes the code below
        angular.element(document).ready(function() {
            navigator.geolocation.getCurrentPosition(initialise, error);
        });
    }
})();
