<template>
    <div id="entete">
        <div><img :src="require(`@/assets/groupomania.png`)" class="image"></div>

        <div class="btn-group" role="group" v-if="connecter == 'non'">
            <div id="boutonUser" data-bs-toggle="dropdown" aria-expanded="false">
                <img :src="require(`@/assets/offline_user.png`)" class="image">
            </div>
            <ul class="dropdown-menu" aria-labelledby="boutonUser">
                <li>
                    <router-link to="/login" class="lienUser">Connexion</router-link>
                </li>
                <li>
                    <router-link to="/CreateUser" class="lienUser">Créer un compte</router-link>
                </li>
            </ul>
        </div>
        <div class="btn-group" role="group" v-else>
            <div id="boutonUser" data-bs-toggle="dropdown" aria-expanded="false">
                <img :src="require(`@/assets/online_user.png`)" class="image">
            </div>
            <ul class="dropdown-menu" aria-labelledby="boutonUser">
                <li>
                    <router-link to="/login" class="lienUser">Déconnexion</router-link>
                </li>
                <li>
                    <router-link to="/Utilisateur" class="lienUser">Utilisateur</router-link>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'Header',
        data: function () {
            return {
                connecter: 'non',
                email: '',
                prenom: '',
                nom: '',
                password: '',
            }
        }
    }
</script>

<style scoped>
    #entete {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 50px;
        background-color: white;
        border-bottom: 2px solid black;
        padding-left: 5px;
        padding-right: 20px;
    }

    .image {
        max-height: 40px;
        padding-left: 10px;

    }


    .lienUser {
        text-decoration: none;
        padding-left: 5px;
        padding-right: 5px;
        color: black;
    }

    .lienUser:hover {
        font-style: italic;
    }
</style>