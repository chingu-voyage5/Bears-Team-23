<template>
  <div class="container">
    <navbar/>
    <navtabs/>
    <div class="row">
      <div>
        <tabs>
          <tab name="Upcoming Trips">
            <div v-if="pendingRides.length">
              <div class="columns">
                <div v-for="ride in pendingRides" :key="ride.id" class="column is-one-thirds">
                  <div class="box">
                    <p><i id="start" class="fa fa-circle"/> {{ ride.route_start_name }}</p>
                    <div class="verticalLine"/>
                    <p><i id="end" class="fa fa-circle"/> {{ ride.route_end_name }}</p>
                    <hr>
                    <p><i class="fa fa-calendar"/> {{ ride.trip_start | moment("dddd, MMMM Do YYYY") }}</p>
                    <p><i class="fa fa-taxi"/> Seating: {{ ride.passenger_space }}</p>
                    <p><i class="fa fa-users"/> Riders: {{ ride.passenger_space - ride.seats_available || 0 }} </p>

                    
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="row">
                <div class="col-md-12">
                  <br>
                  <p class="is-size-2">
                    Hey there, No Pending rides at this time.
                  </p>
                </div>
              </div>
            </div>
          </tab>
          <tab name="Completed Trips">
            <div v-if="completedRides.length">
              <div class="row">
                <div v-for="ride in completedRides" :key="ride.id" class="col-md-4">
                  <div class="box">
                    <p><i id="start" class="fa fa-circle"/> {{ ride.route_start_name }}</p>
                    <div class="verticalLine"/>
                    <p><i id="end" class="fa fa-circle"/> {{ ride.route_end_name }}</p>
                    <hr>
                    <p><i class="fa fa-calendar"/> {{ ride.trip_start | moment("dddd, MMMM Do YYYY") }}</p>
                    <p><i class="fa fa-taxi"/> Seating: {{ ride.passenger_space }}</p>
                    <p><i class="fa fa-users"/> Riders: {{ ride.passenger_space - ride.seats_available || 0 }} </p>
                    <hr>
                    <p><i class="fa fa-cogs"/> Status: {{ ride.trip_status }}<i class="fa fa-check-circle"/></p>
                    <p><i class="fa fa-bullseye"/> Rating: {{ ride.trip_rating }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="row">
                <div class="col-md-12">
                  <br>
                  <p class="is-size-2">
                    Hey there, No ride has been completed. Offer a ride maybe?
                  </p>
                </div>
              </div>
            </div>
          </tab>
        </tabs>
      </div>
    </div>

  </div>
</template>
<script>
import Navbar from '@/components/shared/Navbar';
import Navtabs from '@/components/shared/NavTabs';
import { Tabs, Tab } from 'vue-tabs-component';

export default {
  name: 'UserRidesOffered',
  components: {
    Navbar,
    Navtabs,
    Tabs,
    Tab
  },
  data() {
    return {
      pendingRides: null,
      completedRides: null
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$axios
        .get('/rides')
        .then(resp => {
          const { pendingRides, completedRides } = resp.data.data;
          this.pendingRides = pendingRides;
          this.completedRides = completedRides;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
#start {
  color: green;
}
#end {
  color: red;
}
.verticalLine {
  border-left: 1px solid grey;
  height: 30px;
  margin-left: 7px;
}
</style>
