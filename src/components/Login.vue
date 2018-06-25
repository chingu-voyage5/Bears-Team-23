<template>
  <div>
    <navbar/>
    <div class="container">
      <div class="columns">
        <div class="column is-one-third is-centered">
          <h4 class="is-size-4">
            Login
          </h4>
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
          <a class="button is-primary" @click="signIn">Login</a>
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
  mounted() {},
  methods: {
    ...mapActions(['login']),
    ...mapGetters(['token']),
    async signIn() {
      const credentials = {
        email: this.email,
        password: this.password
      };
      try {
        const response = await this.login(credentials);
        if (response) {
          this.$axios.defaults.headers.common['Authorization'] = this.token();
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
</style>
