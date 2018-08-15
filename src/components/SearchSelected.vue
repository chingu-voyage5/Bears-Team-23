<template>
  <div v-if="selected">
    <navbar/>
    <div class="container">
      <div class="columns">
        <div class="column">
          <searchbar/>
          <section>
            <div class="columns">
              <div class="column is-two-thirds">
                <div class="route-info">
                  <h4 class="is-size-4">{{ selected.route_start_name }} <i class="fa fa-arrow-right"/> {{ selected.route_end_name }}</h4>
                </div>

                <div class="box trip-info">
                  <div class="columns">
                    <div class="column is-one-thirds">
                      <h5 class="is-size-6">Departure Point</h5>
                    </div>
                    <div class="column is-two-thirds">
                      <p><i class="fa fa-circle-thin"/> {{ selected.route_start_name }}</p>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column is-one-thirds">
                      <h5 class="is-size-6">Drop-off Point</h5>
                    </div>
                    <div class="column is-two-thirds">
                      <p><i class="fa fa-circle-thin"/> {{ selected.route_end_name }}</p>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column is-one-thirds">
                      <h5 class="is-size-6">Departure Date</h5>
                    </div>
                    <div class="column is-two-thirds">
                      <p><i class="fa fa-calendar"/> {{ selected.trip_start | moment("dddd, MMMM Do YYYY") }}</p>
                    </div>
                  </div>

                  <div v-if="selected.extra" class="box comment">
                    <article class="media">
                      <div class="media-left">
                        <figure class="image is-64x64">
                          <img :src="maleImg" class="rounded" alt="Image">
                        </figure>
                      </div>
                      <div class="media-content">
                        <div class="content">
                          <p>
                            <strong>{{ routeCreator.first_name }} {{ routeCreator.last_name }}</strong> <small/><small/>
                            <br>
                            {{ selected.extra }}
                          </p>
                          <a class="button is-mybluebg has-text-white"> Contact car owner</a>
                        </div>
                                       
                      </div>
                    </article>
                  </div>
                </div>
                               
              </div>
              <div class="column is-one-thirds cost-pass">
                <div>
                  <p class="is-size-6 pull-right">Offer Published: {{ selected.createdAt | moment("dddd, MMMM Do YYYY") }}</p>
                </div>
                 
                <div class="box extra-info">
                  <div class="level">
                    <div class="level-item first has-text-centered">
                      <div>
                        <p class="title">200</p>
                        <p class="heading">per co-traveller</p>
                      </div>
                    </div>
                    <div class="level-item has-text-centered">
                      <div>
                        <p class="title">{{ selected.seats_available }}</p>
                        <p class="heading">available seats</p>
                      </div>
                    </div>
                  </div>
                  <div class="level">
                    <div class="level-item has-text-centered">
                      <div>
                        <p class="heading">
                          co-travellers on this ride
                        </p>
                                
                        <span v-for="(pass, index) in Number(selected.passenger_space - selected.seats_available)" :key="index">
                          <i v-if="pass" class="fa fa-user icon"/>
                          <i v-else class="fa fa-circle icon"/>
                        </span>
                                
                      </div>
                    </div>
                  </div>
                  <div v-if="lateAlready" class="level">
                    <div class="level-item has-text-centered">
                      <div>
                        <p class="heading">
                          Already too late to book this ride
                          <br>
                          <router-link to="/">Search for another ride </router-link>
                        </p>
                                
                      </div>
                    </div>
                  </div>
                  <div v-if="noSeats" class="level">
                    <div class="level-item has-text-centered">
                      <div>
                        <p class="heading">
                          No Seats Available
                          <br>
                          <router-link to="/">Search for another ride </router-link>
                        </p>
                                
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <div class="field">
                      <div class="control">
                        <label class="label">Book seats</label>
                        <div class="select is-fullwidth">
                          <select v-model="seats">
                            <option disabled selected>Select No of Seats</option>
                            <option v-for="(n, index) in Number(selected.seats_available)" :value="n" :key="index">{{ n }} seats</option>
                          </select>
                        </div>
                      </div>
                    </div>
                       
                    <div class="field">
                      <div class="control">
                        <label class="checkbox">
                          <input v-model="terms" type="checkbox">
                          I have read and accept the T&Cs and certify I am over 18 years old.</a>
                        </label>
                      </div>
                    </div>

                    <div class="field">
                      <div class="control">
                        <a class="button is-danger is-fullwidth" @click="bookTrip">Request to book</a>
                      </div>
                    </div>
                      
                  </div>
                </div>
                  
                <div class="box ">
                  <h4 class="is-size-4">Car Owner</h4>
                  <hr>
                  <div class="columns">
                    <div class="column is-one-fifth">
                      <article class="media">
                        <div class="media-left">
                          <figure class="image is-64x64">
                            <img :src="maleImg" class="rounded" alt="Image">
                          </figure>
                        </div>
                      </article>
                                    
                    </div>
                    <div class="column is-four-fifth">
                      <h5 class="is-size-5">{{ selected.route_creator.first_name }}</h5>
                      <p class="is-size-6">{{ selected.route_creator.age }} years old</p>
                      <p v-if="selected.route_creator.isVerified" class="is-size-6 has-green-text">Verified</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>     
          </section>
                 
        </div>
      </div>
    </div>
      
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Searchbar from '@/components/SearchBar';
import Navbar from '@/components/shared/Navbar';
import male from '@/assets/img/male.png';

export default {
  name: 'SelectedSearch',
  components: {
    Searchbar,
    Navbar
  },
  data() {
    return {
      selected: null,
      maleImg: male,
      terms: false,
      seats: null
    };
  },
  computed: {
    ...mapGetters(['search', 'user', 'searchResult']),
    lateAlready() {
      if (
        this.$moment(this.selected.trip_start).isSame(
          this.$moment.now(),
          'day'
        ) &&
        this.$moment(this.selected.trip_start).isSame(
          this.$moment.now(),
          'month'
        ) &&
        this.$moment(this.selected.trip_start).isSame(
          this.$moment.now(),
          'year'
        )
      ) {
        return true;
      } else return false;
    },
    routeCreator() {
      return this.selected.route_creator;
    },
    noSeats() {
      return this.selected.seats_available < 1 ? true : false;
    }
  },
  mounted() {
    this.selected = this.search[this.$store.state.selectedIndex];
    this.selected.passenger_space = Number(this.selected.passenger_space);
  },
  methods: {
    bookTrip() {
      const pickedBody = this._.pick(this.selected, ['_id', 'route_creator']);
      pickedBody.noOfSeats = this.seats;

      this.$axios
        .post('http://localhost:5000/api/trip', pickedBody)
        .then(resp => {
          this.$toasted.success(resp.data.message).goAway(3000);
        })
        .catch(e => this.$toasted.error(e.error.message).goAway(3000));
    }
  }
};
</script>

<style scoped>
section {
  margin-top: 20px;
}

.route-info {
  margin-bottom: 20px;
}

.rounded {
  padding: 10px;
  border: 2px solid #108cce;
  border-radius: 50%;
}

.is-myblue {
  color: #108cce;
}
.is-mybluebg {
  background-color: #108cce;
}
.extra-info {
  margin-top: 55px;
}

.has-text-center {
  text-align: center;
}
.icon {
  width: 24px;
  margin: 5px;
}
.level-item.first {
  border-right: 1px solid #eeeeee;
}

.level-item {
  border-bottom: 1px solid #eeeeee;
  padding: 10px;
}

.comment {
  background-color: #eeeeee;
}
</style>
