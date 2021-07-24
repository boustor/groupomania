<template>
  <br>
  <div class="d-flex justify-content-center">
    <div class="d-flex justify-content-center border border-1 shadow-lg col-sm-4 rounded bg-white">
      <div class="col-sm-12">
        <h4 class="mb-3 my-4">Identifiant utilisateur</h4>

        <div class="my-4 px-3">
          <label for="email" class="form-label">Courriel</label>
          <div class="input-group">
            <input type="email" class="form-control" id="email" v-model="email" placeholder="email">
            <div class="invalid-feedback" v-bind:class="{'d-block' : ctrlEmail}">
              L'addresse courriel est obligatoire.
            </div>
          </div>
        </div>

        <div class="my-4 px-3">
          <label for="password" class="form-label">Mot de passe</label>
          <div class="input-group">
            <input type="password" class="form-control" id="password" v-model="password" placeholder="Mot de passe">
            <div class="invalid-feedback" v-bind:class="{'d-block' : ctrlPswd}">
              Mot de passe obligatoire ou incorrect.
            </div>
          </div>
        </div>
        <button class="w-75 btn btn-primary btn-lg my-4" v-on:click="loginAccount()">Valider</button>
      </div>
    </div>
  </div>
  <router-link :to="{name:'AddUser'}">Créer un nouveau compte</router-link>
<br />
  <div class="messageErreur" v-show="messageErreur" >
    <p>Courriel ou mot de passe incorrect</p>
  </div>

</template>


<script>
  import { checkEmail } from "../fonction";

  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        nom: '',
        password: '',
        messageErreur: false,
        ctrlNom: false,
        ctrlEmail: false,
        ctrlPswd: false
      }
    },
    methods: {
      loginAccount: function () {
        let erreur = '';
        if (this.email == '' || !checkEmail(this.email)) {
          this.ctrlEmail = true;
          erreur = true;
        } else {
          this.ctrlEmail = false;
        }

        if (this.password == '') {
          this.ctrlPswd = true;
          erreur = true;
        } else {
          this.ctrlPswd = false;
        }

        if (erreur == true) {
          return;
        }

        const data = {
          'email': this.email,
          'password': this.password
        }
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        };
        fetch('http://localhost:3000/api/auth/login', requestOptions)
          .then(response => response.json())
          .then(user => {
            if (user.message == 'impossible') {
              this.messageErreur = true
              return
            }
            localStorage.setItem('user-token', user.token)
            //this.$routeur.push('/listeMessages')
          })
          .catch(() => {
            localStorage.removeItem('user-token')
          })
      }
    },
    mounted() {
      localStorage.removeItem('user-token')
    },
  }
</script>
<style>
.messageErreur {
  color:red;
  size:20px;
  font-weight: bold;
}
</style>