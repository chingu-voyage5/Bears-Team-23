<template>
  <div>
    <nav class="navbar is-transparent">
      <div class="navbar-brand">
        <a class="navbar-item">
          <h4 class="is-size-4">#</h4>
        </a>
        <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
          <span/>
          <span/>
          <span/>
        </div>
      </div>
          
      <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" href="https://bulma.io/">
            Home
          </a>
        </div>
          
        <div class="navbar-end">
          <div class="navbar-item">
                       
            <div v-if="isAuth" class="field is-grouped">
              <p class="is-size-6 control">Welcome {{ user().first_name }} {{ user().last_name }}</p>
              <p class="control">
                <a class="button is-danger">
                  <span @click="Logout">Logout</span>
                </a>
              </p>
            </div>
            <div v-else class="field is-grouped">
              <p class="control">
                <router-link to="/login" class="button is-primary">Login</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Navbar',
  data() {
    return {};
  },
  methods: {
    ...mapGetters(['user']),
    ...mapActions(['logout']),
    Logout() {
      this.logout().then(() => {
        console.log('im heteer');
        this.$router.push('/login');
      });
    }
  }
};
</script>

<style scoped>
</style>
