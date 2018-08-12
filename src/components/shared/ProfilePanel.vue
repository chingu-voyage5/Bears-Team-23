<template>
  <div>
    <nav class="panel">
      <a class="panel-block is-active disabled">
        Profile Information
      </a>
      <router-link to="/profile/general" class="panel-block">
        Personal Information
      </router-link>
      <router-link to="/profile/photo" class="panel-block">
        Photo
      </router-link>
      <router-link to="/profile/preferences" class="panel-block">
        Preferences
      </router-link>
      <router-link to="/profile/verification" class="panel-block">
        Verification
      </router-link>
      <router-link to="/profile/cardetails" class="panel-block">
        Car
      </router-link>
    </nav>
    <nav class="panel">

      <a class="panel-block">
        Ratings
      </a>
      <router-link to="/profile/ratingsrecieved" class="panel-block">
        Ratings Received
      </router-link>
      <router-link to="/profile/ratingsgiven" class="panel-block">
        Ratings Given
      </router-link>
    </nav>
    <nav class="panel">

      <a class="panel-block">
        Account
      </a>
      <router-link to="/profile/password" class="panel-block">
        Change My Password
      </router-link>
      <router-link to="/profile/closeaccount" class="panel-block">
        Close my account
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'ProfilePanel',
  data() {
    return {};
  }
};
</script>
