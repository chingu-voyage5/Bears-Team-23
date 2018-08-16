<template>

  <div>
    <div>
      <p class="is-size-4 has-text-weight-bold">Change Password</p>
      <hr>
      <div class="box">
        <p class="is-size-6 has-text-weight-bold">If you forget your password it would be sent to {{ user.email }}</p>
        <br>
        <table class="table">
          <tbody>
            <tr>
              <td>
                <p class="is-size-6 has-text-weight-bold">Current password</p>
              </td>
              <td>
                <input v-model="password.current" type="password" class="input">
              </td>
            </tr>
            <tr>
              <td>
                <p class="is-size-6 has-text-weight-bold">New password</p>
              </td>
              <td>
                <input v-model="password.new" type="password" class="input">
              </td>
            </tr>
            <tr>
              <td>
                <p class="is-size-6 has-text-weight-bold">Confirm new password</p>
              </td>
              <td>
                <input v-model="password.confirm" type="password" class="input">
              </td>
            </tr>
            <tr>
              <td/>
              <td>
                <button :disabled="!passwordValid" class="button is-myblue" @click="save()">Save</button>
              </td>
            </tr>
          </tbody>
        </table>
               
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'PasswordProfile',
  data() {
    return {
      password: {
        current: '',
        new: '',
        confirm: ''
      }
    };
  },
  computed: {
    ...mapGetters(['user']),

    passwordValid() {
      if (
        !this.password.current ||
        this.password.current.trim() === '' ||
        this.password.new.trim() === '' ||
        this.password.confirm.trim() === '' ||
        this.password.current.trim() === this.password.new.trim() ||
        this.password.new.trim() !== this.password.confirm.trim()
      ) {
        return false;
      } else return true;
    }
  },
  methods: {
    ...mapActions(['logout']),
    save() {
      this.$axios
        .put('/password/change', this.password)
        .then(resp => {
          this.$toasted
            .success('Password updated Successfully, Please Login')
            .goAway(3000);
          this.logout().then(() => {
            this.$router.push('/login');
          });
        })
        .catch(e => {
          this.$toasted.error('Error while saving password').goAway(2000);
        });
    }
  }
};
</script>
<style scoped>
.table td {
  border: none !important;
}

.box,
.table {
  background-color: #eeeeee;
}
</style>
