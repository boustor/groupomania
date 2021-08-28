<template>
  <div class="pasMessage" v-show="isListe">Aucun message</div>

  <br />
  <button
    class="bouton"
    v-on:click="this.$router.push({ name: 'Message', params: { id: 0 } })"
  >
    Ajouter un message
  </button>

  <div v-for="message in listes" :key="message.id" class="cadreMessage">
    <div class="enteteMessage">
      <div>message de : {{ message.nom }}</div>
      <div>le : {{ dateTime(message.createdAt) }}</div>
    </div>
    <div>{{ message.objet }}</div>
    <div>{{ message.id_usr }}</div>
    <div>
      {{ message.message }}
    </div>
    <div class="fondMessage">
      <router-link :to="{ name: 'Message', params: { id: message.id } }"
        ><font-awesome-icon :icon="['fas', 'edit']"
      /></router-link>
      &nbsp; 
      &nbsp;
      <span class="butSupprimer" v-on:click="supprimerMessage">
        <font-awesome-icon :icon="['fas', 'trash']"
    /></span>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "ListeMessages",
  data() {
    return {
      listes: null,
      isListe: false,
    };
  },
  methods: {
    dateTime(value) {
      return moment(value).format("DD-MM-YYYY");
    },
    // ---------- on va rechercher les messages ----------
    listeMessage: function () {
      const token = localStorage.getItem("userToken");
      if (!token) {
        this.$router.push("/");
      }
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      fetch("http://localhost:3000/api/messages", requestOptions)
        .then((listes) => listes.json())
        .then((listes) => {
          if (!listes || listes.messErr == "Etoken") {
            this.$router.push("/");
          }
          if (listes == "") {
            this.isListe = true;
            // afficher aucun message
          } else {
            this.listes = listes;
          }
        });
    },
        // ---------- On supprimer le message ----------
        supprimerMessage: function() {
          
        }
  },
  mounted() {
    this.listeMessage();
  },
};
</script>

<style>
.cadreMessage {
  margin: 15px;
  border-radius: 5px;
  box-shadow: 2px 2px 4px rgb(37, 70, 109);
}
.fondMessage {
  height: 35px;
  border: 1px solid black;
  border-radius: 0 0 5px 5px;
  text-align: right;
  padding-top:5px;
  padding-right:15px;
}
.pasMessage {
  color: blue;
  size: 30px;
  font-weight: bold;
}
.enteteMessage {
  display:flex;
  align-content: space-between;
  width:100%;
}
.butSupprimer{
  color:red;
}
</style>