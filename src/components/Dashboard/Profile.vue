<template>
  <div class="container">
    <navbar/>
    <navtabs/>
    <div class="main">
      <div class="columns">
        <div class="column is-one-quarters">
          <panel/>
        </div>
        <div class="column is-three-quarters">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/shared/Navbar';
import Navtabs from '@/components/shared/NavTabs';
import Panel from '@/components/shared/ProfilePanel';
import { mapGetters } from 'vuex';

export default {
  name: 'UserProfile',
  components: {
    Navbar,
    Navtabs,
    Panel
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
nav.panel {
  padding: 0 20px;
}

.main {
  margin: 20px 0px;
}
</style>
