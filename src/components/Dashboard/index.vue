<template>
  <div class="container">
    <navbar/>
    <navtabs/>
    <div>
      <div class="columns">
        <div class="column is-one-thirds">
          <div class="box">
            <p class="is-size-6 has-text-weight-bold">Car Preferences</p>
            <ul>
              <li>
                <i class="fa fa-arrow-right"/>
                <router-link to="/profile/preferences"> Edit your car share preferences</router-link>
              </li>
            </ul>

            <hr>
            <p class="is-size-6 has-text-weight-bold">Member Verification</p>
            <ul>
              <li v-if="!user.phone">
                <i class="fa fa-exclamation-circle"/>
                <router-link to="/profile/general"> Verify your Phone Number</router-link>
              </li>
              <li v-if="!emailVerified">
                <i class="fa fa-exclamation-circle"/>
                <router-link to="/profile/verification="> Verify your Email Address</router-link>
              </li>
              <li v-if="!photoVerified">
                <i class="fa fa-exclamation-circle"/>
                <router-link to="/profile/photo"> Verify your Profile Photo</router-link>
              </li>
            </ul>
            <br>
            <span v-if="!profileVerified">
              <i class="fa fa-arrow-right"/>
              <router-link to="/profile/verification"> Complete your profile verification</router-link>
            </span>
            <hr>
            <p class="is-size-6 has-text-weight-bold">Member Activity</p>
            <br>
            <p>Member since {{ user.createdAt | moment('MMMM YYYY') }}</p>
          </div>
        </div>
        <div class="column is-two-thirds">
          <p class="is-size-4 has-text-weight-bold">
          <i class="fa fa-bell"/> Notifications</p>
          <hr>
          <span v-if="!photoVerified">
            <router-link to="/profile/photo" class="is-size-5 has-text-weight-bold">Add your photo</router-link>
            <p class="is-size-6">People like to put a face to a name</p>
          </span>
          <hr>
          <br>
          <p class="is-size-4 has-text-weight-bold">
          <i class="fa fa-envelope"/> New Messages</p>
          <hr>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import Navbar from '@/components/shared/Navbar';
import Navtabs from '@/components/shared/NavTabs';
import { mapGetters } from 'vuex';

export default {
  name: 'UserDashboard',
  components: {
    Navbar,
    Navtabs
  },
  computed: {
    ...mapGetters(['user']),

    emailVerified() {
      return (
        ~this.user.verifications.filter(
          v => v.type === 'email' && v.verified === true
        ) >= 0
      );
    },
    photoVerified() {
      return (
        ~this.user.verifications.filter(
          v => v.type === 'photo' && v.verified === true
        ) >= 0
      );
    },
    profileVerified() {
      return (
        this.emailVerified === true &&
        this.photoVerified === true &&
        (this.user.phone !== null || this.user.phone !== undefined)
      );
    }
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
p + ul {
  margin: 20px 0px;
}

li {
  padding: 5px;
}

.column {
  margin: 50px 0;
}
</style>
