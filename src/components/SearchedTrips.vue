<template>
  <div>
    <navbar/>
    <div class="container">
      <div class="columns">
        <div class="column">
          <searchbar/>
        </div>
      </div>
      <div class="columns">
        <div class="column is-one-quarters">
          <div class="box date">
            <div class="field">
              <label for="date" class="label">Date</label>
              <p class="control has-icons-left">
                <datetime v-model="filter" class="is-medium" type="date"/> 
                <span class="icon is-small is-left ">
                  <i class="fa fa-calendar is-myblue"/>
                </span>
              </p>
            </div>
                       
            <label for="date" class="label">Departure time: </label>
            <p class="control">  
              <vue-slider ref="slider" v-model="value"/>
            </p> 
          </div>
        </div>
        <div class="column is-three-quarters">
          <div class="summary">
            <h5 class="is-size-5">{{ noOfTrips }} {{ ride }} available from <span class="is-myblue">{{ searchParams.from.name }}</span> to <span class="is-myblue">{{ searchParams.to.name }}</span></h5>
            <p v-if="search.length" class="is-size-6">Duration: {{ search[0].est_trip_length }}</p>
          </div>

          <div v-for="user in search" v-if="search.length" :key="user.id" class="columns">
            <div class="column is-one-thirds">
              <div class="driver-info media">
                <div class="media-left">
                  <figure class="image is-64x64 rounded">
                    <img :src="maleImg" alt="Image">
                  </figure>
                </div>
                <div class="media-content">
                  <div>
                    <h5 class="is-size-5">{{ user.route_creator.first_name }}</h5>
                    <p class="is-size-6">24 years old</p>
                  </div>
                </div>
                                          
              </div>
                           
                               
            </div>
            <div class="column is-two-thirds " @click="openTrip(user)">
              <div class="trip-info" tabindex="0">
                <h5 class="is-size-5">{{ user.trip_start | moment("dddd, MMMM Do YYYY") }}</h5>
                <p class="is-size-6">{{ user.route_start_name }} <i class="fa fa-arrow-right"/> {{ user.route_end_name }}</p>            
              </div>
            </div>
          </div>
                   
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import male from '@/assets/img/male.png';
import female from '@/assets/img/female.png';
import { mapGetters, mapMutations } from 'vuex';
import Navbar from '@/components/shared/Navbar';
import vueSlider from 'vue-slider-component';
import { EventBus } from '@/event';
import Searchbar from '@/components/SearchBar';

export default {
  name: 'Search',
  components: {
    Navbar,
    vueSlider,
    Searchbar
  },
  data() {
    return {
      value: 0,
      result: null,
      location: null,
      filter: '',
      maleImg: male,
      femaleImg: female
    };
  },
  computed: {
    ...mapGetters(['search', 'searchParams']),
    noOfTrips() {
      return this.search.length < 1 ? 'No' : this.search.length;
    },
    ride() {
      return this.noOfTrips > 1 || this.noOfTrips === 0 ? 'rides' : 'ride';
    }
  },
  methods: {
    ...mapMutations(['selected_search']),
    openTrip(user) {
      const selectedIndex = this.search.findIndex(val => val.id === user.id);
      this.selected_search(selectedIndex);
      this.$router.push('/search/selected');
    }
  }
};
</script>
<style scoped>
.is-myblue {
  color: #108cce;
}
.is-mybluebg {
  background-color: #108cce;
}
.summary {
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 20px;
}

.icon {
  height: 100% !important;
}
.rounded {
  padding: 10px;
  border: 2px solid #108cce;
  border-radius: 50%;
}
.driver-info {
  vertical-align: middle;
  padding: 10px;
  margin: 10px;
  border-right: 1px solid #eeeeee;
  cursor: pointer;
}

.trip-info {
  padding: 10px 1px 10px 5px;
  margin: 10px 1px 10px 1px;
  cursor: pointer;
}

.trip-info:hover {
  background-color: #eeeeee;
  border-radius: 5px;
}

.is-centered {
  margin: 0 auto;
}
</style>
