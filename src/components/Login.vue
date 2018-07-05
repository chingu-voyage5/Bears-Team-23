<template>
  <div>
    <navbar/>
    <div class="container">
      <div class="columns">
        <div class="column is-one-third is-centered">
          <h2 class="is-size-2 is-my-blue">
            Login
          </h2>
          <hr>
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
          <a class="button is-mybluebg" @click="signIn">Login</a>
          <hr>
          <router-link to="/signup" class="is-size-6 is-myblue">Create an account</router-link>
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
      password: ''
    };
  },
  computed:{
    ...mapGetters(['token']),
  },
  mounted() {},
  methods: {
    ...mapActions(['login']),
    async signIn() {
      const credentials = {
        email: this.email,
        password: this.password
      };
      try {
        const response = await this.login(credentials);
        if (response) {
          this.$axios.defaults.headers.common['Authorization'] = this.token;
          this.$toasted.success('Successfully logged in').goAway(5000);
          this.$router.push('/route/create');
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
