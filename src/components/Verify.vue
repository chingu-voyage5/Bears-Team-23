<template>
</template>
      
<script>
import { mapActions, mapGetters } from 'vuex';
import Navbar from '@/components/shared/Navbar';

export default {
  name: 'Verify',
  components: {
    Navbar
  },
  data() {
    return {
      
    };
  },
  created(){
      console.log(this.$route.params,'routed')
      this.verify();
  },
  methods: {
    verify(){
    this.$axios.get(`/user/verify/${this.$route.params.id}`).then(resp => {
        console.log(resp, 'respy');
    })
    .catch(err => {
        console.log(err,'lolz');
    })
    }
   
  }
};
</script>
      