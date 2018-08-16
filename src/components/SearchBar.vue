<template>
  <div>
    <div class="trip-coords">
      <div class="field is-grouped">
        <div class="control">
          <autocomplete ref="from" :init-value="searchParams.from.name" :classes="{input:'input'}" :custom-params="{token:'dev'}" :process="processJSON" :on-select="processRouteFrom" :encode-params="true"
                        :filter-by-anchor="true" placeholder="Leaving from..." anchor="formatted_address" label="geometry.location.lat" url="https://maps.googleapis.com/maps/api/geocode/json?address="/>
        </div>
        <p class="control">
          <a class="button is-default" @click="exchange()"><i class="fa fa-exchange"/></a>
        </p>
        <div class="control">
          <autocomplete ref="to" :init-value="searchParams.to.name" :classes="{input:'input'}" :custom-params="{token:'dev'}" :process="processJSON" :on-select="processRouteTo" :encode-params="true"
                        :filter-by-anchor="true" placeholder="Going to..." anchor="formatted_address" label="geometry.location.lat" url="https://maps.googleapis.com/maps/api/geocode/json?address="/>
        </div>
        <p class="control">
          <a class="button is-mybluebg has-text-white" @click="findRide()">Find</a>
        </p>
      </div>
                           
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Autocomplete from 'vue2-autocomplete-js';
import 'vue2-autocomplete-js/dist/style/vue2-autocomplete.css';

export default {
  name: 'SearchBar',
  components: {
    Autocomplete
  },
  data() {
    return {
      journey: {}
    };
  },
  computed: {
    ...mapGetters(['searchParams'])
  },
  mounted() {
    this.journey.to = this.searchParams.to;
    this.journey.from = this.searchParams.from;
  },
  methods: {
    ...mapActions(['searchTrip']),
    exchange() {
      let temp = this.journey.from;
      this.journey.from = this.journey.to;
      this.journey.to = temp;
      this.$refs.to.setValue(this.journey.to.name);
      this.$refs.from.setValue(this.journey.from.name);
    },
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
.trip-coords {
  padding: 10px;
  background-color: #eeeeee;
}
.is-myblue {
  color: #108cce;
}
.is-mybluebg {
  background-color: #108cce;
}
@media (min-width: 320px) and (max-width: 480px) {
  .field.is-grouped {
    flex-direction: column;
  }
}
</style>
