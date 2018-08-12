<template>
  <div>
    <div>
            
      <div class="box">
        <div class="columns">
          <div class="column is-one-thirds">
            <p class="is-size-5 has-text-weight-bold pull-left">Ratings received</p>
          </div>
          <div class="column is is-one-thirds"/>
          <div class="column is-one-thirds">
            <ul>
              <li>
                <p class="is-size-6 has-text-weight-bold">Outstanding</p>
                <progress class="progress is-small" value="15" max="100">15%</progress>
              </li>
              <li>
                <p class="is-size-6 has-text-weight-bold">Excellent</p>
                <progress class="progress is-small" value="30" max="100">15%</progress>
              </li>
              <li>
                <p class="is-size-6 has-text-weight-bold">Good</p>
                <progress class="progress is-small" value="25" max="100">15%</progress>
              </li>
              <li>
                <p class="is-size-6 has-text-weight-bold">Poor</p>
                <progress class="progress is-small" value="15" max="100">15%</progress>
              </li>
              <li>
                <p class="is-size-6 has-text-weight-bold">Very Dissapointing</p>
                <progress class="progress is-small" value="15" max="100">15%</progress>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RatingsRecieved',
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

li {
  padding: 5px;
}
</style>
