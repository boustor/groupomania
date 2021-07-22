<template>
  <Header />
  <component :is="component" :data="data" v-if="component" />
  {{component}}
</template>

<script>
  import Header from '../components/Header'

  export default {
    name: 'Home',
    props: ['ecran','data'],
    components: {
      Header,
    },
    data() {
      return {
        component: null
      }
    },
    computed: {
      loader: function () {
        if (!this.ecran) {
          return null;
        }
        return () => import(`../components/${this.ecran}`);
      },
    },
    mounted() {
      this.loader()
        .then(() => {
          this.component = () => this.loader();
          console.log('compo trouve')
        })
        .catch(() => {
          this.component = () => import("../components/Corps.vue");
        });
    },
  }
</script>