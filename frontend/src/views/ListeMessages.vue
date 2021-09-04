<template>
  <div class="pasMessage" v-show="isListe">Aucun message</div>

  <br />
  <button class="bouton" v-on:click="this.$router.push({ name: 'Message', params: { id: 0 } })">
    Ajouter un message
  </button>

  <div v-for="message in listes" :key="message.id" class="cadreMessage">
    <div class="enteteMessage">
      <div>message de : {{ message.nom }}</div>
      <div>le : {{ dateTime(message.createdAt) }}</div>
    </div>
    <div class="objetMessage">{{ message.objet }}</div>
    <div class="leMessage">
      <textarea v-model="message.message" class="messageArea"></textarea>
    </div>

    <div class="fondMessage">
      <div>
        <router-link :to="{ name: 'Commentaire', params: { id_mess: message.id, id: 0 } }">
          <font-awesome-icon :icon="['fas', 'comment']" />{{message.nbCom}}
        </router-link>
      </div>
      <div>
        <router-link :to="{ name: 'Message', params: { id: message.id } }">
          <font-awesome-icon :icon="['fas', 'edit']" />
        </router-link>
        &nbsp;
        &nbsp;

        <span class="butSupprimer" v-on:click="supprimerMessage(message.id)" v-if="butSupprimer">
          <font-awesome-icon :icon="['fas', 'trash']" />
        </span>
      </div>
    </div>

    <AffCom :idmessage=message.id />

  </div>

</template>

<script>
  import moment from "moment";
  import AffCom from "../components/AffCommentaire";

  export default {
    name: "ListeMessages",
    components: {
      AffCom,
    },
    data() {
      return {
        listes: null,
        isListe: false,
        butSupprimer: false,
      };
    },
    methods: {
      dateTime(value) {
        return moment(value).format("DD-MM-YYYY");
      },
      affSupprimer: function () {
        const admin = localStorage.getItem("userAdmin");
        if (admin === 'true') {
          this.butSupprimer = true;
        }
      },
      // ---------- on va rechercher les messages ----------
      listeMessage: function () {
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

        fetch("http://localhost:3000/api/messages", requestOptions)
          .then((listes) => listes.json())
          .then((listes) => {
            if (!listes || listes.messErr == "Etoken") {
              this.$router.push("/");
            }
            if (listes == "") {
              this.isListe = true;
              // afficher aucun message
            } else {
              this.listes = listes;
            }
          });
      },
      // ---------- recherche des commentaires -------
      listeCommentaire: function () {
        this.boubou = "tit"
      },
      // ---------- On supprimer le message ----------
      supprimerMessage: function (id) {
        console.log(id)
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
              this.$router.go();
            }
          });
      },
    },
    mounted() {
      this.affSupprimer();
      this.listeMessage();
    },
  };
</script>

<style>
  .cadreMessage {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    border-radius: 5px;
    box-shadow: 2px 2px 4px rgb(37, 70, 109);
  }

  .fondMessage {
    display: flex;
    justify-content: space-between;
    height: 35px;
    border: 1px solid black;
    border-radius: 0 0 5px 5px;
    text-align: right;
    padding-top: 5px;
    padding-right: 15px;
    padding-left: 15px;
  }

  .pasMessage {
    color: blue;
    size: 30px;
    font-weight: bold;
  }

  .enteteMessage {
    display: flex;
    justify-content: space-between;
    padding-left: 15px;
    padding-right: 15px;
  }

  .butSupprimer {
    color: red;
  }

  .leMessage {
    width: 95%;
    margin: auto;
    text-align: left;
    background-color: #666666;
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 5px;
    color: white;
  }

  .messageArea {
    width:100%;
    background-color: #666666;
    color:white;
    border:0;
    resize: none;
  }

  .objetMessage {
    width:95%;
    margin:auto;
    margin-bottom: 5px;
    border-radius: 5px;
    background-color: #74ffba;
  }
</style>