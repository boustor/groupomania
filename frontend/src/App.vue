<template>
  <Header v-show="isLoggedIn" />
  <router-view />
</template>

<script>
import Header from "./components/Header";

export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {
      reHeader:0
    };
  },
  computed: {
    isLoggedIn() {  
      if (this.$route.path != "/" && this.$route.path != "/addUser") {
        return true;
      } else {
        return false;
      }
    }
  },
};
</script>

<style>
body {
  margin: 0;
  background-color: #ffffff;
}

.fondCorps {
  background-color: #fff;
  height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>