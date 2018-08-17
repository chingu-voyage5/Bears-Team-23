<template>
  <div>
    <p class="is-size-4 has-text-weight-bold">Your Car Details</p>
    <hr>
    <p class="pull-left" @click="back()">
    <i class="fa fa-arrow-left"/> Back</p>
    <div v-if="!carDetailsAvailable">
     
      <div>
        <div v-if="firstStep">
          <div class="columns is-centered">
            <div class="column is-one-quarters" />
            <div class="column is-half">
              <div class="main">
                <p class="is-size-5 has-text-weight-bold">Whats your number plate?</p>
                <p class="is-size-6 has-text-weight-bold">We'll only share it with passengers that book with you.</p>
                <br>
                <!-- <div class="control has-icons-right">
                <span class="icon is-medium is-r">
                  <i class="fa fa-globe"/>
                </span>
              </div> -->

                <div class="field">
                  <div class="control">
                    <input v-model="car.license" type="text" class="input" placeholder="Number plate">
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <button class="button is-myblue" @click="step+=1">Continue</button>
                  </div>
                </div>

              </div>
            </div>
            <div class="column is-one-quarters" />
          </div>
        </div>
        <div v-if="secondStep">
          <div class="columns is-centered">
            <div class="column is-one-quarters" />
            <div class="column is-half">
              <p class="is-size-5 has-text-weight-bold">What make is your car?</p>
              <div class="search">
                <div class="control has-icons-left">
                  <input v-model="car.make" class="input is-large" type="text" placeholder="Search" @keyup.enter="carMake()">
                  <span class="icon is-medium is-left">
                    <i class="fa fa-search" />
                  </span>
                </div>
              </div>
              <p class="is-size-5 has-text-weight-bold">Popular makes</p>
              <hr>
              <div class="car-brands">
                <ul>
                  <li>
                    <p class="is-size-6 has-text-weight-bold">FORD
                      <i class="fa fa-chevron-right pull-right" />
                    </p>
                  </li>
                  <li>
                    <p class="is-size-6 has-text-weight-bold">HYUNDAI
                      <i class="fa fa-chevron-right pull-right" />
                    </p>
                  </li>
                  <li>
                    <p class="is-size-6 has-text-weight-bold">TOYOTA
                      <i class="fa fa-chevron-right pull-right" />
                    </p>
                  </li>
                  <li>
                    <p class="is-size-6 has-text-weight-bold">KIA
                      <i class="fa fa-chevron-right pull-right" />
                    </p>
                  </li>
                  <li>
                    <p class="is-size-6 has-text-weight-bold">MERCEDES
                      <i class="fa fa-chevron-right pull-right" />
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="column is-one-quarters" />
          </div>
        </div>

        <div v-if="thirdStep">
          <div class="columns is-centered">
            <div class="column is-one-quarters" />
            <div class="column is-half">
              <p class="is-size-5 has-text-weight-bold">What year was it registered? </p>
              <p class="is-size-6 has-text-weight-bold">Passengers like to know if your car is modern or something a bit more vintage.</p>
              <hr>
              <input v-model="car.year" type="number" class="input" placeholder="Enter year (YYYY)">
              <button class="button" @click="carFind()">Submit</button>
            </div>
            <div class="column is-one-quarters" />
          </div>
        </div>

        <div v-if="fourthStep">
          <div class="columns is-centered">
            <div class="column is-one-quarters" />
            <div class="column is-half">
              <p class="is-size-5 has-text-weight-bold">What model?</p>
              <!-- <div class="search">
              <div class="control has-icons-left">
                <input class="input is-large" type="text" placeholder="Search" v-model="car.model">
                <span class="icon is-medium is-left">
                  <i class="fa fa-search"/>
                </span>
              </div>
            </div> -->
              <span v-if="carsRetrieved.length">
                <p class="is-size-5 has-text-weight-bold">Car Models</p>
                <hr>
                <div class="car-brands">
                  <ul>
                    <li v-for="car in carsRetrieved" :key="car.id" @click="selectCar(car)">
                      <div class="box">
                        <p class="is-size-6 has-text-weight-bold">{{ car.year }} {{ car.make }} {{ car.model }}
                          <i class="fa fa-chevron-right pull-right" />
                        </p>
                      </div>

                    </li>
                  </ul>
                </div>
              </span>
            </div>
            <div class="column is-one-quarters" />
          </div>
        </div>


        <!-- <div v-if="fourthStep">
        <div class="columns is-centered">
          <div class="column is-one-quarters"/>
          <div class="column is-half">
            <p class="is-size-5 has-text-weight-bold">What type of car is it?</p>
            <hr>
            <div class="car-brands">
              <ul>
                <li>
                  <div class="control">

                    <label class="radio">
                      <span class="is-size-6 has-text-weight-bold">Hatchback</span>
                      <input type="radio" class="radio" name="answer">
                    </label>
                  </div>
                </li>
                <li>
                  <div class="control">
                    <label class="radio">
                      <span class="is-size-6 has-text-weight-bold">Sedan</span>
                      <input type="radio" class="radio" name="answer">
                    </label>
                  </div>
                </li>
                <li>
                  <div class="control">
                    <label class="radio">
                      <span class="is-size-6 has-text-weight-bold">Convertible</span>
                      <input type="radio" class="radio" name="answer">
                    </label>
                  </div>
                </li>
                <li>
                  <div class="control">
                    <label class="radio">
                      <span class="is-size-6 has-text-weight-bold">Estate</span>
                      <input type="radio" class="radio" name="answer">
                    </label>
                  </div>
                </li>
                <li>
                  <div class="control">
                    <label class="radio">
                      <span class="is-size-6 has-text-weight-bold">SUV</span>
                      <input type="radio" class="radio" name="answer">
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="column is-one-quarters"/>
        </div>
      </div> -->

        <div v-if="fifthStep">
          <div class="columns is-centered">
            <div class="column is-one-quarters" />
            <div class="column is-half">
              <p class="is-size-5 has-text-weight-bold">What Color is it? </p>
              <hr>
              <div>
                <div class="search">
                  <div class="control has-icons-left">
                    <input v-model="car.color" class="input is-large" type="text" placeholder="Other Color">
                    <span class="icon is-medium is-left">
                      <i class="fa fa-search" />
                    </span>
                  </div>
                  <div class="car-brands">
                    <ul>
                      <li>
                        <div class="control">

                          <label class="0">
                            <span class="is-size-6 has-text-weight-bold">Black</span>
                            <input id="0" v-model="car.color" type="radio" class="radio" value="black">
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="control">
                          <label class="1">
                            <span class="is-size-6 has-text-weight-bold">White</span>
                            <input id="1" v-model="car.color" type="radio" class="radio" value="white">
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="control">
                          <label class="2">
                            <span class="is-size-6 has-text-weight-bold">Red</span>
                            <input id="2" v-model="car.color" type="radio" class="radio" value="red">
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="control">
                          <label class="3">
                            <span class="is-size-6 has-text-weight-bold">Grey</span>
                            <input id="3" v-model="car.color" type="radio" class="radio" value="grey">
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="control">
                          <label class="4">
                            <span class="is-size-6 has-text-weight-bold">Blue</span>
                            <input id="4" type="radio" class="radio" name="answer">
                          </label>
                        </div>
                      </li>
                    </ul>

                  </div>
                  <button class="button" @click="addCar()">Submit</button>
                </div>
              </div>
            </div>
            <div class="column is-one-quarters" />
          </div>
        </div>
      </div>


    </div>
    <div v-else>
      <br>
      <br>
      <div class="box">
        <div class="columns">
          <div class="column is-one-fifth has-text-centered">
            <div class="car">
              <img :src="hatchback" class="image is-48x48" alt="">
            </div>
           
            <br>
            <a href="" class="  is-size-6 has-text-weight-bold">Upload photo</a>
            <br>
            <a class="button is-myblue" @click="changeDetails()">Change Car Details</a>
          </div>
          <div class="column is-four-fifths">
            <div class="pull-left">
              <p class="is-size-4 has-text-weight-bold">{{ user.car.year }} {{ user.car.make }} {{ user.car.model }}</p>
              <p class="is-size-6 has-text-weight-bold">{{ user.car.license.toUpperCase() }}</p>
              <p class="is-size-6 has-text-weight-bold">{{ user.car.color.toUpperCase() }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sedan from '@/assets/img/car-sedan.png';
import suv from '@/assets/img/car-suv.png';
import estate from '@/assets/img/car-estate.png';
import convertible from '@/assets/img/car-convertible.png';
import hatchback from '@/assets/img/car-hatchback.png';
import { mapGetters } from 'vuex';

export default {
  name: 'CarProfile',
  data() {
    return {
      step: 1,
      sedan,
      suv,
      estate,
      convertible,
      hatchback,
      car: {},
      loading: false,
      carsRetrieved: null
    };
  },
  computed: {
    ...mapGetters(['user']),
    firstStep() {
      return this.step === 1;
    },
    secondStep() {
      return this.step === 2;
    },
    thirdStep() {
      return this.step === 3;
    },
    fourthStep() {
      return this.step === 4;
    },
    fifthStep() {
      return this.step === 5;
    },
    sixthStep() {
      return this.step === 6;
    },
    finalStep() {
      return this.step === 7;
    },
    carDetailsAvailable() {
      return this.user.car ? true : false;
    }
  },
  methods: {
    back(){
      if(this.step > 0){
        this.step-=1;
      }
    },
    carFind() {
      this.loading = true;
      if (
        !_.isUndefined(this.car.make) &&
        !_.isNull(this.car.make) &&
        this.car.make.trim() !== ''
      ) {
        this.$axios
          .get('/cars', {
            params: this.car
          })
          .then(resp => {
            const { data } = resp.data;
            this.carsRetrieved = data;
            this.loading = false;
            this.step += 1;
          })
          .catch(err => {
            this.$toasted
              .error('Error while retrieving car details')
              .goAway(3000);
          });
      }
    },
    carMake() {
      if (
        !_.isUndefined(this.car.make) &&
        !_.isNull(this.car.make) &&
        this.car.make.trim() !== ''
      ) {
        this.step += 1;
      }
    },
    selectCar(car) {
      this.car = Object.assign(this.car, car);
      this.step += 1;
    },
    addCar() {
      this.$axios
        .put('/user', {
          car: this.car
        })
        .then(resp => {
          const { car } = resp.data.data;
          this.$store.commit('set_car', car);
          this.$toasted.success('Car details added successfully').goAway(3000);
        })
        .catch(err => {
          this.$toasted
            .error('Error occured while updating car details')
            .goAway(3000);
        });
    },
    changeDetails() {
      this.car = this.user.car;
      this.carDetailsAvailable = false;
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

.columns.is-centered {
  margin: 50px 0;
}

input[type='text'],
button {
  width: 100%;
  margin: 5px 0;
}

.search {
  margin: 30px 0;
}

ul > li {
  margin: 30px 0;
}

.car img {
  display: block;
  margin: auto;
}
</style>
