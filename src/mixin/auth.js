export default {
  computed: {
    isAuth() {
      if (localStorage.vuex) {
        const token = JSON.parse(localStorage.getItem('vuex')).auth.tokens[0]
          .token;
        if (token) {
          return true;
        }
      } else {
        return false;
      }
    }
  }
};
