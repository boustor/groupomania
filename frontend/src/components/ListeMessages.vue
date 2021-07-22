<template>
  <div v-for="message in listes" :key="message.id" class="cadreMessage">
    <div>{{ message.objet }}</div>
    <div>{{ message.id_usr }}</div>
    <div class="fondMessage"><router-link :to="{name:'Home', params:{ecran:'Message',data:message.id}}"><font-awesome-icon :icon="[ 'fas', 'edit' ]" /></router-link></div>
  </div>
</template>

<script>
export default {
  name: 'Messages',
  data() {
    return {
      listes: null,
    };
  },
  methods: {
    listeMessage: function () {
      const token = localStorage.getItem("user-token");
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer "+token,
        },
      };

      fetch("http://localhost:3000/api/messages", requestOptions)
        .then((listes) => listes.json())
        .then((listes) => {
          if (!listes) {
            this.$router.push('/login')
          }
          this.listes = listes;
        })
    },
  },
  mounted() {
    this.listeMessage();
  },
  
};
</script>

<style>
.cadreMessage {
  width: 90%;
  margin: auto;
  border-radius: 5px;
  box-shadow: 2px 2px 4px rgb(37, 70, 109);
  margin-bottom: 10px;
} 
.fondMessage{
  height: 35px;
  border: 1px solid black;
  dbackground-color: rgb(0, 134, 134);
  border-radius: 0 0 5px 5px;
}
</style>