<template>
  <div>
    <navbar/>
    <div class="container">
      <div class="columns">
        <div class="column is-one-third is-centered">
          <h4 class="is-size-4">
            Sign up
          </h4>
          <hr>
          <div class="field">
            <div class="control">
              <input type="text" class="input" v-model="firstname" placeholder="First Name">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input type="text" class="input" v-model="lastname" placeholder="Last Name">
            </div>
          </div>
          <div class="field">
                <label for="role" class="label">Role</label>
            <div class="control">
              <select v-model="role">
                <option :value="role" v-for="role in ['passenger', 'driver']" :key="role">{{ role }}</option>
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
          <a class="button is-primary" @click="signUp">Sign Up</a>
          <hr>
          <router-link to="/login" class="is-size-6">Login to account</router-link>
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
  mounted() {},
  methods: {
    ...mapActions(['signup']),
    ...mapGetters(['token']),
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
</style>
