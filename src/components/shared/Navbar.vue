<template>
  <div>
    <nav class="navbar is-transparent is-fixed-top">
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
          <router-link class="navbar-item" to="/">
            Home
          </router-link>
        </div>
          
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field">
                <p class="control">
                    <router-link to="/route/create" class="button is-mybluebg">Offer a ride</router-link>
                  </p>
            </div>
          </div>
          <div class="navbar-item">
                       
            <div v-if="isAuthenticated === true" class="field is-grouped">
              <p class="is-size-6 navbar-item">Welcome {{ user.first_name }} {{ user.last_name }}</p>
              <p class="control">
                <a class="button is-danger">
                  <span @click="Logout">Logout</span>
                </a>
              </p>
            </div>
            <div v-else class="field is-grouped">
              <p class="control">
                <router-link to="/signup" class="button is-mybluebg">Sign Up</router-link>
              </p>
              <p class="control">
                <router-link to="/login" class="button is-mybluebg">Sign In</router-link>
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
  computed:{
    ...mapGetters(['user']),
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
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
p {
  padding-top: 5px;
  padding-bottom: 5px;
  font-weight: 600;
}

.is-mybluebg {
  background-color: #108cce !important;
  color: white;
}
</style>
