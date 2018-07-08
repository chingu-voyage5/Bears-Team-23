<template>
  <div>
    <div class="trip-coords">
      <div class="field is-grouped">
        <div class="control">
          <input v-model="searchParams.from.name" type="text" class="input" placeholder="From">
        </div>
        <p class="control">
          <a class="button is-default" @click="exchangeParams()"><i class="fa fa-exchange"/></a>
        </p>
        <div class="control">
          <input v-model="searchParams.to.name" type="text" class="input" placeholder="to">
        </div>
        <p class="control">
          <a class="button is-mybluebg has-text-white">Find</a>
        </p>
      </div>
                           
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SearchBar',
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['searchParams'])
  }
};
</script>

<style scoped>
.trip-coords {
  padding: 10px;
  background-color: #eeeeee;
}
.is-myblue {
  color: #108cce;
}
.is-mybluebg {
  background-color: #108cce;
}
</style>
