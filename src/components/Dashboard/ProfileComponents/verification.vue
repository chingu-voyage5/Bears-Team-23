<template>
  <div>
    <div v-if="!profileVerified">
      <p class="is-size-4 has-text-weight-bold">Verification</p>
      <hr>
      <p>Verify your profile to become a trusted member of our community and easily find others to travel with!</p>
      <div>
        <div v-if="!profileVerified" class="box">
          <div class="columns">
            <div v-if="!emailVerified" class="column is-three-quarters">
                            
              <p class="is-size-6 has-text-weight-bold"><i class="fa fa-exclamation-circle"/> Please verify your email address</p>
              <p class="is-size-6">Your email address is: {{ user.email }} </p>
              <p class="is-size-6">Having a verified email address means we can contact you if needed.</p>
            </div>
            <div class="column is-one-quarters">
              <button class="button is-myblue" style="margin-top: 15px;">Verify Email</button>
            </div>
          </div>
        </div>
        <div v-if="!user.phone" class="box">
          <div class="columns" >
            <div class="column is-three-quarters" >
                                
              <p class="is-size-6 has-text-weight-bold"><i class="fa fa-exclamation-circle"/> Please add your phone number</p>
              <p class="is-size-6"> Please add your phone number
              Add a phone number so you can verify it. </p>
              <p class="is-size-6">Adding your phone number means you'll be able to arrange your rides more easily.</p>
            </div>
            <div class="column is-one-quarters">
              <button class="button is-myblue" style="margin-top: 15px;">Add my phone</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="is-size-4 has-text-weight-bold">Verification</p>
      <hr>
      <div class="box">
        <p class="is-size-5">You're all verified! Nothing to see here <i class="fa fa-check"/></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'VerificationProfile',
  data() {
    return {};
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
  }
};
</script>
<style scoped>
.box.main {
  margin: 20px 0;
}

ul > li {
  padding: 5px;
}
.box {
  margin: 20px 0;
}
</style>
