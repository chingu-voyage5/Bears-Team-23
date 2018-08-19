<template>
  <div>
    <p class="is-size-4 has-text-weight-bold">Ratings Received</p>
    <hr>
    <div> 
      <div class="box">
        <div class="columns">
        
          <div v-if="ratingsAvailable" class="column is-one-thirds">
            <ul>
              <li>
                <p class="is-size-6 has-text-weight-bold">Outstanding</p>
                <progress :value="fiveStar" class="progress is-small" max="100">15%</progress>
              </li>
              <li>
                <p class="is-size-6 has-text-weight-bold">Excellent</p>
                <progress :value="fourStar" class="progress is-small" max="100">15%</progress>
              </li>
              <li>
                <p class="is-size-6 has-text-weight-bold">Good</p>
                <progress :value="threeStar" class="progress is-small" max="100">15%</progress>
              </li>
              <li>
                <p class="is-size-6 has-text-weight-bold">Poor</p>
                <progress :value="twoStar" class="progress is-small" max="100">15%</progress>
              </li>
              <li>
                <p class="is-size-6 has-text-weight-bold">Very Dissapointing</p>
                <progress :value="oneStar" class="progress is-small" max="100">15%</progress>
              </li>
            </ul>
          </div>
          <div v-else class="column is-three-quarters">
            <p class="is-size-3">No ratings available at the moment. Offer a ride maybe ?</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RatingsRecieved',
  data() {
    return {
      ratings: null
    };
  },
  computed: {
    ratingsAvailable() {
      return !_.isNull(this.ratings) && !_.isEmpty(this.ratings);
    },
    oneStar() {
      const oneStar = this.ratings.filter(r => r.rating == 1);
      return oneStar.length
        ? oneStar.length * 100 / this.ratings.length * 100
        : 0;
    },
    twoStar() {
      const twoStar = this.ratings.filter(r => r.rating == 2);
      return twoStar.length ? twoStar.length * 100 / this.ratings.length : 0;
    },
    threeStar() {
      const threeStar = this.ratings.filter(r => r.rating == 3);
      return threeStar.length
        ? threeStar.length * 100 / this.ratings.length
        : 0;
    },
    fourStar() {
      const fourStar = this.ratings.filter(r => r.rating == 4);
      return fourStar.length ? fourStar.length * 100 / this.ratings.length : 0;
    },
    fiveStar() {
      const fiveStar = this.ratings.filter(r => r.rating == 5);
      return fiveStar.length ? fiveStar.length * 100 / this.ratings.length : 0;
    }
  },
  created() {
    this.fetchRatings();
  },
  methods: {
    fetchRatings() {
      this.$axios
        .get('/ratings', { params: { type: 'received' } })
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
</style>
