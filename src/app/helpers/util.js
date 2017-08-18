const UTIL = {
    getNetwork: function(string) {
        if (!string) {
            return '';
        }

        var globe = [
            '0817',
            '0994',
            '0905',
            '0995',
            '0917',
            '0915',
            '0997',
            '0916',
            '0975',
            '0935',
            '0926',
            '0977',
            '0927',
            '0978',
            '0956',
            '0936',
            '0937',
            '0945',
            '0906',
            '0996',
            '0976',
            '0979',
            '0955'
        ];

        var smart = [
            '0813',
            '0900',
            '0907',
            '0908',
            '0909',
            '0910',
            '0911',
            '0912',
            '0913',
            '0914',
            '0918',
            '0919',
            '0920',
            '0921',
            '0928',
            '0929',
            '0930',
            '0938',
            '0939',
            '0940',
            '0946',
            '0947',
            '0948',
            '0949',
            '0950',
            '0989',
            '0998',
            '0999'
        ];

        var sun = [
            '0922',
            '0923',
            '0924',
            '0925',
            '0931',
            '0932',
            '0933',
            '0934',
            '0942',
            '0943',
            '0944'
        ];

        var prefix = string.substring(0, 4);

        if (globe.indexOf(prefix) != -1) {
            return 'GLOBE';
        } else if (smart.indexOf(prefix) != -1) {
            return 'SMART';
        } else if (sun.indexOf(prefix) != -1) {
            return 'SUN CELLULAR';
        } else {
            return '';
        }
    },

    buildQueryString: function(obj) {
        return Object.keys(obj).reduce(function(str, key, index) {
            if (!str) {
                str += '?' + key + '=' + obj[key];
            } else {
                str += '&' + key + '=' + obj[key];
            }
            return str;
        }, '');
    },

    // This function given a wkt polygon string,
    // returns an array of latlngs.
    wktToLatlngs: function(multipolygonWKT) {
        var polylines = [];

        multipolygonWKT = multipolygonWKT.replace('POLYGON', '');

        var formattedValues = multipolygonWKT.replace('))', '');

        formattedValues = formattedValues.replace('((', '');

        var linesCoords = formattedValues.split('), (');

        for (i = 0; i < linesCoords.length; i++) {
            polylines[i] = [];
            var singleLine = linesCoords[i].split(', ');

            for (j = 0; j < singleLine.length; j++) {
                var coordinates = singleLine[j].split(' ');
                var latlng = {
                    lat: parseFloat(coordinates[0]),
                    lng: parseFloat(coordinates[1])
                };
                polylines[i].push(latlng);
            }
        }

        return polylines[0];
    },

    circleToWKT: function(circle) {
        var radius = circle.getRadius();
        var lat = circle.getCenter().lat();
        var lng = circle.getCenter().lng();

        return ['CIRCLE', '(' + lat, lng + ',', radius + ')'].join(' ');
    },

    averageLatlngs: function(latlngs) {
        var latSum = latlngs.reduce(function(total, latlng) {
            return total + latlng.lat;
        }, 0);

        var lngSum = latlngs.reduce(function(total, latlng) {
            return total + latlng.lng;
        }, 0);

        return {
            lat: latSum / latlngs.length,
            lng: lngSum / latlngs.length
        };
    },

    getPolygonBounds: function(polygon) {
        var bounds = new google.maps.LatLngBounds();
        polygon.getPath().forEach(function(element, index) {
            bounds.extend(element);
        });
        return bounds;
    },
    getMarkerBounds: function(markers) {
        var bounds = new google.maps.LatLngBounds();

        markers.forEach(function(marker) {
            bounds.extend(marker.getPosition());
        });

        return bounds;
    },
    polygonToWKT: function(object) {
        var wkt = new Wkt.Wkt();

        wkt.fromObject(object);

        wkt.components.forEach(function(component) {
            component.forEach(function(xy) {
                var z = xy.x;
                xy.x = xy.y;
                xy.y = z;
            });
        });

        return wkt.write();
    },
    polylineToWKT: function(object) {
        var wkt = new Wkt.Wkt();

        wkt.fromObject(object);

        wkt.components.forEach(function(xy) {
            var z = xy.x;
            xy.x = xy.y;
            xy.y = z;
        });

        return wkt.write();
    },
    wktToPolygon: function(wktString) {
        var wkt = new Wkt.Wkt();

        // debugger;

        wkt.read(wktString);

        // Swap the latlngs
        wkt.components.forEach(function(component) {
            component.forEach(function(xy) {
                var z = xy.x;
                xy.x = xy.y;
                xy.y = z;
            });
        });

        return wkt.toObject();
    },
    wktToPolyline: function(wktString) {
        var wkt = new Wkt.Wkt();

        // debugger;

        wkt.read(wktString);

        // Swap the latlngs
        wkt.components.forEach(function(xy) {
            var z = xy.x;
            xy.x = xy.y;
            xy.y = z;
        });

        return wkt.toObject();
    },
    getPolylineEnds: function(polyline) {
        var path = polyline.getPath();

        var start = path.getAt(0);
        var end = path.getAt(path.length - 1);

        return [
            new google.maps.Marker({ position: start }),
            new google.maps.Marker({ position: end })
        ];
    },
    generateRandomColor: function() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
};

export default UTIL;
