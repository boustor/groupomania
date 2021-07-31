<template>
  <h2>Gestion des utilisateurs</h2>

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
          <router-link :to="{ name: '', params: { id: message.id } }">
            <font-awesome-icon :icon="['fas', 'trash']" />
          </router-link>
          
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
            console.log(listes);
            this.listes = listes;
          });
      },
    },
    mounted() {
      this.listeUtilisateur();
    },
  };
</script>
<style>
</style>