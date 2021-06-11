<template>
    <div id="entete">
        <div><img :src="require(`@/assets/groupomania.png`)" class="image"></div>

        <div class="btn-group">
            <div class="circleUser" data-bs-toggle="dropdown" aria-expanded="false">
                <font-awesome-icon :icon="myIcon" :style="{ color: 'black' }" />
            </div>
            <ul class="dropdown-menu">
                <li>
                    <router-link to="/login" class="lienUser">Connexion</router-link>
                </li>
                <li>
                    <router-link to="/CreateUser" class="lienUser">Créer un compte</router-link>
                </li>
            </ul>
        </div>
    </div>

    <router-view />
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import { faUser } from '@fortawesome/free-solid-svg-icons'

    export default {
        name: 'Header',

        data() {
            return {
                myIcon: faUser
            }
        },
        components: {
            FontAwesomeIcon
        }
    }
</script>

<style scoped lang="scss">
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

        .image {
            max-height: 40px;
            padding-left: 10px;

        }
    }

    .circleUser {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border: 1px solid black;
        border-radius: 20px;

    }

    .lienUser {
        text-decoration: none;
        padding-left: 5px;
        padding-right: 5px;
        color: black;

        &:hover {
            font-style: italic;
        }
    }
</style>