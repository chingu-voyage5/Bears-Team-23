<template>
  <div>
    <div>
      <p class="is-size-4 has-text-weight-bold">Your Car Details</p>
      <hr>
      <p class="pull-left">
      <i class="fa fa-arrow-left"/> Back</p>
      <div v-if="firstStep">
        <div class="columns is-centered">
          <div class="column is-one-quarters"/>
          <div class="column is-half">
            <div class="main">
              <p class="is-size-5 has-text-weight-bold">Whats your number plate?</p>
              <p class="is-size-6 has-text-weight-bold">We'll only share it with passengers that book with you.</p>
              <br>
              <div class="control has-icons-left">
                <div class="select is-medium">
                  <select>
                    <option selected>Country</option>
                    <option>Select dropdown</option>
                    <option>With options</option>
                  </select>
                </div>
                <span class="icon is-medium is-left">
                  <i class="fa fa-globe"/>
                </span>
              </div>

              <div class="field">
                <div class="control">
                  <input type="text" class="input" placeholder="Number plate">
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <button class="button is-myblue">Continue</button>
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <button class="button">No Thanks</button>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-one-quarters"/>
        </div>
      </div>
      <div v-if="secondStep">
        <div class="columns is-centered">
          <div class="column is-one-quarters"/>
          <div class="column is-half">
            <p class="is-size-5 has-text-weight-bold">What make is your car?</p>
            <div class="search">
              <div class="control has-icons-left">
                <input class="input is-large" type="text" placeholder="Search">
                <span class="icon is-medium is-left">
                  <i class="fa fa-search"/>
                </span>
              </div>
            </div>
            <p class="is-size-5 has-text-weight-bold">Popular makes</p>
            <hr>
            <div class="car-brands">
              <ul>
                <li>
                  <p class="is-size-6 has-text-weight-bold">MARUTI
                    <i class="fa fa-chevron-right pull-right"/>
                  </p>
                </li>
                <li>
                  <p class="is-size-6 has-text-weight-bold">HONDA
                    <i class="fa fa-chevron-right pull-right"/>
                  </p>
                </li>
                <li>
                  <p class="is-size-6 has-text-weight-bold">KIA
                    <i class="fa fa-chevron-right pull-right"/>
                  </p>
                </li>
                <li>
                  <p class="is-size-6 has-text-weight-bold">TOYOTA
                    <i class="fa fa-chevron-right pull-right"/>
                  </p>
                </li>
                <li>
                  <p class="is-size-6 has-text-weight-bold">HYUNDAI
                    <i class="fa fa-chevron-right pull-right"/>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div class="column is-one-quarters"/>
        </div>
      </div>
      <div v-if="thirdStep">
        <div class="columns is-centered">
          <div class="column is-one-quarters"/>
          <div class="column is-half">
            <p class="is-size-5 has-text-weight-bold">What model?</p>
            <div class="search">
              <div class="control has-icons-left">
                <input class="input is-large" type="text" placeholder="Search">
                <span class="icon is-medium is-left">
                  <i class="fa fa-search"/>
                </span>
              </div>
            </div>
            <p class="is-size-5 has-text-weight-bold">Popular models</p>
            <hr>
            <div class="car-brands">
              <ul>
                <li>
                  <p class="is-size-6 has-text-weight-bold">SOLARIS
                    <i class="fa fa-chevron-right pull-right"/>
                  </p>
                </li>
                <li>
                  <p class="is-size-6 has-text-weight-bold">ACCENT
                    <i class="fa fa-chevron-right pull-right"/>
                  </p>
                </li>
                <li>
                  <p class="is-size-6 has-text-weight-bold">GETZ
                    <i class="fa fa-chevron-right pull-right"/>
                  </p>
                </li>
                <li>
                  <p class="is-size-6 has-text-weight-bold">i20
                    <i class="fa fa-chevron-right pull-right"/>
                  </p>
                </li>
                <li>
                  <p class="is-size-6 has-text-weight-bold">i30
                    <i class="fa fa-chevron-right pull-right"/>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div class="column is-one-quarters"/>
        </div>
      </div>
      <div v-if="fourthStep">
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
      </div>

      <div v-if="fifthStep">
        <div class="columns is-centered">
          <div class="column is-one-quarters"/>
          <div class="column is-half">
            <p class="is-size-5 has-text-weight-bold">What Color is it? </p>
            <hr>
            <div class="car-brands">
              <ul>
                <li>
                  <div class="control">

                    <label class="radio">
                      <span class="is-size-6 has-text-weight-bold">Black</span>
                      <input type="radio" class="radio" name="answer">
                    </label>
                  </div>
                </li>
                <li>
                  <div class="control">
                    <label class="radio">
                      <span class="is-size-6 has-text-weight-bold">White</span>
                      <input type="radio" class="radio" name="answer">
                    </label>
                  </div>
                </li>
                <li>
                  <div class="control">
                    <label class="radio">
                      <span class="is-size-6 has-text-weight-bold">Grey</span>
                      <input type="radio" class="radio" name="answer">
                    </label>
                  </div>
                </li>
                <li>
                  <div class="control">
                    <label class="radio">
                      <span class="is-size-6 has-text-weight-bold">Burgundy</span>
                      <input type="radio" class="radio" name="answer">
                    </label>
                  </div>
                </li>
                <li>
                  <div class="control">
                    <label class="radio">
                      <span class="is-size-6 has-text-weight-bold">Dark blue</span>
                      <input type="radio" class="radio" name="answer">
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="column is-one-quarters"/>
        </div>
      </div>

      <div v-if="sixthStep">
        <div class="columns is-centered">
          <div class="column is-one-quarters"/>
          <div class="column is-half">
            <p class="is-size-5 has-text-weight-bold">What year was it registered? </p>
            <p class="is-size-6 has-text-weight-bold">Passengers like to know if your car is modern or something a bit more vintage.</p>
            <hr>
            <input type="text" class="input" placeholder="Enter year (YYYY)">
            <button class="button">Submit</button>
          </div>
          <div class="column is-one-quarters"/>
        </div>
      </div>

      <div v-if="finalStep">
        <br>
        <br>
        <div class="box">
          <div class="columns">
            <div class="column is-one-fifth has-text-centered">
              <img :src="hatchback" class="image is-48x48" alt="">
              <br>
              <a href="" class="  is-size-6 has-text-weight-bold">Upload photo</a>
              <button class="button is-myblue">Add a car</button>
            </div>
            <div class="column is-four-fifths">
              <div class="pull-left">
                <p class="is-size-6 has-text-weight-bold">HYUNDAI ACCENT</p>
                <i class="fa fa-edit"/>
                <i class="fa fa-times"/>
              </div>
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

export default {
  name: 'CarProfile',
  data() {
    return {
      step: 7,
      sedan,
      suv,
      estate,
      convertible,
      hatchback
    };
  },
  computed: {
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
</style>
