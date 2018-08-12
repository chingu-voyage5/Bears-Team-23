<template>
  <div>
    <div>
      <p class="is-size-4 has-text-weight-bold">Close your account</p>
      <hr>
      <div>
        <p class="is-size-6 has-text-weight-bold">If you'd like to close your account because you weren't able to solve a problem, please take a look at our
        tips first:</p>
        <br>
        <ul>
          <li>To change your phone number or your email address, you can edit your profile.</li>
        </ul>
        <ul>
          <li>To hide your phone number, you can edit your profile.</li>
        </ul>
        <ul>
          <li>To resolve a technical issue, please contact us.</li>
        </ul>
        <ul>
          <li>To stop receiving emails, you can edit your notifications.</li>
        </ul>
        <ul>
          <li>To deal with a rating that you feel is unjustified, please contact us. If this is the case, do not close
          your account - you will not be able to create a new one.</li>
        </ul>

        <br>

        <p>If you still want to close your account, please tell us a bit more and help us improve our service.</p>

      </div>
      <br>
      <div class="box">
                   
        <div class="field">
          <p class="is-size-6 has-text-weight-bold">Reason</p>
          <div class="control">
            <div class="select">
              <select>
                <option>Choose</option>
                <option>With options</option>
              </select>
            </div>
          </div>
        </div>
                   
        <div class="field">
          <p class="is-size-6 has-text-weight-bold">Would you recommend HolaHola</p>
          <div class="control">
            <div class="select">
              <select>
                <option>Choose</option>
                <option>With options</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <p class="is-size-6 has-text-weight-bold">What Could we improve</p>
          <div class="control">
            <textarea id="" class="textarea" />
          </div>
        </div>
                                  
        <div class="field">
          <div class="control">
            <button class="button is-danger">Close my account</button>
          </div>
        </div>
                          

                        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CloseAccount',
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
ul {
  list-style: disc;
  padding-left: 20px;
}
</style>
