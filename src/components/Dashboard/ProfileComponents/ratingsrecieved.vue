<template>
  <div>
     <p class="is-size-4 has-text-weight-bold">Ratings Received</p>
    <div>
            
      <div class="box">
        <div class="columns">
        
          <div class="column is-one-thirds" v-if="ratingsAvailable">
            <ul>
              <li>
                <p class="is-size-6 has-text-weight-bold">Outstanding</p>
                <progress class="progress is-small" :value="fiveStar" max="100">15%</progress>
              </li>
              <li>
                <p class="is-size-6 has-text-weight-bold">Excellent</p>
                <progress class="progress is-small" :value="fourStar" max="100">15%</progress>
              </li>
              <li>
                <p class="is-size-6 has-text-weight-bold">Good</p>
                <progress class="progress is-small" :value="threeStar" max="100">15%</progress>
              </li>
              <li>
                <p class="is-size-6 has-text-weight-bold">Poor</p>
                <progress class="progress is-small" :value="twoStar" max="100">15%</progress>
              </li>
              <li>
                <p class="is-size-6 has-text-weight-bold">Very Dissapointing</p>
                <progress class="progress is-small" :value="oneStar" max="100">15%</progress>
              </li>
            </ul>
          </div>
          <div class="column is-three-quarters" v-else>
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
      ratings:null
    };
  },
  created(){
    this.fetchRatings();
  },
  computed:{
    ratingsAvailable(){
      return !_.isNull(this.ratings);
    },
     oneStar(){
      const oneStar = this.ratings.filter(r => r.rating == 1);
      return oneStar.length ? (oneStar.length * 100)/this.ratings.length * 100 : 0
    },
     twoStar(){
      const twoStar = this.ratings.filter(r => r.rating == 2);
      return twoStar.length ? (twoStar.length * 100)/this.ratings.length: 0
    },
     threeStar(){
      const threeStar = this.ratings.filter(r => r.rating == 3);
      return threeStar.length ? (threeStar.length * 100)/this.ratings.length : 0
    },
     fourStar(){
      const fourStar = this.ratings.filter(r => r.rating == 4);
      return fourStar.length ? (fourStar.length * 100)/this.ratings.length : 0;
    },
     fiveStar(){
      const fiveStar = this.ratings.filter(r => r.rating == 5);
      return fiveStar.length ? (fiveStar.length * 100)/this.ratings.length : 0
    }
  },
  methods:{
    fetchRatings(){
      this.$axios.get('http://localhost:5000/api/ratings',{params:{type:'received'}}).then( resp => {
        const { data } = resp.data;
        this.ratings = data;
      })
      .catch(err => {
        this.$toasted.error('There was an error while fetching ratings at the moment').goAway(3000);
      })
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
