<template>
  <div class="container">
    <navbar/>
    <navtabs/>
    <div class="main">
      <div class="tabs is-toggle">
        <ul>
          <li class="is-active">
            <a>
              <span>Upcoming Rides</span>
            </a>
          </li>
          <li>
            <a>
              <span>Past Rides</span>
            </a>
          </li>
          <li>
            <a>
              <span>Archived Rides</span>
            </a>
          </li>
        </ul>
      </div>
            
      <p class="is-size-6">You dont have any upcoming rides</p>
    </div>

  </div>
</template>
<script>
import Navbar from '@/components/shared/Navbar';
import Navtabs from '@/components/shared/NavTabs';

export default {
  name: 'UserRidesOffered',
  components: {
    Navbar,
    Navtabs
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
.main {
  margin: 50px 0;
}
</style>
