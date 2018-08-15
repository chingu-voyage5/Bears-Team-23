<template>
  <div>
    <div>
      <p class="is-size-4 has-text-weight-bold">Your carpooling preferences</p>
      <hr>
      <div class="box">
        <div class="columns is-centered">
          <div class="column is-half">
            <table class="table pull-right">
              <tbody>
                <tr>
                  <td>
                    <p class="is-size-6 has-text-weight-bold pull-right">Chattiness :</p>
                  </td>
                  <td>
                    <div class="img-holder">
                     
                      <label for="0">
                        <input type="radio" id="0" value="0" v-model="user.pref.chattiness">
                        <img :src="prefChatNo" class="image is-48x48" alt="">
                      </label>
                      
                    </div>
                  </td>
                  <td>
                    <div class="img-holder">
                        <label for="1">
                        <input type="radio" id="1" value="1" v-model="user.pref.chattiness">
                       <img :src="prefChatMaybe" class="image is-48x48" alt="">
                      </label>
                      
                    </div>
                  </td>
                  <td>
                    <div class="img-holder">
                      <label for="2">
                        <input type="radio" id="2" value="2" v-model="user.pref.chattiness">
                        <img :src="prefChatYes" class="image is-48x48" alt="">
                      </label>
                     
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p class="is-size-6 has-text-weight-bold pull-right">Music :</p>
                  </td>
                  <td>
                    <div class="img-holder">
                      <label for="3">
                        <input type="radio" id="3" value="0" v-model="user.pref.music">
                      <img :src="prefMusicNo" class="image is-48x48" alt="">
                      </label>
                      
                    </div>
                  </td>
                  <td>
                    <div class="img-holder">
                      <label for="4">
                        <input type="radio" id="4" value="1" v-model="user.pref.music">
                      <img :src="prefMusicMaybe" class="image is-48x48" alt="">
                      </label>
                      
                    </div>
                  </td>
                  <td>
                    <div class="img-holder">
                      <label for="5">
                        <input type="radio" id="5" value="2" v-model="user.pref.music">
                       <img :src="prefMusicYes" class="image is-48x48" alt="">
                      </label>
                      
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p class="is-size-6 has-text-weight-bold pull-right">Pets :</p>
                  </td>
                  <td>
                    <div class="img-holder">
                      <label for="6">
                        <input type="radio" id="6" value="0" v-model="user.pref.pets">
                       <img :src="prefPetsNo" class="image is-48x48" alt="">
                      </label>
                      
                    </div>
                  </td>
                  <td>
                    <div class="img-holder">
                      <label for="7">
                        <input type="radio" id="7" value="1" v-model="user.pref.pets">
                       <img :src="prefPetsMaybe" class="image is-48x48" alt="">
                      </label>
                      
                    </div>
                  </td>
                  <td>
                    <div class="img-holder">
                      <label for="8">
                        <input type="radio" id="8" value="2" v-model="user.pref.pets">
                       <img :src="prefPetsYes" class="image is-48x48" alt="">
                      </label>
                      
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p class="is-size-6 has-text-weight-bold pull-right">Smoking :</p>
                  </td>
                  <td>
                    <div class="img-holder">
                      <label for="9">
                        <input type="radio" id="9" value="0" v-model="user.pref.smoking">
                       <img :src="prefSmokingNo" class="image is-48x48" alt="">
                      </label>
                      
                    </div>
                  </td>
                  <td>
                    <div class="img-holder">
                      <label for="10">
                        <input type="radio" id="10" value="1" v-model="user.pref.smoking">
                       <img :src="prefSmokingMaybe" class="image is-48x48" alt="">
                      </label>
                      
                    </div>
                  </td>
                  <td>
                    <div class="img-holder">
                      <label for="11">
                        <input type="radio" id="11" value="2" v-model="user.pref.smoking">
                       <img :src="prefSmokingYes" class="image is-48x48" alt="">
                      </label>
                      
                    </div>
                  </td>
                </tr>
                               
              </tbody>
            </table>
            <div>
              <button class="button is-myblue pull-right" @click="savePreferences">Save</button>
            </div>
          </div>
          <div class="column is-half"/>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import prefMusicNo from '@/assets/img/pref-music-no.png';
import prefMusicMaybe from '@/assets/img/pref-music-maybe.png';
import prefMusicYes from '@/assets/img/pref-music-yes.png';
import prefChatNo from '@/assets/img/pref-bla.png';
import prefChatMaybe from '@/assets/img/pref-blabla.png';
import prefChatYes from '@/assets/img/pref-blablabla.png';
import prefPetsNo from '@/assets/img/pref-pet-no.png';
import prefPetsMaybe from '@/assets/img/pref-pet-maybe.png';
import prefPetsYes from '@/assets/img/pref-pet-yes.png';
import prefSmokingNo from '@/assets/img/pref-smoking-no.png';
import prefSmokingMaybe from '@/assets/img/pref-smoking-maybe.png';
import prefSmokingYes from '@/assets/img/pref-smoking-yes.png';
import { mapGetters } from 'vuex';

import Vue from 'vue';
export default {
  name: 'PreferenceProfile',
  data() {
    return {
      prefMusicNo,
      prefMusicMaybe,
      prefMusicYes,
      prefChatNo,
      prefChatMaybe,
      prefChatYes,
      prefPetsNo,
      prefPetsMaybe,
      prefPetsYes,
      prefSmokingNo,
      prefSmokingMaybe,
      prefSmokingYes,
    };
  },
  computed:{
    ...mapGetters(['user'])
  },
  created(){
  },
  methods:{
    savePreferences(){
      this.$axios.put('http://localhost:5000/api/user', { pref : this.user.pref }).then(resp => {
       const { pref } = resp.data.data;
       this.$store.commit('set_pref', pref);
       this.$toasted.success('Preferences updated successfully').goAway(3000);
      })
      .catch(err => {
        this.$toasted.error('There was an error while updating preferences').goAway(3000);
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

.img-holder {
  background-color: white;
  border-radius: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
}
button {
  width: 50%;
  margin: 0 15px;
}

/* Image and label styles*/
label > input{ /* HIDE RADIO */
  visibility: hidden; /* Makes input not-clickable */
  position: absolute; /* Remove input from document flow */
}
label > input + img{ /* IMAGE STYLES */
  cursor:pointer;
  border:2px solid transparent;
}
label > input:checked + img{ /* (RADIO CHECKED) IMAGE STYLES */
  border:2px solid teal;
  border-radius: 5px
}
</style>
