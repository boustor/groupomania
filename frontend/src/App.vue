<template>
  <Header />
  <router-view />
</template>

<script>
  import Header from './components/Header'


  export default {
    name: 'App',
    components: {
      Header,
    }
  }
</script>



<style>
  body {
    margin: auto;
    background-color:white;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

</style>