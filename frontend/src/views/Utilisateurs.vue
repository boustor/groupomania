<template>
  <h2>Gestion des utilisateurs</h2>

  <div class="alert-mask" v-if="isAlert">
    <div class="alert-wrapper">
      <div class="alert-container">
        <div class="alert-body">
          Utilisateurs Supprimé
        </div>
      </div>
    </div>
  </div>


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
      <td>
        <button class="bouton" v-on:click="supprimerUser(user.id)">
          <font-awesome-icon :icon="['fas', 'trash']" class="corbeille" />
        </button>
      </td>
    </tr>
  </tbody>
</table>
</template>


<script>
  export default {
    name: "Utilisateurs",
    data() {
      return {
        listes: null,
        isAlert: false,
      };
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
            this.listes = listes;
          });
      },
      supprimerUser: function (id) {
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

        fetch("http://localhost:3000/api/auth/supprimer/" + id, requestOptions)
          .then((listes) => listes.json())
          .then((listes) => {
            if (!listes || listes.messErr == "Etoken") {
              this.$router.push("/");
            } else {
              this.isAlert = true;
              setTimeout(() => { this.isAlert = false }, 1000);
              this.$router.go();
            }
          });
      }
    },
    mounted() {
      this.listeUtilisateur();
    },
  };
</script>
<style>
  .corbeille {
    color:red;
  }
</style>