<template>
  <div>
    <h3 class="commentaire" v-if="isCom">Commentaire(s)</h3>
    <div v-for="message in listes" :key="message.id" class="cadreMessage">
      <div class="enteteMessage">
        <div>message de : {{ message.nom }}</div>
        <div>le : {{ dateTime(message.createdAt) }}</div>
      </div>
      <div class="objetMessageCom">{{ message.objet }}</div>

      <textarea v-model="message.message" class="messageAreaCom"></textarea>     

      <div class="fondCommentaire">
        <div>
          <router-link :to="{ name: 'Commentaire', params: { id_mess: message.id_mess, id: message.id } }"
            v-if="userCtrl.userId == message.id_usr">
            <font-awesome-icon :icon="['fas', 'edit']" />
          </router-link>
          &nbsp;
          &nbsp;

          <span class="butSupprimer" v-on:click="supprimerMessage(message.id)" v-if="butSupprimer">
            <font-awesome-icon :icon="['fas', 'trash']" />
          </span>
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
  import moment from "moment";
  import webToken from 'jsonwebtoken'

  export default {
    name: "AffCommentaire",
    props: ['idmessage'],
    data() {
      return {
        listes: [],
        isCom: false,
        butSupprimer: null,
        isAlert: false,
      }
    },
    methods: {
      dateTime(value) {
        return moment(value).format("DD-MM-YYYY");
      },
      affSupprimer: function () {
        if (this.userCtrl.admin == true) {
          this.butSupprimer = true;
        }
      },
      ListeCommentaire: function () {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        };
        fetch("http://localhost:3000/api/commentaires/all/" + this.idmessage, requestOptions)
          .then((listes) => listes.json())
          .then((listes) => {
            if (listes == '') {
              console.log('rien')
            } else {
              this.isCom = 'true';
              this.listes = listes
            }
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
              this.$router.go();
            }
          });
      }
    },
    mounted() {
      this.userCtrl = webToken.decode(localStorage.getItem("userToken"), process.env.TOKEN_KEY);
      this.affSupprimer();
      this.ListeCommentaire();
    }
  }
</script>

<style>
  .fondCommentaire {
    height: 35px;
    border: 1px solid black;
    border-radius: 0 0 5px 5px;
    text-align: right;
    padding-top: 5px;
    padding-right: 15px;
    padding-left: 15px;
  }

  .messageAreaCom {
    width: 95%;
    height: 200px;
    background-color: #82bdf5;
    color: white;
    border: 0;
    resize: none;
    border-radius: 5px;
  }

  .objetMessageCom {
    width: 95%;
    margin: auto;
    margin-bottom: 5px;
    border-radius: 5px;
    background-color: #0e91fc;
  }
</style>