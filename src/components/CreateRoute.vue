<template>
  <div>
    <navbar/>
    <div class="container">
      <div class="columns">
        <div class="column is-half">
          <h3 class="is-size-2 route-head">Offer a ride on your next journey</h3>
          <hr>
          <div class="box">
            <div class="topcontent">
              <h3 class="is-size-4">Pick-up & Drop-off points</h3>
            </div>
            <div class="content">
              <label for="routeFrom">
                <p class="is-size-6">Pick up</p>
              </label>
              <div class="control has-icons-left has-icons-right">
                <span class="icon is-small is-left">
                  <i class="fa fa-map-marker"/>
                </span>
                <autocomplete :classes="{input:'input is-myblue'}" :custom-params="{token:'dev'}" :process="processJSON" :on-select="processRouteFrom"
                              :encode-params="true" :filter-by-anchor="true" anchor="formatted_address" label="geometry.location.lat" url="https://maps.googleapis.com/maps/api/geocode/json?address="
                />
              </div>
              <label for="routeFrom">
                <p class="is-size-6">Drop Off</p>
              </label>
              <div class="control has-icons-left has-icons-right">
                <span class="icon is-small is-left">
                  <i class="fa fa-map-marker"/>
                </span>
                <autocomplete :classes="{input:'input'}" :custom-params="{token:'dev'}" :process="processJSON" :on-select="processRouteTo"
                              :encode-params="true" :filter-by-anchor="true" anchor="formatted_address" label="geometry.location.lat" url="https://maps.googleapis.com/maps/api/geocode/json?address="
                />
              </div>
              <label for="Date">
                <p class="is-size-6">No of Passengers</p>
              </label>
              <div class="control has-icons-left has-icons-right">
                <span class="icon is-small is-left">
                  <i class="fa fa-user"/>
                </span>
                <input v-model="passengers" class="input" type="number">
              </div>
              <hr>
              <div class="topcontent">
                <h3 class="is-size-4">Date & Time</h3>
                          
                <!-- <label class="checkbox">
                  <input v-model="roundtrip" type="checkbox">
                  Round Trip
                </label> -->
              </div>
                                  
                                         
              <div class="content">
                <label for="Date">
                  <p class="is-size-6">Departure Date</p>
                </label>
                <div class="control has-icons-left has-icons-right">
                  <span class="icon is-small is-left">
                    <i class="fa fa-calendar"/>
                  </span>
                  <datetime v-model="departtime" type="date"/>
                </div>
                <!-- <span v-if="roundtrip">
                  <label for="routeFrom">
                    <p class="is-size-6">Return Date</p>
                  </label>
                  <div class="control has-icons-left has-icons-right">
                    <span class="icon is-small is-left">
                      <i class="fa fa fa-calendar"/>
                    </span>
                        
                  </div>
                    
                  <datetime v-model="returntime" type="date"/>
                </span>  -->
                  
                 
              </div>
            </div>
          </div>
        



          <a class="button is-myblue pull-right" @click="createRoute">Create Trip</a>

          <div v-if="distanceCalc !== null && durationCalc !==null">
            <p class="is-size-6">
              Distance between {{ route.from.name }} & {{ route.to.name }} : <span class="route-info">{{ distanceCalc.text }}</span>
            </p>
            <p class="is-size-6">
              Usual Time Duration :  <span class="route-info">{{ durationCalc.text }}</span>
            </p>
          </div>

        </div>

        <div class="column is-half">
          <div class="box map">
            <div class="topcontent">
              <h3 class="is-size-4">Map Summary</h3>
            </div>
            <div id="map-canvas" />
          </div>
          <div class="box">
            <label for="Extra Info">
              <p class="is-size-6">Extra Information / Comment</p>
            </label>
            <div class="control has-icons-left has-icons-right">
              <span class="icon is-small is-left">
                <i class="fa fa fa-pen"/>
              </span>
              <textarea v-model="extra" class="textarea" cols="3" rows="3"/>
            </div>
          </div>
          
        </div>
      </div>

      <br>

    </div>

  </div>
</template>
<script>
import Navbar from '@/components/shared/Navbar';
import Mapbox from 'mapbox-gl-vue';
import Autocomplete from 'vue2-autocomplete-js';
import { mapGetters } from 'vuex';

export default {
  name: 'CreateRoute',
  components: {
    Mapbox,
    Autocomplete,
    Navbar
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
      map: null,
      roundtrip: false,
      passengers: null,
      departtime: null,
      returntime: null,
      extra: null
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.distanceMatrix = new google.maps.DistanceMatrixService();
    this.initMap();
  },
  methods: {
    async createRoute() {
      const routeBody = {
        route_start_name: this.route.from.name.trim(),
        route_end_name: this.route.to.name.trim(),
        route_start: [
          this.route.from.location.lat,
          this.route.from.location.lng
        ],
        route_end: [this.route.to.location.lat, this.route.to.location.lng],
        est_trip_length: this.durationCalc.text,
        est_trip_duration: this.distanceCalc.text,
        route_creator: this.user._id,
        passenger_space: this.passengers,
        seats_available: this.passengers,
        trip_start: this.departtime,
        extra: this.extra
      };

      if (this.returntime && this.roundtrip) {
        const returnRouteBody = Object.assign({}, routeBody);
        let temp;
        let temp_name;
        temp = returnRouteBody.route_start;
        temp_name = returnRouteBody.route_start_name;
        returnRouteBody.route_start = returnRouteBody.route_end;
        returnRouteBody.route_start_name = returnRouteBody.route_end_name;
        returnRouteBody.route_end = temp;
        returnRouteBody.route_end_name = temp_name;
        routeBody.has_return_route = true;
        returnRouteBody.trip_start = this.returntime;

        try {
          const originalTrip = (await this.$axios.post('/route', routeBody))
            .data;

          returnRouteBody.init_route = originalTrip.data._id;
          const returnTrip = (await this.$axios.post('/route', returnRouteBody))
            .data;

          this.$toasted.success(returnTrip.message).goAway(5000);
        } catch (err) {
          this.$toasted.error(err).goAway(5000);
        }
      } else {
        try {
          const originalTrip = (await this.$axios.post('/route', routeBody))
            .data;
          this.$toasted.success(originalTrip.message).goAway(5000);
        } catch (err) {
          this.$toasted.error(err).goAway(5000);
        }
      }
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
  margin-top: 20px;
  height: 300px;
  width: 100%;
}

.container {
  margin-top: 20px;
}

.box {
  padding-bottom: 50px;
}

.route-head,
.route-info {
  color: #108cce !important;
}

.route-info {
  font-weight: 600 !important;
}

.is-myblue {
  background-color: #108cce !important;
  color: white;
}

.topcontent {
  margin-top: 10px;
  margin-bottom: 10px;
  padding-bottom: 20px;
  color: #108cce;
}

.box.map {
  margin-top: 110px;
}

label p {
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: 600;
}

.autocomplete.autocomplete-list {
  z-index: 100;
}

.autocomplete-change {
  width: 100% !important;
  height: 35px !important;
  border-radius: 5px !important;
  border: 1px solid #ecf0f1 !important;
}
</style>
