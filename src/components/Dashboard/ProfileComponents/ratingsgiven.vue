<template>
  <div>
    <p class="is-size-4 has-text-weight-bold">Ratings Given</p>
    <hr>
    <div class="box">
      <div>
        
        <div v-if="ratingsAvailable" class="columns">
          <div v-for="user in ratings" :key="user.id" class="column is-one-quarters">
            <div class="box">
              <p class="is-size-5"><i class="fa fa-user"/> {{ user.route_creator.first_name }} {{ user.route_creator.last_name }}</p>
              <hr>
              <p class="is-size-6"><i class="fa fa-car"/> Trip: <i id="start" class="fa fa-circle"/> {{ user.route.route_start_name }} <i class="fa fa-arrow-right"/>  <i id="end" class="fa fa-circle"/> {{ user.route.route_end_name }}</p>
              <p class="is-size-6"><i class="fa fa-cog"/> Rating: {{ user.rating }}</p>
                
                
            </div>
          </div>
        </div>
        <div v-else class="">
          <p class="is-size-3">No ratings available at the moment. Offer a ride maybe ?</p>
        </div>
      </div>

    </div>
  </div>
</template>
    
    <script>
export default {
  name: 'RatingsGiven',
  data() {
    return {
      ratings: null
    };
  },
  computed: {
    noOfRatings() {
      return this.ratings.length;
    },
    ratingsAvailable() {
      return !_.isNull(this.ratings) && !_.isEmpty(this.ratings);
    }
  },
  created() {
    this.fetchRatings();
  },
  methods: {
    fetchRatings() {
      this.$axios
        .get('/ratings', { params: { type: 'given' } })
        .then(resp => {
          const { data } = resp.data;
          this.ratings = data;
        })
        .catch(err => {
          this.$toasted
            .error('There was an error while fetching ratings at the moment')
            .goAway(3000);
        });
    }
  }
};
</script>
    <style scoped>
.table td {
  border: none !important;
}

.box,
.table {
  background-color: #eeeeee;
}

li {
  padding: 5px;
}

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
