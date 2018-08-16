<template>
  <div>
    <navbar/>
    <div class="container">
      <div class="columns">
        <div class="column is-one-third is-centered">
          <h2 class="is-size-2">
            Sign up
          </h2>
          <hr>
          <div class="field">
            <div class="control">
              <input v-model="credentials.first_name" type="text" class="input" placeholder="First Name">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input v-model="credentials.last_name" type="text" class="input" placeholder="Last Name">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <select v-model="credentials.gender" class="input">
                <option disabled selected>Gender</option>
                <option v-for="(gender, index) in ['Male', 'Female']" :value="gender" :key="index">{{ gender }}</option>
              </select>
            </div>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <datetime v-model="credentials.dob" class="is-medium" type="date"/> 
              <span class="icon is-small is-left ">
                <i class="fa fa-calendar is-myblue"/>
              </span>
            </p>
          </div>     
          <div class="field">
            <div class="control">
              <input v-model="credentials.email" class="input" type="email" placeholder="email">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input v-model="credentials.password" class="input" type="password" placeholder="password">
            </div>
          </div>
          <a class="button is-mybluebg" @click="signingUp">Sign Up</a>
          <hr>
          <router-link to="/login" class="is-size-6 is-myblue">Login to account</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
      
<script>
import { mapActions, mapGetters } from 'vuex';
import Navbar from '@/components/shared/Navbar';

export default {
  name: 'Login',
  components: {
    Navbar
  },
  data() {
    return {
      credentials: {}
    };
  },
  methods: {
    ...mapActions(['signup']),
    async signingUp() {
      try {
        const response = await this.signup(this.credentials);
        if (response) {
          this.$toasted.success('Successfully signed up').goAway(5000);
          this.$router.push('/login');
        }
      } catch (error) {
        const errorMessage = error.message;
        this.$toasted.error(errorMessage).goAway(5000);
      }
    }
  }
};
</script>
      
      <style scoped>
.is-mybluebg {
  background-color: #108cce !important;
  color: white;
}

.is-myblue {
  color: #108cce !important;
}
</style>
