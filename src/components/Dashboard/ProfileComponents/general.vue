<template>
  <div>
    <div>
      <p class="is-size-4 has-text-weight-bold">Your Personal Information</p>
      <hr>
      <div class="box">
        <div class="container">
          <table class="table">
            <tbody>
              <tr>
                <td class="pull-right">
                  <p class="is-size-6 has-text-weight-bold"> Gender</p>
                </td>
                <td>{{ user.gender }}</td>
              </tr>
              <tr>
                <td class="pull-right">
                  <p class="is-size-6 has-text-weight-bold">First Name</p>
                </td>
                <td>
                  <input v-model="user.first_name" type="text" class="input">
                </td>
              </tr>
              <tr>
                <td class="pull-right">
                  <p class="is-size-6 has-text-weight-bold">Last Name</p>
                </td>
                <td>
                  <input v-model="user.last_name" type="text" class="input">
                </td>
              </tr>
              <br>
              <tr>
                <td class="pull-right">
                  <p class="is-size-6 has-text-weight-bold"> Email</p>
                </td>
                <td>
                  <input v-model="user.email" type="text" class="input">
                </td>
              </tr>
              <tr>
                <td class="pull-right">
                  <p class="is-size-6 has-text-weight-bold">Mobile phone</p>
                </td>
                <td>
                  <input v-model="user.phone" type="text" class="input">
                </td>
              </tr>
              <br>
              <tr>
                <td class="pull-right">
                  <p class="is-size-6 has-text-weight-bold">Date of birth</p>
                </td>
                <td>
                  <div class="field">
                    <p class="control has-icons-left">
                      <datetime v-model="user.dob" type="date"/> 
                      <span class="icon is-small is-left ">
                        <i class="fa fa-calendar is-myblue"/>
                      </span>
                    </p>
                  </div>
                </td>     
              </tr>
              <tr>
                <td class="pull-right">
                  <p class="is-size-6 has-text-weight-bold"> Bio</p>
                </td>
                <td>
                  <div class="notification is-info ">

                    <p>
                      <i class="fa fa-exclamation-circle"/> Tell other members about yourself
                      <br>and why they should want to travel
                    <br> with you (min. 10 characters).</p>
                  </div>
                  <textarea id="" v-model="user.bio" class="textarea" name="" cols="30" placeholder="Example: 'Im a student of University of Lagos, and often visit friends at Lekki'"/>
                </td>
              </tr>
              <tr>
                <td/>
                <td>
                  <button class="button is-myblue" @click="save">Save</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GeneralProfile',
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    save() {
      this.$axios
        .put(`http://localhost:5000/api/user`, this.user)
        .then(resp => {
          const { data } = resp.data;
          this.$store.commit('set_auth', data);
          this.$toasted.success(
            'Personal Details have successfully been saved'
          );
        })
        .catch(() => {
          this.$toasted
            .error('There was an error while saving Personal Details')
            .goAway(2500);
        });
    }
  },
  
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
