<template>
  <Header />
  <div class="fondCorps">
  <router-view />
</div>
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
    width:1024px;
    margin: auto;
    border-left: 1px solid black;
    border-right: 1px solid black;
    background-color: #78b0b8  ;
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