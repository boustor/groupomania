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
        <h3 class="mb-3 my-4">Commantaire</h3>

        <div class="my-4 px-3">
          <label for="email" class="form-label">Objet</label>
          <div class="input-group">
            <input type="text" class="form-control" id="objet" aria-describedby="text" v-model="objet" />
          </div>
          <div class="invalid-feedback" v-bind:class="{ 'd-block': ctrlObjet }">
            Il manque l'objet du commentaire.
          </div>
          <div class="invalid-feedback" v-bind:class="{ 'd-block': ctrlObjetC }">
            L'objet doit supérieur à 10 caractères.
          </div>
        </div>

        <div class="my-4 px-3">
          <label for="password" class="form-label">Message</label>
          <div class="input-group">
            <textarea class="form-control text-break text-lg-start textCom" id="message" v-model="message"></textarea>
          </div>
          <div class="invalid-feedback" v-bind:class="{ 'd-block': ctrlMessage }">
            Il manque le commentaire.
          </div>
          <div class="invalid-feedback" v-bind:class="{ 'd-block': ctrlMessageC }">
            Le commentaire doit être suppérieur à 15 caractères.
          </div>

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
    name: "Commentaire",
    props: ["id_mess", "id"],
    data() {
      return {
        objet: '',
        message: '',
        id_usr: null,
        fileimg: null,
        imageView: null,
        isMessage: null,
        isAlert: false,
        ctrlObjet:false,
        ctrlMessage:false,
        ctrlMessageC:false,
        ctrlObjetC:false,
      };
    },
    methods: {
      retourListes:function(){
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
        fetch("http://localhost:3000/api/commentaires/" + this.id, requestOptions)
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
        } else if (this.message.length < 15) {
          this.ctrlMessageC = true;
          erreur = true
        }

        if (erreur == true) {
          return;
        }
        // ------------------------------
        const token = localStorage.getItem("userToken");
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            id: this.id,
            id_mess: this.id_mess,
            objet: this.objet,
            message: this.message,
          }),
        };
        fetch("http://localhost:3000/api/commentaires/commentaire", requestOptions)
          .then((message) => message.json())
          .then((message) => {
            if (message.messErr == "Etoken") {
              this.$router.push("/");
            }
            this.$router.push('/listeMessages')
          });
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

        fetch("http://localhost:3000/api/commentaires/supprimer/" + id, requestOptions)
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
      },
    },
    mounted() {
      if (this.id != 0) this.rechercheMessage();
    },
  };
</script>

<style>
  .positionBouton {
    display: flex;
    justify-content: space-between;
  }

  .affichageImage {
    width: 500px;
    padding: 5px;
  }

  .cadragebouton {
    margin: 10px;
  }
  .textCom {
    height: 200px;
  }
</style>