<template>
  <div>
    <navbar/>
    <div class="container">
      <div class="columns">
        <div class="column is-half">
          <h3 class="is-size-2 route-head">Create a trip</h3>
          <h5 class="is-size-5"> Create a trip from the routes you frequently ply below</h5>
          <hr>
          <div class="box">
            <div class="topcontent">
              <h3 class="is-size-4">Registered Routes</h3>
            </div>
            <div class="columns">
              <div v-if="retrievedRoutes" class="column is-half">
                <div v-for="route in retrievedRoutes" class="box route-focus" tabindex="0" @click="openRoute(route)">
                  <div class="start">
                    <img src="../assets/img/start.png" class="image is-8x8" alt="start">
                    <p class="is-size-6">
                      {{ route.route_start_name }}
                    </p>
                  </div>
                  <div class="stop">
                    <img src="../assets/img/stop.png" class="image is-8x8" alt="stop">
                    <p class="is-size-6">
                      {{ route.route_end_name }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="route !== null" class="box"> 
            <div class="topcontent">
              <h3 class="is-size-4">Date & Time</h3>
                    
              <label class="checkbox">
                <input v-model="roundtrip" type="checkbox">
                Round Trip
              </label>
            </div>
                            
                                   
            <div class="content">
              <label for="Date">
                <p class="is-size-6">Departure Date</p>
              </label>
              <div class="control has-icons-left has-icons-right">
                <span class="icon is-small is-left">
                  <i class="fa fa-calendar"/>
                </span>
                <datetime v-model="departtime" type="datetime"/>
              </div>
              <span v-if="roundtrip">
                <label for="routeFrom">
                  <p class="is-size-6">Return Date</p>
                </label>
                <div class="control has-icons-left has-icons-right">
                  <span class="icon is-small is-left">
                    <i class="fa fa fa-calendar"/>
                  </span>
                  
                </div>
              </span>
              <datetime v-model="returntime" type="datetime"/>                    
            </div>
          </div>

          <a class="button is-mybluebg pull-right" @click="createTrip">Create Trip</a>

         

        </div>

        <div v-show="route !== null" class="column is-half">
          <div class="box map">
            <div class="topcontent">
              <h3 class="is-size-4">Map Summary</h3>
            </div>
            <div id="map-canvas" />
            <div v-if="route!==null" >
              <p class="is-size-6">
                Distance between {{ route.route_start_name }} & {{ route.route_end_name }} :
                <span class="route-info">{{ route.est_trip_length }}</span>
              </p>
              <p class="is-size-6">
                Usual Time Duration :
                <span class="route-info">{{ route.est_trip_duration }}</span>
              </p>
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
  name: 'CreateTrip',
  components: {
    Mapbox,
    Autocomplete,
    Navbar
  },
  data() {
    return {
      retrievedRoutes: null,
      route: null,
      directionsService: null,
      directionsDisplay: null,
      map: null,
      returntime: null,
      departtime: null,
      roundtrip: true
    };
  },
  mounted() {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.getRoutes();
  },
  computed:{
    ...mapGetters(['user']),
  },
  methods: {
   
    createTrip() {
      const tripBody = {
        route: this.route._id,
        trip_creator:this.user._id,
        trip_start_time: this.departtime,
        trip_from: this.route.route_start_name.trim(),
        trip_to: this.route.route_end_name.trim()
      };
      if(this.roundtrip){
        tripBody.trip_return_time = this.returntime;
      }
      this.$axios
        .post('http://localhost:5000/api/trips', tripBody)
        .then(resp => {
          this.$toasted.success(resp.data.message).goAway(5000);
        })
        .catch(e => {
          this.$toasted.error(e.response.data.message).goAway(5000);
        });
    },

    routeFromMap() {
      const location = {
        lat: this.route.route_start[0],
        lng: this.route.route_start[1]
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
      const locationFrom = this.route.route_start;
      const locationTo = this.route.route_end;

      const start = new google.maps.LatLng(locationFrom[0], locationFrom[1]);
      const end = new google.maps.LatLng(locationTo[0], locationTo[1]);
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
    openRoute(route) {
      this.route = route;
      this.routeFromMap();
      this.calcRoute();
    },
    async getRoutes() {
      let routes = await this.$axios.get('http://localhost:5000/api/route');
      routes = routes.data.data;
      this.retrievedRoutes = routes;
    }
  }
};
</script>
<style scoped>
#map-canvas {
  margin-top: 20px;
  height: 300px;
  width: 100%;
  margin-bottom: 20px;
}

.is-8x8 {
  width: 8px;
  height: 8px;
}

.start img,
.start p,
.stop img,
.stop p {
  display: inline-block !important;
  vertical-align: middle;
  margin: 2px;
}

.start img,
.stop img {
  margin-right: 20px;
}

.container {
  margin-top: 20px;
}

.route-head,
.route-info {
  color: #108cce !important;
}

.route-info {
  font-weight: 600 !important;
}

.is-mybluebg {
  background-color: #108cce !important;
  color: white;
}

.topcontent {
  margin-top: 10px;
  margin-bottom: 10px;
  padding-bottom: 20px;
  border-bottom: 2px #eeeeee solid;
  color: #108cce;
}

.box.map {
  margin-top: 138px;
}

label p {
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: 600;
}

.autocomplete-change {
  width: 100% !important;
  height: 35px !important;
  border-radius: 5px !important;
  border: 1px solid #ecf0f1 !important;
}

.route-focus :hover {
  border-color: 2px solid #108cce !important;
}
</style>
