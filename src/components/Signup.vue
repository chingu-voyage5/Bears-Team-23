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
              <input v-model="firstname" type="text" class="input" placeholder="First Name">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input v-model="lastname" type="text" class="input" placeholder="Last Name">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <select v-model="role" class="input">
                <option disabled selected value >Select Role</option>
                <option v-for="role in ['passenger', 'driver']" :value="role" :key="role">{{ role }}</option>
              </select>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input v-model="email" class="input" type="email" placeholder="email">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input v-model="password" class="input" type="password" placeholder="password">
            </div>
          </div>
          <a class="button is-mybluebg" @click="signUp">Sign Up</a>
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
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      role: ''
    };
  },
  computed: {
    ...mapActions(['signup'])
  },
  mounted() {},
  methods: {
    async signUp() {
      const credentials = {
        email: this.email,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
        role: this.role
      };
      try {
        const response = await this.signup(credentials);
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
