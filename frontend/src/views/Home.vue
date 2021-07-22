<template>
  <Header />
  <component :is="componentFile" :data="data" />
  </template>

<script>
  import Header from '../components/Header'
  import ListeMessages from '../components/ListeMessages'
  import Message  from '../components/Message'

  export default {
    name: 'Home',
    props: ['ecran','data'],
    components: {
      Header,
      ListeMessages,
      Message
    },
    data() {
      return {
        componentFile : ''
      }
    },
    updated() {

      this.componentFile = this.ecran
    },
    mounted() {
      this.componentFile = this.ecran
    }
  }
</script>