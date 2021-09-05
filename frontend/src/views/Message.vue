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
            <input class="form-control" id="file" ref="file" type="file" @change="viewFile" accept="image/jpeg, image/jpg"
              title="Format jpeg, jpg">
          </div>
        </div>

        <div id="preview">
          <img v-if="imageView" :src="imageView" class="affichageImage" />
        </div>
        <div class="positionBouton">
          <div class="cadragebouton">
            <button class="bouton" v-on:click="supprimerMessage(id)">Supprimer</button>
          </div>
          <div class="cadragebouton">
            <button class="bouton" v-on:click="validerMessage()">Valider</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="alert-mask" v-if="isAlert">
    <div class="alert-wrapper">
      <div class="alert-container">
        <div class="alert-body">
          Message supprimé
        </div>
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
        fileimg: null,
        imageView: null,
        isMessage: null,
        isAlert: false,
        image:null,
      };
    },
    methods: {
      viewFile: function () {
        //this.image = file.target.files[0];
        this.image = this.$refs.file.files[0];
        this.imageView = URL.createObjectURL(this.image);
      },
      affmessage: function () {

      },
      // ---------- on recherche un message ----------
      rechercheMessage: function () {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("userToken"),
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
        
        var formData = new FormData();
    
        formData.append('id', this.id)
        formData.append('objet',this.objet)
        formData.append('message',this.message)
        formData.append('file', this.image)

        const requestOptions = {
          method: "POST",
          headers: {
            //"Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body:formData,
    /*      
          body: JSON.stringify({
            id: this.id,
            objet: this.objet,
            message: this.message,
          }),
          */
        };
        fetch("http://localhost:3000/api/messages/message", requestOptions)
          .then((message) => message.json())
          .then((message) => {
            if (message.messErr == "Etoken") {
              this.$router.push("/");
            }
            //this.sauvegardeImage()
            this.$router.push('/listeMessages')
          });
      },
      sauvegardeImage() {
        var formData = new FormData();
        formData.append('file', this.image)
        const OptionsImage = {
          method:"POST",
          body:formData
        }
        fetch("http://localhost:3000/api/messages/image", OptionsImage)
      },
      // ---------- On supprimer le message ----------
      supprimerMessage: function (id) {
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

        fetch("http://localhost:3000/api/messages/supprimer/" + id, requestOptions)
          .then((listes) => listes.json())
          .then((listes) => {
            if (!listes || listes.messErr == "Etoken") {
              this.$router.push("/");
            } else {
              this.isAlert = true;
              setTimeout(() => { this.isAlert = false }, 800);
              this.$router.push('/listeMessages')
            }
          });
      }
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

  .positionBouton {
    display: flex;
    justify-content: space-between;
  }
  .cadragebouton {
  margin:10px;
  }
</style>