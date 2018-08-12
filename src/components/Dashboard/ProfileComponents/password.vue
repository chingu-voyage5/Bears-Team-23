<template>
  <div>
    <div>
      <p class="is-size-4 has-text-weight-bold">Change Password</p>
      <hr>
      <div class="box">
        <p class="is-size-6 has-text-weight-bold">If you forget your password it would be sent to pietrosparks@gmail.com</p>
        <br>
        <table class="table">
          <tbody>
            <tr>
              <td>
                <p class="is-size-6 has-text-weight-bold">Current password</p>
              </td>
              <td>
                <input type="text" class="input">
              </td>
            </tr>
            <tr>
              <td>
                <p class="is-size-6 has-text-weight-bold">New password</p>
              </td>
              <td>
                <input type="text" class="input">
              </td>
            </tr>
            <tr>
              <td>
                <p class="is-size-6 has-text-weight-bold">Confirm new password</p>
              </td>
              <td>
                <input type="text" class="input">
              </td>
            </tr>
            <tr>
              <td/>
              <td>
                <button class="button is-myblue">Save</button>
              </td>
            </tr>
          </tbody>
        </table>
               
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PasswordProfile',
  data() {
    return {};
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
