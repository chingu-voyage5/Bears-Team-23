<template>
  <div>
    <div class="container">
      <h3 class="is-size-3">Create a route</h3>
      <label for="routeFrom">Where you come from</label>
      <autocomplete :custom-params="{token:'dev'}" :process="processJSON" :on-select="processRouteFrom" encode-params="true" filter-by-anchor="true"
                    anchor="formatted_address" label="geometry.location.lat" url="https://maps.googleapis.com/maps/api/geocode/json?address="
      />

      <label for="routeFrom">Where you are going to </label>
      <autocomplete :custom-params="{token:'dev'}" :process="processJSON" :on-select="processRouteTo" encode-params="true" filter-by-anchor="true"
                    anchor="formatted_address" label="geometry.location.lat" url="https://maps.googleapis.com/maps/api/geocode/json?address="
      />
     
      <div v-if="distanceCalc !== null && durationCalc !==null">
        <p class="is-size-5">
          Distance between {{ route.from.name }} & {{ route.to.name }} : {{ distanceCalc.text }}
        </p>
        <p class="is-size-5">
          Usual Time Duration : {{ durationCalc.text }}
        </p>
      </div>
      <br>
      <a class="button is-success" @click="createRoute">Create Route</a>
    </div>
    <div id="map-canvas" />
  </div>
</template>
<script>
import Mapbox from 'mapbox-gl-vue';
import Autocomplete from 'vue2-autocomplete-js';

export default {
  name: 'CreateRoute',
  components: {
    Mapbox,
    Autocomplete
  },
  data() {
    return {
      route: {},
      mapbox_key:
        'pk.eyJ1IjoicGlldHJvc3BhcmtzIiwiYSI6ImNqaXAzNWdzMDBpY3MzdnFtY3I4MHVlZnMifQ.Nw1ZOn0QiQxiX66dL9lcfw',
      google_key: 'AIzaSyBD5iUv5_fX4wstCHO9pvHYYoLYAGgNULg',
      directionsService: null,
      directionsDisplay: null,
      distanceCalc: null,
      durationCalc: null,
      map: null
    };
  },
  mounted() {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.distanceMatrix = new google.maps.DistanceMatrixService();
    this.initMap();
  },
  methods: {
    createRoute() {
      const routeBody = {
        route_start: [
          this.route.from.location.lat,
          this.route.from.location.lng
        ],
        route_start_name:this.route.from.name,
        route_end_name: this.route.to.name,
        route_end: [this.route.to.location.lat, this.route.to.location.lng],
        est_trip_length: this.durationCalc.text,
        est_trip_duration: this.distanceCalc.text,
        route_creator: '5b2fe63641cba1276b377edf'
      }; 
  
      this.$axios
        .post('http://localhost:5000/api/route', routeBody)
        .then(resp => {
          this.$toasted.success(resp.data.message).goAway(5000);
        })
        .catch(e => {
          this.$toasted.error(err.response.data.message).goAway(5000);
        });
    },
    processJSON(json) {
      return json.results;
    },
    processRouteFrom(data) {
      this.route.from = {
        name: data.formatted_address,
        location: data.geometry.location
      };
      if (this.route.from && this.route.to) {
        this.calcRoute();
        this.calcTime();
      } else this.routeFromMap(this.route.from);
    },
    processRouteTo(data) {
      this.route.to = {
        name: data.formatted_address,
        location: data.geometry.location
      };
      if (this.route.from && this.route.to) {
        this.calcRoute();
        this.calcTime();
      } else this.routeFromMap(this.route.to);
    },

    initMap() {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var mapOptions = {
            zoom: 16,
            center: location
          };
          const map = new google.maps.Map(
            document.getElementById('map-canvas'),
            mapOptions
          );
          this.map = map;
          this.directionsDisplay.setMap(map);

          var marker = new google.maps.Marker({
            position: location,
            map: map
          });
        }.bind(this),
        function(error) {
          console.log(error);
        }
      );
    },

    routeFromMap(data) {
      const location = {
        lat: data.location.lat,
        lng: data.location.lng
      };
      var mapOptions = {
        zoom: 16,
        center: location
      };
      this.map = new google.maps.Map(
        document.getElementById('map-canvas'),
        mapOptions
      );
      this.directionsDisplay.setMap(this.map);
      var marker = new google.maps.Marker({
        position: location,
        map: this.map
      });
    },
    calcRoute() {
      const locationFrom = this.route.from.location;
      const locationTo = this.route.to.location;

      const start = new google.maps.LatLng(locationFrom.lat, locationFrom.lng);
      const end = new google.maps.LatLng(locationTo.lat, locationTo.lng);
      var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
      };

      this.directionsService.route(
        request,
        function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            this.directionsDisplay.setDirections(response);
            this.directionsDisplay.setMap(this.map);
          } else {
            alert(
              'Directions Request from ' +
                start.toUrlValue(6) +
                ' to ' +
                end.toUrlValue(6) +
                ' failed: ' +
                status
            );
          }
        }.bind(this)
      );
    },

    calcTime() {
      const locationFrom = this.route.from.location;
      const locationTo = this.route.to.location;
      const origin1 = new google.maps.LatLng(
        locationFrom.lat,
        locationFrom.lng
      );
      const origin2 = this.route.from.name;
      const dest1 = new google.maps.LatLng(locationTo.lat, locationTo.lng);
      const dest2 = this.route.to.name;

      this.distanceMatrix.getDistanceMatrix(
        {
          origins: [origin1, origin2],
          destinations: [dest2, dest1],
          travelMode: 'DRIVING',
          avoidHighways: false,
          avoidTolls: false
        },
        (response, status) => {
          if (status == 'OK') {
            var origins = response.originAddresses;
            var destinations = response.destinationAddresses;

            for (var i = 0; i < origins.length; i++) {
              var results = response.rows[i].elements;
              for (var j = 0; j < results.length; j++) {
                var element = results[j];
                var distance = element.distance.text;
                var duration = element.duration.text;
                var from = origins[i];
                var to = destinations[j];
              }
            }

            this.distanceCalc = results[0].distance;
            this.durationCalc = results[0].duration;
          }
        }
      );
    }
  }
};
</script>
<style scoped>
#map-canvas {
  height: 400px;
  /* The height is 400 pixels */
  width: 100%;
  /* The width is the width of the web page */
}
</style>
