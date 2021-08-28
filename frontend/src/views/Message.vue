<template>
  <br />
  <div class="d-flex justify-content-center">
    <div class="
        d-flex
        justify-content-center
        border border-1
        shadow-lg
        col-sm-6
        rounded
        bg-white
      ">
      <div class="col-sm-12">
        <h3 class="mb-3 my-4">Création / modification message</h3>

        <div class="my-4 px-3">
          <label for="email" class="form-label">Objet</label>
          <div class="input-group">
            <input type="text" class="form-control" id="objet" aria-describedby="text" v-model="objet" />
          </div>
        </div>

        <div class="my-4 px-3">
          <label for="password" class="form-label">Message</label>
          <div class="input-group">
            <textarea class="form-control text-break text-lg-start" id="message" v-model="message"></textarea>
          </div>
        </div>

        <div class="my-4 px-3">
          <div class="mb-3">
            <label for="formFile" class="form-label">Charger une image</label>
            <input class="form-control" id="fileimg" type="file" @change="viewFile" accept="image/jpeg, image/jpg"
              title="Format jpeg, jpg">
          </div>
        </div>

        <div id="preview">
          <img v-if="imageView" :src="imageView" class="affichageImage" />
        </div>

        <button class="bouton" v-on:click="validerMessage()">Valider</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Message",
    props: ["id"],
    data() {
      return {
        objet: null,
        message: null,
        id_usr: null,
        fileimg:null,
        imageView: null,
      };
    },
    methods: {
      viewFile: function (file) {
        const image = file.target.files[0];
        this.imageView = URL.createObjectURL(image);
      },
      // ---------- on recherche un message ----------
      rechercheMessage: function () {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("user-token"),
          },
        };
        fetch("http://localhost:3000/api/messages/" + this.id, requestOptions)
          .then((message) => message.json())
          .then((message) => {
            if (message.messErr == "Etoken") {
              this.$router.push("/");
            }
            if (!message) {
              this.$router.push("/listeMessages");
            }
            this.objet = message.objet;
            this.message = message.message;
          });
      },
      // ---------- on ecrit le message ----------
      validerMessage: function () {
        const token = localStorage.getItem("userToken");
        //const formData = new FormData(),
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          
          //formData.append('fileImg', this.imageView),
          body: JSON.stringify({
            id: this.id,
            objet: this.objet,
            message: this.message,
          }),
        };
        fetch("http://localhost:3000/api/messages/message", requestOptions)
          .then((message) => message.json())
          .then((message) => {
            if (message.messErr == "Etoken") {
              this.$router.push("/");
            }
          });
      },
    },

    mounted() {
      if (this.id != 0) this.rechercheMessage();
    },
  };
</script>

<style>
  .affichageImage {
    width: 500px;
    padding: 5px;
  }
</style>