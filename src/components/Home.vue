<template>
  <div>
    <navbar/>
    <section class="hero is-medium is-image">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            <h2 class="is-custsize-1 has-text-white">Holla! Holla! Holla!</h2>
            <p class="is-size-4 has-text-white">Life is hard enough. Carpooling saves you from some extra stress getting around</p>
          </h1>
          <div class="columns">
            <div class="column is-one-quarter">
              <div class="field">
                <p class="control has-icons-left">
                  <autocomplete :classes="{input:'input is-medium'}" :custom-params="{token:'dev'}" :process="processJSON" :on-select="processRouteFrom" :encode-params="true"
                                :filter-by-anchor="true" placeholder="Leaving from..." anchor="formatted_address" label="geometry.location.lat" url="https://maps.googleapis.com/maps/api/geocode/json?address="/>
                  <span class="icon is-small is-left">
                    <i class="fa fa-circle is-myblue"/>
                  </span>
                </p>
              </div>
            </div>
            <div class="column is-one-quarter">
              <div class="field">
                <p class="control has-icons-left">
                  <autocomplete :classes="{input:'input is-medium'}" :custom-params="{token:'dev'}" :process="processJSON" :on-select="processRouteTo" :encode-params="true"
                                :filter-by-anchor="true" placeholder="Going to..." anchor="formatted_address" label="geometry.location.lat" url="https://maps.googleapis.com/maps/api/geocode/json?address="/>
                  <span class="icon is-small is-left ">
                    <i class="fa fa-circle is-myblue"/>
                  </span>
                </p>
              </div>
            </div>
            <div class="column is-one-quarter">
              <div class="field">
                <p class="control has-icons-left">
                  <datetime v-model="journey.day" class="is-medium" type="date"/> 
                  <span class="icon is-small is-left ">
                    <i class="fa fa-calendar is-myblue"/>
                  </span>
                </p>
              </div>            
            </div>
            <div class="column is-one-quarter">
              <div class="field">
                <p class="control">
                  <a class="button is-medium is-mybluebg has-text-white is-fullwidth" @click="findRide"> Find a ride</a>
                </p>                     
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Navbar from '@/components/shared/Navbar';
import Autocomplete from 'vue2-autocomplete-js';
import 'vue2-autocomplete-js/dist/style/vue2-autocomplete.css';

export default {
  name: 'Home',
  components: {
    Navbar,
    Autocomplete
  },
  data() {
    return {
      journey: {}
    };
  },
  methods: {
    ...mapActions(['searchTrip']),
    processJSON(json) {
      return json.results;
    },
    processRouteFrom(data) {
      this.journey.from = {
        name: data.formatted_address,
        location: data.geometry.location
      };
    },
    processRouteTo(data) {
      this.journey.to = {
        name: data.formatted_address,
        location: data.geometry.location
      };
    },
    async findRide() {
      try {
        await this.searchTrip(this.journey);
      } catch (err) {
        console.log(err, 'Error while retrieving search');
      } finally {
        this.$router.push('/search');
      }
    }
  }
};
</script>

<style scoped>
.is-image {
  background-image: url('../assets/img/hike.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 100px;
}

.is-centered {
  margin: 0 auto;
}

.is-custsize-1 {
  font-size: 72px;
  color: white;
}
.is-myblue {
  color: #108cce;
}
.is-mybluebg {
  background-color: #108cce;
}

.icon {
  height: 100% !important;
}
</style>
