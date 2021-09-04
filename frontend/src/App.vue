<template>
  <Header v-show="isLoggedIn" :isAdmin=isAdmin />
  <router-view />
</template>

<script>
  import Header from "./components/Header";

  export default {
    name: "App",
    components: {
      Header
    },
    data() {
      return {
        isAdmin: false
      }
    },
    methods: {
      testIsAdmin: function () {
        const admin = localStorage.getItem("userAdmin");
        if (admin === 'true') {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      },
    },
    computed: {
      isLoggedIn() {
        if (this.$route.path != "/" && this.$route.path != "/addUser") {
          this.testIsAdmin();
          return true;
        } else {
          return false;
        }
      }
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