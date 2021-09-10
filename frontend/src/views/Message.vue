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
          <div class="invalid-feedback" v-bind:class="{ 'd-block': ctrlObjet }">
            Il manque l'objet du message.
          </div>
          <div class="invalid-feedback" v-bind:class="{ 'd-block': ctrlObjetC }">
            L'objet doit supérieur à 10 caractères.
          </div>
        </div>

        <div class="my-4 px-3">
          <label for="password" class="form-label">Message</label>
          <div class="input-group">
            <textarea class="form-control text-break text-lg-start messageTexte" id="message"
              v-model="message"></textarea>
          </div>
          <div class="invalid-feedback" v-bind:class="{ 'd-block': ctrlMessage }">
            Il manque le message.
          </div>
          <div class="invalid-feedback" v-bind:class="{ 'd-block': ctrlMessageC }">
            Le message doit être suppérieur à 15 caractères.
          </div>

        </div>

        <div class="my-4 px-3" v-if="selImage">
          <div class="mb-3">
            <label for="formFile" class="form-label">Charger une image</label>
            <input class="form-control" id="file" ref="file" type="file" @change="viewFile"
              accept="image/jpeg, image/jpg, image/png" title="Format jpeg, jpg, png">
          </div>
          <div id="passwordHelp" class="form-text">Formats jpg, jpeg, png </div>
          <div class="invalid-feedback" v-bind:class="{ 'd-block': ctrlImage }">
            Image au mauvais format.
          </div>
        </div>

        <div id="preview" v-if="imageView">
          <div><img  :src="imageView" class="affichageImage" /></div>
          <div><button class="bouton" v-on:click="supprimerImage()">Supprimer image</button></div>
        </div>

        <div class="positionBouton">
          <div class="cadragebouton">
            <button class="bouton" v-on:click="supprimerMessage(id)">Supprimer</button>
          </div>
          <div class="cadragebouton">
            <button class="bouton" v-on:click="retourListes()">Retour</button>
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
        objet: '',
        message: '',
        imageurl: null,
        id_usr: null,
        fileimg: null,
        imageView: null,
        newImage: null,
        isMessage: null,
        isAlert: false,
        image: null,
        ctrlObjet: false,
        ctrlMessage: false,
        ctrlImage: false,
        ctrlMessageC:false,
        ctrlObjetC:false,
        selImage:true,
        oldImage:'',
      };
    },
    methods: {
      getExtension: function (chemin) {
        const regex = /[^.]*$/i;
        const resultats = chemin.match(regex);
        return resultats[0];
      },
      viewFile: function () {
        this.image = this.$refs.file.files[0];
        const nomFic = this.image.name;
        const ext = this.getExtension(nomFic).toLowerCase();
        const formatImg='png jpg jpeg';
        if (formatImg.indexOf(ext) == -1) {
          this.ctrlImage = true;
          this.supprimerImage();
          return
        }
        this.imageView = URL.createObjectURL(this.image);
      },
      supprimerImage:function() {
        this.image = ''
          this.$refs.file.value=null;
          this.imageView = ''
          this.imageurl = ''
      },
      retourListes: function () {
        this.$router.push('/listeMessages')
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
            this.imageurl = message.imageurl;
            this.oldImage = message.imageurl;
            if (this.imageurl) {
            this.imageView ="http://localhost:3000/"+this.imageurl
            //this.selImage= false;
            }

          });
      },
      // ---------- on ecrit le message ----------
      validerMessage: function () {
        let erreur = ''
        this.ctrlObjet= false
        this.ctrlObjetC= false
        this.ctrlMessage= false
        this.ctrlMessageC= false

        if (this.objet == '') {
          this.ctrlObjet = true;
          erreur = true
        } else if (this.objet.length < 10) {
          this.ctrlObjetC = true;
          erreur = true
        }

        if (this.message == '') {
          this.ctrlMessage = true;
          erreur = true
        }  else if (this.message.length < 15) {
          this.ctrlMessageC = true;
          erreur = true
        }

        if (erreur == true) {
          return;
        }
        // ------------------------------
        const token = localStorage.getItem("userToken");
        this.newImage = ''
        if (this.image) {
          this.newImage = this.image.name
        } 
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            id: this.id,
            objet: this.objet,
            message: this.message,
            imageurl: this.imageurl,
            oldimage: this.oldImage,
            image: this.newImage,
          }),
        };

        fetch("http://localhost:3000/api/messages/message", requestOptions)
          .then((message) => message.json())
          .then((message) => {
            if (message.messErr == "Etoken") {
              this.$router.push("/");
            }
            if (this.image) {
              this.sauvegardeImage(message.code)
            }
            this.$router.push('/listeMessages')
          });
      },
      sauvegardeImage(name) {
        var formData = new FormData();
        formData.append('file', this.image, "mess" + name)
        formData.append('id', name)
        const OptionsImage = {
          method: "POST",
          body: formData
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
          method: "DELETE",
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
    width: 95%;
    padding: 5px;
  }

  .positionBouton {
    display: flex;
    justify-content: space-between;
  }

  .cadragebouton {
    margin: 10px;
  }

  .messageTexte {
    height: 300px;
  }
</style>