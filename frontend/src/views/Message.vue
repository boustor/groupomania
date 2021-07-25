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
      <textarea class="form-control" id="message" v-model="message"></textarea>
    </div>
    <button class="btn btn-primary" v-on:click="Valider()">Valider</button>
  </form>

</div>
</template>

<script>
  export default {
    name: 'Message',
    props: ['id'],
    data() {
      return {
        objet:null,
        message:null,
        id_usr:null
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
        };
        fetch("http://localhost:3000/api/messages/"+this.id, requestOptions)
          .then((message) => message.json())
          .then((message) => {
            if (!message) {
              this.$router.push('/listeMessages')
            }
            this.objet = message.objet;
            this.message= message.message;
          })
      },
      Valider: function() {
        
      }
    },
    mounted() {
      this.rechercheMessage()
    }
  }
</script>

<style>
</style>