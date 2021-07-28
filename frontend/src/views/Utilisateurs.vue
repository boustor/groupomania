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
        <td>{{ user.nom }}</td>
        <td>{{ user.courriel }}</td>
        <td>del</td>
      </tr>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    name: "Utilisateurs",
    methods: {
      listeUtilisateur: function () {
        const token = localStorage.getItem('userToken');
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