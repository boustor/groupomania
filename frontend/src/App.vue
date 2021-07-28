<template>
  <Header v-show="isLoggedIn" :key="reHeader" />
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

    };
  },
  methods: {
    forceRerender:function() {
      this.reHeader ++
    }
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
  updated(){
    this.forceRerender()
  }
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