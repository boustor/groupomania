<template>
  <div>
  <h3>Création / modification du message</h3>

  <form>
    <div class="mb-3 col-sm-6">
      <label for="objet" class="form-label">Objet</label>
      <input type="text" class="form-control" id="objet" aria-describedby="text" v-model="objet">
    </div>
    <div class="mb-3 col-sm-6">
      <label for="message" class="form-label">Message</label>
      <textarea class="form-control" id="message"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Valider</button>
  </form>

</div>
</template>

<script>
  export default {
    name: 'Message',
    props: ['data'],
    data() {
      return {
        id: null,
        objet:null,
      }
    },
    methods: {
      rechercheMessage: function () {
        const token = localStorage.getItem("user-token");
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          data: JSON.stringify({ id_mess: this.id })
        };
console.log(requestOptions)
        fetch("http://localhost:3000/api/messages/id", requestOptions)
          .then((message) => message.json())
          .then((message) => {
            if (!message) {
              this.$router.push('/login')
            }
            this.objet = message.objet;
          })
      },
    },
    mounted() {
      this.id = this.data
      console.log(this.id)
      this.rechercheMessage()
    }
  }
</script>

<style>
</style>