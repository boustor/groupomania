<template>
  <h2>Gestion des utilisateurs</h2>

  <div v-show="modeCreation">
    <User />
  </div>

  <button class="bouton" v-on:click="affichageCreation">
    Ajouter un message
  </button>

  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Nom</th>
        <th scope="col">courriel</th>
        <th scope="col">.</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in listes" :key="user.id">
        <td scope="row">{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>del</td>
      </tr>
    </tbody>
  </table>
</template>


<script>
import User from "../components/User.vue";

export default {
  name: "Utilisateurs",
  data() {
    return {
      listes: null,
      modeCreation: false,
    };
  },
  components: {
    User,
  },
  methods: {
    listeUtilisateur: function () {
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

      fetch("http://localhost:3000/api/auth", requestOptions)
        .then((listes) => listes.json())
        .then((listes) => {
          console.log(listes);
          this.listes = listes;
        });
    },
    affichageCreation() {
      this.modeCreation = true;
    },
  },
  mounted() {
    this.listeUtilisateur();
  },
};
</script>
<style>
</style>